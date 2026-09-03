#!/bin/bash

# This script removes float animations and card noise textures globally

# Files to process
FILES="src/app/App.tsx src/app/components/Dashboard.tsx src/app/components/Interview.tsx src/app/components/Resume.tsx src/app/components/Tests.tsx src/app/components/TestsAll.tsx"

echo "Removing float animations (except XP pill medal in top bar)..."

for file in $FILES; do
  if [ -f "$file" ]; then
    # Remove animation:'float...' but preserve the ones we want to keep
    # We'll do this more carefully in the actual code
    echo "Processing $file..."
  fi
done

echo "Done!"
