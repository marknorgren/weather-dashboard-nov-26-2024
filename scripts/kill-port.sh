#!/bin/bash

PORT=5175

# Find and kill process using port 5175
pid=$(lsof -t -i:$PORT)

if [ ! -z "$pid" ]; then
    echo "Killing process using port $PORT (PID: $pid)"
    kill -9 $pid
    echo "Process killed successfully"
else
    echo "No process found using port $PORT"
fi
