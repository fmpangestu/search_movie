import "/src/scripts/component/mov-item.js";

class MovList extends HTMLElement {
  constructor() {
    super();
    this.listDom = this.attachShadow({ mode: "open" });
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  renderError(message) {
    this.listDom.innerHTML = "";
    this.listDom.innerHTML += `
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"/>
            <div class="alert alert-primary" role="alert">
 ${message}
</div>`;
  }

  render() {
    this.listDom.innerHTML = "";
    this._movies.forEach((movie) => {
      const movItemElement = document.createElement("movie-item");
      movItemElement.movie = movie;
      movItemElement.innerHTML = `

      <style>
            :host {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 10px; 
                overflow: hidden;
            }
      }
:host {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px; 
    overflow: hidden;
}

movie-item {
    width: 300%; 
    height: 300%; 
}
@media (max-width: 768px) {
movie-item{
width: 100%;
}

}</style>`;
      this.listDom.appendChild(movItemElement);
    });
  }
}

customElements.define("movie-list", MovList);
