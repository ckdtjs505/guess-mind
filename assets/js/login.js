import { Player } from "./player";

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

export class Login {
  constructor() {
    this.buildUI();
    this.bindEventDefualt();
    this.loginCheck();
  }

  buildUI() {
    this.body = document.querySelector("body");
    this.loginFrom = document.getElementById("jsLogin");
    this.nickName = localStorage.getItem(NICKNAME);
  }

  bindEventDefualt() {
    this.loginFrom.addEventListener("submit", e => {
      e.preventDefault();
      // input에 있는 데이터를 가져오기위해 input을 선택한다.
      const input = this.loginFrom.querySelector("input");
      // localstorage에 닉네임을 저장
      localStorage.setItem(NICKNAME, input.value);
      // 로그인 화면을 띄운다.
      this.body.className = LOGGED_IN;
      // 소켓 로그인을 시도한다.
      this.logIn(input.value);
      // 값을 비워준다.
      input.value = "";
    });
  }
  // 접속시 로그인 체크
  loginCheck() {
    if (this.nickName === null) {
      this.body.className = LOGGED_OUT;
    } else {
      this.body.className = LOGGED_IN;
      this.logIn(this.nickName);
    }
  }

  logIn(nickName) {
    // nickname을 socket에 지정한다.
    new Player();
    window.socket.emit(window.global.SET_NICKNAME, nickName);
  }
}
