#!/bin/bash

# Number of times to run
COUNT=15

# Loop
for ((i=1;i<=COUNT;i++)); do
  echo "Run #$i"
  node sendeos.js
done

