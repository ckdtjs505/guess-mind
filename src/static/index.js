// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  return true;
}

function handleMessageNotif(message) {
  console.log("message : " + message);
}

socket.on("messageNotif", handleMessageNotif);
