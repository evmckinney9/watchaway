import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from './config';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  const [data, setData] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  async function handleSearch() {
    console.log('searching for', searchTerm);
    const response = await axios.get(apiUrl + '/queryMovieDB', {
      params: {
        searchField: searchTerm
      }
    });
    setData(response.data);
    console.log(data);
    // console.log("https://image.tmdb.org/t/p/w500" + response.data.poster_path);
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {data && (
          <div>
            <img src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt={data.title} />
            <p>{data.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
