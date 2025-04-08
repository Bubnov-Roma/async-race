// import {
//   createNewCar,
//   deleteCar,
//   startCar,
//   stopCar,
//   updateGarage,
//   updateSelectCar,
// } from "../../api/car-button";
// import { getApiCar } from "../../api/gsrage/get-car";
// import { totlaNumberCars } from "../../api/gsrage/get-cars";
// import { raceStop } from "../../api/gsrage/reset-race";
// import { raceStart } from "../../api/gsrage/start-race";
// import { random } from "../../utils/random";
import style from "./garage.module.scss";

class GarageUI {
  public readonly element: HTMLElement = document.createElement("main");
  constructor() {
    this.createElement();
  }

  private createElement(): HTMLElement {
    const headerHTML = `
    <header class="header">
      <div class="${style.nav}">
        <a class="${style.button}"  href="#garage">GARAGE</a>
        <a class="${style.button}" href="#winners">WINNERS</a>
      </div>
    </header>
    <div class="page garage-page">
      <div class="generate-cars">
        <div class="${style.create_block}">
          <input class="generate-input_text text-create" type="text" autocomplete placeholder="Enter name сar...">
          <input class="generate-input_color color-create" type="color">
          <button class="buttons btn-create">create</button>
        </div>
        <div class="${style.update_block}">
          <input class="generate-input_text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
          <input class="generate-input_color color-update" type="color" disabled="true">
          <button class="buttons btn-update" disabled="true">update</button>
        </div>
        <div class="${style.controls_block}">
          <button class="buttons btn-race">race</button>
          <button class="buttons btn-reset" disabled>reset</button>
          <button class="buttons btn-generate_cars">generate cars</button>
        </div>
      </div>

      <div class="container-garage">
        <h3 class="title">Garage <span class="count-garage"></span></h3>
        <h5 class="title">Page #<span class="count-page">1</span></h5>
    
        <div class="container-car"></div>
      </div>

      <div class="${style.pagination_block}">
        <button class="buttons btn-prev">Prev</button>
        <button class="buttons btn-next">Next</button>
      </div>

      <div id="winner" class="${style.winner}"></div>

    </div>

    <footer class="${style.footer}">
      <div class="link-github">
        <a href="https://github.com/Bubnov-Roma">GitHub</a>
      </div>
      <div class="year-create">&#9400; 2025</div>
      <div class="link-school">
        <a href="https://rs.school/">RSSchool</a>
      </div>
    </footer>
    `;
    this.element.className = style.garage;
    this.element.innerHTML = headerHTML;
    return this.element;
  }
}

export const garagePage = new GarageUI();

// export const containerCar = document.querySelector(".container-car");
// console.log(containerCar);
// export const addCarButton = document.querySelector(".generate-cars");
// export const numberAllCars: HTMLElement | null =
//   document.querySelector(".count-garage");
// const buttonUpdate: HTMLInputElement | null =
//   document.querySelector(".btn-update");
// const inputTextUpdate: HTMLInputElement | null =
//   document.querySelector(".text-update");
// const inputColorUpdate: HTMLInputElement | null =
//   document.querySelector(".color-update");
// const inputTextCreate: HTMLInputElement | null =
//   document.querySelector(".text-create");
// const inputColorCreate: HTMLInputElement | null =
//   document.querySelector(".color-create");

// const nextButton = document.querySelector(".btn-next");
// const previousButton = document.querySelector(".btn-prev");
// const currentPageNumber = document.querySelector(".count-page");

// const startRaceButton = document.querySelector(".btn-race");
// const resetRaceButton = document.querySelector(".btn-reset");

// let selectCar = 0;
// let pageNumber = 1;

// function handleEvent(event: Event): void {
//   const element = event.target;

//   if (element instanceof HTMLElement) {
//     const classElement = element.className;
//     if (
//       classElement.match("btn-create") &&
//       inputTextCreate?.value &&
//       inputColorCreate?.value
//     ) {
//       void createNewCar(inputTextCreate.value, inputColorCreate.value);
//     }

//     if (classElement.match("_remove_") && element.dataset.remove) {
//       void deleteCar(Number.parseInt(element.dataset.remove));
//     }

//     if (classElement.match("select") && element.dataset.select) {
//       if (inputTextUpdate && inputColorUpdate && buttonUpdate) {
//         inputTextUpdate.disabled = false;
//         inputColorUpdate.disabled = false;
//         buttonUpdate.disabled = false;
//         void getApiCar(Number.parseInt(element.dataset.select));
//       }
//       selectCar = Number.parseInt(element.dataset.select);
//     }

//     if (classElement.match("btn-update")) {
//       const name = inputTextUpdate?.value;
//       const color = inputColorUpdate?.value;
//       void updateSelectCar(selectCar, { name, color });
//     }
//     if (classElement.match(".btn-generate_cars")) {
//       for (let index = 0; index < 100; index += 1) {
//         const name = random.generateFunction("color");
//         const color = random.generateFunction("color");

//         void createNewCar(name, color);
//         void updateGarage();
//       }
//     }

//     if (classElement.match("btn-next")) {
//       if (pageNumber * 7 <= totlaNumberCars) {
//         if (currentPageNumber !== null) {
//           currentPageNumber.innerHTML = `${(pageNumber += 1)}`;
//           void updateGarage(pageNumber);
//         }
//         if (pageNumber * 7 > totlaNumberCars) {
//           nextButton?.setAttribute("disabled", "disabled");
//           previousButton?.removeAttribute("disabled");
//         }
//       } else {
//         return;
//       }
//     }

//     if (classElement.match("btn-prev")) {
//       if (pageNumber > 1) {
//         if (currentPageNumber !== null) {
//           currentPageNumber.innerHTML = `${(pageNumber -= 1)}`;
//           void updateGarage(pageNumber);
//         }
//         if (pageNumber === 1) {
//           previousButton?.setAttribute("disabled", "disabled");
//           nextButton?.removeAttribute("disabled");
//         }
//       } else {
//         console.log("dis");
//       }
//     }

//     if (classElement.match("_start_")) {
//       const carButton = event.target;

//       if (carButton instanceof HTMLElement) {
//         const carId = Number(carButton.dataset.start);
//         const stopButton = document.querySelector(`[data-stop="${carId}"]`);
//         if (element !== null && stopButton !== null) {
//           void startCar(carId);
//           carButton.setAttribute("disabled", "disabled");
//           stopButton.removeAttribute("disabled");
//         }
//       }
//     }

//     if (classElement.match("_stop_")) {
//       const carStopButton = event.target;
//       if (carStopButton instanceof HTMLElement) {
//         const carId = Number(carStopButton.dataset.stop);
//         const startButton = document.querySelector(`[data-start="${carId}"]`);
//         if (element !== null && startButton !== null) {
//           void stopCar(carId);
//           carStopButton.setAttribute("disabled", "disabled");
//           startButton.removeAttribute("disabled");
//         }
//       }
//     }

//     if (classElement.match("btn-race")) {
//       void raceStart(pageNumber);
//       startRaceButton?.setAttribute("disabled", "disabled");
//       resetRaceButton?.removeAttribute("disabled");
//     }

//     if (classElement.match("btn-reset")) {
//       void raceStop(pageNumber);
//       resetRaceButton?.setAttribute("disabled", "disabled");
//       startRaceButton?.removeAttribute("disabled");
//     }
//   }
// }

// document?.addEventListener("click", handleEvent);

// updateGarage();
