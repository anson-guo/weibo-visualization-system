/**
 * @file 路由配置文件
 * @author guojingan <gja1026@163.com>
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import HomePage from './pages/HomePage'
import UserList from './pages/UserList'
import UserInfoPage from './pages/UserInfoPage'
import BaseInfo from './pages/BaseInfo'
import FansData from './pages/FansData'
import WeiboData from './pages/WeiboData'
import ImageWall from './pages/ImageWall'

const routes = [
  {
    path: '/',
    component: HomePage // 主页
  },
  {
    path: '/user', 
    component: UserList // 用户列表页
  },
  {
    path: '/user-info/:name',
    component: UserInfoPage, // 用户信息页面
    children: [
      {
        name: 'BaseInfo',
        path: 'base',
        component: BaseInfo // 基本信息
      },
      {
        name: 'FansData',
        path: 'fans',
        component: FansData // 粉丝信息
      },
      {
        name: 'WeiboData',
        path: 'weibos',
        component: WeiboData // 微博数据
      },
      {
        name: 'ImageWall',
        path: 'images',
        component: ImageWall // 照片数据
      }
    ]
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});