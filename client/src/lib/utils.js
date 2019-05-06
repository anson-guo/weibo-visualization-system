/**
 * @file 常用工具函数
 * @author guojinan <gja1026@163.com>
 */

import axios from 'axios';
axios.defaults.withCredentials = true;

// post请求
export function postUrl({ url, data }) {
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
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
}

// get请求
export function getUrl({ url, data }) {
  const finalUrl = joinQuery2url(url, data);
  return axios({
    method: 'get',
    url: finalUrl
  });
}

export function joinQuery2url(url, query) {
  query = query || {};
  const queryStr = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
  if (url.indexOf('?') > -1) {
    return `${url}&${queryStr}`;
  }
  return `${url}?${queryStr}`;
}

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
}

/**
 * 拖拽功能（PC端）
 * 此方法不兼容移动端
 */
export function drag(obj) {
  obj.onmousedown = function (ev) {

    ev = ev || window.event;
    obj.setCapture && obj.setCapture();

    obj.offsetX = ev.clientX - obj.offsetLeft;
    obj.offsetY = ev.clientY - obj.offsetTop;

    document.onmousemove = function (ev) {
      if (!ev) {
        ev = window.event;
      }

      obj.clientX = ev.clientX - obj.offsetX;
      obj.clientY = ev.clientY - obj.offsetY;

      obj.style.left = obj.clientX + "px";
      obj.style.top = obj.clientY + "px";
    };

    document.onmouseup = function () {
      document.touchstart = null;
      document.ontouchmove = null;
      obj.releaseCapture && obj.releaseCapture();
    };

    return false;
  };
}