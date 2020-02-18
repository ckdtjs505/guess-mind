// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  console.log(`Me : ${message}`);
}

function setNickName(nickName) {
  socket.emit("setNickname", nickName);
}

function handleMessageNotif(data) {
  const { message, nickName } = data;
  console.log(`${nickName} : ${message}`);
}

socket.on("messageNotif", handleMessageNotif);
