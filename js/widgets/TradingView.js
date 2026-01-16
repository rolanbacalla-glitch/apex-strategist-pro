/* 
   Trading Chart Widget
   Simulates a professional TradingView instance.
*/
export class TradingChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Clean up any existing content
        this.container.innerHTML = '';
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="widget-panel" style="height: 100%;">
                <div class="widget-header">
                    <span>BTC/USD Perpetual</span>
                    <div style="display: flex; gap: 8px;">
                        <span class="text-tertiary">1H</span>
                        <span class="text-primary">4H</span>
                        <span class="text-tertiary">1D</span>
                    </div>
                </div>
                <div class="widget-content" style="background: #131722; position: relative; overflow: hidden;">
                    <!-- Price Overlay -->
                    <div style="position: absolute; top: 10px; left: 10px; z-index: 5; font-family: monospace;">
                        <div style="font-size: 24px; color: var(--color-accent-teal);" id="chart-price-display">94,250.00</div>
                        <div style="font-size: 11px; color: var(--text-secondary);">Vol 42.1K BTC</div>
                    </div>
                    
                    <!-- Canvas for drawing candles -->
                    <canvas id="chart-canvas" style="width: 100%; height: 100%;"></canvas>
                </div>
            </div>
        `;

        this.initCanvas();
    }

    initCanvas() {
        const canvas = this.container.querySelector('#chart-canvas');
        const ctx = canvas.getContext('2d');

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        this.drawCandles(ctx, rect.width, rect.height);

        // Simple resize observer
        window.addEventListener('resize', () => {
            // In a real app we'd debounce this
            const newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width * dpr;
            canvas.height = newRect.height * dpr;
            ctx.scale(dpr, dpr);
            this.drawCandles(ctx, newRect.width, newRect.height);
        });
    }

    drawCandles(ctx, width, height) {
        // Mock Data Generator
        let price = 94000;
        const candles = [];
        const count = 60;
        const barWidth = (width / count) * 0.7;
        const spacing = (width / count) * 0.3;

        for (let i = 0; i < count; i++) {
            const move = (Math.random() - 0.45) * 200;
            const open = price;
            const close = price + move;
            const high = Math.max(open, close) + Math.random() * 100;
            const low = Math.min(open, close) - Math.random() * 100;
            candles.push({ open, close, high, low });
            price = close;
        }

        // Normalize to height
        const minPrice = Math.min(...candles.map(c => c.low));
        const maxPrice = Math.max(...candles.map(c => c.high));
        const range = maxPrice - minPrice;

        candles.forEach((c, i) => {
            const x = i * (barWidth + spacing);
            const isGreen = c.close >= c.open;

            // Map price to Y (inverted because 0 is top)
            const yOpen = height - ((c.open - minPrice) / range) * (height * 0.8) - (height * 0.1);
            const yClose = height - ((c.close - minPrice) / range) * (height * 0.8) - (height * 0.1);
            const yHigh = height - ((c.high - minPrice) / range) * (height * 0.8) - (height * 0.1);
            const yLow = height - ((c.low - minPrice) / range) * (height * 0.8) - (height * 0.1);

            ctx.fillStyle = isGreen ? '#00ce9b' : '#ff3b30';
            ctx.strokeStyle = ctx.fillStyle;

            // Wick
            ctx.beginPath();
            ctx.moveTo(x + barWidth / 2, yHigh);
            ctx.lineTo(x + barWidth / 2, yLow);
            ctx.stroke();

            // Body
            const bodyHeight = Math.max(Math.abs(yOpen - yClose), 1);
            ctx.fillRect(x, Math.min(yOpen, yClose), barWidth, bodyHeight);
        });
    }
}
