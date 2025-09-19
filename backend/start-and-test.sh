#!/usr/bin/env bash

# Start and test the backend server
set -e

echo "Starting Express server..."
cd "$(dirname "$0")"
node server.js &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 2

# Test the endpoint
echo "Testing /suggest-flow endpoint..."
curl -X POST http://localhost:5000/suggest-flow \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Log Slack messages to Notion"}' \
  | jq '.' 2>/dev/null || cat

echo -e "\n\nServer is running on port 5000 (PID: $SERVER_PID)"
echo "To stop: kill $SERVER_PID"

