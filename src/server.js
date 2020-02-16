import express from "express";
import SocketIO from "socket.io";
import morgan from "morgan";
import path from "path";

const app = express();
const port = 4000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(port, () =>
  console.log("✅  Server running: http://localhost:4000")
);

const io = SocketIO.listen(server);

io.on("connection", socket => {
  console.log("User connect");

  socket.on("newMessage", message => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickName: socket.nickName || "Anon"
    });
  });
  socket.on("setNickname", nickName => {
    socket.nickName = nickName;
  });
});
