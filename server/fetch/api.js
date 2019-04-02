const axios = require('axios')
const qs = require('qs')
const configs = require('../config/index')
// axios 配置
axios.defaults.timeout = 60000 * 3
// 后台接口公共前缀
// axios.defaults.baseURL = '/api';
// 线上后台接口  http://api.hostdev.ennjoy.cn http://www.ennjoy.cn/YinKe
// axios.defaults.baseURL = 'http://10.19.40.2:9009'
// axios.defaults.baseURL = 'http://10.8.10.130:8088'
// axios.defaults.baseURL = 'http://10.8.10.41:9009'
// axios.defaults.baseURL = 'http://10.8.10.41:9009'
axios.defaults.baseURL = configs.urlPre
axios.defaults.withCredentials = false

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    if (!config.headers['Content-Type']) { config.data = qs.stringify(config.data) } else { config.data = JSON.stringify(config.data) }
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return config
}, (error) => {
  console.log('请求网络异常')
  return Promise.reject(error)
})

const fetch = function fetch (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, headers).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

const fetch_json = function  (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    }}).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

const dowload_json = function  (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'arraybuffer'}).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

module.exports = {
  fetch,
  fetch_json,
  dowload_json
}
