#!/bin/sh

cd /app || exit

echo "INSTALLING..."
npm install --legacy-peer-
echo "FINISHED INSTALL."

npm run start
