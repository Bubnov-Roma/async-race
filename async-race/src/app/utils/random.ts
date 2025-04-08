import { carsList } from "./list-cars";

class Random {
  private value: string = "";
  public generateFunction = (selector: string): string | undefined => {
    const result =
      selector === "color" ? this.randomColor() : this.randomModel();
    return result;
  };

  private randomColor(): string {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let randomColor = "";
    for (let index = 1; index < 7; index += 1) {
      randomColor += array[this.random(array.length)];
    }
    this.value = randomColor;
    return `#${this.value}`;
  }

  private randomModel(): string {
    const { brand, models } = carsList[this.random(39)];
    const randomModel = this.random(models.length);
    const model = models[randomModel];
    return `${brand} ${model}`;
  }

  private random(range: number): number {
    return Math.floor(Math.random() * range);
  }
}

export const random = new Random();
