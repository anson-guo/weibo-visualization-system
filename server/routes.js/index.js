const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', function (req, res) {
  res.render('login');
});
router.get('/register', function (req, res) {
  res.render('register');
});

/**
 * 用户注册
 */
router.post('/register', function (req, res) {
  // 获取用户提交的信息
  var postData = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address
  };
  // 查询是否被注册
  User.findOne({ username: postData.username }, function (err, data) {
    if (data) {
      res.send('用户名已被注册');
    } else {
      // 保存到数据库
      User.create(postData, function (err, data) {
        if (err) throw err;
        console.log('注册成功');
        // res.redirect('/userList')    // 重定向到所用用户列表
      })
    }
  });
});

/**
 * 用户登录
 */
router.post('/login', function (req, res) {
  var postData = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne({
    username: postData.username,
    password: postData.password
  }, function (err, data) {
    if (err) throw err;
    if (data) {
      res.send('登录成功');
    } else {
      res.send('账号或密码错误');
    }
  })
});