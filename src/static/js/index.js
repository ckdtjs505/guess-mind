"use strict";

// eslint-disable-next-line no-undef
var socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  console.log("Me : ".concat(message));
}

function setNickName(nickName) {
  socket.emit("setNickname", nickName);
}

function handleMessageNotif(data) {
  var message = data.message,
      nickName = data.nickName;
  console.log("".concat(nickName, " : ").concat(message));
}

socket.on("messageNotif", handleMessageNotif);