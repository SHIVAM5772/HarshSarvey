# Harsh Survey Consultancy

## Admin login and Google Sheets enquiries

The `/admin` dashboard supports a MongoDB-backed admin username/password and registered Google accounts. The profile menu lets admins change their password and create another admin.
Use [admin setup](docs/ADMIN_SETUP.md) to create `RamKumar` in `Harsh.user` with a hashed password.
Quote and contact forms save to a private Google Sheet through server API routes.
**MongoDB Atlas setup is required for login; Google Sheets setup is required for enquiry saving.**
Follow [the setup guide](docs/GOOGLE_SETUP.md) and fill `.env.local` using `.env.example`.
Never commit private keys. Without configuration, submissions show a useful error rather than a fake success message.
Run `npm test` for access-policy, input-validation and request-security checks (Node.js 22.18+).

Official Multi-Page Corporate Portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🧭 Multi-Page Route Architecture

Harsh Survey Consultancy has been organized into dedicated, individual pages:

| Route | Page Name | Purpose & Highlights |
| :--- | :--- | :--- |
| **`/`** | **Home** | High-impact hero, real stats counter, consulting summary, featured projects, scope estimator |
| **`/about`** | **About Us** | 15+ years history since 2009, founder Ram Kumar MD, solar engineering services, core values, legal entity specs |
| **`/services`** | **Services Spectrum** | Deep-dive into all 8+ services: Topography, Highways/PMGSY DPR, Pipelines, Railways, Transmission, Urban Drainage & CADD |
| **`/solar`** | **Solar Services** | Clean Energy & Geotechnical Hub: Turnkey Solar Plant Installation, 5x5m Gridding, certified Soil SBC Testing, MMS Pile Pull-Out |
| **`/projects`** | **Project Database** | 50+ landmark projects with live search bar, category filters (Solar, Highways, Rail, Gas, Transmission), and modal preview |
| **`/equipment`** | **Hardware Fleet** | Hemisphere DGPS, 6x Topcon Total Stations, Sokkia Auto Levels, Magellan GPS, Soil Core Rigs & CAD Workstations |
| **`/team`** | **Our Team** | Detailed bios of Ram Kumar (MD), Rama Shankar Upreti, Suraj Singh, Senior Surveyors |
| **`/clients`** | **Clients & PSUs** | PSU & MNC partnerships (L&T Power, GAIL, Sterling & Wilson, PGCIL, PMGSY, UP Jal Nigam, HFCL) & compliance norms |
| **`/contact`** | **Contact & Quote** | Interactive Scope & Turnaround Estimator (with 1-click WhatsApp quote), Agra HQ address & direct hotline |

---

## 🌓 Dark Mode & Light Mode

- **Dual-Theme Support**: Instant 1-click toggle between Dark Mode (Default Luxury Deep Navy/Slate) and Light Mode (Clean Architectural Ivory/White).
- **Persistent Preference**: Automatically saves your choice in `localStorage` (`harsh-theme`).
- **Anti-FOUC**: Pre-hydration script prevents any flash of incorrect theme on initial page load.
- **Accessible Toggle Button**: Located in the top navigation bar and mobile drawer.

---

## 🛠️ How to Run

1. **Development Mode**:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

2. **Production Build & Start**:
```bash
npm run build
npm start
```

---

## 📍 Registered Head Office
- **Address**: Harsh House, Plot No: 169, VPO: Deori, Deori Agra, Uttar Pradesh - 282009, India
- **Contact (Ram Kumar - MD)**: +91 9411692001, +91 7351982876
- **Emails**: harshsurveyconsultancy@gmail.com | ram2010agra@gmail.com
