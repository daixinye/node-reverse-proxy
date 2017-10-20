const Config = require('./config/')
const Output = require('./lib/output')
const process = require('process')

let output = new Output()
let config = new Config()
let command = process.argv[2]

switch (command) {
  case 'get':
    var hostname = process.argv[3]
    if (typeof hostname === 'undefined') {
      output.success(
        config.get('*').toString() ||
          'No configruation found, use "nrp-cli set HOSTNAME PORT" to add a configruation'
      )
    } else {
      output.success(config.get(hostname))
    }
    break

  case 'set':
    var hostname = process.argv[3],
      port = process.argv[4]
    if (typeof hostname === 'undefined') {
      return output.error('need argument HOSTNAME')
    }
    if (typeof port === 'undefined') {
      return output.error('need argument PORT')
    } else if (Number.isNaN(Number(port))) {
      return output.error('PORT should be a number')
    }
    config.set(hostname, port)
    output.success()
    break

  case 'setDefault':
    var port = process.argv[3]
    if (typeof port === 'undefined') {
      return output.error('need argument PORT')
    } else if (Number.isNaN(Number(port))) {
      return output.error('PORT should be a number')
    }
    config.set('DEFAULT', port)
    output.success()
    break

  case 'del':
    var hostname = process.argv[3]
    if (typeof hostname == 'undefined')
      return output.error('need argument HOSTNAME')
    config.del(hostname)
    output.success()
    break

  case 'start':
    require('./app/index.js')
    break

  default:
    output.error('invalid command')
}
