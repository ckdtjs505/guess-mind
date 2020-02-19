export function handleMessageNotif(data) {
  const { message, nickName } = data;
  console.log(`${nickName} : ${message}`);
}
