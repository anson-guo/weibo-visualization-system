const models = require('./db');
const express = require('express');
const router = express.Router();

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 用户列表接口逻辑 -------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

/**
 * 获取所有用户信息
 */
router.get('/api/user', (req, res) => {
	let totalUser = 0;

	const { pagenum, name } = req.query;

	const nameReg = name ? { 'name': new RegExp(name) } : {};

	models.User.count(nameReg).exec((err, data) => {
		totalUser = data;
		getListFromBd();
	});

	/**
	 * 获取指定的list数据，分页获取
	 */
	function getListFromBd() {
		models.User.find(nameReg).skip((pagenum - 1) * 10).limit(10).exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				const result = {
					total: totalUser,
					data: data
				};
				res.send(result);
			}
		});
	}
});

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 用户基本信息逻辑 -------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

let userWeibos = []; // 存储用户的微博数据
let userImages = []; // 存储用户的所有照片数据

router.get('/api/user-info/:id/base-info', (req, res) => {
	const id = +req.params.id; // 这里有个小坑：id要转换成number类型，否则在查询语句中会出异常

	models.Weibo.find({ 'user': id }).exec((err, data) => {
		userWeibos = data;
		userImages = formatImages(userWeibos);

		models.User.find({ 'id': id }, { 'fans': 0, 'follows': 0, '_id': 0 }).exec((err, data) => {
			if (err) {
				res.send(err);
			} else {
				const returnData = {
					data: data,
					imageNum: userImages.length
				}
				res.send(returnData);
			}
		});
	});
});

