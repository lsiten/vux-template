const fetchs = require('../api')

module.exports = {
  /* 获取图片上传的signature */
  com_test (params) {
    return fetchs.fetch_json('/aed-console/mainPage/country/getMainTradeByASEAN', params)
  }
}
