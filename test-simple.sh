#!/bin/bash

echo "🚀 Testing Tribe App"
echo "===================="
echo ""

# Clean
echo "1. Cleaning..."
rm -rf .next node_modules package-lock.json 2>/dev/null
echo "   ✓ Done"

# Install
echo "2. Installing..."
npm install --legacy-peer-deps 2>/dev/null
if [ $? -ne 0 ]; then
  echo "   ✗ Install failed"
  exit 1
fi
echo "   ✓ Done"

# Build
echo "3. Building..."
npm run build 2>/dev/null
if [ $? -ne 0 ]; then
  echo "   ✗ Build failed"
  exit 1
fi
echo "   ✓ Done"

# Start
echo "4. Starting server..."
timeout 5 npm start > /tmp/test.log 2>&1 &
PID=$!
sleep 2

# Test
echo "5. Testing..."
if curl -s http://localhost:3000 | grep -q "Whop Killer"; then
  echo "   ✓ Page loads!"
  echo ""
  echo "✅ SUCCESS - APP WORKS!"
  echo ""
  kill $PID 2>/dev/null
  killall node 2>/dev/null
else
  echo "   ✗ Page failed"
  cat /tmp/test.log
  kill $PID 2>/dev/null
  exit 1
fi
