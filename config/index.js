const config = require('./config')
const fs = require('fs')

module.exports = {
  get: function (hostname) {
    return hostname == '*' ? config : config[hostname] || null
  },
  set: function (hostname, port) {
    config[hostname] = port.toString()
    return fs.writeFileSync(
      './config/config.json',
      JSON.stringify(config, null, 4)
    )
  },
  del: function (hostname) {
    delete config[hostname]
    return fs.writeFileSync(
      './config/config.json',
      JSON.stringify(config, null, 4)
    )
  }
}
