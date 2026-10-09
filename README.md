# Cafe Viana

Production-quality static homepage for **Cafe Viana** — cafe & artisan bakery at 139 Grant Rd, Baxter VIC 3911.

## Stack

- Next.js App Router (JavaScript)
- React
- Tailwind CSS v4
- GSAP + ScrollTrigger
- `next/image` + `next/font` (DM Serif Display, Sora, Manrope)

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Business data

All verified business content lives in `data/cafeViana.js`:

- Address, phone, hours, maps URL
- Facebook / Instagram
- Breakfast, bakery, pies, lunch, pastries, drinks
- Specials (`current: true` only rendered on the homepage)
- Gallery + feedback themes

**Prices:** all `null` until verified in store / current posts. UI shows “Ask in store”.

**Specials:** set `current: false` when a promotion ends.

## Images

Placeholders live in `public/images/cafe-viana/`.

They are temporary coloured stand-ins — **replace with real Cafe Viana photography** before launch. Alt text marks them as illustrative placeholders.

Preferred filenames match the brief (`.png` used so `next/image` can optimize correctly).

## Design notes

- Palette: oxblood plum, pistachio sage, buttercream, ash lilac, apricot → raspberry CTAs
- European cafe / artisan bakery editorial language — not an Italian restaurant claim
- Every major section uses a distinct GSAP motion treatment
- `prefers-reduced-motion` disables marquees, parallax, and long staggers
