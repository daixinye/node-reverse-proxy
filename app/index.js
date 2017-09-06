const http = require('http')
const config = require('../config/')

const middleware = [
  require('../middleware/log'),
  require('../middleware/proxy')
]

const server = http.createServer(function (req, res) {
  const ctx = {
    req,
    res,
    config
  }
  middleware.forEach(fn => fn.call({}, ctx))
})

server.listen(80)
