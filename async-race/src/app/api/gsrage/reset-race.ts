import { stopCar } from "../car-button";
import { getCarsApi } from "./get-cars";

export const raceStop = async (page: number): Promise<void> => {
  await getCarsApi(page).then((array) => {
    // @ts-ignore
    for (const car of array) {
      void stopCar(car.id);
    }
  });
};
