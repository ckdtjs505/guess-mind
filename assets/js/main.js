const body = document.querySelector("body");
const loginFrom = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickName = localStorage.getItem(NICKNAME);
if (nickName === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
}

const handleLoginForm = e => {
  e.preventDefault();
  const input = loginFrom.querySelector("input");
  input.value = "";
  localStorage.setItem(NICKNAME, input.value);
};

if (loginFrom) {
  loginFrom.addEventListener("submit", handleLoginForm);
}
