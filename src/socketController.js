import { event } from "./variables";

let sockets = [];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);

  // 새로운 유저가 들어 왔을 시
  socket.on(event.SET_NICKNAME, nickName => {
    // socket에 nickName을 넣어서 기억
    socket.nickName = nickName;
    sockets.push({ id: socket.id, point: 0, nickName: nickName });

    // 새로운 유저가 들어 왔음을 알린다.
    broadcast(event.JOIN_NEWUSER, { nickName });
    superBroadcast(event.UPDATE_JOINUSER, sockets);
  });

  socket.on(event.DISCONNECT, () => {
    // 종료된 유저는 제거한다.
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    // 유저가 종료됨을 알린다.
    broadcast(event.DISCONNECTED, { nickName: socket.nickName });
    superBroadcast(event.UPDATE_OUTUSER, sockets);
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

setInterval(() => console.log(sockets), 3000);

// export defalut가 무슨뜻인가?
export default socketController;
