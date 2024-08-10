#!/bin/bash

# Navigate to the v0 directory
cd v0

# Create a zip file excluding the 'frontend' directory
zip -r ../extension.zip . -x "frontend/*"

# Return to the original directory
cd ..

echo "extension.zip has been created, excluding the frontend directory."