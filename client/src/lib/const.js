/**
 * 公共数据
 */

/**
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