import express from "express";
import SocketIO from "socket.io";
import morgan from "morgan";
import path from "path";
import socketController from "./socketController";
import { event } from "./variables";

const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) =>
  res.render("home", { event: JSON.stringify(event) })
);

const server = app.listen(port, () =>
  console.log("✅  Server Running: http://localhost:4000")
);

const io = SocketIO.listen(server);

io.on("connection", socket => socketController(socket, io));
