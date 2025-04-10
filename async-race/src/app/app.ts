import { garagePage } from "./view/garage/garage-page";
import { winnersPage } from "./view/winners/winners-page";

import {
  createNewCar,
  deleteCar,
  startCar,
  stopCar,
  updateGarage,
  updateSelectCar,
} from "./api/car-button";
import { getApiCar } from "./api/gsrage/get-car";
import { getCarsApi, totlaNumberCars } from "./api/gsrage/get-cars";
import { raceStop } from "./api/gsrage/reset-race";
import { raceStart } from "./api/gsrage/start-race";
import { random } from "./utils/random";
import { hasWinner } from "./api/gsrage/animations";
import { getPageAPIWInners } from "./api/winners/get-page";
import { createWinnerElement } from "./view/winners/winner-element";
import { createCarElemnt } from "./view/car/car-element";
import { carView } from "./view/car/car-svg";

export const enum PageIds {
  garage = "garage",
  winners = "winners",
  error = "error",
}

let selectCar = 0;
let pageNumber = 1;
let numberPageWinners = 1;

class App {
  private static readonly root: HTMLElement = document.body;

  private static renderNewPage(id: string): void {
    App.removeAllChildren(this.root);

    let page: HTMLElement | null = null;

    switch (id) {
      case PageIds.garage: {
        page = garagePage.element;
        break;
      }
      case PageIds.winners: {
        page = winnersPage.element;
        break;
      }
      default:
        // page = errorPage;
        break;
    }

    if (page) {
      App.root.append(page);
      if (page.classList.contains("winners")) {
        // console.log("winners");
        updateWinners();
      }
      if (page.classList.contains("garage")) {
        // console.log("garage");
        updateGarage();
      }
    }
  }

