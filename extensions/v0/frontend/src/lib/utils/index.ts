import { sendUsage } from "$lib/apis/usage";

export const formatTime = (seconds) => {
  const pad = (num) => String(num).padStart(2, "0");
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  } else {
    return `${pad(minutes)}:${pad(secs)}`;
  }
};

export const startTracker = async (user_id, extension_id) => {
  console.log("startTracker: ", user_id, extension_id);
  // User Tracking
  setInterval(async () => {
    await sendUsage(user_id, extension_id);
  }, 5000);
};
