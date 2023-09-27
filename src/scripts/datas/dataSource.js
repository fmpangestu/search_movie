class DataSource {
  static searchMovie(keyword) {
    return fetch("https://www.omdbapi.com/?apikey=487a600d&s=" + keyword)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        return response.Search;
      });
  }
}

export default DataSource;
