# 🐼 Panda Easy Kitchen

> **"Small Gadgets. Easier Everyday Living."**

A complete, premium, mobile-first e-commerce web application for **Panda Easy Kitchen**, an Indian brand dedicated to practical, high-utility home and kitchen gadgets (cordless car vacuum cleaners, electric wireless choppers, smart odor-lock trash cans, automatic water dispensers, cable organizers, and more).

Targeted specifically at Indian customers with **Indian Rupee (₹) pricing**, **Cash on Delivery (COD)**, **real-time 6-digit PIN code serviceability validation**, **7-day replacement guarantee**, and **secure backend order persistence**.

---

## 🎨 Design Philosophy & Reference Translation

- **Homepage Architecture (Inspired by [WTFproof](https://wtfproof.framer.website/))**:
  - Punchy, high-confidence hero: *"Goodbye, everyday little hassles."*
  - Interactive **Problem → Panda Solution** comparison grid (contrasting messy daily Indian household chores with instant 5-second Panda fixes).
  - Editorial typography with **Plus Jakarta Sans**, generous whitespace, and restrained micro-interactions.
  - Zero fake urgency, zero tacky countdown timers, and genuine customer feedback.

- **Product Page Layout (Inspired by [Lightpod](https://lightpod.framer.website/))**:
  - Image-led layout with multi-angle gallery, interactive thumbnail switcher, and zoom preview.
  - Transparent pricing with realistic MRP discounts, GST inclusion notices, and real-time COD PIN-code checker.
  - Comprehensive tabbed technical deep-dive:
    - **Technical Specifications** (dimensions, suction power, battery capacity, materials)
    - **What's in the Box** (itemized checklists)
    - **Usage & Step-by-Step Instructions**
    - **Care, Safety & 7-Day Replacement Policy**
  - Sticky mobile Add to Cart bar on scroll.

- **Brand Restrained Color Palette**:
  - **Warm Off-White**: `#F8F7F2` (Body surface)
  - **Charcoal**: `#20211F` (Headings, primary buttons, accents)
  - **Panda Green**: `#A7C957` (Brand identity, feature highlights, badges)
  - **Soft Sage**: `#E6EBD9` (Secondary containers, pill tags, subtle borders)
  - **Forest Green**: `#2D5A27` / `#386641` (High-contrast text on light surfaces)
  - **Terracotta**: `#C8553D` (Sale highlight tags)
  - **White**: `#FFFFFF` (Card surfaces)

---

## 🚀 Key Features

### 1. Indian E-Commerce Essentials
- **Full Indian Rupee (₹) Localization**: All catalog prices, discounts, delivery calculations, and tax invoices are formatted in INR (`en-IN`).
- **Cash on Delivery (COD)**: 100% available across all serviceable Indian postal PIN codes with zero advance deposit.
- **PIN Code Checker**: Real-time validation of 6-digit Indian Postal PIN codes (e.g., `560001` Bengaluru, `110001` Delhi, `400001` Mumbai) with delivery speed estimates (1-2 days metro, 3-4 days all-India).
- **Free Shipping Meter**: Dynamic progress bar unlocking free delivery for orders above ₹499 (nominal ₹49 fee for smaller orders).
- **Coupon Code Engine**: Fully working promo codes:
  - `PANDA100` — ₹100 flat discount on orders ₹499+
  - `WELCOME10` — 10% discount on orders ₹299+
  - `FESTIVE200` — ₹200 flat discount on orders ₹1,499+

### 2. Multi-Step Checkout & Backend Persistence
- **Contact Details**: Name, Indian Mobile Number (`+91` validation, 10 digits starting with 6-9), and Email.
- **Address Form**: Flat/House No., Street/Area/Locality, Landmark, City, State/UT dropdown (all 28 states & 8 UTs), and 6-digit PIN code.
- **Payment Options**: Cash on Delivery (COD) or Instant Online UPI / Cards / Netbanking.
- **Real Backend Order Generation**: Submits to Express backend `/api/orders`, generates a unique tracking reference (`PEK-2026-XXXX`), prevents duplicate submissions, and persists records in `server/data/orders.json`.
- **Order Confirmation & Invoice**: Celebratory confetti blast, itemized breakdown, printable tax invoice, and live carrier tracking timeline.

### 3. Catalog & Products
Includes complete, authentic specifications and multi-angle photography for 8 flagship gadgets:
1. **Panda TurboClean Pro Cordless Car & Desk Vacuum** (9000Pa suction, 120W motor, Type-C charging, washable HEPA)
2. **Panda SwiftChop 250ml Wireless Electric Chopper** (304 stainless steel tri-blades, one-touch pulse, waterproof)
3. **Panda AutoSeal Motion-Sensor Mini Trash Can (14L)** (0.3s infrared sensor, airtight odor-lock seal, slim profile)
4. **Panda AquaPure Automatic Electric Water Dispenser Pump** (Fits standard 20L cans, food-grade silicone hose, USB-C)
5. **Panda CableNest 7-Piece Magnetic Silicone Cable Organizers** (3M residue-free adhesive, fits up to 6.8mm cables)
6. **Panda FreshPreserve 2-in-1 Handheld Bag Sealer & Cutter** (Thermal micro-wire, built-in fridge magnet)
7. **Panda SpinDry 360° Rotating Triangular Dust Mop** (1.3m telescopic pole, washable microfiber + chenille pads)
8. **Panda StackTidy 2-Tier Sliding Under-Sink Organizer** (Powder-coated rustproof carbon steel, pull-out drawer)

---

## 🛠️ Project Structure

```
panda easy kitchen/
├── public/
│   ├── images/
│   │   └── panda-logo.jpg     # Brand logo (uploaded panda chef mascot)
│   ├── robots.txt             # SEO crawler directives
│   └── sitemap.xml            # XML sitemap for Google/Bing indexing
├── server/
│   ├── data/
│   │   └── orders.json        # Persistent order database
│   └── index.js               # Express fullstack backend (API + static SPA serving)
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── CartDrawer.tsx     # Slide-over cart with free shipping meter
│   │       ├── Footer.tsx         # Brand footer, trust badges, newsletter
│   │       ├── Navbar.tsx         # Responsive header, search & cart badges
│   │       ├── PincodeChecker.tsx # Indian PIN code delivery & COD checker
│   │       ├── ProductCard.tsx    # Modern product card with quick add
│   │       ├── ScrollToTop.tsx    # Route change scroll reset
│   │       └── SearchModal.tsx    # Instant reactive search overlay
│   ├── context/
│   │   ├── CartContext.tsx        # Cart state, quantities, coupon logic
│   │   └── ToastContext.tsx       # Floating toast notifications
│   ├── data/
│   │   └── products.ts            # Authentic gadget specs, benefits & reviews
│   ├── pages/
│   │   ├── AboutPage.tsx          # Brand story, Bengaluru hub, 4 pillars
│   │   ├── CartPage.tsx           # Full cart review & calculation
│   │   ├── CheckoutPage.tsx       # Indian address & COD checkout flow
│   │   ├── ContactPage.tsx        # WhatsApp support & contact form
│   │   ├── FAQPage.tsx            # Categorized FAQ
│   │   ├── HomePage.tsx           # WTFproof-inspired homepage
│   │   ├── OrderConfirmationPage.tsx # Confetti, invoice print, tracking
│   │   ├── PolicyPage.tsx         # Shipping, 7-Day Replacement, Privacy, Terms
│   │   ├── ProductDetailPage.tsx  # Lightpod-inspired product layout
│   │   ├── ShopPage.tsx           # Category & price filters, sorting
│   │   └── TrackOrderPage.tsx     # Real-time order lookup by ID/Mobile
│   ├── types/
│   │   └── index.ts               # Complete TypeScript data definitions
│   ├── App.tsx                    # Multi-page router configuration
│   ├── index.css                  # Tailwind styles & animations
│   └── main.tsx                   # React 18 bootstrap
├── dist/                          # Production bundle (HTML, JS, CSS)
├── package.json                   # Dependencies & build scripts
├── tailwind.config.js             # Brand palette & typography
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler & API proxy config
```

---

## 💻 How to Run

### Development Mode (with Live Hot Module Reloading):
```powershell
# Set path to local Node if not globally installed
$env:PATH = "$PWD\.tools\nodejs;" + $env:PATH

# Start backend API (Terminal 1)
node server/index.js

# Start frontend Vite dev server (Terminal 2)
npm run dev
```

### Production Fullstack Server (Single Command):
```powershell
$env:PATH = "$PWD\.tools\nodejs;" + $env:PATH

# Run fullstack server on port 3001
node server/index.js
```
Open your browser at: **`http://localhost:3001`** (or **`http://127.0.0.1:3001`**)

---

## 🔒 Security & Quality Assurance Checklist

- ✅ **No Fake Urgency**: No countdown timers or simulated "only 1 left" alerts.
- ✅ **Tested for Indian Conditions**: Verified 10-digit mobile number validation, 6-digit PIN code delivery checks, and all Indian States/UTs.
- ✅ **Real Backend Creation**: Real orders are saved and trackable by Order ID (`PEK-2026-XXXX`) or mobile number.
- ✅ **100% Responsive**: Tested on mobile viewport, tablet, and desktop viewports.
- ✅ **Production Build Verified**: Passes `tsc && vite build` with zero compiler errors.
