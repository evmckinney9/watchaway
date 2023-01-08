kill-tmux:
	pkill -f node
	tmux kill-session -t server || true
	tmux kill-session -t client || true

server-start:
	tmux new-session -d -s server 'cd server/express/ && rm -rf build && yarn start'

client-start:
	tmux new-session -d -s client 'cd client && rm -rf build && yarn start'

start: server-start client-start
	
stop: kill-tmux

default: start
