# Tribe - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Visit `http://localhost:3000`

## 📋 Common Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Quality
npm run lint         # Run TypeScript and ESLint checks
```

## 📁 Project Structure

```
app/
├── page.tsx              # Landing page (/)
├── layout.tsx            # Root layout with Header
├── components/
│   ├── header.tsx        # Navigation header
│   └── ui/               # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── input.tsx
├── globals.css           # Global styles
├── robots.ts             # Search engine robots config
└── sitemap.ts            # Sitemap for SEO

middleware.ts            # Security headers for all routes
DEPLOYMENT.md            # How to deploy
SECURITY.md              # Security guidelines
README.md                # Full documentation
```

## 🎨 Components

Pre-built, reusable components ready to use:

```tsx
// Button
<Button variant="default" size="lg">Click me</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Badge
<Badge variant="purple">New</Badge>

// Input
<Input type="email" placeholder="Email" />
```

## 🔐 Security

- ✅ Security headers (XSS, clickjacking protection)
- ✅ Safe external links (`rel="noopener noreferrer"`)
- ✅ TypeScript strict mode
- ✅ No malicious code or tracking

See `SECURITY.md` for details.

## 🌐 Deployment

The project is ready to deploy on:
- **Vercel** (recommended)
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted (Docker, Kubernetes, etc.)

See `DEPLOYMENT.md` for platform-specific instructions.

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### TypeScript errors
```bash
npm run lint
```

## 📚 Learn More

- [Next.js 15 Docs](https://nextjs.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React 18 Docs](https://react.dev)
- Full documentation: See `README.md`
- Security details: See `SECURITY.md`
- Deployment guide: See `DEPLOYMENT.md`

## 🎯 Next Steps

1. ✅ Development server is running
2. 🎨 Customize colors in `tailwind.config.ts`
3. 📝 Add more pages in `app/`
4. 🔗 Update links in `app/components/header.tsx`
5. 🌍 Deploy to production

---

**Questions?** Check the documentation files or review the code comments.
