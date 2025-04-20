#!/bin/bash

echo "🛑 Stopping and removing containers, networks, and volumes..."
docker-compose down -v
# echo "🗑️ Removing dangling images..."
# docker rmi $(docker images -f "dangling=true" -q)
# echo "🔄 Refreshing containers..."
# docker-compose down -v --remove-orphans
# echo "🧹 Cleaning up unused resources..."
# docker system prune -a -f
echo "📦 Rebuilding Docker images..."
docker-compose build
echo "🚀 Starting Docker containers..."
docker-compose up -d
