const path = require('path');

module.exports = { 
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('/src')) // key,value自行定义，比如.set('@@', resolve('src/good-analysis-total-components'))
      .set('_c', resolve('/src/components'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

