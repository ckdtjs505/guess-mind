"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessageNotif = handleMessageNotif;

function handleMessageNotif(data) {
  var message = data.message,
      nickName = data.nickName;
  console.log("".concat(nickName, " : ").concat(message));
}
"use strict";

var _chat = require("./chat");

// eslint-disable-next-line no-undef
var socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", message);
  console.log("Me : ".concat(message));
}

function setNickName(nickName) {
  socket.emit("setNickname", nickName);
}

socket.on("messageNotif", _chat.handleMessageNotif);