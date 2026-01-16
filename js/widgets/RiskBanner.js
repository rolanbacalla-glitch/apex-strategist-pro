/* 
   Risk Banner Component 
   "The Sentinel" - Always visible, always watching.
*/
import { store } from '../store.js';

export class RiskBanner {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.unsubscribe = store.subscribe(this.render.bind(this));
    }

    formatCurrency(val) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    }

    render(state) {
        const { portfolio, risk } = state;

        // Define status class
        let statusClass = 'status-normal';
        if (risk.status === 'WARNING') statusClass = 'status-warning';
        if (risk.status === 'CRITICAL') statusClass = 'status-critical';

        this.container.innerHTML = `
            <!-- Left Group: Portfolio Integrity -->
            <div class="risk-metric-group">
                <div class="risk-item">
                    <span class="label">Total Equity</span>
                    <span class="value">${this.formatCurrency(portfolio.totalEquity)}</span>
                </div>
                <div class="risk-item">
                    <span class="label">Day P&L</span>
                    <span class="value ${portfolio.dayPL >= 0 ? 'text-long' : 'text-short'}">
                        ${portfolio.dayPL >= 0 ? '+' : ''}${this.formatCurrency(portfolio.dayPL)} 
                        (${portfolio.dayPLPercent}%)
                    </span>
                </div>
            </div>

            <!-- Center: The Sentinel Advisory -->
            <div class="risk-metric-group">
                <div class="status-pill ${statusClass}">
                    SYSTEM STATUS: ${risk.status}
                </div>
            </div>

            <!-- Right Group: Risk Exposure -->
            <div class="risk-metric-group">
                <div class="risk-item">
                    <span class="label">Daily VaR (95%)</span>
                    <span class="value text-warn">${risk.dailyVaR}%</span>
                </div>
                <div class="risk-item">
                    <span class="label">Exposure Level</span>
                    <span class="value">${(portfolio.usedMargin / portfolio.totalEquity * 100).toFixed(1)}%</span>
                </div>
                <div class="risk-item">
                    <span class="label">Drawdown</span>
                    <span class="value text-short">-${risk.currentDrawdown}%</span>
                </div>
            </div>
        `;
    }
}
