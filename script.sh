#!/bin/bash

# Start Storybook on a specific port in the background
npm run storybook -- --no-open &

# Wait for Storybook to be ready (replace with a better health-check mechanism if needed)
echo "Waiting for Storybook to start..."
sleep 15

# Run interaction tests
npm run test:storybook

# Stop Storybook after tests
kill $(lsof -t -i:6006)