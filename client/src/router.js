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
    component: HomePage
  },
  {
    path: '/user',
    component: UserList
  },
  {
    path: '/user-info/:name',
    component: UserInfoPage,
    children: [
      {
        path: 'base',
        component: BaseInfo
      },
      {
        path: 'fans',
        component: FansData
      },
      {
        path: 'weibos',
        component: WeiboData
      },
      {
        path: 'images',
        component: ImageWall
      }
    ]
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});