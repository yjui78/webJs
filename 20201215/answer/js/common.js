Vue.prototype.$axios = function(config) {
  return new Promise((resolve, reject) => {
    axios({
      method: config.method ? config.method : 'post',
      url: config.url ? config.url : '',
      data: config.data ? config.data : ''
    })
      .then(res => {
        console.log(config.data)
        resolve(res.data)
      })
      .catch(error => {
        // 请求失败，
        reject(error.data)
      })
  })
}
