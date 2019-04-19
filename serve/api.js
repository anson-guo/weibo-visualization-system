const models = require('./db');
const express = require('express');
const router = express.Router();

/**
 * 获取所有用户信息
 */
router.get('/api/user/all', (req, res) => {
	let totalUser = 0;
	const pagenum = req.query.pagenum;

	models.User.find().count((err, data) => {
		totalUser = data;
	});

	models.User.find().skip((pagenum - 1) * 10).limit(10).exec((err, data) => {
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
});

module.exports = router;