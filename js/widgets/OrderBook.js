/*
   Order Book Widget
   Visualizing Depth and Flow.
*/

export class OrderBook {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        // Generate Mock Depth
        const asks = this.generateLevels(94255, 15, 'ask').reverse();
        const bids = this.generateLevels(94245, 15, 'bid');

        this.container.innerHTML = `
            <div class="widget-panel" style="height: 100%;">
                 <div class="widget-header">
                    <span>Order Book</span>
                    <span class="text-secondary text-sm">Grouping 0.5</span>
                </div>
                <div class="widget-content" style="display: flex; flex-direction: column;">
                    
                    <!-- Header -->
                    <div style="display: flex; justify-content: space-between; padding: 4px 8px; border-bottom: 1px solid var(--color-border); color: var(--text-tertiary); font-size: 10px;">
                        <span>Price (USD)</span>
                        <span>Size (BTC)</span>
                    </div>

                    <!-- Asks (Sellers) -->
                    <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end;">
                        ${asks.map(l => this.renderRow(l, 'ask')).join('')}
                    </div>

                    <!-- Spread -->
                    <div style="padding: 4px 8px; background: rgba(255,255,255,0.02); text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
                        94,250.00
                        <span style="font-size: 10px; color: var(--text-secondary); margin-left: 8px;">$10.00 Spread</span>
                    </div>

                    <!-- Bids (Buyers) -->
                    <div style="flex: 1; overflow: hidden;">
                         ${bids.map(l => this.renderRow(l, 'bid')).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    generateLevels(startPrice, count, type) {
        let levels = [];
        let price = startPrice;
        for (let i = 0; i < count; i++) {
            price = type === 'ask' ? price + Math.random() * 5 : price - Math.random() * 5;
            levels.push({
                price: price.toFixed(1),
                size: (Math.random() * 2).toFixed(4),
                total: (Math.random() * 10).toFixed(2) // Cumulative
            });
        }
        return levels;
    }

    renderRow(level, type) {
        const colorClass = type === 'ask' ? 'ask-text' : 'bid-text';
        // Visual depth bar (simple gradient background could be added here)
        return `
            <div class="book-row">
                <span class="${colorClass}">${level.price}</span>
                <span style="color: var(--text-primary);">${level.size}</span>
            </div>
        `;
    }
}
