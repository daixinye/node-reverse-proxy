#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
var config = require('./config.json')

program.version('2.0.0')

// commands
program
  .command('start')
  .description('Start the proxy server')
  .action(function () {
    require('./app')
  })

program
  .command('ls')
  .description('List all the configs')
  .action(ls)

program
  .command('add <hostname> <port>')
  .description('Add a config')
  .action(add)

program
  .command('set <hostname> <port>')
  .description('Set an existed config')
  .action(set)

program
  .command('del <hostname>')
  .description('Delete an existed config')
  .action(del)

program.parse(process.argv)

if (process.argv.length === 2) {
  program.outputHelp()
}

// actions
function ls () {
  var output = '\n\r'
  Object.keys(config).forEach(function (hostname) {
    var port = config[hostname]
    output += line(hostname) + port + '\n\r'
  })
  console.log(output === '\n\r' ? 'no config found' : output)
}

function add (hostname, port) {
  var isExist = new Set(Object.keys(config)).has(hostname)
  if (isExist) {
    return error('hostname %s already exists', hostname)
  }
  var isNaN = Number.isNaN(+port)
  if (isNaN) {
    return error('port %s should be a number', port)
  }
  var isPortUsed = new Set(
    Object.keys(config).map(hostname => config[hostname])
  ).has(+port)
  if (isPortUsed) {
    return error('port %s is already used', port)
  }

  config[hostname] = +port
  save(config)
}

function set (hostname, port) {
  var isNotExist = !new Set(Object.keys(config)).has(hostname)
  if (isNotExist) {
    return error('hostname %s not exists', hostname)
  }
  var isNaN = Number.isNaN(+port)
  if (isNaN) {
    return error('port %s should be a number', port)
  }
  var is80 = +port === 80
  if (is80) {
    return error('port should not be 80')
  }

  config[hostname] = +port
  save(config)
}

function del (hostname) {
  var isNotExist = !new Set(Object.keys(config)).has(hostname)
  if (isNotExist) {
    return error('hostname %s not exists', hostname)
  }

  delete config[hostname]
  save(config)
}

// helpers
function line (str) {
  str = String(str)
  return (
    str + ' ' + Array(20 - str.length > 0 ? 20 - str.length : 1).join('-') + ' '
  )
}

function error () {
  arguments[0] = '\n\r An error occured: ' + arguments[0]
  Array.prototype.push.call(arguments, '\n\r')
  console.log.apply(null, arguments)
}

function save (config) {
  var isNotObj = typeof config !== 'object'
  if (isNotObj) {
    return error('variable config should be a json object')
  }
  return fs.writeFileSync(
    path.resolve(__dirname, './config.json'),
    JSON.stringify(config, null, 2)
  )
}
