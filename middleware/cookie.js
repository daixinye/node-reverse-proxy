

module.exports = function({req,db}){
    // 记录ip 和 cookie
    let client_ip = req.connection.remoteAddress
    
    // 如果是本地IP，先存到node-reverseproxy:local上
    if(client_ip == '::ffff:127.0.0.1'){
        db.set('node-reverse-proxy:::0.0.0.0', JSON.stringify(req.headers), (err,val)=> err&&console.log(err))
    }else{
        // 如果是非本地IP，headers 存到node-reverse-proxy:ip 上
        db.set(['node-reverse-proxy',client_ip].join(':'),JSON.stringify(req.headers), (err, val)=> err&&console.log(err))
    }
}