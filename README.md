# 🌾 CropCortex

**Khet ki samajh, haath mein.** (Your field's intelligence, in your hands.)

CropCortex is a comprehensive AgTech digital assistant designed to empower farmers with data-driven insights. It combines a lightweight, blazingly fast backend with a beautiful, responsive mobile-first frontend to deliver real-time agricultural intelligence directly to farmers.

---

## 🚀 Features

- **👨‍⚕️ Crop Doctor**: Snap a photo of a sick plant and instantly receive AI-powered disease diagnosis, severity assessment, and both organic and chemical treatment recommendations.
- **📈 Mandi Prices & Market Trends**: Track real-time crop prices across local mandis, view 30-day historical trends, and set custom price alerts.
- **🛰️ Satellite Field Monitoring**: Monitor your field's health using NDVI (Normalized Difference Vegetation Index) satellite imagery to detect stress before it becomes visible to the naked eye.
- **🗓️ AI Crop Advisory**: Receive hyper-local, personalized weekly tasks and crop advisories based on weather forecasts and your crop's growth stage.
- **🌍 Multilingual First**: Built from the ground up to support multiple Indian languages (English, Hindi, Marathi, Tamil, Telugu, etc.) for ultimate accessibility.
- **📶 Offline Support**: Essential features remain accessible even in areas with poor network connectivity, gracefully syncing when reconnected.

---

## 🛠️ Technology Stack

CropCortex is built using a modern, scalable architecture:

### Frontend (Mobile App)
- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing**: Expo Router (File-based routing)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: React Native Reanimated & React Native SVG
- **Styling**: Custom Design System (Vanilla StyleSheet)

### Backend (API)
- **Framework**: [Hono](https://hono.dev/) - Ultrafast web framework
- **Deployment**: Designed for Cloudflare Workers (Edge Computing)

---

## 📦 Project Structure

```
CropCortex/
├── cropcortex-app/       # Expo React Native Frontend
│   ├── app/              # Expo Router pages & layouts
│   ├── components/       # Reusable UI components
│   ├── constants/        # Theme, colors, typography
│   ├── store/            # Zustand global state
│   └── utils/            # Utilities & mock data
├── src/                  # Hono Backend Source
│   └── index.tsx         # Backend entry point
└── public/               # Static assets
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn
- Expo Go app on your mobile device (optional, for physical device testing)

### 1. Clone & Install Dependencies
First, install the backend dependencies:
```bash
npm install
```

Then, navigate to the mobile app directory and install its dependencies:
```bash
cd cropcortex-app
npm install
```

### 2. Run the Backend API
From the root directory, start the Hono development server:
```bash
npm run dev
```
The API will be available at `http://localhost:5173/`.

### 3. Run the Mobile App
Open a new terminal, navigate to the app directory, and start Expo:
```bash
cd cropcortex-app
npm start
```
- Press **`w`** in the terminal to open the app in a web browser.
- Press **`a`** to open in an Android emulator.
- Press **`i`** to open in an iOS simulator.
- Or scan the QR code with the **Expo Go** app on your phone!

---

## 🎨 Design System

CropCortex utilizes a bespoke design system tailored for rural visibility and modern aesthetics:
- **Primary Color**: Forest Green (`#2D6A4F`) - Symbolizing growth and health.
- **Accent Color**: Harvest Gold (`#E9C46A`) - For alerts and interactive elements.
- **Typography**: Noto Sans - Ensuring crisp readability across English and Indic scripts.
- **Aesthetics**: Subtle micro-animations, glassmorphism overlays, and intuitive iconography.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
