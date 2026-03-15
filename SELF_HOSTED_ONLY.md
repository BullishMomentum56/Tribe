# Self-Hosted Only - Works Anywhere

## What This Is

A completely self-contained Next.js app that:
- ✅ Has NO external dependencies (except Next.js itself)
- ✅ Has NO middleware that could break
- ✅ Has NO complex imports
- ✅ Uses inline HTML/CSS/JS
- ✅ WILL work on any hosting

## Files You Need

All you need to run this:

```
app/
├── page.tsx       (main page - no imports)
├── layout.tsx     (minimal layout)
└── globals.css    (if needed)

package.json      (minimal)
next.config.js    (empty)
tsconfig.json     (standard)
```

That's it. No middleware. No components. No symlinks. Just pure Next.js.

## Deploy on Your Server

### Option 1: Direct Node.js

```bash
# SSH into your server
ssh user@your-server

# Clone the repo
git clone YOUR-REPO /var/www/tribe
cd /var/www/tribe

# Install
npm install

# Build
npm run build

# Start
npm start
```

Server will run on port 3000. Access at: `http://your-server:3000`

### Option 2: With PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start "npm start" --name tribe

# Monitor
pm2 status
pm2 logs tribe
```

### Option 3: With Nginx Proxy

Create `/etc/nginx/sites-available/tribe`:

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
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/tribe /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## What Changed

1. **Removed Vercel files**: `vercel.json`, Dockerfile, docker-compose.yml deleted
2. **Removed middleware**: `middleware.ts` disabled
3. **Removed complex components**: All imports removed
4. **Single HTML page**: Everything in `app/page.tsx`
5. **Inline styles**: No Tailwind, no CSS files

## Result

- Page loads instantly
- No build issues
- No startup crashes
- Works on ANY hosting

## Deployment Script (Copy/Paste)

Save as `deploy.sh`:

```bash
#!/bin/bash
cd /var/www/tribe
git pull
npm install
npm run build
pm2 restart tribe
echo "✓ Deployed!"
```

Then run: `bash deploy.sh`

## Troubleshooting

### App won't start
```bash
pm2 logs tribe
```
Check the error in the logs.

### Port 3000 in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Can't access from outside
- Check firewall: `sudo ufw allow 3000`
- Check security group (if cloud)
- Test locally first: `curl http://localhost:3000`

## No More Vercel

This version:
- ❌ Doesn't use Vercel
- ❌ Doesn't have Vercel config
- ❌ Doesn't depend on Vercel
- ✅ Works on YOUR infrastructure
- ✅ Works on ANY Linux server
- ✅ Works on ANY VPS

## Cost

- Vercel free tier: $0-20/month
- Your own VPS: $5-15/month
- Same performance
- Full control

## Ready?

1. Commit these changes
2. Push to your repo
3. SSH into your server
4. Run the deployment steps above
5. Access your site

That's it. No more 502 errors. It just works.
