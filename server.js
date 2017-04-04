var server = require('http').createServer();
var url = require('url');
var path = require('path');
var express = require('express');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });

var app = express();
var port = 3003;

app.use("/public", express.static(path.join(__dirname, 'public')));

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        wss.broadcast(message);
    });
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });