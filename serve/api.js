const models = require('./db');
const express = require('express');
const router = express.Router();

// -------------------- /user接口相关逻辑 -------------------- //

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


// -------------------- /user-info接口相关逻辑 -------------------- //

router.get('/api/user-info/:id/base', (req, res) => {
	const id = req.body;
	console.log(id);
});



module.exports = router;