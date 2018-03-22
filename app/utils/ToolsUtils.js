'use strict'
import { Platform } from 'react-native'

const DeviceInfo = require('react-native-device-info-hfjy')

/***
 * 验证手机号码
 * @param phone
 * @returns {*}
 * @constructor
 */
export function VerifyPhone (phone) {
  const rex = new RegExp('^1[3,4,5,7,8][0-9]{9}$', 'g')
  return rex.test(phone)
}

/***
 * 判断值是为空
 * @param Value
 * @returns {boolean}
 */
export function isEmpty (Value) {
  return !(Value !== null && Value !== undefined && Value !== '')
}

/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * @param Value
 * @returns {boolean}
 */
export function isEmptyObject (Value) {
  for (const name in Value) {
    return false
  }
  return true
}

/**
 * 检查是否是对像
 * @param Value
 * @returns {boolean}
 */
export function isObject (Value) {
  if (Value === null) {
    return false
  }

  return (typeof Value) === 'object'
}

/**
 * 去掉空格
 * @param str
 * @returns {*}
 */
export function delTrim (str) {
  return str.replace(/(^\s+)|(\s+$)/g, '')
}

/**
 *获得是ios:phone,pad, android :phone,pad
 * @return {number}
 */
export function platform () {
  if ((Platform.OS === 'android')) {
    if (DeviceInfo.isTablet()) {
      return 3
    } else {
      return 1
    }
  } else if (Platform.OS === 'ios') {
    if (DeviceInfo.isTablet()) {
      return 4
    } else {
      return 2
    }
  }
}

/***
 * 获得不带扩展名的文件名
 * @param FilePath
 * @returns {*|string}
 */
export function getFileNameNoExt (FilePath) {
  let fileName = FilePath.substring(FilePath.lastIndexOf('/') + 1, FilePath.length)
  fileName = fileName.substring(0, fileName.lastIndexOf('.'))
  return fileName
}

/***
 * 获得随机数
 * @returns {string}
 */
export function getDateTimerandom () {
  return new Date().getTime().toString(32) + parseInt(Math.random() * 10000)
}

export function toArray (list) {
  if (!(list instanceof Array)) {
    try {
      list = JSON.parse(list)
    } catch (ex) {
      list = []
    }
  }
  return list
}

export function getRegExp () {
  return {
    'isPhone': /^\d{11}$/,
    'passwordRules': /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&$*])|(?=.*\d)(?=.*[#@!~%^&$*]))[a-z\d#@!~%^&$*]{6,20}/i,
    'hasPhone': '手机号码不能为空！',
    'phoneLength': '手机号码为11位！',
    'phone': '手机号码格式不正确！',
    'password': '请输入6-20位密码，必须包含字母和数字！',
    'userName': '请输入您的中文或英文姓名！',
    'registerCode': '请输入4位短信验证码!',
    'agreement': '请勾选《海风教育用户协议》'
  }
}