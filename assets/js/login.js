const body = document.querySelector("body");
const loginFrom = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickName = localStorage.getItem(NICKNAME);

const logIn = nickName => {
  // nickname을 socket에 지정한다.
  window.socket.emit(window.global.SET_NICKNAME, nickName);
};

window.socket.on("messageNotif", data => {
  const div = document.createElement("div");
  div.innerHTML = `<br><a>${data.nickName}</a><div>${data.message} </div>`;
  body.appendChild(div);
});

// 접속시 로그인 체크
if (nickName === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickName);
}

const handleLoginForm = e => {
  e.preventDefault();
  // input에 있는 데이터를 가져오기위해 input을 선택한다.
  const input = loginFrom.querySelector("input");
  // localstorage에 닉네임을 저장
  localStorage.setItem(NICKNAME, input.value);
  // 로그인 화면을 띄운다.
  body.className = LOGGED_IN;
  // 소켓 로그인을 시도한다.
  logIn(input.value);
  // 값을 비워준다.
  input.value = "";
};

if (loginFrom) {
  loginFrom.addEventListener("submit", handleLoginForm);
}
