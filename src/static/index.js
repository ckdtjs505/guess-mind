// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  return true;
}
