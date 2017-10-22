const http = require('http')
const fs = require('fs')

fs.writeFileSync(
  './config.json',
  JSON.stringify(
    {
      'hostname1.example.com': 6666
    },
    null,
    2
  )
)

http
  .createServer(function (req, res) {
    res.end('its server 6666')
  })
  .listen(6666)
