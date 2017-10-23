const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

module.exports = function ({ req, res }) {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../config.json'))
  )
  const hostname = req.headers.host

  let isNotExist = !new Set(Object.keys(config)).has(hostname)
  if (isNotExist) {
    let errtxt = 'An error occured: cant find config for ' + hostname
    res.end(errtxt)
    console.log(errtxt)
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
        if (e.errno === 'ECONNREFUSED') {
          let errtxt = `An error occured: cant access ${options.host}:${options.port}`
          res.end(errtxt)
          console.log(errtxt)
        }
      })
  )
}
