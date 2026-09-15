# 🌾 FarmConnect — Connecting Farmers Directly With Restaurants

**SIH 2026 working prototype.** A B2B agri-supply-chain platform connecting farmers, restaurants, transporters and an admin/quality layer — with no backend, no API keys, and no payment gateway required.

Built with **React + TypeScript + Vite + Tailwind CSS**, using in-memory/local-storage state so the whole demo runs entirely in the browser.

---

## ✨ What's inside

- **Landing page** with supply-chain flow, benefits, and how-it-works
- **Role select / demo login** for Farmer, Restaurant, Consumer, Transporter, Admin — no signup
- **Farmer dashboard**: list produce, quality grading, orders, notifications
- **Restaurant dashboard**: marketplace with search/filters, product detail with price comparison, order creation with live cost breakdown, Smart Matching, Demand Forecast, transparent Price Breakdown page
- **Consumer (farm-to-home) dashboard**: the same direct-from-farm marketplace sized for households — order any quantity from **1 kg to 100 kg**, quick quantity chips, doorstep-delivery fee with **free delivery above ₹499**, savings-vs-retail comparison, order tracking and simulated payment
- **Transporter dashboard**: available delivery requests, accept/reject, pickup → in-transit → delivered progress
- **Admin dashboard**: crop/farmer/restaurant/transporter verification, live analytics (recharts)
- **Order tracking** with a step-by-step timeline
- **Simulated payment** flow with farmer/transport/platform-fee breakdown
- **Judge Demo Mode** — a guided, click-through walkthrough of the entire farm-to-payment journey, built for a 3–5 minute live demo
- Demo data persists in `localStorage` across refreshes (with a "Reset demo data" button)

All statistics not derived from live session data (price-chain comparisons, monthly transaction charts, wastage-reduction %) are clearly illustrative/demo figures, as required for an honest SIH presentation.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

---

## 📦 Deploy on GitHub + Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "FarmConnect SIH 2026 prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Deploy on Vercel

**Option A — via the Vercel dashboard (recommended):**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects the **Vite** framework preset (build command `npm run build`, output directory `dist`) — this repo also ships a `vercel.json` that pins those settings explicitly
4. Click **Deploy**

**Option B — via the Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel        # first deploy, follow prompts
vercel --prod # promote to production
```

No environment variables, API keys, or database setup are required — everything runs client-side.

---

## 🗂️ Project structure

```
farmconnect/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── .gitignore
└── src/
    ├── main.tsx        # React entry point
    ├── index.css       # Tailwind directives
    └── App.tsx         # Entire application (all screens, mock data, state)
```

The prototype is intentionally kept in a single `App.tsx` for easy review during judging — every screen, mock dataset (10 farmers, 10 restaurants, 8 transporters, 10 crops, 10 seeded orders, all Hyderabad/Telangana locations), and interaction lives in one place. Feel free to split it into `src/components/*` / `src/data/*` for a production version.

---

## 🎬 Judge Demo Mode

Click **"Judge Demo Mode"** in the top bar from any screen. It steps through, in order:

1. Farmer lists 500kg Grade A tomatoes
2. Admin verifies the listing
3. Restaurant discovers it in the marketplace
4. Restaurant views full details + price comparison
5. Restaurant places an order (300kg) — cost auto-calculated
6. Transporter accepts the auto-generated delivery request
7. Pickup confirmed
8. In transit
9. Delivered
10. Payment simulated (farmer / transport / platform split)
11. Admin analytics update live

Use "Next" / "Back" to control pacing during a live pitch.

---

## 📴 Offline Support

FarmConnect is a Progressive Web App (PWA) — it keeps working with no internet connection after the first successful visit. This matters for the real use case: rural farmers often have unreliable connectivity.

**How it works:**
- A service worker (`public/sw.js`) caches the app's HTML/JS/CSS the first time it loads. On later visits — even fully offline — it serves the cached version instead of failing.
- `public/manifest.json` makes the app installable to a phone's home screen (Chrome/Edge: "Add to Home Screen" / "Install app"), so it opens full-screen like a native app.
- All data (crops, orders, mandi prices, language choice, etc.) already lives in `localStorage`, so it was offline-safe even before the service worker was added — the service worker's job is purely to make sure the *app itself* (the code) loads without a network request.

**What still needs internet, honestly:**
- The **live GPS tracking map** (OpenStreetMap embed) needs a connection to fetch map tiles — this is a different origin's resource that a service worker can't meaningfully cache in advance. The app detects this (`navigator.onLine`) and shows the raw coordinates as text with a clear "map needs internet" message instead of a broken/blank map.
- **Voice recognition** (Web Speech API) sends audio to the browser vendor's speech service in most browsers, so it also requires a connection.
- The very **first visit** to the app always needs internet, to download it in the first place — offline support means "works after that," not "works with zero downloads ever."

**Testing it:** deploy to Vercel, visit the site once, then turn on airplane mode / disable Wi-Fi and reload — the app shell should still load and all previously-saved data should still be there.

*(Note: the standalone single-file HTML build and the in-chat artifact preview don't include this service worker — a service worker requires a real HTTPS/localhost origin to register, so it only applies to the actual deployed Vercel site, not a `file://`-opened HTML file or the sandboxed chat preview.)*

---

## ⚠️ Prototype scope notes

- No real backend, database, authentication, payment gateway, or map API is used — all by design, per the brief.
- "Upload crop image" is simulated with an icon picker rather than real file storage.
- Data persists in the browser's `localStorage` for convenience between demo runs; use **Reset demo data** (bottom of the sidebar) to restore the original seed dataset.
