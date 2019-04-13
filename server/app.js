const express = require('express');
const app = express();


const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('示例应用正在监听 3000 端口!');
});


/**
 * 连接 MongoDB 数据库
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weibo')     //连接本地数据库blog 

const db = mongoose.connection;

// 连接成功
db.on('open', function () {
  console.log('MongoDB Connection Successed')
});
// 连接失败
db.on('error', function () {
  console.log('MongoDB Connection Error')
});