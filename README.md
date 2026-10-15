# 🌾 KisanSetu 2.0 — Farm2Home
### Complete Digital Agricultural Ecosystem connecting Farmers, Consumers, Rural Labour, and Machinery Providers

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-1B5E3B?logo=vercel&logoColor=white)](https://kisan-setu2-fawn.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)](https://github.com/dc3434699-spec/kisan-setu2)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 📖 1. Project Overview

**KisanSetu 2.0 (Farm2Home)** is a full-stack modern agricultural technology platform built to address systemic inefficiencies in the Indian agrarian supply chain. By disintermediating agricultural commerce, KisanSetu connects verified rural farmers directly with urban consumers, organized agricultural labour cooperatives, modern farm implement providers, and government financial subsidy schemes.

The platform provides complete transparency, guaranteed batch-level QR traceability, real-time APMC mandi intelligence, and voice-assisted AI agronomy advice in local regional languages.

---

## 🎯 2. Problem Statement & Core Value Proposition

Traditional agricultural supply chains in India involve multiple intermediaries (commission agents, aggregators, wholesalers, sub-wholesalers, and retailers). This leads to:
* **Severe Margin Erosion for Farmers:** Cultivators receive only 20%–35% of the end consumer retail price.
* **Lack of Farm-Level Traceability:** Consumers pay high prices without knowing the harvest date, chemical spray history, or geographic origin of their food.
* **Disorganized Rural Workforce:** Seasonal labour shortages leave ripe crops unharvested, while agricultural workers struggle with sporadic, informal employment.
* **Underutilized Modern Equipment:** Small and marginal landholders (under 2 hectares) cannot afford high-capital machinery like tractors, rotavators, and laser levellers.

### The KisanSetu Solution:
1. **Direct Farm2Home Marketplace:** Farmers earn 35%–45% higher realizations while consumers receive fresher produce within 12–24 hours of morning harvest.
2. **100% Verified Batch Traceability:** Every produce crate features a cryptographic batch identifier and interactive timeline detailing harvest time, field plot, soil type, and pesticide-free status.
3. **Integrated Rural Labour Cooperative Hub:** Farmers post seasonal harvesting or sowing requests; registered labour teams apply with transparent daily rates and skill badges.
4. **Machinery & Equipment Rental Portal:** Affordable pay-per-day booking for solar pumps, harvesters, and drone sprayers.
5. **Interactive Government Subsidy Calculator:** Instant eligibility assessments for PM-KISAN, PM-KUSUM Solar, and PMKSY Micro-Irrigation.
6. **Agro-Tourism & Farm Stays:** Farmers generate supplemental revenue by offering guided orchard walks and organic farming workshops with instant digital QR passes.

---

## 👥 3. Supported User Roles & Evaluator Demonstration Accounts

KisanSetu includes a **Centralized 1-Click Demo Evaluation Suite** designed specifically for university project evaluations, hackathon judging, and peer review without requiring manual registration:

| Persona & Role | Username | Demo Password | Focus & Key Modules to Test |
| :--- | :--- | :--- | :--- |
| **🌾 Rajesh Kumar Patil**<br>*(Lead Organic Farmer)* | `rajesh_farmer` | `kisan123` | **10-Module Farmer ERP:** Field plots (18 Acres), dynamic inventory CRUD (Tomatoes, Palak, Strawberries), live consumer order fulfillment, tour slots, labour requests, mandi price trends, and financial ledger. |
| **🍊 Anita Ramesh Shinde**<br>*(Fruit Orchardist & Host)* | `anita_orchards` | `kisan123` | **Konkan Orchard Suite:** 24-Acre GI-tagged Alphonso Mangoes, Bhagwa Pomegranates, and weekend agro-tourism slot management. |
| **🛒 Tanmay Rao**<br>*(Consumer Buyer)* | `tanmay123` | `kisan123` | **Consumer Journey:** Fresh produce marketplace, category filters, interactive cart with coupon codes (`KISAN50`, `FIRSTFARM`), free delivery progress meter, simulated checkout, and visual 5-stage order tracking. |
| **👷 Babanrao Shinde**<br>*(Labour Cooperative Leader)* | `suresh_worker` | `kisan123` | **Rural Workforce Portal:** Shivaji Labour Cooperative directory, 18 available workers, daily wage contracts (₹550/day), and agricultural job dispatch. |
| **🛡️ Platform Administrator**<br>*(Central Oversight Board)* | `admin` | `admin123` | **Central Oversight Command:** Ecosystem Gross Merchandise Value (GMV), 100% Aadhaar & 7/12 land KYC pipeline, and cross-platform audit analytics. |

> [!NOTE]
> All demonstration sessions run within a secure client-side sandbox. Any user can also register a fresh account with their custom farm details or reset their PIN using the simulated OTP flow (`5521`).

---

## 🛠️ 4. Technology Stack & Architectural Decisions

* **Frontend Framework:** React 19 with TypeScript 5.9 (Strict Mode)
* **Build Tooling:** Vite 8.3 with LightningCSS and Fast HMR
* **Styling & Design System:** Tailwind CSS v4 with custom agricultural design tokens:
  * Primary Forest Green: `#1B5E3B`
  * Deep Earth Accent: `#1B3B22`
  * Fresh Sage Green: `#5D7A4F`
  * Warm Cream Neutral: `#FAF9F6`
  * Soft Card Border: `#E5E0D5`
  * Amber Highlight: `#F59E0B`
* **Typography:**
  * *Newsreader* serif for editorial agricultural storytelling
  * *Plus Jakarta Sans* for clean, legible data grids and form controls
* **Icons:** Lucide React
* **Micro-Animations:** Canvas Confetti for order completion
* **State Management:** React Context API with localized reactive persistence (`localStorage` with automatic schema recovery)
* **Internationalization (i18n):** Tri-lingual localization engine:
  * English (`en`)
  * हिन्दी (Hindi — `hi`)
  * मराठी (Marathi — `mr`)
* **Rural Accessibility Suite:**
  * Outdoor high-contrast sunlight mode for bright farm fields
  * 3-tier dynamic font scaling (Normal, Large A+, X-Large A++)
  * Web Speech API SpeechSynthesis text-to-speech engine

---

## 📂 5. Project Directory Structure

```text
kisan-setu2/
├── public/
│   ├── images/
│   │   └── spinach.jpg             # Authenticated, optimized local spinach image asset
│   ├── favicon.svg                 # Agricultural brand favicon
│   ├── icons.svg                   # SVG symbol definitions
│   └── manifest.json               # Progressive Web App manifest
├── src/
│   ├── assets/                     # Static media and brand illustrations
│   ├── components/                 # Reusable UI & Interactive Modals
│   │   ├── AuthModal.tsx           # Split-screen responsive authentication modal & demo launcher
│   │   ├── CartDrawer.tsx          # Slide-over cart, coupon calculator, and simulated checkout
│   │   ├── Footer.tsx              # Comprehensive footer with Kisan Call Center 1800-180-1551
│   │   ├── KrishiMitraModal.tsx    # AI Agronomist crop disease identifier & voice TTS advisory
│   │   ├── MandiTicker.tsx         # Real APMC market live price ticker
│   │   ├── MapModal.tsx            # Interactive GIS agricultural SVG map
│   │   ├── MobileBottomNav.tsx     # 5-tab mobile-first navigation bar
│   │   ├── Navbar.tsx              # Sticky desktop header with language & role quick-switcher
│   │   ├── ProductDetailModal.tsx  # Product specs, harvest date, and nutritional profile
│   │   ├── SlotBookingModal.tsx    # Farm tour slot booking and instant QR pass generator
│   │   └── TraceabilityModal.tsx   # 5-stage farm-to-table batch journey verification
│   ├── context/                    # Centralized React Context Providers
│   │   ├── AccessibilityContext.tsx # High-contrast and font size scaling
│   │   ├── AuthContext.tsx         # Authentication, demo role switches, and secure password checks
│   │   ├── LanguageContext.tsx     # English, Hindi, and Marathi translations dictionary
│   │   └── StoreContext.tsx        # Persistent store for Products, Orders, Slots, and Ledger
│   ├── data/                       # Seed Datasets & Configurations
│   │   ├── demoAccounts.ts         # Centralized demo accounts configuration
│   │   └── initialData.ts          # Verified products, mandi rates, schemes, and labour co-ops
│   ├── pages/                      # Role-Specific Views & Portals
│   │   ├── AdminDashboardView.tsx  # Platform GMV analytics and farmer KYC oversight
│   │   ├── AgroTourismView.tsx     # Farm stay listings, itinerary, and booked passes
│   │   ├── ConsumerOrdersView.tsx  # Live order tracking and milestone timeline
│   │   ├── EquipmentMarketplaceView.tsx # Tractors, solar pumps, and drone rentals
│   │   ├── FarmerDashboardView.tsx # 10-module farmer management suite
│   │   ├── GovernmentSchemesView.tsx # PM-KISAN, PMFBY & interactive subsidy calculator
│   │   ├── HomeView.tsx            # Comprehensive agricultural landing portal
│   │   ├── LabourPortalView.tsx    # Verified agricultural worker cooperatives
│   │   ├── MarketplaceView.tsx     # Fresh produce catalog with instant carting
│   │   └── SustainabilityView.tsx  # Ecological footprint & household impact calculator
│   ├── types/                      # Comprehensive TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx                     # Main layout shell and dynamic view router
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global CSS and Tailwind directives
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 6. Installation & Local Development

### Prerequisites:
* **Node.js:** v18.0.0 or higher (Node.js 20+ recommended)
* **npm:** v9.0.0 or higher

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/dc3434699-spec/kisan-setu2.git
   cd kisan-setu2
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Run TypeScript Check & Production Build:**
   ```bash
   npm run build
   ```

5. **Preview the Production Build Locally:**
   ```bash
   npm run preview
   ```

---

## 🔒 7. Security, Privacy & Demonstration Limitations

1. **Demonstration Mode Sandbox:**
   * This evaluation build utilizes an isolated client-side storage architecture (`localStorage`) to ensure evaluator actions (adding products, placing orders, booking farm tours) update the user interface immediately without requiring backend database configuration.
   * Standard demo passwords (`kisan123` and `admin123`) are provided for ease of review.
2. **Payment Simulation Disclosure:**
   * All checkout actions, card payments, and UPI selections are simulated demonstrations. No real credit card numbers, CVVs, or financial credentials are ever requested, transmitted, or saved.
3. **Zero Hardcoded Production Secrets:**
   * The application contains zero hardcoded API keys, private keys, or private customer records.
4. **Role Isolation:**
   * Normal farmer and consumer demo sessions are blocked from accessing the administrator command portal unless authenticated with administrator credentials.

---

## 🌐 8. Live Production Deployment

* **Permanent Production URL:**  
  👉 **[https://kisan-setu2-fawn.vercel.app](https://kisan-setu2-fawn.vercel.app)**
* **Direct Deployment URL:**  
  👉 **[https://kisan-setu2-l9uyc07e9-nexus-010b.vercel.app](https://kisan-setu2-l9uyc07e9-nexus-010b.vercel.app)**
* **GitHub Repository:**  
  👉 **[https://github.com/dc3434699-spec/kisan-setu2](https://github.com/dc3434699-spec/kisan-setu2)**

Continuous Deployment (CI/CD) is configured: every commit pushed to `main` on the GitHub repository automatically triggers a build and deploys to Vercel's global CDN.

---

## 📝 9. License

This project is licensed under the [MIT License](LICENSE).
Designed and engineered for **KisanSetu 2.0 — Farm2Home**.
