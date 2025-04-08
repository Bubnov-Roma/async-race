import { getApiCar } from "../api/gsrage/get-car";

export const getWinner = (car: HTMLElement, duration: number) => {
  const time = (duration / 1000).toFixed(2);
  const notice: HTMLElement | null = document.querySelector("#winner");
  const idCar = Number(car.dataset.car);

  getApiCar(idCar).then((element) => {
    // @ts-ignore
    if (notice) notice.innerHTML = `${element.name} won over time ${time}`;
  });
};
