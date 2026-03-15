# Minimal Deployment Debug Guide

## Problem: Still Getting 502 Errors

If you're still seeing 502 errors after all previous fixes, follow this diagnostic guide to identify the exact issue.

## Step 1: Simplify to Absolute Minimum

We've simplified the configuration to the bare minimum. Now test locally:

```bash
cd /home/engine/project
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### If Build Fails:
1. **Read the error message carefully**
2. Common build errors:
   - "Cannot find module X" - Missing dependency
   - "Type error" - TypeScript compilation error
   - "ENOENT" - File not found
   - "SyntaxError" - Code syntax error

### If Build Succeeds:
```bash
npm start
```

**Expected**: "ready - started server on 0.0.0.0:3000"

### If Server Starts:
```bash
curl http://localhost:3000
```

Should return HTML (the landing page).

---

## Step 2: Current Minimal Configuration

We've set configs to absolute minimum:

**next.config.js**:
```javascript
/** @type {import('next').NextConfig} */
module.exports = {};
```

**next.config.mjs**:
```javascript
/** @type {import('next').NextConfig} */
export default {};
```

**middleware.ts**:
```typescript
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
```

**vercel.json**:
```json
{
  "framework": "nextjs"
}
```

These are as simple as possible. If it STILL fails, the issue is in the app code itself.

---

## Step 3: Isolate the Problem

If the local build/start works but Vercel fails:

### Option A: Disable Middleware
Rename middleware file:
```bash
mv middleware.ts middleware.ts.disabled
```

Commit and push. If Vercel works now, the issue is middleware.

### Option B: Check Each Component
Comment out parts of `app/layout.tsx` and `app/page.tsx` to find which component is breaking things.

**Start with minimal page.tsx**:
```typescript
export default function Home() {
  return <div>Hello World</div>;
}
```

If this works, gradually add components back one by one.

---

## Step 4: Check Vercel Build Logs

Go to your Vercel dashboard:
1. https://vercel.com/dashboard
2. Click your project
3. Click latest deployment
4. Scroll to "Build Output"
5. Look for the actual error

**Common Vercel Errors**:

### Error: "Could not find a valid build"
- **Cause**: No `npm run build` found
- **Fix**: Ensure package.json has `"build": "next build"`

### Error: "node_modules missing dependencies"
- **Cause**: Transitive dependency conflict
- **Fix**: Try: `npm install --legacy-peer-deps`

### Error in middleware or component
- **Cause**: Runtime error
- **Fix**: Read the full error message

---

## Step 5: Nuclear Option - Strip Everything

If nothing works, strip the app to absolute bare minimum:

**app/page.tsx**:
```typescript
export default function Home() {
  return (
    <main>
      <h1>Test Page</h1>
      <p>If you see this, deployment works!</p>
    </main>
  );
}
```

**app/layout.tsx**:
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
  description: "Test",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Delete or disable:
- middleware.ts
- All components
- All styling

If THIS works on Vercel, then add things back one by one to find the culprit.

---

## Step 6: Package.json Verification

Ensure package.json is correct:

```json
{
  "name": "tribe",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.0.9",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.445.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "@radix-ui/react-slot": "^2.0.2"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
```

---

## Troubleshooting Matrix

| Scenario | Likely Cause | Solution |
|----------|--------------|----------|
| Works locally, fails on Vercel | Environment differences | Check Vercel logs |
| Fails on both | App code error | Strip to minimal, add back slowly |
| Build fails | Dependency error | Check package.json, run npm audit |
| Middleware causes 502 | Middleware error | Disable middleware |
| Import errors | Missing files | Check file paths match imports |

---

## Quick Diagnostic Tests

### Test 1: Check Node version on Vercel
Vercel uses Node 18+ by default. If you need a specific version, create `.nvmrc`:
```
18.17.0
```

### Test 2: Check npm version
Vercel uses latest npm. Usually not the issue, but ensure npm works locally:
```bash
npm --version  # Should be 8+
node --version # Should be 18+
```

### Test 3: Rebuild from scratch
```bash
git clean -fd         # Remove untracked files
npm cache clean --force
rm -rf node_modules package-lock.json .next
npm install
npm run build
npm start
```

---

## Last Resort: Start Fresh

If absolutely nothing works:

1. Create new Vercel project
2. Deploy bare Next.js app
3. Slowly add Tribe code piece by piece
4. Find which piece breaks it

Or try alternative platform:
- Netlify
- AWS Amplify
- Railway.app
- Render

---

## Information to Collect for Support

If you need help, collect:
1. The exact error from Vercel logs
2. Output of `npm run build` locally
3. Node version: `node --version`
4. npm version: `npm --version`
5. package.json contents
6. vercel.json contents
7. First 100 lines of `next.config.js`

---

## Current Status

✅ Configuration simplified to minimum
✅ Middleware simplified to minimum
✅ Next.js configs emptied out
✅ Ready for testing

**Next action**: 
1. Test locally: `npm install && npm run build && npm start`
2. If works locally, push to Vercel and check logs
3. If fails locally, check error message and debug
