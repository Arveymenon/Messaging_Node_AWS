
const process = require('./../nodemon.json')
const messaging = require('./../controllers/messages')


var port = process.env.SOCKET_PORT;

let io = require('socket.io').listen(port);

const connect = (app)=>{


    console.log('initializing socket connections')


    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('send-message', (message) => {
            // fire a query 
            messaging.updateMessage(message, (res)=>{
                console.log('response from db',res)
                io.emit('message', res);
            })
        });
    })

    app.on('exit', function(){
        app.stop()
    })
    app.on('error', function(){
        app.stop()
    })
    // app.listen(port, function(){
    //     // console.log('listening in https://ns100.idgafgroup.com:' + port);
    //     console.log(port)
    // });
}


module.exports = connect
