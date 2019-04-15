var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost:27017/weibo'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
  console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
  //在这里创建你的模式和模型
  console.log('connected!');
});

module.exports = mongoose;