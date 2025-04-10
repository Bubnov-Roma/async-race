import { winnersUrl } from "../host";

export const createAPIWinnersList = async (body: Object) => {
  await fetch(`${winnersUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
