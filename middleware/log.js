const moment = require('moment')

module.exports = function (ctx) {
  let clientIP = ctx.req.connection.remoteAddress
  let referer = ctx.req.headers.referer || ctx.req.headers.host
  let now = moment().format('YYYY/MM/DD HH:MM:SS')
  console.log('%s : %s visited %s', now, clientIP.slice(7), referer)
}
