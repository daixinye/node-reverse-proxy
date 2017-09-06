const http = require('http')

http
  .createServer(function (req, res) {
    res.end('its server 8881')
  })
  .listen(8881)

http
  .createServer(function (req, res) {
    res.end('its server 8882')
  })
  .listen(8882)
