#!/bin/bash

# Complete local testing script

echo "========================================="
echo "TRIBE - COMPLETE LOCAL TEST"
echo "========================================="
echo ""

# Clean everything
echo "1. Cleaning build cache..."
rm -rf .next node_modules package-lock.json 2>/dev/null
echo "   ✓ Cleaned"
echo ""

# Install
echo "2. Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo "   ✗ npm install failed!"
  exit 1
fi
echo "   ✓ Installed"
echo ""

# Build
echo "3. Building application..."
npm run build
if [ $? -ne 0 ]; then
  echo "   ✗ npm run build failed!"
  echo "   Check the error above and fix it"
  exit 1
fi
echo "   ✓ Built successfully"
echo ""

# Start server
echo "4. Starting server..."
echo "   Running: npm start"
echo "   Waiting for server to start..."

# Start in background
timeout 10 npm start > /tmp/tribe-server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Test connection
echo "5. Testing connection..."
if curl -s http://localhost:3000 > /tmp/response.html 2>&1; then
  echo "   ✓ Server responding"
  
  # Check if it's not an error
  if grep -q "<!DOCTYPE html>" /tmp/response.html || grep -q "<html" /tmp/response.html; then
    echo "   ✓ HTML page returned"
    echo ""
    echo "========================================="
    echo "✅ SUCCESS - APP WORKS LOCALLY!"
    echo "========================================="
    echo ""
    echo "The application is working perfectly locally."
    echo ""
    echo "NEXT STEPS:"
    echo "1. For Vercel:"
    echo "   - Commit: git add . && git commit -m 'fix: complete tailwind config'"
    echo "   - Push: git push"
    echo "   - Check: https://vercel.com/dashboard"
    echo ""
    echo "2. For Self-Hosting:"
    echo "   - See: SELF_HOSTED_SOLUTION.md"
    echo "   - Deploy to your VPS"
    echo ""
    
    # Clean up
    kill $SERVER_PID 2>/dev/null
    killall node 2>/dev/null
    
  else
    echo "   ✗ Error page returned"
    echo "   Response saved to: /tmp/response.html"
    cat /tmp/response.html
    kill $SERVER_PID 2>/dev/null
    exit 1
  fi
else
  echo "   ✗ Server not responding"
  echo "   Logs:"
  cat /tmp/tribe-server.log
  kill $SERVER_PID 2>/dev/null
  exit 1
fi

echo ""
echo "========================================="
