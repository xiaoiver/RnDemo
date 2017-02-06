/**
 * 获取时间戳距离当前时间有多久的文案
 *
 * @param {number} date 要处理的事件戳
 * @param {number} now 当前时间戳
 * @return {string} 事件间隔的文案
 */
export function formatDateToNow (date, now) {
  if (!date) {
    return ''
  }

  if (!now) {
    now = (new Date()).getTime()
  }

  var diff = now - date
  // error
  if (diff < 0) {
    return null
  }
  // 0-60s
  if (diff < 60000) {
    return '刚刚'
  }
  // 1-15min
  if (diff < 900000) {
    return Math.round(diff / 60000) + '分钟前'
  }
  // 16-30min
  if (diff < 1800000) {
    return '半小时前'
  }
  // 30-60min
  if (diff < 3600000) {
    return '1小时前'
  }
  // 1-24h
  if (diff < 86400000) {
    return Math.ceil(diff / 3600000) + '小时前'
  }
  // 1d-4d
  if (diff < 345600000) {
    return Math.ceil(diff / 86400000) + '天前'
  }
  // > 4d
  date = new Date(date)
  now = new Date(now)

  if (date.getFullYear() === now.getFullYear()) {
    return (date.getMonth() + 1) + '月' + date.getDate() + '日'
  }

  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
