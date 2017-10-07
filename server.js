var express = require('express');
var app = express();
var port = 3000;
var routes = require('./routes')

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use('/',routes)
var io = require('socket.io').listen(
    app.listen(port, function(){
        console.log('server listenning on port : '+port);
    })
);
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
})