import fetch from '../api'
export default {
  /* 获取图片上传的signature */
  getSignature (params) {
    return fetch('/home/test', params, null, true)
  }
}
