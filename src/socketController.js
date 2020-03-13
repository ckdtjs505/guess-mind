import { event } from "./variables";
import { word } from "./words";

let players = [];
let leader = "";
let gameState = false;
let currentWord = null;

const chooseReader = () => players[Math.floor(Math.random() * players.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const updateUserBoard = () => superBroadcast(event.UPDATE_USERBOARD, players);

  const start = () => {
    // 게임시작
    gameState = true;
    // 리더를 선정
    leader = chooseReader();
    // 단어를 선정
    currentWord = word();

    superBroadcast(event.GAMESTART_ALERT);
    setTimeout(() => {
      // 게임이 시작됨을 모든 사용자에게 알린다
      superBroadcast(event.GAMESTART);
      // 리더에게만 그릴 단어를 보낸다.
      io.to(leader.id).emit(event.SEND_WORD, { currentWord });
    }, 3000);
  };

  const gameStart = () => {
    // 게임을 시작 상태로 바꾼다.
    if (gameState === false) {
      start();
    }
  };

  // 새로운 유저가 들어 왔을 시
  socket.on(event.SET_NICKNAME, nickName => {
    // socket에 nickName을 넣어서 기억
    socket.nickName = nickName;
    players.push({ id: socket.id, point: 0, nickName: nickName });
    // 새로운 유저가 들어 왔음을 알린다.
    broadcast(event.JOIN_NEWUSER, { nickName });

    // 유저 보드를 업데이트한다.
    updateUserBoard();

    // 게임을 시작한다.
    // to do : 2명이상일 때 게임을 시작
    if (players.length === 2) {
      console.log("gamestart");
      gameStart();
    }
  });

  socket.on(event.DISCONNECT, () => {
    // 종료된 유저는 제거한다.
    players = players.filter(player => player.id !== socket.id);

    // 유저가 나감을 알린다.
    broadcast(event.DISCONNECTED, { nickName: socket.nickName });

    // 유저 보드를 업데이트한다.
    updateUserBoard();

    // 유저가 나감으로 총인원이 1명이 되면 게임을 종료한다.
    if (gameState && players.length === 1) {
      gameState = false;
      broadcast(event.GAMEFINISH_ALERT);
    }

    // 종료된 유저가 리더라면, 리더른 변경한다.
    if (gameState && socket.nickName === leader.nickName) {
      start();
    }
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

    if (message === currentWord) {
      superBroadcast(event.CORRECT_MESSAGE, { nickName: socket.nickName });
      start();
    }
  });
};

// export defalut가 무슨뜻인가?
export default socketController;
