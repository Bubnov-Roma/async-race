import style from "./winners.module.scss";

class WinnersUII {
  public readonly element: HTMLElement = document.createElement("main");
  // public winnersList: string;
  constructor() {
    this.createEWinnersPage();
    // this.winnersList = winnersList;
  }

  private createEWinnersPage(): HTMLElement {
    const headerHTML = `
    <header class="header">
      <div class="${style.nav}">
        <a class="${style.button} garage_btn"  href="#garage">GARAGE</a>
        <a class="${style.button} winners_btn" href="#winners">WINNERS</a>
      </div>
    </header>
    <div class="page winners-page hide">
      <h1 class="title title-winners">Winners <span class="count-winners"></span></h1>
      <h3 class="title title-winners">Page #<span class="count-page_winners">1</span></h3>

      <div class="container-winners ${style.container}">
        <table class="${style.table} table-winners">
          <thead>
            <tr>
              <th>Number</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody class="container-win">
          </tbody>
        </table>
      </div>

      <div class="${style.pagination_block} pagination-win">
        <button class="buttons btn-prev-win">Prev</button>
        <button class="buttons btn-next-win">Next</button>
      </div>

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
    this.element.className = `${style.winners} winners`;
    this.element.innerHTML = headerHTML;

    // console.log("garage", this.element);
    return this.element;
  }

  // updateWinnersList(winnersList: Object) {}
}

export const winnersPage = new WinnersUII();
