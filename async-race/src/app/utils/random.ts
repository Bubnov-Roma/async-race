class Random {
  private value: string = "";
  public generateFunction = (selector: string): string | undefined => {
    const result = selector === "color" ? this.randomColor() : undefined;
    return result;
  };

  private randomColor(): string {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let randomColor = "";
    for (let index = 1; index < 7; index += 1) {
      randomColor += array[Math.floor(Math.random() * array.length)];
    }
    this.value = randomColor;
    return `#${this.value}`;
  }

  // private randomName(): string {
  //   console.log("hi from name");
  //   return "name";
  // }
}

export const random = new Random();
