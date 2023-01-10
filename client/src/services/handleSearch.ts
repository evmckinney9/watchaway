import axios from "axios";
import { apiUrl } from "./config";

async function handleSearch(searchTerm: string) {
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

export default handleSearch;
