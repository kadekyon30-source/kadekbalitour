# VERLASKA TRAVEL — Boutique Bali Travel & Tour Services

A modern, responsive, minimalist tropical travel website for **VERLASKA TRAVEL**, offering private tours, sightseeing trips, and holiday transportation services across Bali, Indonesia.

---

## 🌴 Key Features

- **Tropical Boutique Aesthetics**: Clean, relaxing palette inspired by modern boutique travel agencies:
  - Warm White (`#FAF9F6`)
  - Soft Beige (`#EDE5D8`)
  - Tropical Green (`#526B50`)
  - Dark Charcoal (`#252923`)
  - Soft Gold (`#C6A66B`)
- **Complete Public Experience**:
  - **Hero Section**: High-resolution Bali photography with customizable headlines and CTA buttons.
  - **Popular Destinations**: Ubud, Uluwatu, Nusa Penida, Bali Waterfalls, Kintamani, Tanah Lot, Tegallalang, Ulun Danu, Seminyak, Canggu with detail modals.
  - **Tour Packages**: Private tour cards with transparent pricing modes (Fixed, Starting Price, or "Contact Us for Price"), full timelines, inclusions, exclusions, and instant WhatsApp booking.
  - **Why Choose Us**: Transparent service standards with clean human editorial numbering.
  - **Photo Gallery**: High-resolution Balinese photography with category filtering and lightbox modal.
  - **Customer Testimonials**: Clear reviews system with transparent sample indicators during development.
  - **Contact & Reservation Form**: Fully validated contact form saving directly to the backend database with instant WhatsApp forwarding.
  - **Floating WhatsApp**: One-click direct communication with international formatting and auto-filled tour context.
  - **Bilingual Ready**: Quick toggle between English and Bahasa Indonesia.
- **Owner Admin Portal**:
  - No coding needed! Modify branding, logo, colors, hero text, destinations, tour itineraries, photo gallery, reviews, and contact info directly from the dashboard.
  - Inquiries inbox to manage incoming client requests.
  - Section visibility toggles.
  - Backup & restore via one-click JSON export/import.
  - Secure PBKDF2 password authentication and session management.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Full-Stack Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Unit Tests
```bash
npm test
```

---

## 🔐 Administrator Portal Access

- **URL**: Click the shield icon in the top navigation bar or the footer link "Owner Portal Login" (or navigate to `/admin`).
- **Default Username**: `admin`
- **Default Password**: `verlaska2026!`
- **Note**: You can change this password at any time in the **Deployment & Backup** tab inside the dashboard.

---

## 🌐 100% Free Hosting & Deployment Guide

You can host this website completely free without buying a custom domain:

### Option A: Cloudflare Pages (Recommended - 100% Free, Unlimited Bandwidth)
1. Sign up for a free account at [Cloudflare](https://pages.cloudflare.com).
2. Connect your GitHub repository.
3. Set **Build command**: `npm run build`
4. Set **Build output directory**: `dist`
5. Click **Deploy**. Your site will be live instantly on a free `.pages.dev` subdomain with free SSL and global CDN.

### Option B: Vercel (100% Free Tier)
1. Sign up for a free account at [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Framework preset: **Vite**.
4. Click **Deploy**. Your site will be live on a free `.vercel.app` subdomain.

### Option C: Full-Stack Node.js (Render / Railway / Cloud Run)
- To preserve server-side inquiries and persistent file storage across server instances, run `npm run start` which launches `server.ts`.

---

## 📱 Updating Content Without Code

1. Log in to the Owner Dashboard.
2. Go to **Contact & WhatsApp**: Enter your real WhatsApp phone number (e.g. `+62 812 3456 7890`).
3. Go to **Tour Packages**: Adjust prices, add new day tours, or set packages to "Contact Us for Price".
4. Go to **Destinations**: Upload photographs or edit descriptions.
5. Click **"Save & Publish Changes"** in the top bar. Your website updates immediately!
