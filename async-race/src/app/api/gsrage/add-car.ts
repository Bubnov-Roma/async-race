import { garageUrl } from "../host";

export const postCarInApi = async (settings: object): Promise<void> => {
  await fetch(`${garageUrl}`, {
    method: "POST",
    body: JSON.stringify(settings),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
