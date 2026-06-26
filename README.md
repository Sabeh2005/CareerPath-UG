# CareerPath UG

**Map your subjects to modern, high-earning careers.**

CareerPath UG is a Progressive Web App (PWA) built for O-Level and A-Level students in Uganda. It helps you discover modern career paths, university degree programs, and subject combinations — all fully offline.

![CareerPath UG](public/assets/CareerPath%20UG%20app%20icon.png)

---

## Features

### 🎯 Career Match Quiz
An interactive step-by-step quiz that suggests modern, high-earning careers based on your current level and subject choices. Results are saved locally and persist across sessions.

- **O-Level**: Pick your top 3 favorite subjects → get career recommendations
- **A-Level**: Select your track (Sciences, Arts, Business) and strengths → get personalized career matches

### 🗺️ Subject & Course Mapper
Map your subjects to university degrees and modern careers:

- **O-Level Mode**: Select 3 subjects → discover the best A-Level combination and the careers it unlocks
- **A-Level Mode**: Choose from 50+ UNEB-approved combinations → see recommended degree programs at Makerere and Kyambogo universities with their modern career outcomes

### 📊 Saved Results
Your quiz results are automatically saved using `localStorage`. Access them anytime from the Results tab.

### 🔍 Global Search
Quickly find specific careers, degrees, or subjects using the built-in PWA search functionality across the application.

---

## Tech Stack

- **[Vite](https://vitejs.dev/)** — Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Lit](https://lit.dev/)** — Web components framework
- **[Shoelace](https://shoelace.style/)** — UI component library (bundled locally)
- **[Workbox](https://developers.google.com/web/tools/workbox/)** — Service worker and offline caching
- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** — PWA build integration

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens the app at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Output is in the `dist/` directory with a fully precached service worker.

---

## PWA & Offline

CareerPath UG is designed for offline-first usage:

- **Precaching**: All app shell assets (HTML, JS, CSS, icons) are precached during build
- **Runtime caching**: External assets use `StaleWhileRevalidate` and `CacheFirst` strategies
- **Installable**: Full Web App Manifest with home screen shortcuts
- **Offline**: Once loaded, the app works 100% without an internet connection

---

## Icon Assets

| Asset | Size | Format |
|-------|------|--------|
| Favicon | — | SVG |
| App Icon | 48×48 – 512×512 | PNG |
| App Icon (maskable) | 512×512 | PNG |
| Splash Screen | 1284×2778 | PNG |

---

## Project Structure

```
src/
├── app-index.ts          # App shell with navigation
├── router.ts             # Client-side routing
├── types.ts              # TypeScript interfaces
├── store.ts              # localStorage persistence
├── mockData.ts           # Subject, degree, and career data
├── styles/
│   └── global.css        # Theme variables and base styles
├── components/
│   ├── header.ts         # Top navigation bar
│   └── bottom-nav.ts     # Bottom tab navigation
└── pages/
    ├── app-home.ts       # Welcome screen and home page
    ├── app-quiz.ts       # Career Match Quiz
    ├── app-mapper.ts     # Subject & Course Mapper
    └── app-results.ts    # Saved results viewer
```

---

## Team & Creators

- **Sabeh Ahmed**
- **Mufeeza Rafee**

---

## License

ISC
