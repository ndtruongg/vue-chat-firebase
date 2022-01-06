export const getLastLogin = (lastTime) => {
  let lastLogin =
    new Date().getTime() - lastTime.seconds * 1000 + lastTime.nanoseconds / 1e6;

  let minutes = Math.floor(lastLogin / 60000);
  if (minutes >= 60) {
    let hours = Math.floor(minutes / 60);
    if (hours >= 24) {
      return Math.floor(hours / 24) + "d ago";
    }
    return hours + "h ago";
  }
  return minutes + "m ago";
};
