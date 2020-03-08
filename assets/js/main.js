import { Login } from "./login";
import { Player } from "./player";
import "./notification";

const login = new Login();

if (login.loginCheck()) {
  new Player();
}
