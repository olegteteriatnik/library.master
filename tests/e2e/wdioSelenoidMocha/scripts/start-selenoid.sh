#!/bin/bash

set -e

echo "Generating browsers.json..."
npm run generate:browsers

echo "Cleaning up old containers..."
docker rm -f selenoid || true
docker rm -f selenoid-ui || true

echo "Starting Selenoid..."
docker run -d --name selenoid \
  -p 4444:4444 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$(pwd)/browsers.json:/etc/selenoid/browsers.json" \
  aerokube/selenoid:latest-release \
  -limit 4 \
  -conf /etc/selenoid/browsers.json \
  -timeout 3m

sleep 2

echo "Starting Selenoid UI..."
docker run -d --name selenoid-ui \
  -p 8080:8080 \
  aerokube/selenoid-ui \
  --selenoid-uri=http://172.17.0.1:4444
