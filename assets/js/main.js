import { handleMessageNotif } from "./chat";

// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  console.log(`Me : ${message}`);
}

function setNickName(nickName) {
  socket.emit("setNickname", nickName);
}

socket.on("messageNotif", handleMessageNotif);
