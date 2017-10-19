const http = require('http')
const Config = require('../config/')
const Output = require('../lib/output')
const middleware = [
  require('../middleware/log'),
  require('../middleware/proxy')
]

const output = new Output()
const config = new Config()

const server = http.createServer(function (req, res) {
  const ctx = {
    req,
    res,
    config
  }
  middleware.forEach(fn => fn.call({}, ctx))
})

server
  .listen(80, function (e) {
    output.success('server started')
  })
  .on('error', function (e) {
    output.error(
      'server started failed, please try "sudo nrp-cli start" again or checkout if there is something using port 80'
    )
  })
