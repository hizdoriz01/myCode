var io = require('socket.io-client');

var eventToListenTo = 'event'
var room = 'room'
var socketUrl = 'socket url'
var socket = io(socketUrl);


socket.on('connect', function() {
    socket.emit('subscribe', room);
    console.log('connect socket to '+socketUrl);
})

socket.on(eventToListenTo, function(data) {
    
})
