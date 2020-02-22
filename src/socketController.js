import { event } from "./variables";

const socketController = socket => {
  socket.on(event.SET_NICKNAME, nickName => {
    socket.broadcast.emit(event.JOIN_NEWUSER, {
      nickName
    });
    socket.nickName = nickName;
  });

  socket.on("newMessage", message => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickName: socket.nickName || "Anon"
    });
  });
};

// export defalut가 무슨뜻인가?
export default socketController;
