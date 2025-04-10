import { winnersUrl } from "../host";

export const updateAPIWinnersList = async (body: Object, id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
