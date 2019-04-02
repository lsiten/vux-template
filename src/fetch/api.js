import request from '../utils/request'

export default function fetch (url, params, headers) {
  return new Promise((resolve, reject) => {
    request.post(url, params, headers).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}
