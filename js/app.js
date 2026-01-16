/* 
   Main Application Entry Point
*/
import { store } from './store.js';
import { RiskBanner } from './widgets/RiskBanner.js';
import { TradingChart } from './widgets/TradingView.js';
import { OrderBook } from './widgets/OrderBook.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        console.log("Apex Strategist Pro: Initializing...");

        // 1. Mount Persistent Risk Banner
        new RiskBanner('risk-banner');

        // 2. Build Dashboard Grid
        this.renderLayout();

        // 3. Mount Widgets into generated slots
        // In a real framework, this would be dynamic. Here we map IDs.
        setTimeout(() => {
            new TradingChart('widget-chart-main');
            new OrderBook('widget-order-book');
            // Stub for other widgets
            document.getElementById('widget-positions').innerHTML = '<div class="widget-panel"><div class="widget-header">Positions</div><div class="widget-content" style="padding:10px; color:var(--text-secondary)">No active positions.</div></div>';
            document.getElementById('widget-risk-widget').innerHTML = '<div class="widget-panel"><div class="widget-header">Risk Analysis</div><div class="widget-content" style="padding:10px;"><div class="text-warn">VaR Model: Monte Carlo (10k)</div></div></div>';
        }, 50);

        // 4. Start Simulation Loop
        this.startSimulation();
    }

    renderLayout() {
        const dashboard = document.getElementById('dashboard');
        const layout = store.state.layout;

        layout.forEach(item => {
            const el = document.createElement('div');
            el.id = `widget-${item.id}`; // e.g. widget-chart-main
            el.style.gridArea = item.area;
            el.style.position = 'relative';
            dashboard.appendChild(el);
        });
    }

    startSimulation() {
        // Dr. Kane: "Markets are alive."
        setInterval(() => {
            const currentPrice = store.state.market.btcPrice;
            const volatility = (Math.random() - 0.5) * 50; // Random walk
            store.updateMarket(currentPrice + volatility);

            // Re-render chart price (quick hack for prototype)
            const priceDisplay = document.getElementById('chart-price-display');
            if (priceDisplay) {
                priceDisplay.innerText = store.state.market.btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
                priceDisplay.style.color = volatility >= 0 ? 'var(--color-accent-teal)' : 'var(--color-accent-red)';
            }
        }, 2000);
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
