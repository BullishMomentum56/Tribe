# Self-Hosted Deployment Solution

If Vercel continues to show 502 errors, use this guide to deploy on your own hosting.

## Quick Start - Deploy in 10 Minutes

### Prerequisites
- Linux server (Ubuntu recommended)
- SSH access to your server
- Domain name (optional)

### Step 1: Connect to Your Server

```bash
ssh user@your-server-ip
```

### Step 2: Install Node.js

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Step 3: Clone and Setup Project

```bash
# Create project directory
cd /var/www
git clone https://github.com/YOUR-REPO.git tribe
cd tribe

# Install dependencies
npm install

# Build
npm run build

# Test locally
npm start
```

Visit `http://localhost:3000` - Should work!

### Step 4: Use PM2 to Keep App Running

```bash
# Install PM2
sudo npm install -g pm2

# Start app with PM2
pm2 start "npm start" --name "tribe"

# Save configuration
pm2 save

# Auto-start on reboot
pm2 startup
```

### Step 5: Setup Nginx (Reverse Proxy)

```bash
# Install nginx
sudo apt-get install -y nginx

# Create config file
sudo nano /etc/nginx/sites-available/tribe
```

Paste this configuration:

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/tribe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal will be automatic
```

### Step 7: Verify It's Working

```bash
# Check PM2 status
pm2 status

# Check nginx status
sudo systemctl status nginx

# Test with curl
curl -I http://your-domain.com
```

Should return status 200 (not 502!)

---

## Troubleshooting

### App won't start
```bash
# Check logs
pm2 logs tribe

# Check if port 3000 is in use
lsof -i :3000

# Kill conflicting process
kill -9 <PID>
```

### Nginx shows 502
```bash
# Check if app is running
pm2 status

# Check app logs
pm2 logs

# Restart everything
pm2 restart tribe
sudo systemctl restart nginx
```

### Need to redeploy
```bash
cd /var/www/tribe
git pull
npm install
npm run build
pm2 restart tribe
```

---

## Docker Alternative

If you have Docker available:

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install and build
RUN npm install
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t tribe .
docker run -p 3000:3000 tribe
```

---

## Monitoring

Add these commands to your crontab for monitoring:

```bash
# Check every 5 minutes
*/5 * * * * pm2 restart tribe-if-crashed tribe

# Check logs daily
0 2 * * * pm2 logs tribe > /var/log/tribe-daily.log
```

---

## Summary

✅ **Advantages of Self-Hosting**:
- Full control
- No vendor lock-in
- Can debug issues directly
- Predictable costs
- No platform limitations

✅ **Setup Time**: 10-15 minutes
✅ **Cost**: ~$5-10/month for basic VPS
✅ **Complexity**: Medium (but worth it)

---

## Recommended VPS Providers

- **DigitalOcean**: $5/month, easy setup
- **Linode**: $5/month, reliable
- **Hetzner**: €3/month, cheap in EU
- **AWS Lightsail**: $3.50/month, reliable

All support the above setup.

---

## Need Help?

Issues and solutions:

| Issue | Solution |
|-------|----------|
| Stuck after `npm install` | Run `npm install --legacy-peer-deps` |
| Can't connect to server | Check SSH keys, firewall rules |
| Nginx 502 error | Check `pm2 logs tribe` |
| HTTPS not working | Run `sudo certbot --nginx -d domain.com` again |
| App crashes after update | Run `npm install && npm run build` |

---

## This WILL Work

The beauty of self-hosting is:
1. No mysterious platform issues
2. You control everything
3. You can debug directly
4. It's actually SIMPLER than dealing with Vercel

Follow these steps exactly and your Tribe site will be live in under 30 minutes.
