import { event } from "./variables";

const socketController = socket => {
  socket.on(event.SET_NICKNAME, nickName => {
    socket.broadcast.emit(event.JOIN_NEWUSER, { nickName });
    socket.nickName = nickName;
  });

  socket.on(event.DISCONNECT, () => {
    socket.broadcast.emit(event.DISCONNECTED, {
      nickName: socket.nickName
    });
  });

  socket.on(event.DRAW_BEGINPOS, ({ x, y }) => {
    socket.broadcast.emit(event.SEND_BEGINPOS, {
      x,
      y
    });
  });

  socket.on(event.DRAW_ENDPOS, ({ x, y }) => {
    socket.broadcast.emit(event.SEND_ENDPOS, {
      x,
      y
    });
  });

  socket.on("newMessage", message => {
    socket.broadcast.emit(event.SEND_MESSAGE, {
      message,
      nickName: socket.nickName || "Anon"
    });
  });
};

// export defalut가 무슨뜻인가?
export default socketController;
