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

/**
 * 利用sort方法对对象数组按照对象属性进行排序 - 升序
 * eg: result = obj.sort(compare("age"))
 */
export function sortAscending(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value1 - value2;
  }
}

/**
 * 利用sort方法对对象数组按照对象属性进行排序 - 降序
 */
export function sortDescending(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value2 - value1;
  }
}

/**
 * 对数组对象中某个属性进行去重
 */
export function uniqueObjProperty(arr, u_key) {
  let map = new Map();
  arr.forEach((item, index) => {
    if (!map.has(item[u_key])) {
      map.set(item[u_key], item);
    }
  });
  return [...map.values()];
}

/**
 * 寻找数组中指定范围内的数字的个数
 * 
 * @param {Array} arr 目标数组
 * @param {Array} range 范围
 * 例如：arr = [1, 3, 5, 2, 6, 7, 10]; range = [0, 5]; 则此函数返回 3;
 */
export function findNumberWithRange(arr, range) {
  if (typeof range[0] == undefined) {
    range[0] = 0;
  }
  let i = 0;
  arr.find(item => {
    if (item >= range[0] && item < range[1]) {
      i++;
    }
  });
  return i;
}