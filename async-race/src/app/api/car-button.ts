import { getCarsApi, totlaNumberCars } from "./gsrage/get-cars";
import { createCarElemnt } from "../wiev/car/car-element";
import { containerCar, numberAllCars } from "../wiev/header/header";
import { postCarInApi } from "./gsrage/add-car";
import { deleteCarApi } from "./gsrage/delete-car";
import { setApiCar } from "./gsrage/set-car";
import { startApiCar } from "./gsrage/start-car";
import { animation, animationId } from "./gsrage/animations";
import { stopApiCar } from "./gsrage/stop-car";
import { driveApiMotor } from "./gsrage/get-motor";

export const updateGarage = async (pageNumber: number = 1): Promise<void> => {
  await getCarsApi(pageNumber).then((array) => {
    if (containerCar) containerCar.innerHTML = "";
    // @ts-ignore
    for (const element of array) {
      const newCar = `${createCarElemnt(element.id, element.name, element.color)}`;
      if (containerCar) containerCar.innerHTML += newCar;
    }
    if (numberAllCars !== null) {
      numberAllCars.textContent = `total cars - ${totlaNumberCars}`;
    }
  });
};

export const createNewCar = async (
  nameCar: string | undefined,
  colorCar: string | undefined
): Promise<void> => {
  if (!nameCar || !colorCar) alert("Please, enter name for car");
  else {
    await postCarInApi({
      name: `${nameCar}`,
      color: `${colorCar}`,
    });
    await updateGarage();
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  await deleteCarApi(id);
  await updateGarage();
};

export const updateSelectCar = async (
  id: number,
  car: object
): Promise<void> => {
  await setApiCar(id, car);
  await updateGarage();
};

const track = (): number =>
  document.body.clientWidth - (document.body.clientWidth / 100) * 20;

export const startCar = async (id: number): Promise<void> => {
  await startApiCar(id).then(({ velocity, distance }) => {
    const time = distance / velocity;
    const car = document.querySelector(`[data-car="${id}"]`);
    if (car instanceof HTMLElement) animation(car, track(), time);
    void driveApiMotor(id).then((result) => {
      // @ts-ignore
      if (!result.success) {
        globalThis.cancelAnimationFrame(animationId);
      }
    });
  });
};

export const stopCar = async (id: number): Promise<void> => {
  await stopApiCar(id).then(() => {
    globalThis.cancelAnimationFrame(animationId);
    const car = document.querySelector(`[data-car="${id}"]`);
    if (car instanceof HTMLElement) car.style.transform = "translateX(0px)";
  });
};
