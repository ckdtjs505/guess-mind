import "./login";
import "./notification";

const sendForm = document.getElementById("jsTest");

sendForm.addEventListener("submit", e => {
  e.preventDefault();
  const input = sendForm.querySelector("input");
  window.socket.emit("newMessage", input.value);
});
