# Rachnax — Landing Page

Official landing page for [rachnax.com](https://www.rachnax.com)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **Domain**: rachnax.com (via Squarespace DNS)

---

## Project Structure

```
rachnax/
├── app/
│   ├── layout.tsx       # Root layout + all SEO metadata
│   ├── page.tsx         # Main landing page (all sections)
│   ├── globals.css      # Global styles + animations
│   ├── sitemap.ts       # Auto-generates /sitemap.xml
│   └── robots.ts        # Auto-generates /robots.txt
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   └── JsonLd.tsx       # Structured data (JSON-LD)
├── public/
│   └── site.webmanifest # PWA manifest
├── vercel.json          # Vercel deployment config
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

---

## Deployment Guide

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Rachnax landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rachnax.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

### Step 3: Connect Your Domain (rachnax.com)
In Vercel project settings → Domains:
1. Add `rachnax.com` and `www.rachnax.com`
2. Vercel will show you DNS values to add

In Squarespace DNS, add:
- **A record**: `@` → `76.76.21.21` (already exists ✓)
- **CNAME record**: `www` → `cname.vercel-dns.com`

### Step 4: Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://www.rachnax.com`
3. Choose **HTML tag** verification method
4. Add the meta tag to `app/layout.tsx` in the `metadata` object:
   ```ts
   verification: {
     google: 'YOUR_GOOGLE_VERIFICATION_CODE',
   }
   ```
5. Submit sitemap: `https://www.rachnax.com/sitemap.xml`

---

## SEO Checklist

- [x] Title & meta description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] JSON-LD structured data
- [x] sitemap.xml (auto-generated)
- [x] robots.txt (auto-generated)
- [x] PWA manifest
- [x] Security headers (via vercel.json)
- [x] Canonical URL
- [x] Viewport meta
- [ ] Google HTML verification (add after getting code)
- [ ] Favicon files (add to /public)
- [ ] OG image (add /public/og-image.png — 1200×630px)

---

## To Do After Launch

1. Add real favicon files to `/public/`
2. Add OG image (`/public/og-image.png`) — 1200×630px
3. Add Google verification code to `layout.tsx`
4. Submit sitemap to Google Search Console
5. Add real social media links in `page.tsx` Footer
6. Replace `hello@rachnax.com` with real email

---

## Contact

hello@rachnax.com  
[rachnax.com](https://www.rachnax.com)
