var socket = io();

function promptForName() {
  var name = prompt("Please enter your name");
  while (!name) {
    alert("Please enter a valid name.");
    name = prompt("Please enter your name");
  }
  socket.emit('joining msg', name);
  return name;
}

var name = promptForName();

$('form').submit(function (e) {
  e.preventDefault();
  var message = name + ': ' + $('#message-input').val();
  socket.emit('chat message', message);
  // $('#messages').append($('<li class="list-group-item text-right">').text('You: ' + $('#message-input').val()));
  $('#message-input').val('');
});

socket.on('chat message', function (msg) {
  var isJoinedMessage = msg.indexOf('joined the chat.') !== -1;
  var isOwnMessage = msg.indexOf(name) !== -1;
  var messageClass = isJoinedMessage ? 'joined-message' : (isOwnMessage ? 'text-right' : 'text-left');
  $('#messages').append($('<li class="list-group-item ' + messageClass + '">' + msg + '</li>'));
});
