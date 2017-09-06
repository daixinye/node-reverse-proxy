const path = require('path')
const fs = require('fs')

let configPath = path.resolve(__dirname, 'config.json')
try {
  var config = require(configPath)
} catch (e) {
  fs.writeFileSync(configPath, JSON.stringify({}, null, 4))
  config = {}
}

module.exports = {
  get: function (hostname) {
    return hostname === '*' ? config : config[hostname] || null
  },
  set: function (hostname, port) {
    config[hostname] = port.toString()
    return fs.writeFileSync(configPath, JSON.stringify(config, null, 4))
  },
  del: function (hostname) {
    delete config[hostname]
    return fs.writeFileSync(configPath, JSON.stringify(config, null, 4))
  }
}
