const message = document.getElementById("jsMessages");
const messageForm = document.getElementById("jsSendMsg");

const messageInit = (msg, nickName) => {
  const msgBox = document.createElement("li");
  msgBox.innerHTML = `<span class="author ${nickName ? "out" : "self"}"> ${
    nickName ? nickName : "You"
  }  : ${msg}</span>`;
  message.appendChild(msgBox);
};

// 사용자가 입력한 값을 핸들링
const handleMessageForm = e => {
  // 새로고침 하지 않는다
  e.preventDefault();
  // input tag를 선택한다
  const input = messageForm.querySelector("input");
  // input 에 입력된 값을 가져온다
  const { value } = input;
  // 화면에 그려준다.
  messageInit(value);
  window.socket.emit("newMessage", input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleMessageForm);

window.socket.on("messageNotif", ({ message, nickName }) => {
  messageInit(message, nickName);
});
