# Deployment Guide for Tribe

## Project Structure Fix

This project previously used symlinks for configuration files which caused 502 errors in certain deployment environments (like nginx-based deployments). 

**Current Status**: ✅ Fixed - All configuration files are now real files at the project root.

## Real Configuration Files

The following files are now actual files (not symlinks):
- `package.json` - NPM dependencies
- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `vercel.json` - Vercel deployment configuration

Path alias symlinks that remain (these are fine):
- `components/` → `app/components/` (for imports like `@/components`)
- `lib/` → `app/components/ui/lib/` (for imports like `@/lib`)

## Deployment Environments

### Vercel

The project is optimized for Vercel deployment:

```bash
# Push to main branch (or any connected branch)
git push

# Vercel will automatically:
# 1. Install dependencies (npm install)
# 2. Build the project (npm run build)
# 3. Deploy to https://your-domain.vercel.app
```

Configuration is in `vercel.json`.

### Other Platforms (Netlify, AWS, etc.)

```bash
# Build locally
npm install
npm run build

# Start server
npm start

# Production build should:
# - Resolve all real configuration files (no symlink issues)
# - Generate .next directory
# - Ready for deployment
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy real files (not symlinks)
COPY package*.json ./
COPY next.config.mjs ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Troubleshooting

### 502 Bad Gateway

If you encounter a 502 Bad Gateway error:

1. **Check build logs** - Look for errors during `npm run build`
2. **Verify config files exist** - Ensure `package.json`, `next.config.mjs`, `tailwind.config.ts` are real files (not symlinks)
3. **Check dependencies** - Run `npm install` to ensure all dependencies are installed
4. **Verify environment** - Ensure Node.js version matches (Node 18+ recommended)

### Build Failures

Common causes:
- Missing dependencies: Run `npm install`
- TypeScript errors: Run `npm run lint` to check
- Missing files: Ensure all `app/` files are committed

### Performance Issues

To optimize:
- Enable caching in your deployment platform
- Use CDN for static assets
- Monitor with Google Search Console and analytics

## Environment Variables

For production, set these in your deployment platform:

```env
# No required variables for basic deployment
# Add custom variables as needed:
# NEXT_PUBLIC_API_URL=https://api.tribe.so
```

All `NEXT_PUBLIC_*` variables are bundled into the build.

## Domain Setup

### For HTTPS

- ✅ Vercel: Automatic SSL with custom domain
- Other platforms: Use a service like Cloudflare or AWS CloudFront

### Domain Configuration

1. Update `app/sitemap.ts` with your domain:
```typescript
url: 'https://yourdomain.com',
```

2. Update `public/robots.txt`:
```
Sitemap: https://yourdomain.com/sitemap.xml
```

3. Create DNS records pointing to your deployment platform

## Pre-deployment Checklist

- [ ] All configuration files are regular files (not symlinks)
- [ ] Dependencies in `package.json` are up to date
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes (no TypeScript errors)
- [ ] Environment variables are set
- [ ] Domain is registered and configured
- [ ] SSL/HTTPS certificate is valid
- [ ] Sitemap and robots.txt reference correct domain
- [ ] Security headers are enabled (middleware.ts)
- [ ] Git changes are committed

## Security

Before deploying to production, review:
- [SECURITY.md](./SECURITY.md) - Security best practices
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) - Security features implemented

## Support

For deployment issues:
1. Check the error message carefully
2. Review logs from your deployment platform
3. Ensure all files are properly committed to git
4. Verify Node.js version compatibility
