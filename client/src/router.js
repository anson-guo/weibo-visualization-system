/**
 * @file 路由配置文件
 * @author guojingan <gja1026@163.com>
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import HomePage from './pages/HomePage'
import UserList from './pages/UserList'
import UserInfo from './pages/UserInfo'

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
    component: UserInfo
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});