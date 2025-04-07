import { startCar } from "../car-button";
import { getCarsApi } from "./get-cars";

export const raceStart = async (page: number): Promise<void> => {
  await getCarsApi(page).then((array) => {
    // @ts-ignore
    for (const car of array) {
      void startCar(car.id);
    }
  });
};
