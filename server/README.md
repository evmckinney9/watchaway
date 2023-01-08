## Setup
Uses https://github.com/celiao/tmdbsimple/ for accessing the TMDB API. 
Install with `pip install tmdbsimple`.

Also uses https://github.com/david98hall/tmdb-js for accessing the TMDB API.
Install with `yarn add tmdb-js-wrapper`.

*Note, I had to modify the `node_modules/tmdb-js-wrapper/package.json` which had a typo in the `main` field. It should be `src/tmdb-js/tmdb-js.js` instead of `src/tmdbjs/tmdbjs.js`.*

Requires `tmdb_config.json`
```json
{
    "TMDB_API_KEY": "YOUR_API_KEY"
}
```