const GROUP_NAME = 'home'
const redirect = require('../config/map.json')
const config = require('../config/index')
const CodeMap = require('../config/responseCode')
const homeControllers = require('../controller/home')
module.exports = [
  {
    method: 'post',
    path: `/${GROUP_NAME}/addr`,
    handler: async (request, reply) => {
      let url = redirect.web_url + '?wx_addr=' + encodeURIComponent(redirect.wx_url) + '&weex_path=' + encodeURIComponent(redirect.entry_path)
      return url
    }
  },
  {
    method: 'get',
    path: `/${GROUP_NAME}/addr`,
    handler: async (request, reply) => {
      let data = JSON.parse(JSON.stringify(config.response))
      data.code = CodeMap.OK.code
      data.msg = CodeMap.OK.message
      try {
        let rData = await homeControllers.test()
        data.body = rData.body
        data.code = Number(rData.code) >= 0 ? rData.code : CodeMap.OK.code
        data.msg = rData.msg || CodeMap.OK.message
      } catch (e) {
        data.body = {}
        data.code = Number(e.errcode) >= 0 ? e.errcode : CodeMap.ERROR.code
        data.msg = e.message || CodeMap.ERROR.message
      }
      const response = reply.response(data)
      response.type('text/plain')
      response.header('content-type', 'application/json; charset=utf-8')
      return response
    }
  },
  {
    method: 'post',
    path: `/${GROUP_NAME}/test`,
    handler: async (request, reply) => {
      let data = JSON.parse(JSON.stringify(config.response))
      data.code = CodeMap.OK.code
      data.msg = CodeMap.OK.message
      try {
        let rData = await homeControllers.testData()
        data.body = rData.body
        data.code = Number(rData.code) >= 0 ? rData.code : CodeMap.OK.code
        data.msg = rData.msg || CodeMap.OK.message
      } catch (e) {
        data.body = {}
        data.code = Number(e.errcode) >= 0 ? e.errcode : CodeMap.ERROR.code
        data.msg = e.message || CodeMap.ERROR.message
      }
      const response = reply.response(data)
      response.type('text/plain')
      response.header('Access-Control-Allow-Origin', request.headers.origin || '*')
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      response.header('Access-Control-Allow-Methods', 'POST, PUT')
      response.header('Access-Control-Allow-Credentials', 'true')
      response.header('content-type', 'application/json; charset=utf-8')
      return response
    }
  },
  {
    method: 'get',
    path: `/${GROUP_NAME}/test`,
    handler: async (request, reply) => {
      let rData = ''
      try {
        rData = await homeControllers.getUser()
      } catch (e) {
        rData = 'error'
      }
      const response = reply.response(rData)
      response.type('text/plain')
      response.header('content-type', 'text/html; charset=utf-8')
      return response
    }
  }
]
