import { getApiCar } from "../api/gsrage/get-car";
import { createAPIWinnersList } from "../api/winners/create-winners";
import { getWinnersList } from "../api/winners/get-winners";
import { updateAPIWinnersList } from "../api/winners/update-winners";
import { updateWinners } from "../app";

export const addWinner = (car: HTMLElement, duration: number) => {
  const winnerId = Number(car.dataset.car);
  let time = (duration / 1000).toFixed(2);
  let countWins = 1;
  const notice: HTMLElement | null = document.querySelector("#winner");

  getApiCar(winnerId).then((element) => {
    // @ts-ignore
    if (notice) notice.innerHTML = `${element.name} won over time ${time}`;
  });

  getWinnersList()
    .then((winnersArray) => {
      // @ts-ignore
      winnersArray.forEach((element) => {
        if (Number(element.id) === winnerId) {
          countWins += 1;
          time = (
            Number(element.time) < Number(time) ? element.time : time
          ).toString();
        }
      });
    })
    .then(() => {
      if (countWins > 1) {
        // console.log("update winners ", { wins: countWins, time: time });
        updateAPIWinnersList({ wins: countWins, time: time }, winnerId);
      } else {
        // console.log("update winners ", winnerId, countWins, time);
        createAPIWinnersList({
          id: winnerId,
          wins: countWins,
          time: time,
        });
      }
    })
    .then(() => updateWinners());
};
