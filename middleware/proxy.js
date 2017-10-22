const http = require('http')
const url = require('url')
const config = require('../config.json')

module.exports = function ({ req, res }) {
  const hostname = req.headers.host

  let isNotExist = !new Set(Object.keys(config)).has(hostname)
  if (isNotExist) {
    res.end('An error occured: cant find config for ' + hostname)
    console.log('An error occured: cant find config for ' + hostname)
    return
  }

  const port = config[hostname]

  let options = {
    host: '127.0.0.1',
    port: port,
    method: req.method,
    headers: req.headers,
    path: url.parse(req.url).path
  }

  req.pipe(
    http
      .request(options, response => {
        res.writeHead(response.statusCode, response.headers)
        response.pipe(res)
      })
      .on('error', e => {
        console.log(e)
      })
  )
}
