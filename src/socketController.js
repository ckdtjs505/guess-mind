const socketController = socket => {
  socket.on("setNickname", nickName => {
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
