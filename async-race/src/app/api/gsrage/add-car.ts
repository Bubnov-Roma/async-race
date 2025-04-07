export const baseUrl = "http://127.0.0.1:3000";

export const postCarInApi = async (settings: object): Promise<void> => {
  await fetch(`${baseUrl}/garage`, {
    method: "POST",
    body: JSON.stringify(settings),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
