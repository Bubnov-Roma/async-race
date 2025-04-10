// import { engineUrl } from "../host";

export const baseUrl = "http://127.0.0.1:3000";
const ENGINE = `${baseUrl}/engine`;

export const driveApiMotor = async (id: number): Promise<unknown> => {
  // console.log(`${ENGINE}?id=${id}&status=drive`);
  // console.log(`${engineUrl}?id=${id}&status=drive`);
  const response = await fetch(`${ENGINE}?id=${id}&status=drive`, {
    method: "PATCH",
  }).catch();
  const result = response.status;
  return result;
};
