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
        <a class="${style.button} garage_btn"  href="#garage">GARAGE</a>
        <a class="${style.button} winners_btn" href="#winners">WINNERS</a>
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
    // console.log("garage", this.element);
    return this.element;
  }
}

export const garagePage = new GarageUI();
