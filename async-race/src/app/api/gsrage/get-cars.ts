import { garageUrl } from "../host";

export let totlaNumberCars = 0;

export const getCarsApi = async (page: number): Promise<unknown> => {
  const PAGINATION_LIMIT = 7;
  try {
    const response = await fetch(
      `${garageUrl}?_page=${page}&_limit=${PAGINATION_LIMIT}`,
      {
        method: "GET",
      }
    );
    const result: unknown = await response.json();
    totlaNumberCars = Number(response.headers.get("X-Total-count"));
    return result;
  } catch (error) {
    console.error(error);
  }
};
