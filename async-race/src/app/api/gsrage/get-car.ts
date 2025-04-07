export const baseUrl = "http://127.0.0.1:3000";

export const getApiCar = async (id: number): Promise<unknown> => {
  const response = await fetch(`${baseUrl}/garage/${id}`, { method: "GET" });
  const result: unknown = await response.json();
  // const cars = Number(response.headers.get("X-Total-count"));
  return result;
};
