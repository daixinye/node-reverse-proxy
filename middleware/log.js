module.exports = function (ctx) {
  let clientIP = ctx.req.connection.remoteAddress
  let referer = ctx.req.headers.referer
  let now = Date()

  console.log(now, clientIP, '=>', referer)
}
