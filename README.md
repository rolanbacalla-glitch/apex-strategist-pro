# Apex Strategist Pro

**A Risk-First Institutional Trading Interface**

Designed under the philosophy of **Dr. Elias Kane**, Apex Strategist Pro prioritizes capital preservation, risk visibility, and non-gamified data density.

## 🚀 Features

- **The Sentinel Risk Banner**: Persistent, top-level visibility of Portoflio VaR (Value at Risk) and Drawdown.
- **Institutional Design System**: "Apex Dark" theme (Charcoal/Teal) designed for 12-hour shifts, not dopamine hits.
- **Modular Dashboard**:
  - **Trading Chart**: Custom Canvas-based candlestick visualization.
  - **Order Book**: Real-time DOM (Depth of Market) simulation.
  - **Risk Logic**: Automated status changes (Normal -> Critical) based on P&L simulation.
- **Zero Dependencies**: Built with high-performance Vanilla JS and CSS Variables. No framework overhead.

## 🛠️ Architecture

- `index.html`: Application Shell.
- `js/store.js`: Central State Management (Observer Pattern).
- `js/widgets/`: Modular component logic.
- `css/`: CSS Variables and Grid Layouts.

## 🌍 Deployment

### Vercel (Recommended)
This project is configured for Vercel.

1.  Push this repository to GitHub.
2.  Import the repository in your Vercel Dashboard.
3.  **Framework Preset**: Select "Other" or "Static".
4.  **Root Directory**: `./` (Default).
5.  Deploy.

### Local Development
Double-click `index.html` or use any static server:
```bash
npx serve .
```

---
*Verified by Dr. Elias Kane / Antigravity Agent*
