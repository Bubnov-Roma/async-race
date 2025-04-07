export const baseUrl = "http://127.0.0.1:3000";
const ENGINE = `${baseUrl}/engine`;

interface apiObject {
  velocity: number;
  distance: number;
}

export const startApiCar = async (idCar: number): Promise<apiObject> => {
  const resolve = await fetch(`${ENGINE}?id=${idCar}&status=started`, {
    method: "PATCH",
  });
  const result = resolve.json();
  return result;
};
