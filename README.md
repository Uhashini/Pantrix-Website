# Pantrix — Project Portal & Research Showcase

> **An Explainable Expense, Nutrition, and Muscle Intelligence System for Complex Bills**  
> *Final Year Capstone Research & Engineering Portal*

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Ready-success?style=for-the-badge&logo=github)](https://uhashini.github.io/Pantrix-Website/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Anime.js v4](https://img.shields.io/badge/Anime.js-v4.5.0%20(createMotionPath)-red.svg?style=for-the-badge)](https://animejs.com)

---

## 🌟 Overview

**Pantrix** transforms dead paper grocery receipts into continuous, 360-degree behavioral intelligence across three simultaneous dimensions:
1. **Save Money:** EWMA expenditure baselines, Isolation Forest anomaly detection, SHAP-explained overspending, and store-brand swaps.
2. **Eat Healthy:** UN FAO NOVA ultra-processed food ratio (Groups 1–4) and micronutrient diversity tracking.
3. **Gain Muscle:** Grams of bioavailable protein per rupee spent, amino acid profile (BCAAs/EAAs), and weekly target tracking.

This website serves as the official project portal, scientific documentation explorer, and high-conversion Play Store style landing page for final-year project reviews.

---

## 🚀 Key Portal Features

- **Anime.js v4 `createMotionPath` SVG Animations**:
  - Orbital SVG motion path encircling the 3D smartphone chassis with glowing data tokens (`#heroMotionToken1`, `#heroMotionToken2`, `#heroMotionToken3`).
  - High-speed 9-stage pipeline bezier highway with animated tensor packets (`STAGE-1`, `OCR+LLM`, `SHAP`).
- **Interactive 3D Smartphone Device Mirror**:
  - Responsive perspective gyro/mouse-tilt chassis mirroring the native React Native mobile app.
  - Interactive screen tabs with real receipt line items, scanning laser beam, and dynamic Guarded LLM explanations.
- **The Modern Consumer's Dilemma**:
  - Side-by-side interactive split comparing the broken, fragmented manual typing reality against the unified 5-second Pantrix paradigm.
- **9-Stage Architecture & Live Simulation Runner**:
  - Stage 1: CLAHE Lighting & 4-Point Homography Perspective Warp (OpenCV)
  - Stage 2: Text Polygon Detection (DB-Net) & Character Recognition (CRNN-CTC) (PaddleOCR)
  - Stage 3: Coordinate Normalization (0–1000 Grid) & Optical Token Separation
  - Stage 4: Multimodal Spatial Transformer & Y-Axis Row Clustering (LayoutLMv3)
  - Stage 5: Human-in-the-Loop Digital Table Reconstruction (100% Data Fidelity)
  - Stage 6: Hybrid Food Database Matching (RapidFuzz Syntactic + SentenceTransformers Neural)
  - Stage 7: Behavioral Baseline Tracking (Pandas EWMA $\alpha=0.3$)
  - Stage 8: Anomaly Detection (Isolation Forest) & Feature Attribution (SHAP TreeExplainer)
  - Stage 9: Natural Language Delivery with Deterministic Prompt Guardrails (Gemini / Llama 3)
  - Interactive *Run Live Pipeline Simulation* stepper button walking through each stage.
- **Tri-Mode Lifestyle Engine**:
  - Interactive tab switcher between *Save Money*, *Eat Healthy*, and *Gain Muscle*.
  - Live budget slider with instant recalculation of spending variance and animated SHAP waterfall attribution bars.
- **End-to-End Demonstration Player**:
  - Chapter-based preview showcasing Camera Dewarping, LayoutLMv3 Token Extraction, Human Verification Table, and SHAP Insights.
- **Interactive REST API & Schema Explorer**:
  - Interactive Postman-style viewer for `/api/v1/receipt/upload`, `/api/v1/analytics/save-money`, `/api/v1/explain/shap`, and `/api/v1/analytics/nutrition` with copyable cURLs and live JSON schemas.
- **Tailored User Personas (Play Store Style)**:
  - Budget-Conscious Households, Gym & Fitness Athletes, Health-Focused Eaters, and PG/Hostel Students.

---

## 🌐 Instant Hosting & Deployment

The portal is built as a zero-dependency, high-performance static web application that can be hosted instantly:

### Option 1: GitHub Pages (Recommended — 1 Click)
1. Go to your GitHub repository: `https://github.com/Uhashini/Pantrix-Website`
2. Click **Settings** $\rightarrow$ **Pages** (under Code and automation).
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Within 60 seconds, your site is live at:  
   `https://uhashini.github.io/Pantrix-Website/`

*Main System Repository*: [`https://github.com/Uhashini/An-Explainable-Expense-Analysis-System-for-Complex-Bills`](https://github.com/Uhashini/An-Explainable-Expense-Analysis-System-for-Complex-Bills)

### Option 2: Vercel / Netlify
1. Connect your repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Set build command to empty and publish directory to `./`.
3. Click **Deploy**.

### Option 3: Local Development
Simply open `index.html` in any browser, or run:
```bash
# Python local server
python -m http.server 8080

# Or Node npx serve
npx serve .
```

---

## 👥 Research & Engineering Team

- **Uhashini** — *Lead Architect &bull; Computer Vision & Deep Learning*  
  OpenCV CLAHE & 4-Point Homography, PaddleOCR, LayoutLMv3 Multimodal Transformer fine-tuning.
- **Banda Vyshnavisai** — *Lead Full-Stack Mobile & Explainable AI Engineer*  
  React Native cross-platform mobile frontend, EWMA baseline drift, Isolation Forest, and SHAP TreeExplainer module.
- **Academic Advisors & Guides** — *Department of Computer Science & Engineering*

---

## 📜 License
Licensed under the [MIT License](LICENSE).
