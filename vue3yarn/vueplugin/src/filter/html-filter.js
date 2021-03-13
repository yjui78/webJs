/*
* HTML编译输出过滤器
*/
// 首字母大写
export const firstUpperCase = str => {
  return str ? str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : str
}

// 隐藏部分手机号
export const hidePhone = phoneNum => {
  phoneNum = phoneNum || ''
  if (phoneNum) {
    phoneNum = phoneNum.toString().replace(/\s*/g, '')
    return phoneNum === '' ? '' : phoneNum.replace(/(\d{3})\d{1,4}(\d{4})/g, '$1****$2')
  } else {
    return ''
  }
}