const express = require('express');
const router = express.Router();
const api = require('../config/api');

router.get("/", (req, res) => {
  const pagenum = req.query.pagenum || 1; // 获取页码

  // 获取总用户数
  let total = 0;
  api.count().then(result => {
    total = result;
  }).catch(err => {
    console.log(err);
  });

  // 获取指定页码的数据，默认第一页
  api.find({}, null, { limit: 10, skip: (pagenum - 1) * 10 })
    .then(data => {
      const result = {
        total,
        data
      }
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
});


router.get('/search/', (req, res) => {
  const username = req.query.username;
  let total = 0;
  var nameReg = new RegExp(username);
  const pagenum = req.query.pagenum || 1;

  api.count({ "name": nameReg }).then(result => {
    total = result;
  }).catch(err => {
    console.log(err);
  });

  api.find({ "name": nameReg }, null, { limit: 10, skip: (pagenum - 1) * 10 }).then(data => {
    const result = {
      total,
      data
    }
    res.send(result);
  })

});

module.exports = router;
