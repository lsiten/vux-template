import fetch from '../api'
export default {
  /* 获取图片上传的signature */
  getSignature (params) {
    return fetch('http://api.hostdev.ennjoy.cn/YinKe/Api/public/UploadFile/Policy', params)
  }
}
