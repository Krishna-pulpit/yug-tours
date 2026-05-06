# Yug Tours & Travels — React Website

Premium travel agency website with real Unsplash photos, Framer Motion animations, and WhatsApp booking.

## Tech: React 18 + Vite + Tailwind CSS 3 + Framer Motion 11 + React Router 6

## Pages
| Route | Page |
|---|---|
| `/` | Home (hero parallax, planner, packages, destinations, reviews, FAQ) |
| `/packages` | All 10 packages with category filter |
| `/packages/:slug` | Full detail with itinerary, inclusions, sticky CTA |
| `/destinations` | 10 destinations with filter |
| `/about` | Story, values, stats, reviews |
| `/gallery` | Photo grid with lightbox |
| `/contact` | WhatsApp CTA, info, FAQ |

## 🚀 Setup (3 commands)
```bash
cd yug
npm install
npm run dev
```
Open http://localhost:5173

## 🌐 Deploy
```bash
npm run build
# Upload dist/ to Netlify, Vercel, or any hosting
```

## ✅ Customize Before Going Live
1. **WhatsApp number** — `src/data/data.js` line 1: change `919023749921`
2. **Contact info** — search `90237 49921`, `info@yugtours.in`, `Your City`
3. **Package prices** — `src/data/data.js`
4. **Reviews** — replace sample reviews in `src/data/data.js`
5. **Images** — currently using Unsplash CDN; for production, download and put in `public/images/`
