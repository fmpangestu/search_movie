class MovItem extends HTMLElement {
  constructor() {
    super();
    this.movDom = this.attachShadow({ mode: "open" });
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    if (this._movie) {
      this.movDom.innerHTML = `
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"/>
          <style>
          .card{
          background-color: #183d3d;
          width: 300px;
          height: 33em;
          }
          img{
          height: 80%;
          }
          .card-subtitle{
          justify-content: space-between;
          display: flex;
          color: #5a8172;
          font-style: italic;
          opacity: 50%;
          }
          .card-title{
          color:#040D12;
          }
          .btn{
          background-color: #040D12;
          color: #5a8172;
          transition: background-color 0.3s, color 0.3s;
          }
          .btn:hover{
          background-color: #5a8172;
          color: #040D12;;
          }
          @media (max-width: 768px) {
          .card{
          width:50%;
          left: 25%;
          
          }
          img{
          height: 400px;
          }
             .card-subtitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
           }
            .btn{
            position: relative;
            top: 15%;
            }
            .modal-body{
            width: 80px;
            height: 100px;
            }
          }
                      @media (max-width: 480px) {
            .card{
            width: 80%;
            height: 10%;
            left: 30px;
            flex-direction: column;
            }
            img{
            height: 380px;
            }
              .card-subtitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
  }
            .btn{
            position: relative;
            top: 10%;
            }
            }
</style>
        <div class="col-md-4 my-3">
          <div class="card">
            <img src="${this._movie.Poster}" class="card-img-top custom-img" alt="">
            <div class="card-body">
              <h5 class="card-title">${this._movie.Title}</h5>
              <h6 class="card-subtitle mb-2">${this._movie.Year}
              <a href="#" class="btn modal-detail" data-bs-toggle="modal"
                data-bs-target="#movieModal" data-imdbid="${this._movie.imdbID}">
                Detail
                </a>
              </h6>
            </div>
          </div>
        </div>
      `;

      const modalDetailButton = this.movDom.querySelector(".modal-detail");
      if (modalDetailButton) {
        modalDetailButton.addEventListener(
          "click",
          this.handleButtonClick.bind(this),
        );
      }
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    if (e.target.classList.contains("modal-detail")) {
      const moveId = e.target.dataset.imdbid;
      this.getMovieDetail(moveId).then((movieDetail) => {
        this.updateDetail(movieDetail);
      });
    }
  }
  //
  getMovieDetail(moveId) {
    return fetch("https://www.omdbapi.com/?apikey=487a600d&i=" + moveId)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((movieDetail) => {
        if (movieDetail.Response === "False") {
          throw new Error(movieDetail.Error);
        }
        return movieDetail;
      });
  }

  //   //
  updateDetail(movieDetail) {
    const modal = document.querySelector("#movieModal");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    modalTitle.textContent = `${movieDetail.Title} (${movieDetail.Year})`;
    modalBody.innerHTML = `
<style>
.modal-content{
background-color: #183D3D;
color: #5a8172;
}
.list-group ul,
.list-group li{
background-color: #5a8172;
color: #040D12;
}</style>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${movieDetail.Poster}" style="border-radius: 9px"  alt="" class="img-fluid">
            </div>
            <div class="col-md group">
              <ul class="list-group">
                <li class="list-group-item"><h4>${movieDetail.Title}</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${movieDetail.Director}</li>
                <li class="list-group-item"><strong>Actor : </strong> ${movieDetail.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong> ${movieDetail.Writer}</li>
                <li class="list-group-item"><strong>Release :</strong> ${movieDetail.Released}</li>
                <li class="list-group-item"><strong>Plot :</strong> ${movieDetail.Plot}</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
}

customElements.define("movie-item", MovItem);
