import { event } from "./variables";
import { word } from "../assets/js/words";

let sockets = [];
let gameState = false;
let currentWord = null;

const chooseReader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const updateUserBoard = () => superBroadcast(event.UPDATE_USERBOARD, sockets);

  const gameStart = () => {
    if (gameState === false) {
      // 게임을 시작 상테로 바꾼다.
      gameState = true;
      // 리더를 선정
      const leader = chooseReader();
      // 단어를 선정
      currentWord = word();

      // 게임이 시작됨을 모든 사용자에게 알린다
      superBroadcast(event.GAMESTART_ALERT, { leader });
      // 리더에게만 그릴 단어를 보낸다.
      io.to(leader.id).emit(event.SEND_WORD, { currentWord });
    }
  };

  // 새로운 유저가 들어 왔을 시
  socket.on(event.SET_NICKNAME, nickName => {
    // socket에 nickName을 넣어서 기억
    socket.nickName = nickName;
    sockets.push({ id: socket.id, point: 0, nickName: nickName });

    // 새로운 유저가 들어 왔음을 알린다.
    broadcast(event.JOIN_NEWUSER, { nickName });

    // 유저 보드를 업데이트한다.
    updateUserBoard();

    // 게임을 시작한다.
    // to do : 2명이상일 대 게임을 시작
    gameStart();
  });

  socket.on(event.DISCONNECT, () => {
    // 종료된 유저는 제거한다.
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);

    // 유저가 종료됨을 알린다.
    broadcast(event.DISCONNECTED, { nickName: socket.nickName });

    // 유저 보드를 업데이트한다.
    updateUserBoard();
  });

  socket.on(event.DRAW_BEGINPOS, ({ x, y }) => {
    broadcast(event.SEND_BEGINPOS, { x, y });
  });

  socket.on(event.DRAW_ENDPOS, ({ x, y, color }) => {
    broadcast(event.SEND_ENDPOS, { x, y, color });
  });

  socket.on(event.SEND_FILL, ({ color }) => {
    broadcast(event.SEND_FILLED, { color });
  });

  socket.on("newMessage", message => {
    broadcast(event.SEND_MESSAGE, {
      message,
      nickName: socket.nickName || "Anon"
    });
  });
};

setInterval(() => console.log(currentWord), 5000);

// export defalut가 무슨뜻인가?
export default socketController;
