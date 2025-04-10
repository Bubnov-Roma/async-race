import { engineUrl } from "../host";

interface apiObject {
  velocity: number;
  distance: number;
}

export const startApiCar = async (idCar: number): Promise<apiObject> => {
  const resolve = await fetch(`${engineUrl}?id=${idCar}&status=started`, {
    method: "PATCH",
  });
  const result = resolve.json();
  return result;
};
