import { carView } from "./car-view";
import style from "./car.module.scss";
export const createCarElemnt = (
  id: number,
  name: string,
  color: string = "#fede00"
): string =>
  `<div class="${style.car}">
    <div class="${style.options}">
      <button class="${style.select}" data-select=${id}>Select</button>
      <button class="${style.remove}" data-remove=${id}>Remove</button>
      <h6 class="${style.title}">${name}</h6>
    </div>
    <div class="${style.control}">
      <button class="${style.start}" id="start-${id}" data-start=${id} >Start</button>
      <button class="${style.stop}" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
      <div class="${style.img}" id="car-${id}" data-car=${id}>${carView(color)}</div>
      <div class="flag"></div>
    </div>
  </div>
`;
