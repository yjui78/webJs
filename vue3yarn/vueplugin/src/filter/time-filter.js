// YYYY-MM-dd格式不传的默认格式,双字母都是带0的
// YYYY 年份
// M 月份
// MM 补零月份
// d 日期
// dd 补零日期
// HH 小时
// h 补零小时
// mm分钟
// m 补零小时
// ss秒
// s 补零小时

// YMDHMS时间转换过滤器

export const time =(value,format='YYYY-MM-dd') => {
  let oDate =  new Date(value);
    function toDou(n){
        return n<10?`0${n}`:`${n}`
    }
    return format
    .replace(/YYYY/g,oDate.getFullYear())
    .replace(/MM/g,toDou(oDate.getMonth()+1))
    .replace(/M/g,oDate.getMonth()+1)
    .replace(/dd/g,toDou(oDate.getDate()))
    .replace(/d/g,oDate.getDate())
    .replace(/HH/g,toDou(oDate.getHours()))
    .replace(/H/g,oDate.getHours())
    .replace(/mm/g,toDou(oDate.getMinutes()))
    .replace(/m/g,oDate.getMinutes())
    .replace(/ss/g,toDou(oDate.getSeconds()))
    .replace(/s/g,oDate.getSeconds())
}

export const toLocalString = date => {
  return date ? new Date(date).toLocaleString() : date
}