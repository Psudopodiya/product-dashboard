#!/bin/bash

echo "🛑 Stopping and removing containers, networks, and volumes..."
docker-compose down -v
