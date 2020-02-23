const eleNotificationDiv = document.getElementById("jsNotification");

// 알림시 새로운 창을 만들어주는 동작
const fireNotification = (message, bgcolor) => {
  const notification = document.createElement("div");
  notification.innerText = `${message}`; // div에 유저 이름 저장
  notification.style.backgroundColor = bgcolor; // 파란 배경색 지정
  notification.className = "notification";
  eleNotificationDiv.appendChild(notification); // game Container안에 있는 DIV에 돔 생성
};

// 채팅창에 합류시 나타나는 동작
const handleJoinNewUser = ({ nickName }) => {
  fireNotification(`${nickName} 님이 입장했습니다`, "rgb(90, 200, 250)");
};

// 채팅창을 퇴장시 나타나는 동작
const handleDisconnected = ({ nickName }) => {
  fireNotification(`${nickName} 님이 퇴장했습니다`, "rgb(255, 59, 48)");
};

window.socket.on(window.global.JOIN_NEWUSER, handleJoinNewUser);
window.socket.on(window.global.DISCONNECTED, handleDisconnected);
