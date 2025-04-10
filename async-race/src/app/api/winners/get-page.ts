import { winnersUrl } from "../host";

export const getPageAPIWInners = async (page: number) => {
  const PAGINATION_LIMIT = 10;
  const response = await fetch(
    `${winnersUrl}?_page=${page}&_limit=${PAGINATION_LIMIT}`,
    {
      method: "GET",
    }
  );
  const result = response.json();
  return result;
};