  private static removeAllChildren(parent: HTMLElement): void {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  private static enableRouteChange(): void {
    App.renderNewPage(App.getHash());
    globalThis.addEventListener("hashchange", App.enableRouteChange);
  }

  private static getHash(): string {
    return globalThis.location.hash === ""
      ? "garage"
      : globalThis.location.hash.slice(1);
  }

  public start(): void {
    App.enableRouteChange();
  }
}

export const app = new App();
app.start();

// export const containerCar = document.querySelector(".container-car");
// export const winnersBlock: HTMLElement | null =
//   document.querySelector(".container-win");

export const addCarButton = document.querySelector(".generate-cars");
export const numberAllCars: HTMLElement | null =
  document.querySelector(".count-garage");
const buttonUpdate: HTMLInputElement | null =
  document.querySelector(".btn-update");
const inputTextUpdate: HTMLInputElement | null =
  document.querySelector(".text-update");
const inputColorUpdate: HTMLInputElement | null =
  document.querySelector(".color-update");
const inputTextCreate: HTMLInputElement | null =
  document.querySelector(".text-create");
const inputColorCreate: HTMLInputElement | null =
  document.querySelector(".color-create");

const nextButton = document.querySelector(".btn-next");
const previousButton = document.querySelector(".btn-prev");
const currentPageNumber = document.querySelector(".count-page");

const startRaceButton = document.querySelector(".btn-race");
const resetRaceButton = document.querySelector(".btn-reset");

// const winnersCount: HTMLElement | null =
//   document.querySelector(".count-winners");

function handleEvent(event: Event): void {
  const element = event.target;

  if (element instanceof HTMLElement) {
    const classElement = element.className;
    if (
      classElement.match("btn-create") &&
      inputTextCreate?.value &&
      inputColorCreate?.value
    ) {
      void createNewCar(inputTextCreate.value, inputColorCreate.value);
    }

    if (classElement.match("_remove_") && element.dataset.remove) {
      void deleteCar(Number.parseInt(element.dataset.remove));
    }

    if (classElement.match("select") && element.dataset.select) {
      if (inputTextUpdate && inputColorUpdate && buttonUpdate) {
        inputTextUpdate.disabled = false;
        inputColorUpdate.disabled = false;
        buttonUpdate.disabled = false;
        void getApiCar(Number.parseInt(element.dataset.select));
      }
      selectCar = Number.parseInt(element.dataset.select);
    }

    if (classElement.match("btn-update")) {
      const name = inputTextUpdate?.value;
      const color = inputColorUpdate?.value;
      void updateSelectCar(selectCar, { name, color });
    }

    if (classElement.match(".btn-generate_cars")) {
      for (let index = 0; index < 100; index += 1) {
        const name = random.generateFunction("model");
        const color = random.generateFunction("color");

        void createNewCar(name, color);
        void updateGarage();
      }
    }

    if (classElement.match("btn-next")) {
      if (pageNumber * 7 <= totlaNumberCars) {
        if (currentPageNumber !== null) {
          currentPageNumber.innerHTML = `${(pageNumber += 1)}`;
          void updateGarage(pageNumber);
          previousButton?.removeAttribute("disabled");
        }
        if (pageNumber * 7 > totlaNumberCars) {
          nextButton?.setAttribute("disabled", "disabled");
          previousButton?.removeAttribute("disabled");
        }
      } else {
        return;
      }
    }

    if (classElement.match("btn-prev")) {
      if (pageNumber > 1) {
        if (currentPageNumber !== null) {
          currentPageNumber.innerHTML = `${(pageNumber -= 1)}`;

          previousButton?.removeAttribute("disabled");
          nextButton?.removeAttribute("disabled");
          void updateGarage(pageNumber);
        }
        if (pageNumber === 1) {
          previousButton?.setAttribute("disabled", "disabled");
          nextButton?.removeAttribute("disabled");
        }
      } else {
        return;
      }
    }

    if (classElement.match("_start_")) {
      const carButton = event.target;

      if (carButton instanceof HTMLElement) {
        const carId = Number(carButton.dataset.start);
        const stopButton = document.querySelector(`[data-stop="${carId}"]`);
        if (element !== null && stopButton !== null) {
          void startCar(carId, false);
          carButton.setAttribute("disabled", "disabled");
          stopButton.removeAttribute("disabled");
        }
      }
    }

    if (classElement.match("_stop_")) {
      const carStopButton = event.target;
      if (carStopButton instanceof HTMLElement) {
        const carId = Number(carStopButton.dataset.stop);
        const startButton = document.querySelector(`[data-start="${carId}"]`);
        if (element !== null && startButton !== null) {
          void stopCar(carId);
          carStopButton.setAttribute("disabled", "disabled");
          startButton.removeAttribute("disabled");
        }
      }
    }

    if (classElement.match("btn-race")) {
      void raceStart(pageNumber);
      startRaceButton?.setAttribute("disabled", "disabled");
      resetRaceButton?.removeAttribute("disabled");
    }

    if (classElement.match("btn-reset")) {
      void raceStop(pageNumber);
      resetRaceButton?.setAttribute("disabled", "disabled");
      startRaceButton?.removeAttribute("disabled");
      hasWinner.length = 0;
      const notice: HTMLElement | null = document.querySelector("#winner");
      if (notice) notice.innerHTML = "";
    }

    if (classElement.match("winners_btn")) {
      globalThis.addEventListener("load", () => {
        updateWinners();
        // console.log("hi from winners");c
        // console.log(winnersBlock);
      });
    }
  }
}

document?.addEventListener("click", handleEvent);

export function updateWinners() {
  // const winnersBlock: HTMLElement | null =
  //   document.querySelector(".container-win");
  // let scoreNumber = numberPageWinners * 10 - 10;
  let winner = "";

  // getPageAPIWInners(numberPageWinners).then((array) => {
  //   if (winnersBlock) winnersBlock.innerHTML = "";
  //   for (const item of array) {
  //     getApiCar(item.id).then((car) => {
  //       // console.log(car);
  //       scoreNumber += 1;
  //       winner = `${createWinnerElement(scoreNumber, car.color, car.name, car.wins, car.time)}`;
  //       if (winnersBlock) winnersBlock.innerHTML += winner;
  //       // console.log(winnersBlock);
  //     });
  //   }
  //   // if (winnersCount) winnersCount.innerHTML =
  // });
  // console.log(winner);
  return winner;
}

// updateGarage();
// updateWinners();

export const changePage = () => {
  if (globalThis.location.hash === "#garage") {
    const containerCar = document.querySelector(".container-car");
    getCarsApi(pageNumber).then((array) => {
      // console.log(containerCar);
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
    // updateGarage();
  }
  if (globalThis.location.hash === "#winners") {
    const winnersBlock: HTMLElement | null =
      document.querySelector(".container-win");
    let scoreNumber = numberPageWinners * 10 - 10;
    getPageAPIWInners(numberPageWinners).then((array) => {
      if (winnersBlock) winnersBlock.innerHTML = "";
      for (const item of array) {
        getApiCar(item.id).then((car) => {
          // @ts-ignore
          const carImg = carView(car.color);
          scoreNumber += 1;
          // @ts-ignore
          const winner = `${createWinnerElement(scoreNumber, carImg, car.name, item.wins, item.time)}`;
          if (winnersBlock) winnersBlock.innerHTML += winner;
        });
      }
    });
  }
};

changePage();

globalThis.addEventListener("hashchange", changePage);