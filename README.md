Welcome to watchaway, the app used to suggest movies to you based on what your friends want you to watch! With watchaway, you can join groups of people to synchronize your watch lists and share movie recommendations.

How it works:
- Post a movie to various groups you are a part of. You can also include optional notes about where you found the movie or why you want to watch it.
- Mark movies as watched and give them ratings based on how much you liked it and how good you think it is as a movie. The overall score is calculated as the average of these two ratings.
- Request movies from the groups you are a part of by pulling from movies that have been rated but haven't been marked as viewed yet.
- Add your own layer of genre tagging to movies in the app.
- Use maury-bot for Discord integration to easily access your watchaway account through Discord.
- All movie data is collected from the public database at https://thetvdb.com/.


### Setup

The backend process, which utilizes Google Firestore as its database, will be run using nodemon for automatic server restarts upon code changes. The frontend process will be started with npm start and will be available at http://localhost:3000 in development mode.

### Usage
Makefile commands:

- `make start` 
The make start command will start the backend and frontend processes for the project concurrently in detached tmux sessions. The backend process will be run in a tmux session called "backend", and the frontend process will be run in a tmux session called "web" which can be selected using `tmux attach -t "target"` and deattached from using `Ctrl+B, D`. 

- `make stop`
The make stop command will stop the backend and web processes by killing any running processes that contain the string "node" in their command line arguments, as well as any tmux sessions with the names "backend" or "web". This will effectively stop the backend and web processes started by the make start command.
