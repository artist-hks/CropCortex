<div align="center">

<img src="https://img.shields.io/badge/Platform-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Backend-Hono%20%2B%20Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" />
<img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

# 🌾 CropCortex

### *Khet ki samajh, haath mein.*
**Your field's intelligence, in your hands.**

CropCortex is a comprehensive **AgTech digital assistant** built for Indian farmers — combining real-time agricultural intelligence, AI-powered crop diagnostics, satellite field monitoring, and live market data into a single, mobile-first, multilingual platform.

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Roadmap](#-roadmap) • [Screenshots](#-screenshots)

</div>

---

## 🚀 Features

### 👨‍⚕️ Crop Doctor
Snap a photo of a diseased or stressed plant and receive an instant AI-powered diagnosis. CropCortex analyzes the image to identify the disease, assess its severity, and recommend both **organic and chemical treatment** options — right from the field, without an agronomist.

### 📈 Mandi Prices & Market Intelligence
Never sell at the wrong price again. Track **real-time crop prices** across local mandis, visualize **30-day historical price trends**, and set **custom price alerts** so you're always notified when your crop hits the target rate.

### 🛰️ Satellite Field Monitoring
Monitor your farm's health from space. CropCortex uses **NDVI (Normalized Difference Vegetation Index)** satellite imagery to detect crop stress zones before they're even visible to the human eye — enabling early intervention and reduced losses.

### 🗓️ AI Crop Advisory
Receive **hyper-local, personalized weekly task plans** based on your crop's current growth stage and live weather forecasts. No generic advice — every recommendation is tailored to your field, your crop, and your local conditions.

### 🌍 Multilingual by Design
Built from the ground up for India. CropCortex supports multiple Indian languages including **Hindi, Marathi, Tamil, Telugu**, and more — ensuring accessibility for farmers across every region.

### 📶 Offline-First Architecture
Connectivity shouldn't limit farming intelligence. Core features remain fully functional in **low or no network areas**, syncing seamlessly in the background when a connection is restored.

---

## 🛠️ Tech Stack

### Frontend — Mobile App

| Technology | Purpose |
|---|---|
| **React Native + Expo** | Cross-platform mobile app (Android, iOS, Web) |
| **Expo Router** | File-based navigation and routing |
| **Zustand** | Lightweight global state management |
| **React Native Reanimated** | Fluid micro-animations and gesture handling |
| **React Native SVG** | Charts, graphs, and custom vector UI |
| **Vanilla StyleSheet** | Custom design system, no UI library bloat |

### Backend — API

| Technology | Purpose |
|---|---|
| **Hono** | Ultrafast, edge-native web framework |
| **Cloudflare Workers** | Serverless edge deployment, globally distributed |
| **Cloudflare Pages** | Frontend hosting and CI/CD |
| **Vite 6** | Lightning-fast dev server and bundler |
| **Wrangler** | Cloudflare CLI for development and deployment |

### Language & Tooling

| Tool | Detail |
|---|---|
| **TypeScript** | 76.6% of codebase — fully typed, safer and scalable |
| **HTML** | 23.4% — web layer via Expo web support |
| **Node.js** | v18+ required |

---

## 🏗️ Architecture

```
CropCortex/
├── cropcortex-app/               # Expo React Native Frontend
│   ├── app/                      # Expo Router — pages & layouts
│   │   ├── (tabs)/               # Bottom tab navigator
│   │   │   ├── index.tsx         # Home / Dashboard
│   │   │   ├── crop-doctor.tsx   # AI Disease Diagnosis
│   │   │   ├── mandi.tsx         # Mandi Prices & Alerts
│   │   │   ├── satellite.tsx     # NDVI Field Monitoring
│   │   │   └── advisory.tsx      # AI Weekly Advisory
│   │   └── _layout.tsx           # Root layout
│   ├── components/               # Reusable UI components
│   ├── constants/                # Theme, colors, typography tokens
│   ├── store/                    # Zustand global state slices
│   └── utils/                    # Utilities & mock data
│
├── src/
│   └── index.tsx                 # Hono backend entry point
│
├── public/static/                # Static assets
├── vite.config.ts                # Vite build config
├── wrangler.jsonc                # Cloudflare Workers config
└── package.json                  # Root — backend dependencies
```

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Native App                    │
│         (Expo Router + Zustand + Reanimated)        │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / REST
                     ▼
┌─────────────────────────────────────────────────────┐
│           Hono API — Cloudflare Workers              │
│                (Edge, globally fast)                 │
├──────────┬──────────┬──────────┬────────────────────┤
│  /doctor │  /mandi  │  /ndvi   │    /advisory        │
│  (AI)    │ (Market) │(Satellite│  (Weather + AI)     │
└──────────┴──────────┴──────────┴────────────────────┘
```

---

## 🎨 Design System

CropCortex uses a bespoke design system built for **rural visibility** and **modern aesthetics**:

| Token | Value | Meaning |
|---|---|---|
| **Primary** | `#2D6A4F` Forest Green | Growth, health, trust |
| **Accent** | `#E9C46A` Harvest Gold | Alerts, CTAs, highlights |
| **Typography** | Noto Sans | Crisp across English + all Indic scripts |
| **Style** | Glassmorphism overlays, micro-animations | Modern, intuitive feel |

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- npm or yarn
- [Expo Go](https://expo.dev/client) app on your phone (for physical device testing)

### 1. Clone the Repository

```bash
git clone https://github.com/artist-hks/CropCortex.git
cd CropCortex
```

### 2. Install Dependencies

Install backend dependencies (root):
```bash
npm install
```

Install frontend dependencies:
```bash
cd cropcortex-app
npm install
```

### 3. Run the Backend API

From the root directory:
```bash
npm run dev
```
API available at `http://localhost:5173/`

### 4. Run the Mobile App

```bash
cd cropcortex-app
npm start
```

| Command | Action |
|---|---|
| Press `w` | Open in web browser |
| Press `a` | Open in Android emulator |
| Press `i` | Open in iOS simulator |
| Scan QR | Open in Expo Go on your phone |

### 5. Deploy to Cloudflare

```bash
npm run deploy
```

---

## 🗺️ Roadmap

### Phase 1 — Foundation ✅
- [x] Project structure & monorepo setup
- [x] Expo Router navigation scaffold
- [x] Design system & theming
- [x] Zustand state management setup
- [x] Hono backend on Cloudflare Workers

### Phase 2 — Core Features 🚧
- [ ] Crop Doctor — Camera integration + AI diagnosis API
- [ ] Mandi Prices — Live price feed + chart rendering
- [ ] NDVI Satellite — Map integration + vegetation index overlay
- [ ] AI Advisory — Weather API + growth stage logic
- [ ] Custom price alerts — Push notification system

### Phase 3 — Production Ready 🔜
- [ ] Real API integrations (Agmarknet, Sentinel-2, IMD Weather)
- [ ] Offline sync engine
- [ ] Full multilingual support (i18n)
- [ ] User authentication & farm profile management
- [ ] Performance optimization & app store build

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/mandi/:crop` | Get mandi prices for a crop |
| `GET` | `/api/mandi/:crop/trends` | 30-day price history |
| `POST` | `/api/doctor/diagnose` | Upload plant image for AI diagnosis |
| `GET` | `/api/ndvi/:lat/:lng` | Satellite NDVI data for coordinates |
| `GET` | `/api/advisory/:crop/:stage` | Weekly AI advisory for crop + growth stage |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ for Indian farmers

**CropCortex** — *Khet ki samajh, haath mein.*

</div>
