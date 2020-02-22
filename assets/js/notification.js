const eleNotificationDiv = document.getElementById("jsNotification");

const hanldeJoinNewName = data => {
  eleNotificationDiv.innerHTML = `<div>${data.nickName}이 입장했습니다<div/>`;
};

window.socket.on(window.global.JOIN_NEWUSER, hanldeJoinNewName);
