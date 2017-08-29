module.exports = function(ctx){
    let client_ip = ctx.req.connection.remoteAddress
    let referer = ctx.req.headers.referer
    let now = Date()

    console.log(now, client_ip, '=>', referer)
}