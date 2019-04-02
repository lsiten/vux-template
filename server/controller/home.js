const api = require('../fetch/modules/home')
const CodeMap = require('../config/responseCode')
module.exports = {
  test: async () => {
    let responseData = {}
    try {
      let requestData = {}
      let ieFlag = '0'
      let timeType = '201808'
      requestData = await api.com_test({
        ieFlag: ieFlag,
        timeType: timeType
      })
      responseData.body = requestData.body || {}
      responseData.code = requestData.errcode || CodeMap.ERROR.code
      responseData.msg = requestData.message || CodeMap.ERROR.message
    } catch (e) {
      responseData.code = CodeMap.ERROR.code
      responseData.msg = CodeMap.ERROR.message
      responseData.body = {}
    }
    return responseData
  },
  testData: async () => {
    return {
      body: {},
      code: CodeMap.OK.code,
      msg: CodeMap.OK.message
    }
  }
}
