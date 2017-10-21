const program = require('commander')

program.version('2.0.0')

// commands definition
program.command('list').action(list)

program.command('add <hostname> <port>').action(add)

program.command('set <hostname> <port>').action(set)

program.command('del <hostname>').action(del)

program.parse(process.argv)

// actions
function list () {}

function add (hostname, port) {}

function set (hostname, port) {}

function del (hostname, port) {}
