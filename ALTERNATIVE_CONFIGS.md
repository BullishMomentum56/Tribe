# Alternative Configurations for 502 Fix

If the current setup still produces 502 errors, try these alternative configurations.

## Option 1: Minimal vercel.json (Current)

**File: vercel.json**
```json
{
  "framework": "nextjs"
}
```

This tells Vercel: "This is a Next.js project, figure out the rest."

Vercel will:
1. Look at package.json
2. Find `npm run build` command
3. Find `npm run start` command
4. Execute them in order

## Option 2: No vercel.json (Let Vercel Auto-Detect)

Simply **delete vercel.json** entirely.

Vercel will auto-detect the Next.js project from:
- `package.json` existence
- `next.config.js` or `next.config.mjs` existence  
- `app/` or `pages/` directory existence

**Pros**:
- Simplest approach
- No configuration needed
- Vercel uses best defaults

**Cons**:
- No custom configuration options

## Option 3: Explicit Next.js Configuration

**File: vercel.json**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

This explicitly tells Vercel what to do at each step.

## Option 4: Disable Middleware to Test

If you're getting 502 with middleware enabled, try this:

**Step 1**: Rename middleware temporarily
```bash
mv middleware.ts middleware.ts.backup
```

**Step 2**: Commit and push
```bash
git add .
git commit -m "test: temporarily disable middleware"
git push
```

**Step 3**: Check if Vercel deployment works

**Results**:
- ✅ **Works without middleware**: Middleware has an error
- ❌ **Still fails**: Issue is elsewhere (dependencies, config, code)

If works, restore middleware and debug:

**middleware.ts - Debug Version**
```typescript
import { NextResponse } from "next/server";

export function middleware() {
  console.log("Middleware running");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|public|favicon).*)"],
};
```

Then gradually add security headers back one by one.

## Option 5: Simple next.config.js

If `next.config.mjs` is causing issues, use pure CommonJS:

**File: next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone', // For better Docker/Vercel compatibility
};

module.exports = config;
```

**Delete**: `next.config.mjs`

## Option 6: Empty Configuration

If nothing works, try completely empty:

**File: next.config.js**
```javascript
module.exports = {};
```

Or don't have a next.config file at all.

This uses Next.js defaults for everything.

## Configuration Priority (Try in Order)

1. **Try Option 1** (current) - Most likely to work
2. **Try Option 2** - Delete vercel.json completely
3. **Try Option 3** - Add explicit commands to vercel.json
4. **Try Option 4** - Disable middleware to isolate the issue
5. **Try Option 5** - Simplify next.config.js
6. **Try Option 6** - Use minimal config

## For Your Virtual Host (Non-Vercel)

If deploying to your own virtual host (not Vercel):

**You need to ensure**:
1. Node.js 18+ is installed
2. npm is available
3. npm install works (no firewall blocks to npm registry)
4. npm run build succeeds
5. npm run start can bind to a port

**Steps**:
```bash
# On your server, in project directory
cd /path/to/tribe
npm install
npm run build
npm start

# Should see: "ready - started server on 0.0.0.0:3000"
```

Then configure your web server (nginx, Apache) to reverse-proxy to port 3000.

## Common Virtual Host Issues

### Issue: npm install blocked
**Solution**: Configure npm to use registry:
```bash
npm config set registry https://registry.npmjs.org/
```

### Issue: npm run build fails
**Solution**: Check Node version:
```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

### Issue: Port 3000 already in use
**Solution**: Use different port:
```bash
PORT=8080 npm start
```

Then configure nginx to proxy to 8080.

### Issue: Can't bind to port
**Solution**: Run with sudo (not recommended for production):
```bash
sudo PORT=80 npm start
```

Better: Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start "npm start" --name tribe
pm2 save
pm2 startup
```

## Recommended Setup for Virtual Host

For a production virtual host:

1. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone repository**:
   ```bash
   cd /var/www
   git clone <your-repo> tribe
   cd tribe
   ```

3. **Install & build**:
   ```bash
   npm install
   npm run build
   ```

4. **Use PM2 for management**:
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name tribe
   pm2 save
   pm2 startup
   ```

5. **Configure nginx**:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **Enable HTTPS**:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

**Try these configurations in order. One of them should resolve the 502 error!**
