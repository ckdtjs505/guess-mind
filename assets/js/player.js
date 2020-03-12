import { Chat } from "./chat";
import { Canvas } from "./canvas";

export class Player {
  constructor() {
    this.buildUI();
    this.bindEventSocket();
  }

  buildUI() {
    this.chat = new Chat();
    this.canvas = new Canvas();
    this.playerBoard = document.getElementById("jsPBoard");
    this.canvasState = document.getElementById("canvasState");
  }

  bindEventSocket() {
    window.socket.on(window.global.CORRECT_MESSAGE, ({ nickName }) => {
      alert(`${nickName}님이 맞췄습니다`);
      this.playerBoard.childNodes.forEach(val => {
        const correctNickName = val.innerHTML.split(" ")[0];
        let correctPoint = parseInt(val.innerHTML.split(" ")[2]);
        if (nickName === correctNickName) {
          correctPoint += 100;
          val.innerText = `${nickName} : ${correctPoint}`;
        }
      });
      window.socket.on(window.global.SEND_WORD);
    });

    // player Board Controll
    window.socket.on(window.global.UPDATE_USERBOARD, players => {
      this.playerBoard.innerText = "";
      players.forEach(player => {
        const elePlayerSpan = document.createElement("span");
        elePlayerSpan.innerText = `${player.nickName} : ${player.point}`;
        this.playerBoard.appendChild(elePlayerSpan);
      });
    });

    // 게임시작을 알려주는 함수
    window.socket.on(window.global.GAMESTART_ALERT, () => {
      this.canvasState.innerHTML = "게임 시작";
      this.canvas.showCanvas();
      this.canvas.paintClearCanvas();
      this.canvas.removeControls();
      this.chat.showMessageForm();
      this.chat.clear();
    });

    // 리더에게 단어 알려주는 함수
    window.socket.on(window.global.SEND_WORD, ({ currentWord }) => {
      this.canvasState.innerHTML = `게임 시작 : ${currentWord}를 그리세요 `;
      this.canvas.bindEventDefualt();
      this.canvas.showControls();
      this.chat.hideMessageForm();
    });

    // 게임 종료를 알려주는 함수
    window.socket.on(window.global.GAMEFINISH_ALERT, () => {
      this.canvasState.innerHTML = "게임 종료... 잠시만 기다려주세요 ";
      this.canvas.removeControls();
      this.chat.showMessageForm();
    });
  }
}
