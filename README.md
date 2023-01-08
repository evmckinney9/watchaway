Welcome to watchaway, where you can discover new movies with the help of your friends! This app allows you to:

- Collaborate with groups, synchronizing your watch lists and sharing recommendations and ratings.
- Search within your groups to see what movies your friends are wanting to watch or have already watched and commented on, making it easy to plan movie nights.
- Analyze your data to understand the genres that your friends prefer and what your average favorite movies are.
- Mark movies as watched and rate them based on personal enjoyment and overall quality. The overall score is calculated as the average of these two ratings.
- Add your own genre tags to movies in the app.
- Integrate with Discord using maury-bot for easy access to your watchaway account.
- Access movie data from the trusted public database https://www.themoviedb.org/

![image](https://user-images.githubusercontent.com/47376937/211179252-92470a03-eef0-4c15-8ea4-8cbe0e933ef9.png)


### Setup

The backend process, which utilizes Google Firestore as its database, will be run using nodemon for automatic server restarts upon code changes. The frontend process will be started with npm start and will be available at http://localhost:3000 in development mode.

### Usage
Makefile commands:

- `make start` 
The make start command will start the backend and frontend processes for the project concurrently in detached tmux sessions. The backend process will be run in a tmux session called "server", and the frontend process will be run in a tmux session called "client" which can be selected using `tmux attach -t "target"` and deattached from using `Ctrl+B, D`. 

- `make stop`
The make stop command will stop the backend and frontend processes by killing any running processes that contain the string "node" in their command line arguments, as well as any tmux sessions with the names "server" or "client". This will effectively stop the server and client processes started by the make start command.
