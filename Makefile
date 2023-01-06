kill-tmux:
	pkill -f node
	tmux kill-session -t backend || true
	tmux kill-session -t web || true

backend-start:
	tmux new-session -d -s backend 'cd backend && rm -rf build && yarn start'

web-start:
	tmux new-session -d -s web 'cd web && rm -rf build && yarn start'

start: backend-start web-start
	
stop: kill-tmux

default: start
