import "./login";
import { socket } from "./login";

const sendForm = document.getElementById("jsTest");

sendForm.addEventListener("submit", e => {
  e.preventDefault();
  const input = sendForm.querySelector("input");
  socket.emit("newMessage", input.value);
});