router.get('/api/user-info/:id/base-header-info', (req, res) => {
	const id = +req.params.id;

	models.User.find({ 'id': id }, { 'name': 1, 'avatar': 1 }).exec((err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 用户的粉丝数据 --------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

/**
 * 接口名称：用户的粉丝数据
 * 接口位置：用户主页 > 粉丝数据
 * 接口参数：id
 */
router.get('/api/user-info/:id/fans-data', (req, res) => {
	const id = +req.params.id;

	models.User.find({ 'id': id }, { 'fans': 1 }).exec((err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});


// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 用户的关注者数据 -------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

/**
 * 接口名称：用户的关注者数据
 * 接口位置：用户主页 > 关注者数据
 * 接口参数：id
 */
router.get('/api/user-info/:id/follows-data', (req, res) => {
	const id = +req.params.id;

	models.User.find({ 'id': id }, { 'follows': 1 }).exec((err, data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 微博数据 -------------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

let userAllWeibos = [];
router.get('/api/user-info/:id/weibo-timeline', (req, res) => {
	const id = +req.params.id;

	models.Weibo.find({ 'user': id }).sort({ 'created_at': 1 }).exec((err, data) => { // 依据时间正序
		userAllWeibos = data;
		const result = formatTimeLineData(data);

		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

router.get('/api/user-info/weibo-timeline-detail', (req, res) => {
	const queryString = req.query.source;

	const result = [];

	if (queryString === '微博') {
		result.push({
			text: userAllWeibos[0].text,
			created_at: userAllWeibos[0].created_at,
			attitudes_count: userAllWeibos[0].attitudes_count,
			comments_count: userAllWeibos[0].comments_count,
		});
	} else {
		userAllWeibos.forEach(item => {
			if (item.source === queryString) {
				result.push({
					text: item.text,
					created_at: item.created_at,
					attitudes_count: item.attitudes_count,
					comments_count: item.comments_count,
					reposts_count: item.reposts_count

				});
			}
		});
	}

	res.send(result);
});

/**
* 构造时间线格式的数据
*/
function formatTimeLineData(data) {

	const sources = data.map(item => {
		return item.source;
	});

	const sourceList = new Set(sources); //去重
	const timeLineData = [];

	// 获取第一条微博
	timeLineData.push({
		'content': "微博",
		'timestamp': data[0].created_at,
	});

	data.forEach(item => {
		if (sourceList.has(item.source)) {
			timeLineData.push({
				'content': item.source,
				'timestamp': item.created_at,
			});
			sourceList.delete(item.source);
		}
	});

	return timeLineData;
}

/**
 * 接口名称：微博活跃度
 * 接口位置：用户主页 > 微博数据 > 微博活跃度统计
 * 接口参数：id, tabActiveName
 */
router.get('/api/user-info/:id/weibo-activity-data', (req, res) => {
	const id = +req.params.id;
	const { period } = req.query;

	models.Weibo.find({ 'user': id }, { 'created_at': 1 }).sort({ 'created_at': 1 }).exec((err, data) => {
		const dataArr = data.map(item => {
			return item.created_at.slice(0, 10);
		});
		const result = formatDataToHistogram(findCountByDate(period, dataArr));
		res.send(result);
	});
});

/**
 * 根据时间统计次数
 * 
 * @param {String} period 'week' | 'month' | 'year'
 * @param {Array} dataArr 例如：['2019-02-06', '2013-12-08'];
 * @return {} key: week、month、year， value: 出现的次数
 */
function findCountByDate(period, dataArr) {
	let arr = [];

	switch (period) {
		case 'week':
			arr = dataArr.map(item => new Date(item).getDay());
			break;
		case 'month':
			arr = dataArr.map(item => new Date(item).getMonth());
			break;
		case 'year':
			arr = dataArr.map(item => new Date(item).getFullYear());
			break
	}

	const temp = arr.reduce((o, k) => {
		k in o ? o[k]++ : (o[k] = 1);
		return o;
	}, {}); // { '0': 56, '1': 43, '2': 72, '3': 49, '4': 4, '10': 50, '11': 62 } 存在一个问题 可能有的月份或者周数不存在

	let result = {};
	let i = 0;
	if (period === 'month') {
		for (let i = 0; i < 12; i++) {
			result[i] = temp[i] || 0;
		}
	} else if (period === 'week') {
		for (let i = 0; i < 7; i++) {
			result[i] = temp[i] || 0;
		}
	} else {
		result = temp;
	}

	return result;
}

/**
 * 将数据转换成前端所需要的格式
 * 
 * @param {Object} data 例如 {"2017":15,"2018":27,"2019":26} 转换成如下：
 * @return [] [{'key': '2017', 'value': 15}, {'key': '2018', 'value': 27}]
 */
function formatDataToHistogram(data) {
	const result = []

	for (key in data) {
		result.push({
			'key': key,
			'value': data[key]
		});
	}

	return result;
}

/**
 * 接口名称：发博平台、设备统计
 * 接口位置：用户主页 > 微博数据 > 用户发博平台统计
 * 接口参数：id
 */
router.get('/api/user-info/:id/weibo-source-data', (req, res) => {
	const id = +req.params.id;

	models.Weibo.find({ 'user': id }, { 'source': 1, '_id': 0 }).exec((err, data) => {
		const sources = data.map(item => item.source);

		let result = sources.reduce((o, k) => {
			k in o ? o[k]++ : (o[k] = 1);
			return o;
		}, {});

		result = formatDataToHistogram(result);

		res.send(result);
	});
});

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- 用户照片墙 ------------------- //
// ------------------------------------------------- //
// ------------------------------------------------- //
/**
 * 该接口需要将用户的照片获取出来保存到一个数组中，格式为：
 * [
 * 		{
 * 			src: '图片URl地址'
 * 			href: '图片URl地址'
 * 		}
 * ]
 */

/**
 * 将图片数据转变为上面的格式
 */
function formatImages(data) {
	let imagesArr = [];
	data.forEach(item => {
		if (item.pictures) { // 这里有一个巨坑，由于不理解mongoose中Schema含义，记得在对应的model中定义字段，才能正常的得到获取到这个字段，否则undefined
			imagesArr = imagesArr.concat(item.pictures);
		}
	});

	let result = [];

	imagesArr.forEach((item, index) => {
		result[index] = {
			'src': item,
			'href': item
		}
	});

	return result;
}

router.get('/api/user-info/id/weibo-imageslist', (req, res) => {

	const page = req.query.page;
	const isLase = page * 20 >= userImages.length;

	const responseData = {
		isLast: isLase,
		data: page >= 2 ? userImages.slice(20 * (page - 1), 20 * (page - 1) + 20) : userImages.slice(0, 20)
	}

	res.send(responseData);

});

// ------------------------------------------------- //
// ------------------------------------------------- //
// -------------------- node调用python脚本 ---------- //
// ------------------------------------------------- //
// ------------------------------------------------- //

router.get('/api/user/start-crawler', (req, res) => {

	const userId = +req.query.userId;

	const cp = require('child_process'); // 使用node提供的child_process可以调用外部命令

	cp.exec('python3 ./crawler/weibo-crawler.py ' + userId, (err, stdout, stderr) => {
		if (err) console.log('stderr', err);
		if (stdout) console.log('stdout', stdout);
	});

	res.send({
		state: 0
	});
});

module.exports = router;
