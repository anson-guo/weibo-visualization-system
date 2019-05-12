/*
  Schema、Model、Entity或者Documents的关系请牢记，
  Schema生成Model，Model创造Entity，
  Model和Entity都可对数据库操作造成影响，
  但Model比Entity更具操作性。
*/

const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/weibo02');

// 为这次连接绑定事件
const db = mongoose.connection;

db.once('error', () => console.log('MongoDB connection error'));
db.once('open', () => console.log('MongoDB connection successed'));

/************** 定义模式userSchema **************/
const userSchema = mongoose.Schema({
  name: String,
  fans: Array,
  follows: Array
});

const weiboSchema = mongoose.Schema({
  pictures: Array,
  source: String,
  created_at: String,
  text: String,
  attitudes_count: Number,
  comments_count: Number,
  reposts_count: Number
})

/************** 定义模型Model **************/
const Models = {
  User: mongoose.model('users', userSchema),
  Weibo: mongoose.model('weibos', weiboSchema),
};


module.exports = Models;