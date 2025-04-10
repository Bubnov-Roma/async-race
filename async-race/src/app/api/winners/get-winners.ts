import { winnersUrl } from "../host";

// const winners = `${base}`;
export let countAllWinners = 0;

export const getWinnersList = async () => {
  const response = await fetch(`${winnersUrl}`, { method: "GET" });
  return response.json();
};
