# Vercel 502 Error Troubleshooting

If you're still seeing 502 Bad Gateway errors on Vercel even after the fixes, follow this guide to diagnose the issue.

## Step 1: Check Vercel Build Logs

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Click "View Logs" or expand the build output
6. **Look for error messages** during the build process

Common error messages and fixes:

### Error: "Cannot find module '@radix-ui/react-slot'"
- **Cause**: Dependency not installed
- **Fix**: Verify package.json has this line:
  ```json
  "@radix-ui/react-slot": "^2.0.2"
  ```

### Error: "Cannot find module 'autoprefixer'"
- **Cause**: Dev dependency not installed
- **Fix**: Verify package.json has:
  ```json
  "autoprefixer": "^10.4.16"
  ```

### Error: "Failed to compile"
- **Cause**: TypeScript or build error
- **Fix**: Run locally: `npm run build` and check for errors

### Error in middleware or module loading
- **Cause**: Middleware.ts or component has runtime error
- **Fix**: Check middleware.ts and component files for syntax errors

## Step 2: Test Locally

Run a complete local test:

```bash
# 1. Clear everything
rm -rf node_modules package-lock.json .next

# 2. Fresh install
npm install

# 3. Build
npm run build

# 4. Start server
npm start

# 5. Test
curl http://localhost:3000
```

If this works locally but fails on Vercel, the issue is environment-specific.

## Step 3: Force Vercel Rebuild

Sometimes Vercel caches old builds:

1. Go to Vercel dashboard
2. Click your project
3. Go to Settings → Git
4. Scroll down to "Deployments"
5. Click "Clear Build Cache"
6. Redeploy by pushing a new commit:
   ```bash
   git add .
   git commit -m "fix: trigger vercel rebuild"
   git push
   ```

## Step 4: Check Vercel Configuration

Your `vercel.json` should be:

```json
{
  "framework": "nextjs"
}
```

Nothing more needed - Vercel will auto-detect Next.js and run the build/start commands from package.json.

## Step 5: Verify package.json scripts

Check that package.json has these scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

The `build` and `start` scripts are critical for Vercel deployment.

## Step 6: Check for Runtime Errors

If the build succeeds but you get 502 when accessing the site, there's a runtime error.

Enable Vercel Function Logs:
1. Go to Deployment → "View Logs"
2. Select "Function Logs" tab
3. Access your site
4. Look for error messages

Common runtime errors:

### Error: "ENOENT: no such file or directory"
- **Cause**: Missing file during import
- **Fix**: Verify all imports exist and paths are correct

### Error in middleware execution
- **Cause**: Middleware.ts has an error
- **Fix**: Try temporarily removing middleware to test:
  - Rename `middleware.ts` to `middleware.ts.bak`
  - Push to Vercel
  - Check if site loads
  - If yes, there's a middleware error
  - Restore and debug middleware

### Module not found at runtime
- **Cause**: Dependency installed but has issue
- **Fix**: Check that import paths match exports
  - For `@radix-ui/react-slot`, verify import: `import { Slot } from "@radix-ui/react-slot"`
  - Check package version is compatible

## Step 7: Alternative: Disable Middleware

If middleware is causing issues, you can temporarily disable it:

**middleware.ts** - Rename or delete temporarily:
```bash
mv middleware.ts middleware.ts.disabled
```

Then redeploy. If the site works without middleware, you know the issue is there.

## Step 8: Check Environment

Vercel might need environment variables. Create a `.env.production.local` file (locally only, don't commit):

```env
NODE_ENV=production
```

But for a simple Next.js site, no custom env vars should be needed.

## Step 9: Verify TypeScript Configuration

Make sure `tsconfig.json` is correct:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Step 10: Last Resort - Simplify and Test

If nothing works, try a minimal deployment:

1. Temporarily remove middleware.ts
2. Simplify next.config.mjs to be empty:
   ```javascript
   export default {};
   ```
3. Keep only app/page.tsx and app/layout.tsx
4. Deploy to test

Once this minimal version works, gradually add complexity back.

## Debugging Checklist

- [ ] Checked Vercel build logs for errors
- [ ] Ran `npm run build` locally successfully
- [ ] Verified package.json has all dependencies
- [ ] Verified package.json scripts are correct
- [ ] Verified vercel.json is correct
- [ ] Cleared Vercel build cache
- [ ] Tested locally with `npm start`
- [ ] Checked for TypeScript errors
- [ ] Verified all imports are correct
- [ ] Checked Vercel function logs for runtime errors

## Quick Fixes (Try These First)

1. **Clear Vercel Cache** → Re-deploy
2. **Add `"framework": "nextjs"` to vercel.json** → Re-deploy  
3. **Remove middleware temporarily** → Test if it loads
4. **Clear local cache and rebuild**:
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```
5. **Update all dependencies**:
   ```bash
   npm update
   npm audit fix
   npm run build
   ```

## Still Having Issues?

If you've followed all steps and still see 502:

1. Check if your Vercel account has build limits (free tier has 100 hours/month)
2. Check Vercel status: https://www.vercelstatus.com
3. Try a different deployment platform (Netlify, AWS Amplify)
4. Check if there are issues with specific files or components

## When Middleware Causes 502

If the site works without middleware but fails with it, the issue is in `middleware.ts`:

**Try this minimal middleware:**
```typescript
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|public|favicon).*)"],
};
```

This does nothing but enables middleware. If this works, the security headers might be the issue. Add them back one at a time to find the culprit.

---

**After following these steps, the 502 error should be resolved!**

If not, the issue is likely:
1. A specific dependency conflict
2. A build-time or runtime error in your code
3. An environment-specific issue on Vercel

Check the Vercel logs carefully for the exact error message.
