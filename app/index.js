const http = require('http')
const middleware = [
  require('../middleware/log'),
  require('../middleware/proxy')
]

const server = http.createServer(function (req, res) {
  const ctx = {
    req,
    res
  }
  middleware.forEach(fn => fn.call({}, ctx))
})

server
  .listen(80, function (e) {
    console.log('\n\r proxy server started \n\r')
  })
  .on('error', function (e) {
    console.log(
      'An error occured: proxy server cant start, please try "sudo nrp-cli start" again or checkout if port 80 is already used'
    )
  })
