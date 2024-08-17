import { API_BASE_URL } from "$lib/constants";

export const sendUsage = async (
  userId: string,
  extensionId: string,
  eventId: null | string = null
) => {
  let error = null;

  const res = await fetch(`${API_BASE_URL}/usage/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId.toString(),
      extension_id: extensionId,
      ...(eventId && { event_id: eventId }),
    }),
  })
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      error = err.detail;
      return null;
    });

  if (error) {
    throw error;
  }

  return res;
};
