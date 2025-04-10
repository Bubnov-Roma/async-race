import { addWinner } from "../../race/get-winner";

export let animationId = 0;
export let hasWinner: HTMLElement[] = new Array();

export const animation = (
  car: HTMLElement,
  distance: number,
  duration: number,
  isRace: boolean
): number => {
  let start = performance.now();

  // let startTime = 0;
  // const idAnime = {};
  function step(timestamp: number): void {
    if (!start) {
      start = timestamp;
    }
    const progress = (timestamp - start) / duration;
    const translate: number = progress * distance;
    car.style.transform = `translateX(${translate}px)`;

    if (progress < 1) {
      animationId = globalThis.requestAnimationFrame(step);
    }
    if (progress >= 1 && isRace && hasWinner.length === 0) {
      addWinner(car, duration);
      hasWinner.push(car);
      isRace = false;
      // if (resultRace.length === 0) addWinner(car, duration);
      // resultRace.push(car);
    }
  }
  animationId = globalThis.requestAnimationFrame(step);

  // console.log(animationId, "from animation function");
  // console.log(idAnimate);
  // idAnime.id = window.requestAnimationFrame(step);

  return animationId;
};
