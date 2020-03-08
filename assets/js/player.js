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
      this.canvas.removeCanvas();
    });

    // 리더에게 단어 알려주는 함수
    window.socket.on(window.global.SEND_WORD, ({ currentWord }) => {
      this.canvasState.innerHTML = `게임 시작 : ${currentWord}를 그리세요 `;
      this.canvas.bindEventDefualt();
      this.canvas.showControls();
    });

    window.socket.on(window.global.GAMEFINISH_ALERT, () => {
      this.canvasState.innerHTML = "게임 종료... 잠시만 기다려주세요 ";
      this.canvas.unbindEventDefault();
      this.canvas.removeControls();
    });
  }
}
