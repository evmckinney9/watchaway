import { Request, Response } from 'express';
const { TmdbClient } = require('tmdb-js-wrapper');

// // Create a new instance of the TmdbClient
// get api key from server/tmdb_config.json
let tmdbConfig = require('../../../tmdb_config.json');
const tmdb = new TmdbClient(tmdbConfig.TMDB_API_KEY);

// Create a search section
const searchSection = tmdb.getSearchSection();

export const queryMovieDB = async (req: Request, res: Response) => {
    try {
        // get query string from request params
        let query = req.query.searchField;
        // perform a multiSearch
        let searchResult = await searchSection.searchMoviesAsync(query);
        searchResult = searchResult[0].results;

        //remove any results that don't have a poster or a release date
        searchResult = searchResult.filter((movie: any) => {
            return movie.poster_path !== null && movie.release_date !== '';
        });


        // send the result as an array of JSONs
        res.send(searchResult);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
};


// // Search TMDB examples
// let searchSection = tmdb.getSearchSection();
// let searchResult1 = await searchSection.searchMoviesAsync("Ocean's");
// let searchResult2 = await searchSection.searchMoviesAsync("Ocean's", 1, 1);
// let searchResult3 = await searchSection.multiSearchAsync("Ocean's");
// let searchResult4 = await searchSection.multiSearchAsync("Ocean's", 1, 2);