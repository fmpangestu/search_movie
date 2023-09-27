import "../component/search-input.js";
import "../component/mov-list.js";
import DataSource from "../datas/dataSource.js";
// import { getMovieDetail } from "../component/movie-detail.js";

const main = () => {
  //menggunakan custom element
  const searchElement = document.querySelector("search-bar");
  const movieListElement = document.querySelector("movie-list");
  const buttonSearchClick = async () => {
    try {
      const result = await DataSource.searchMovie(searchElement.value);
      renderResult(result);
    } catch (message) {
      backResult(message);
    }
  };

  const renderResult = (result) => {
    movieListElement.movies = result;
  };

  const backResult = (message) => {
    movieListElement.renderError(message);
  };

  searchElement.clickEvent = buttonSearchClick;
};

export default main;
