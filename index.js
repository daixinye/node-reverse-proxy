const config = require('./config/')
const process = require('process')

let command = process.argv[2]
switch(command){
    case 'get':
        var hostname = process.argv[3]
        if(typeof hostname == 'undefined')
            return console.log('error: need argument HOSTNAME')
        console.log(config.get(hostname))
        break;
    case 'getall':
        console.log(config.get('*'))
        break
    case 'set':
        var hostname = process.argv[3],
            port = process.argv[4]
        if(typeof hostname == 'undefined')
            return console.log('error: need argument HOSTNAME')
        if(typeof port == 'undefined')
            return console.log('error: need argument PORT')
        config.set(hostname, port)
        break
    case 'del':
        var hostname = process.argv[3]
        if(typeof hostname == 'undefined')
            return console.log('error: need argument HOSTNAME')
        config.del(hostname)
        break
    default:
        console.log('error: invalid command')
}