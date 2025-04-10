import { engineUrl } from "../host";

export const stopApiCar = async (id: number): Promise<void> => {
  const resolve = await fetch(`${engineUrl}?id=${id}&status=stopped`, {
    method: "PATCH",
  });
  void resolve.json();
};
