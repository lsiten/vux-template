import request from '../utils/request'
import app from '../config/app'

export default function fetch (url, params, headers, isCache = false) {
  return new Promise((resolve, reject) => {
    request.post(url, params, headers).then(response => {
      if (isCache) {
        let caches = JSON.parse(localStorage.getItem(app.cachePre)) || {}
        caches[url] = JSON.stringify(response.data)
        localStorage.setItem(app.cachePre, JSON.stringify(caches))
      }
      resolve(response.data)
    }, err => {
      if (isCache) {
        let data = localStorage.getItem(app.cachePre)
        data && data[url] && resolve(JSON.parse(data[url]))
      } else {
        reject(err)
      }
    }).catch((error) => {
      if (isCache) {
        let data = localStorage.getItem(app.cachePre)
        data && data[url] && resolve(JSON.parse(data[url]))
      } else {
        reject(error)
      }
    })
  })
}
