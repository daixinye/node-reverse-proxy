const http = require('http')
const url = require('url')
const net = require('net')

const config = require('../config/')

const server = http.createServer(function (req, res) {

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

    req.pipe(http.request(options, response => {
        res.writeHead(response.statusCode, response.headers)
        response.pipe(res)
    }).on('error', e => {
        console.log(e)
    }))
})

server.listen(80)