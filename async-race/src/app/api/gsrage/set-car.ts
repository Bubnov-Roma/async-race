export const baseUrl = "http://127.0.0.1:3000";

export const setApiCar = async (id: number, body: object): Promise<void> => {
  await fetch(`${baseUrl}/garage/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
