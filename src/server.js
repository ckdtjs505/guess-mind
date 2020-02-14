import express from "express";
import SocketIO from "socket.io";
import morgan from "morgan";

const app = express();
const port = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "\\src\\views");

app.use(morgan("dev"));
app.use(express.static(process.cwd() + "\\src\\static"));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(port, () =>
  console.log("✅  Server running: http://localhost:4000")
);

const io = SocketIO.listen(server);

io.on("connection", () => console.log("sombody "));
