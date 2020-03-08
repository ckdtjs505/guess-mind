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
  }

  endGame() {
    // 켄버스, 채팅 이벤트를 삭제한다.
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
      console.log("게임 시작");
    });

    // 리더에게 단어 알려주는 함수
    window.socket.on(window.global.SEND_WORD, ({ currentWord }) => {
      console.log(`${currentWord}를 그리세요 `);
      this.startGame();
      this.canvas.bindEventDefualt();
      this.canvas.showControls();
    });

    window.socket.on(window.global.GAMEFINISH_ALERT, () => {
      console.log("게임을 종료합니다");
      // this.canvas.unbindEventDefault();
      this.canvas.removeControls();
      this.endGame();
    });
  }
}
