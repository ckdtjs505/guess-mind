import express from "express";

const app = express();
const port = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "\\src\\views");

app.use(express.static(process.cwd() + "\\src\\static"));

app.get("/", (req, res) => res.render("home"));

app.listen(port, () =>
  console.log("✅  Server running: http://localhost:4000")
);
