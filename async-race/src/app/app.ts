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
import { totlaNumberCars } from "./api/gsrage/get-cars";
import { raceStop } from "./api/gsrage/reset-race";
import { raceStart } from "./api/gsrage/start-race";
import { random } from "./utils/random";
import { hasWinner } from "./api/gsrage/animations";

export const enum PageIds {
  garage = "garage",
  winners = "winners",
  error = "error",
}

class App {
  private static readonly root: HTMLElement = document.body;

  private static renderNewPage(id: string): void {
    App.removeAllChildren(this.root);

    let page: HTMLElement | null = null;

    switch (id) {
      case PageIds.garage:
        page = garagePage.element;
        break;
      case PageIds.winners:
        page = winnersPage.element;
        break;
      default:
        // page = errorPage;
        break;
    }

    if (page) {
      App.root.append(page);
    }
  }

  private static removeAllChildren(parent: HTMLElement): void {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  private static enableRouteChange(): void {
    App.renderNewPage(App.getHash());
    window.addEventListener("hashchange", App.enableRouteChange);
  }

  private static getHash(): string {
    return window.location.hash === ""
      ? "garage"
      : window.location.hash.slice(1);
  }

  public start(): void {
    App.enableRouteChange();
  }
}

export const app = new App();
app.start();

export const containerCar = document.querySelector(".container-car");

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

let selectCar = 0;
let pageNumber = 1;

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
        // if (pageNumber > 1 && pageNumber <) {
        //   nextButton?.setAttribute("disabled", "disabled");
        // }
      } else {
        // previousButton?.removeAttribute("disabled");
        // console.log("else next");
        // nextButton?.removeAttribute("disabled");
        return;
      }
    }

    if (classElement.match("btn-prev")) {
      if (pageNumber > 1) {
        console.log(pageNumber > 1, " prev 1");
        if (currentPageNumber !== null) {
          currentPageNumber.innerHTML = `${(pageNumber -= 1)}`;

          previousButton?.removeAttribute("disabled");
          nextButton?.removeAttribute("disabled");
          void updateGarage(pageNumber);
        }
        if (pageNumber === 1) {
          console.log(pageNumber === 1, "prev 2");
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
  }
}

document?.addEventListener("click", handleEvent);

updateGarage();
