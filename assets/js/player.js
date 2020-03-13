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

    window.socket.on(window.global.GAMESTART_ALERT, () => {
      this.canvasState.innerHTML = "곧 문제 나갑니다";
    });

    // 게임시작
    window.socket.on(window.global.GAMESTART, () => {
      this.canvasState.innerHTML = "게임 시작";
      this.canvas.showCanvas(); // 캔버스를 등장
      this.canvas.enableDraw(); // 그림을 못그리게
      this.canvas.clearCanvas(); // 이전에 그린 캔버스 지우기
      this.canvas.removeControls(); // 컨트롤러 제거
      this.chat.showChat();
      this.chat.showMessageForm(); // 채팅 메시지 생성
      this.chat.clear(); // 이전에 작성된 채팅 지우기
    });

    // 리더에게 단어 알려주는 함수
    window.socket.on(window.global.SEND_WORD, ({ currentWord }) => {
      this.canvasState.innerHTML = `게임 시작 : ${currentWord}를 그리세요 `;
      this.canvas.ableDraw(); // 그림을 그릴수 있게
      this.canvas.showControls(); // 그림 컨트롤 할 수 있게
      this.chat.hideMessageForm(); // 채팅 메시지 삭제
    });

    // 게임 종료를 알려주는 함수
    window.socket.on(window.global.GAMEFINISH_ALERT, () => {
      this.canvasState.innerHTML = "게임 종료... 잠시만 기다려주세요 ";
      this.canvas.removeCanvas();
      this.canvas.removeControls();
      this.chat.showMessageForm();
      this.chat.removeChat();
    });
  }
}
