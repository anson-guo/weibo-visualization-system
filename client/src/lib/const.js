/**
 * 公共数据
 */

/**
 * 数字星期映射到对应的文字
 * 
 * @param {number} weeknum 数字 0 - 6 分别映射为星期天-星期六
 */
export function mapWeek(weeknum) {
  let weekString = '';
  switch (+weeknum) {
    case 0:
      weekString = '星期天'
      break;
    case 1:
      weekString = '星期一'
      break;
    case 2:
      weekString = '星期二'
      break;
    case 3:
      weekString = '星期三'
      break;
    case 4:
      weekString = '星期四'
      break;
    case 5:
      weekString = '星期五'
      break;
    case 6:
      weekString = '星期六'
      break;
  }
  return weekString;
}

/**
 * 数字月份映射到对应的文字
 * 
 * @param {number} month 数字 0 - 1 分别映射为一月-十二月
 */
export function mapMonth(month) {
  let monthString = '';
  switch (+month) {
    case 0:
      monthString = '一月'
      break;
    case 1:
      monthString = '二月'
      break;
    case 2:
      monthString = '三月'
      break;
    case 3:
      monthString = '四月'
      break;
    case 4:
      monthString = '五月'
      break;
    case 5:
      monthString = '六月'
      break;
    case 6:
      monthString = '七月'
      break;
    case 7:
      monthString = '八月'
      break;
    case 8:
      monthString = '九月'
      break;
    case 9:
      monthString = '十月'
      break;
    case 10:
      monthString = '十一月'
      break;
    case 11:
      monthString = '十二月'
      break;
  }
  return monthString;
}

/**
 * 数字映射到对应的文字 描述粉丝或者关注人数范围时使用
 * 
 * @param {number} range 
 */
export function mapNumberRange(num) {
  let rangeString = '';
  switch (+num) {
    case 3:
      rangeString = '小于3人';
      break;
    case 10:
      rangeString = "3-9人";
      break;
    case 100:
      rangeString = "10-99人";
      break;
    case 500:
      rangeString = "100-499人";
      break;
    case 1000:
      rangeString = "500-999人";
      break;
    case 5000:
      rangeString = "1000-4999人";
      break;
    case 10000:
      rangeString = "5000-9999人";
      break;
    case 20000:
      rangeString = "10000-19999人";
      break;
    case 50000:
      rangeString = "20000-49999人";
      break;
    case 100000:
      rangeString = "50000人以上";
      break;
  }
  return rangeString;
}

/**
 * 粉丝认证映射关系
 * 
 * @parma {number} verified_type
 * 
 * 参考链接：https://gist.github.com/chen206/7260648
 */
export function mapFanVerified(verified_type) {
  let verifiedString = '';
  switch (+verified_type) {
    case -1:
      verifiedString = "普通用户";
      break;
    case 200:
      verifiedString = "初级达人";
      break;
    case 220:
      verifiedString = "中级达人";
      break;
    case 400:
      verifiedString = "已故V用户";
      break;
    case 0:
      verifiedString = "个人";
      break;
    case 1:
      verifiedString = "政府";
      break;
    case 2:
      verifiedString = "企业";
      break;
    case 3:
      verifiedString = "媒体";
      break;
    case 4:
      verifiedString = "校园";
      break;
    case 5:
      verifiedString = "网站";
      break;
    case 6:
      verifiedString = "应用";
      break;
    case 7:
      verifiedString = "团体（机构）";
      break;
  }
  return verifiedString;
}
