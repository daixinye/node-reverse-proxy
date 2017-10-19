const path = require('path')
const fs = require('fs')

class Config {
  constructor () {
    this.configPath = path.resolve(__dirname, 'config.json')
    try {
      this.config = require(this.configPath)
    } catch (e) {
      fs.writeFileSync(this.configPath, JSON.stringify({}, null, 4))
      this.config = {}
    }

    this.config.toString = function () {
      let string = ''

      for (let key in this) {
        if (typeof this[key] !== 'function') {
          string += `${key} => 127.0.0.1:${this[key]} \n\r`
        }
      }
      return string
    }
  }

  get (hostname) {
    return hostname === '*' ? this.config : this.config[hostname] || null
  }

  set (hostname, port) {
    this.config[hostname] = port.toString()
    return fs.writeFileSync(
      this.configPath,
      JSON.stringify(this.config, null, 4)
    )
  }

  del (hostname) {
    delete this.config[hostname]
    return fs.writeFileSync(
      this.configPath,
      JSON.stringify(this.config, null, 4)
    )
  }
}

module.exports = Config
