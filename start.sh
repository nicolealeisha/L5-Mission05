#! /bin/sh
# source: https://stackoverflow.com/questions/37954868/how-can-i-split-my-screen-in-3-using-tmux-from-a-bash-script 

# SERVER
cd backend
tmux new-session -d npm run start

# FRONTEND
cd ../frontend
tmux split-window -v npm run start


# TEST RUNNER
# cd ../frontend
tmux split-pane -v pwd

# Make all three panes the same size
tmux select-layout even-vertical

# Now attach to the window
tmux attach-session