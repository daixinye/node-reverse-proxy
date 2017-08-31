const config = require('./config/')
const process = require('process')
const chalk = require('chalk')

let command = process.argv[2]
switch (command) {
case 'get':
  var hostname = process.argv[3]
  if (typeof hostname == 'undefined')
    return console.log(chalk.red('error: need argument HOSTNAME'))
  console.log(chalk.green(config.get(hostname)))
  break;

case 'getall':
  console.log(config.get('*'))
  break

case 'set':
  var hostname = process.argv[3],
    port = process.argv[4]
  if (typeof hostname == 'undefined')
    return console.log(chalk.red('error: need argument HOSTNAME'))
  if (typeof port == 'undefined')
    return console.log(chalk.red('error: need argument PORT'))
  config.set(hostname, port)
  console.log(chalk.green('OK'))
  break

case 'setDefault':
  var port = process.argv[3]
  if (typeof port == 'undefined')
    return console.log(chalk.red('error: need argument PORT'))
  config.set('DEFAULT', port)
  console.log(chalk.green('OK'))
  break

case 'del':
  var hostname = process.argv[3]
  if (typeof hostname == 'undefined')
    return console.log(chalk.red('error: need argument HOSTNAME'))
  config.del(hostname)
  console.log(chalk.green('OK'))
  break
default:
  console.log(chalk.red('error: invalid command'))
}
