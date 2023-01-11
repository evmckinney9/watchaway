import axios from "axios";
import { apiUrl } from "./config";
import { MovieData } from "../../../shared/MovieInfo";

// search movies from tmdb api
export async function handleSearch(searchTerm: string) {
  console.log("searching for", searchTerm);
  const response = await axios.get(apiUrl + "/queryMovieDB", {
    params: {
      searchField: searchTerm,
    },
  });
  
  // console.log("https://image.tmdb.org/t/p/w500" + response.data.poster_path);
  console.log(response.data);
  return response.data;
}

// post movie to db in body
export async function postMovie(movie: MovieData) {
  const response = await axios.post(apiUrl + "/addMovie", {
    movie: movie,
  });
  return response.data;
}

// get movies from db
export async function getMovies() {
  const response = await axios.get(apiUrl + "/getMovies");
  return response.data;
}

// clear movies from db
export async function clearMovies() {
  const response = await axios.post(apiUrl + "/clearMovies");
  return response.data;
}