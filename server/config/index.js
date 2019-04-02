const Joi = require('Joi')
const CodeMap = require('./responseCode')
module.exports = {
  urlPre: 'http://10.8.10.130:9009',
  connect: {
    port: 3000,
    host: '0.0.0.0'
  },
  validate: {
    query: {
      limit: Joi.number().integer().min(1).default(10)
                .description('每页的条目数'),
      page: Joi.number().integer().min(1).default(1)
               .description('页码数')
    },
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  },
  response: {
    code: CodeMap.OK.code,
    msg: CodeMap.OK.message,
    body: {}
  }
}
