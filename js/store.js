/* 
   State Management (The Brain)
   Centralizes "Truth" about the portfolio and market risk.
*/

class Store {
    constructor() {
        this.state = {
            // User Portfolio Snapshot
            portfolio: {
                totalEquity: 254000.00, // USD
                usedMargin: 42000.00,
                cash: 180000.00,
                dayPL: -1250.00,
                dayPLPercent: -0.49,
            },
            
            // Risk Metrics (Dr. Kane's Focus)
            risk: {
                dailyVaR: 2.1, // Percent (Value at Risk)
                maxDrawdown: 15.0, // Limit
                currentDrawdown: 3.2,
                concentration: {
                    btc: 45,
                    eth: 30,
                    alts: 25 // Alert > 20%
                },
                status: 'NORMAL' // NORMAL | WARNING | CRITICAL
            },

            // Market Context
            market: {
                btcPrice: 94250.00,
                btcDominance: 52.4,
                fearGreed: 65, // Greed
                volatility: 32 // Annualized Vol
            },

            // Active Widgets Layout (Serialized)
            layout: [
                { id: 'chart-main', type: 'chart', area: '1 / 1 / 9 / 10' }, // Main chart
                { id: 'order-book', type: 'orderbook', area: '1 / 10 / 13 / 13' }, // Right sidebar
                { id: 'risk-widget', type: 'risk-depth', area: '9 / 1 / 13 / 5' }, // Bottom left
                { id: 'positions', type: 'positions', area: '9 / 5 / 13 / 10' }, // Bottom center
            ]
        };

        this.listeners = [];
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        // Fire immediately with current state
        listener(this.state);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Update state and notify listeners
    setState(partialState) {
        this.state = { ...this.state, ...partialState };
        this.notify();
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // --- Actions (Business Logic) ---

    // Simulate real-time price tick
    updateMarket(btcPrice) {
        // Recalculate P&L based on fake exposure
        const priceChange = (btcPrice - this.state.market.btcPrice) / this.state.market.btcPrice;
        const plImpact = this.state.portfolio.totalEquity * 0.45 * priceChange; // 45% BTC exposure

        this.setState({
            market: { ...this.state.market, btcPrice },
            portfolio: {
                ...this.state.portfolio,
                dayPL: this.state.portfolio.dayPL + plImpact,
                totalEquity: this.state.portfolio.totalEquity + plImpact
            }
        });
        
        this.checkRiskRules();
    }

    // The "Sentinel" Logic
    checkRiskRules() {
        const { risk, portfolio } = this.state;
        
        // Rule: If Alts > 20%, Warn
        let newStatus = 'NORMAL';
        if (risk.concentration.alts > 20) newStatus = 'WARNING';
        
        // Rule: If Daily PL < -2%, Critical
        if ((portfolio.dayPL / portfolio.totalEquity) < -0.02) newStatus = 'CRITICAL';

        if (newStatus !== risk.status) {
            this.setState({
                risk: { ...risk, status: newStatus }
            });
        }
    }
}

export const store = new Store();
