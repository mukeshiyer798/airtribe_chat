var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    const name = socket.name;
    if (name) {
      const leftMessage = `${name} left the chat.`;
      io.emit('chat message', leftMessage);
    }
  });

  socket.on('joining msg', function (userName) {
    socket.name = userName;
    const joinedMessage = `${userName} joined the chat.`;
    io.emit('chat message', joinedMessage);
  });

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

});

server.listen(3000, () => {
  console.log('Server listening on :3000');
});
