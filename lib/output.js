const chalk = require('chalk')

class Output {
  constructor () {}

  success (message) {
    console.log(chalk.green(message || 'OK'))
  }

  error (message) {
    console.log(chalk.red('ERROR: ') + message)
  }
}

module.exports = Output
