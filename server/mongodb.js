/**
 * 连接 MongoDB 数据库
 */

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/weibo')
module.exports = mongoose;