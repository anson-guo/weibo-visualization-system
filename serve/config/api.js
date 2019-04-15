var UserModel = require('../models/user');

module.exports = {
  find(data = {}, fields = null, options = {}) {
    return new Promise((resolve, reject) => {
      //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
      UserModel.find(data, fields, options, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
};