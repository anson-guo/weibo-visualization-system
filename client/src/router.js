/**
 * @file 路由配置文件
 * @author guojingan <gja1026@163.com>
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import HomePage from './pages/HomePage'
import UserSearch from './pages/UserSearch'
import UserInfo from './pages/UserInfo'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/user-search',
    component: UserSearch
  },
  {
    path: '/user-info/:id',
    comppnent: UserInfo
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});