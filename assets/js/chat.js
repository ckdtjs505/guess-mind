export class Chat {
  constructor() {
    this.build();
    this.bindEventDefualt();
    this.bindEventSocket();
  }
  build() {
    this.message = document.getElementById("jsMessages");
    this.messageForm = document.getElementById("jsSendMsg");
    this.playerBoard = document.getElementById("jsPBoard");
  }

  bindEventDefualt() {
    // 메시지 보내기
    this.messageForm.addEventListener("submit", event => {
      // 새로고침 하지 않는다
      event.preventDefault();
      // input tag를 선택한다
      const input = this.messageForm.querySelector("input");
      // input 에 입력된 값을 가져온다
      const { value } = input;
      // 화면에 그려준다.
      this.messageInit(value);
      window.socket.emit("newMessage", input.value);
      input.value = "";
    });
  }

  bindEventSocket() {
    window.socket.on(window.global.SEND_MESSAGE, ({ message, nickName }) => {
      this.messageInit(message, nickName);
    });

    window.socket.on(window.global.UPDATE_USERBOARD, players => {
      this.playerBoard.innerText = "";
      players.forEach(player => {
        const elePlayerSpan = document.createElement("span");
        elePlayerSpan.innerText = `${player.nickName} : ${player.point}`;
        this.playerBoard.appendChild(elePlayerSpan);
      });
    });
  }

  messageInit(msg, nickName) {
    const msgBox = document.createElement("li");
    msgBox.innerHTML = `<span class="author ${nickName ? "out" : "self"}"> ${
      nickName ? nickName : "You"
    }  : ${msg}</span>`;
    this.message.appendChild(msgBox);
  }
}
