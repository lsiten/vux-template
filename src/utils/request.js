import qs from 'qs'
import axios from 'axios'
import router from '../router'
import store from '../vuex'
import Configs from '../config/app'
import urlParse from 'url'
// import {getToken} from './app'

// axios 配置
axios.defaults.timeout = Configs.timeout
// 后台接口公共前缀
// axios.defaults.baseURL = '/api';
// 线上后台接口  http://api.hostdev.ennjoy.cn http://www.ennjoy.cn/YinKe
axios.defaults.baseURL = Configs.apiUrl + '/' + Configs.apiPrefix
axios.defaults.withCredentials = true

// POST传参序列化
axios.interceptors.request.use((config) => {
  // let oldData = config.data;
  if (store.state.user && store.state.user.token) {
    if (!config.data) {
      config.data = {}
    }
    // config.headers["Set-Cookie"] = "token:"+store.state.user.token;
  }
  if (config.method === 'post') {
    if (!config.headers['Content-Type']) {
      config.data = qs.stringify(config.data)
    } else {
      config.data = JSON.stringify(config.data)
    }
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  // let noParameters = config.url.indexOf('?') === -1
  // // config.headers['X-Token'] = getToken() //
  // config.url = noParameters ? config.url + '?access_token=' + getToken() : config.url + '&access_token=' + getToken()
  return config
}, (error) => {
  console.log('请求网络异常')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  let response = res.data
  if (parseInt(response.code) === 0) {
    return res
  } else if (parseInt(response.code) === 40001) {
    router.push({
      name: 'login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return res
}, (error) => {
  console.log('返回数据网络异常')
  let caches = JSON.parse(localStorage.getItem(Configs.cachePre)) || {}
  let cacheData = caches[urlParse.parse(error.config.url).path]
  if (cacheData) {
    return Promise.resolve({
      data: JSON.parse(cacheData)
    })
  } else {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // 后台返回的404
          router.push({
            name: '404'
          })
          break
        case 403:
          // 后台返回的403
          router.push({
            name: '403'
          })
      }
    }
    return Promise.reject(error)
  }
})

export default axios
