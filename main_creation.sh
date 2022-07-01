#!/usr/bin/env bash

rm -rf DynamoDBApp/main.js
node_modules/.bin/webpack ./DynamoDBApp/add_data.mjs --mode development --target web -o main.js
mv main.js DynamoDBApp
