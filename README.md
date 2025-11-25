# Tribe

Tribe — the fair Whop/Skool killer. Keep 98–100% of everything you earn. Beautiful communities, courses, real-time chat, files, events — all in one link. 0–1% fees forever. Built for creators who are tired of 30% cuts.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Font**: Google Inter

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── ui/             # Shadcn-style UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── lib/
│   │       └── utils.ts (cn() utility)
│   └── header.tsx      # Navigation header
├── layout.tsx          # Root layout with Header
├── page.tsx            # Landing page
└── globals.css         # Global Tailwind imports
```

## Development

### Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Component Library

Pre-built, reusable UI components following Shadcn patterns:

- **Button** - Primary CTA with variants (default, outline, ghost, link)
- **Card** - Container with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Badge** - Labels with variants (default, secondary, destructive, outline, purple)
- **Input** - Form text input with focus states

All components use the `cn()` utility for class merging and support dark mode.

## Adding New Pages

1. Create a directory under `app/` (e.g., `app/pricing/`)
2. Add a `page.tsx` file
3. Update Header navigation links if needed

Example:
```tsx
// app/pricing/page.tsx
export default function PricingPage() {
  return (
    <main>
      {/* Your content */}
    </main>
  );
}
```

## Key Features

- ✅ Marketing homepage with hero section
- ✅ Feature grid highlighting key benefits
- ✅ Waitlist CTA buttons
- ✅ Dark mode support (class-based)
- ✅ Responsive design (mobile-first)
- ✅ TypeScript strict mode
- ✅ Path aliases (`@/components`, `@/lib`)

## Next Steps

- [ ] Add Waitlist form with email validation
- [ ] Create Pricing page
- [ ] Add Blog/Docs section
- [ ] Implement user authentication
- [ ] Build admin dashboard
- [ ] Add API routes for data management
- [ ] Setup analytics

## License

Proprietary - Tribe Inc.
