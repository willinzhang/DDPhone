import React from 'react'
import ToolsUtils from './ToolsUtils'

/***
 * 获当前本地时间
 */
export function getCurrentDateTime () {
  let dateCurrentDateTime = new Date()
  return dateCurrentDateTime.toLocaleString()
}

/***
 * 获当前本地时间，秒，毫秒
 * @returns {string}
 */
export function getCurrentDateTimeSecondsMilliseconds () {
  let dateCurrentDateTime = new Date()
  return dateCurrentDateTime.toLocaleString() + ' ' + dateCurrentDateTime.getSeconds() + ':' + dateCurrentDateTime.getMilliseconds()
}

/***
 * 获得时间
 * @param timeStyle
 * @returns {*}
 */
export function getformatDataTime (timeStyle) {
  const moment = require('moment')
  // 如：moment().format("YYYY-MM-DD HH:mm:ss");
  return moment().format(timeStyle)
}

/***
 * 获得
 * 今天： 12:22
 * 昨天：昨天
 * 前天之前：5-23
 * @returns {*}
 * @param dateTime
 */
export function getTopicsNeedTime (dateTime) {
  if(!dateTime)return ''
  //时间戳
  const newDate = new Date()
  newDate.setTime(dateTime)
  let format = 'YYYY-MM-dd hh:mm:ss'

  const Today = new Date()
  const Yesterday = new Date()
  Yesterday.setTime(Yesterday.getTime() - 24 * 60 * 60 * 1000)

  if (newDate.toDateString() === Today.toDateString()) {
    //今天
    format = 'hh:mm'
  } else if (newDate.toDateString() === Yesterday.toDateString()) {
    //昨天
    format = '昨天'
  } else {
    format = 'MM-dd'
  }

  const date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

/***
 * 获得
 * 今天:11:12
 * 昨天:昨天 11:12
 * 前天之前:2017-3-5 11:34
 * @returns {*}
 * @param dateTime
 */
export function getIMNeedTime (dateTime, lastDataTime) {
  if (lastDataTime === null) {
  } else {
    const difference = dateTime.toString().substr(0, 10) - lastDataTime.toString().substr(0, 10)
    if (difference <= 60) {
      return null
    }
  }

  const newDate = new Date()
  newDate.setTime(dateTime)
  let format = 'YYYY-MM-dd hh:mm'

  const Today = new Date()
  const Yesterday = new Date()
  Yesterday.setTime(Yesterday.getTime() - 24 * 60 * 60 * 1000)

  if (newDate.toDateString() === Today.toDateString()) {
    //今天
    format = 'hh:mm'
  } else if (newDate.toDateString() === Yesterday.toDateString()) {
    //昨天
    format = '昨天 hh:mm'
  } else {
    format = 'YYYY-MM-dd hh:mm'
  }

  const date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

/***
 * 获得
 * 今天:11:12
 * 昨天:11:12
 * 前天之前:2017-3-5 11:34
 * @returns {*}
 * @param dateTime
 */
export function getforMessageNeedTime (dateTime) {
  const newDate = new Date()
  newDate.setTime(dateTime)
  let format = 'YYYY-MM-dd hh:mm:ss'

  const Today = new Date()
  const Yesterday = new Date()
  Yesterday.setTime(Yesterday.getTime() - 24 * 60 * 60 * 1000)

  if (newDate.toDateString() === Today.toDateString()) {
    //今天
    format = 'hh:mm:ss'
  } else if (newDate.toDateString() === Yesterday.toDateString()) {
    //昨天
    format = '昨天 hh:mm:ss'
  } else {
    format = 'YYYY-MM-dd hh:mm:ss'
  }

  const date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

/***
 * 获得星期
 * @param dateTime
 * @returns {*}
 */
export function getWeekStr (dateTime) {
  if (dateTime.length === 0) {
    return
  }
  let Week = null
  dateTime = dateTime.replace(/-/g, '/')
  const Day = new Date(dateTime).getDay()
  switch (Day) {
    case 0:
      Week = stringValues.s1007
      break
    case 1:
      Week = stringValues.s1001
      break
    case 2:
      Week = stringValues.s1002
      break
    case 3:
      Week = stringValues.s1003
      break
    case 4:
      Week = stringValues.s1004
      break
    case 5:
      Week = stringValues.s1005
      break
    case 6:
      Week = stringValues.s1006
      break
    default:
      Week = stringValues.s1007
      break
  }
  return Week
}

/**
 * 获得月份
 * @param dateTime
 */
export function getMonth (dateTime) {
  if (dateTime.length === 0 || ToolsUtils.isEmpty(dateTime)) {
    return
  }
  dateTime = dateTime.replace(/-/g, '/')
  const month = new Date(dateTime).getMonth()
  return month + 1
}

/**
 * 获得两位数年份
 * @param dateTime
 * @returns {number}
 */
export function getYear (dateTime) {
  if (dateTime.length === 0) {
    return
  }
  dateTime = dateTime.replace(/-/g, '/')
  return new Date(dateTime).getYear()
}

/**
 * 时间戳格式化时间
 * @param dateTime , format
 * @param format
 * @returns {string}
 */
export function dateFormar (dateTime, format) {
  if (dateTime) {
    const newDate = new Date()
    newDate.setTime(dateTime)
    const date = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds(),
      'q+': Math.floor((newDate.getMonth() + 3) / 3),
      'S+': newDate.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  }
}

export function getYerMonth (value) {
  let m = value.split('.')
  if (m[1].indexOf('0') === 0) {
    m[1] = m[1].substring(1)
  }
  return m[0] + '年 ' + m[1] + '月'
}

/**
 * 时间戳转星期
 * @param dateTime , format
 * @returns {string}
 */
export function getWeek (dateTime) {
  if (dateTime) {
    let week
    const newDate = new Date()
    newDate.setTime(dateTime)
    switch (newDate.getDay()) {
      case 0:
        week = '周日'
        break
      case 1:
        week = '周一'
        break
      case 2:
        week = '周二'
        break
      case 3:
        week = '周三'
        break
      case 4:
        week = '周四'
        break
      case 5:
        week = '周五'
        break
      case 6:
        week = '周六'
        break
    }
    return week
  }
}

export function halfHourDate (dateTime,nowDate) {
  if (dateTime) {
    const newDate = new Date()
    newDate.setTime(dateTime)
    const halfHourDate = newDate - 1000 * 60 * 30 - nowDate
    const nowTime = nowDate === 0
      ? new Date().getTime()
      : new Date().getTime()

    if (halfHourDate < nowTime) {
      return true
    } else {
      return false
    }
  }
}

export function sameDate (dateTime) {
  if (dateTime) {
    let newDateStr
    let todayStr
    const newDate = new Date()
    newDate.setTime(dateTime)
    newDateStr = dateFormar(newDate, 'yyyy-MM-dd')
    todayStr = dateFormar(new Date(), 'yyyy-MM-dd')

    if (newDateStr === todayStr) {
      return true
    } else {
      return false
    }
  }
}

export function comparisonDate (dateTime) {
  if(dateTime){
    const newDate = new Date()
    newDate.setTime(dateTime)
    if (newDate < new Date()){
      return true  // 早于现在时间
    }else {
      return false // 晚于现在时间
    }
  }
}

export function formatToDate (formatDate) {
  let dateStr = formatDate.replace('年','/').replace('月','/').replace('日','')
  return new Date(Date.parse(dateStr))
}

export function dateToTimestamp (dateTime) {
  return Date.parse(dateTime)
}


