export const baseUrl = "http://127.0.0.1:3000";
const ENGINE = `${baseUrl}/engine`;

export const stopApiCar = async (id: number): Promise<void> => {
  const resolve = await fetch(`${ENGINE}?id=${id}&status=stopped`, {
    method: "PATCH",
  });
  void resolve.json();
};
