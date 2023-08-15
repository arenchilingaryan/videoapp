#!/bin/bash

chmod +x /path/to/your/project-root/bin/dev.sh

for port in 27017 6379 9200 5601 7474 7687 8080; do
  pid=$(lsof -ti tcp:$port)
  if [ -n "$pid" ]; then
    echo "Killing process on port $port with PID $pid"
    kill -9 $pid
  fi
done

echo "Setting up development environment..."
cross-env NODE_ENV=development docker-compose up -d

echo "Generating prisma..."
npx prisma generate

echo "Starting the application..."
nodemon ../src/index.ts

echo "Done!"