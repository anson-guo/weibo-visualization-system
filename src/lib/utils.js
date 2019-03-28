/**
 * @file 常用工具函数
 * @author guojinan <gja1026@163.com>
 */

import axios from 'axios';
axios.defaults.withCredentials = true;

// post请求
export function postUrl({url, data}) {
  const bodyFormData = new FormData();
  if (data) {
      Object.keys(data).forEach(key => {
          bodyFormData.append(key, data[key]);
      });
  }
  return axios({
      method: 'post',
      url,
      data: bodyFormData,
      config: {headers: {'Content-Type': 'multipart/form-data'}}
  });
};

// get请求
export function getUrl({url, data}) {
  const finalUrl = joinQuery2url(url, data);
  return axios({
      method: 'get',
      url: finalUrl
  });
};

// 获取cookie
export function getCookie(name) {
  let start = '';
  let end = '';
  if (document.cookie.length > 0) {
      start = document.cookie.indexOf(name + '=');
      if (start !== -1) {
          start = start + name.length + 1;
          end = document.cookie.indexOf(';', start);
          if (end === -1) {
              end = document.cookie.length;
          }
          return unescape(document.cookie.substring(start, end));
      }
  }
  return null;
};