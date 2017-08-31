const http = require('http')
const config = require('../config/')
const redis = require('redis')
const db = redis.createClient(6379, '127.0.0.1', {})

const middleware = [
  require('../middleware/log'),
  require('../middleware/cookie'),
  require('../middleware/proxy')
]

const server = http.createServer(function (req, res) {
  const ctx = {
    req,
    res,
    config,
    db
  }
  middleware.forEach(fn => fn.call({}, ctx))
})

server.listen(80)
