const config = require('../config/index.js')

console.log(config.get('server2.local.com'))
config.set('server3.local.com', 8883)
console.log(config.get('server3.local.com'))
config.del('server3.local.com')
console.log(config.get('server3.local.com'))
