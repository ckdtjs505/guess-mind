import { Chat } from "./chat";
import { Canvas } from "./canvas";

export class Player {
  constructor() {
    this.chat = new Chat();
    this.canvas = new Canvas();

    this.buildUI();
    this.bindEventSocket();
    this.bindEventDefualt();
  }
  buildUI() {
    this.playerBoard = document.getElementById("jsPBoard");
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
      alert("game start");
    });

    // 리더에게 단어 알려주는 함수
    window.socket.on(window.global.SEND_WORD, ({ currentWord }) => {
      alert(`${currentWord}를 그리세요 `);
      this.canvas.bindEventDefualt();
      this.canvas.showControls();
    });
  }
}
