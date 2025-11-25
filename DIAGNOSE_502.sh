#!/bin/bash

# Diagnostic script for 502 errors

echo "========================================="
echo "TRIBE PROJECT 502 ERROR DIAGNOSTIC"
echo "========================================="
echo ""

# Check Node version
echo "1. Checking Node.js version..."
node_version=$(node --version)
echo "   Node: $node_version"
if [[ ! "$node_version" =~ ^v18 ]]; then
  echo "   ⚠️  WARNING: Node 18+ required"
fi
echo ""

# Check npm version
echo "2. Checking npm version..."
npm_version=$(npm --version)
echo "   npm: $npm_version"
echo ""

# Check if node_modules exists
echo "3. Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "   ✓ node_modules exists"
  npm_count=$(find node_modules -maxdepth 1 -type d | wc -l)
  echo "   Packages: $npm_count"
else
  echo "   ✗ node_modules NOT found - run: npm install"
fi
echo ""

# Check critical files
echo "4. Checking critical files..."
files=(
  "package.json"
  "next.config.js"
  "next.config.mjs"
  "tsconfig.json"
  "vercel.json"
  "app/page.tsx"
  "app/layout.tsx"
  "middleware.ts"
  "tailwind.config.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✓ $file"
  else
    echo "   ✗ $file - MISSING!"
  fi
done
echo ""

# Check if @radix-ui/react-slot is in package.json
echo "5. Checking critical dependencies in package.json..."
if grep -q "@radix-ui/react-slot" package.json; then
  echo "   ✓ @radix-ui/react-slot present"
else
  echo "   ✗ @radix-ui/react-slot MISSING!"
fi

if grep -q "autoprefixer" package.json; then
  echo "   ✓ autoprefixer present"
else
  echo "   ✗ autoprefixer MISSING!"
fi
echo ""

# Try to build
echo "6. Attempting build..."
echo "   Running: npm run build"
echo "   ========================================="

npm run build 2>&1

if [ $? -eq 0 ]; then
  echo "   ========================================="
  echo "   ✓ BUILD SUCCEEDED"
  echo ""
  echo "7. Testing server startup..."
  timeout 5 npm start &
  sleep 2
  
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✓ SERVER STARTED SUCCESSFULLY"
    echo ""
    echo "✓ APPLICATION WORKS LOCALLY"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Commit changes: git add . && git commit -m 'fix: diagnostic'"
    echo "2. Push to Vercel: git push"
    echo "3. Check Vercel logs if it still fails"
  else
    echo "   ✗ SERVER FAILED TO START"
  fi
  
  killall node 2>/dev/null
else
  echo "   ========================================="
  echo "   ✗ BUILD FAILED"
  echo ""
  echo "ERROR DETECTED - Check the error message above"
  exit 1
fi

echo ""
echo "========================================="
echo "DIAGNOSTIC COMPLETE"
echo "========================================="
