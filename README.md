# weibo-visualization-system

### 浏览器

前端代码在 `client` 文件中，该系统的前端构建使用 Vue 进行开发。

### 服务器

后端代码在 `server` 文件中，服务端使用 node.js 进行编写，使用的是 express 框架。

### 部署流程

#### 数据库

本项目使用的是 MongoDB 数据库，安装完毕后启动数据库。

**启动数据库**
1. cd /usr/local/mongodb/bin/
2. sudo ./mongod

**创建数据库**

创建名为 weibo02 的数据库

#### 前端

1. 进入 `client/` 目录，使用 `npm i` 下载依赖包
2. `npm run serve` 运行前端工程
3. 浏览器访问 http://localhost:8080

#### 服务端
1. 进入 `serve/` 目录，安装 `mongoose`、`express`依赖包
2. `node index.js` 运行服务端程序
