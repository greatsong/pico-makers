import { useRef, useEffect, useCallback } from 'react';

/**
 * Series colors — matches the app's Tailwind theme palette.
 * Up to 8 series are supported with distinct colors.
 */
const SERIES_COLORS = [
  '#22d3ee', // cyan
  '#fb923c', // orange
  '#4ade80', // green
  '#a78bfa', // purple
  '#f87171', // red
  '#facc15', // yellow
  '#f472b6', // pink
  '#38bdf8', // sky
];

const GRID_COLOR = 'rgba(71, 85, 105, 0.4)';   // border
const AXIS_COLOR = 'rgba(148, 163, 184, 0.6)';  // text-secondary
const BG_COLOR = '#0f172a';                       // bg-primary

/**
 * LiveChart — real-time multi-series line chart on HTML5 Canvas.
 *
 * Props:
 *   dataHistory  — array of { key: number, _ts: number }
 *   columnNames  — array of key strings to plot
 *   maxPoints    — number of most recent points to show (default 60)
 */
export default function LiveChart({ dataHistory = [], columnNames = [], maxPoints = 60 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  // Resize canvas to fill container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }, []);

  // Draw the chart
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, W, H);

    if (columnNames.length === 0 || dataHistory.length === 0) {
      // Empty state
      ctx.fillStyle = AXIS_COLOR;
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('데이터 수신 대기 중...', W / 2, H / 2);
      return;
    }

    // Chart margins
    const marginLeft = 56;
    const marginRight = 16;
    const marginTop = 12;
    const marginBottom = 28;
    const chartW = W - marginLeft - marginRight;
    const chartH = H - marginTop - marginBottom;

    // Slice data to last maxPoints
    const data = dataHistory.slice(-maxPoints);

    // Compute global min/max across all series for auto-scaling
    let globalMin = Infinity;
    let globalMax = -Infinity;

    for (const entry of data) {
      for (const col of columnNames) {
        const v = entry[col];
        if (v !== undefined && typeof v === 'number') {
          if (v < globalMin) globalMin = v;
          if (v > globalMax) globalMax = v;
        }
      }
    }

    // Add 10% padding
    if (globalMin === globalMax) {
      globalMin -= 1;
      globalMax += 1;
    }
    const range = globalMax - globalMin;
    globalMin -= range * 0.1;
    globalMax += range * 0.1;

    // Draw grid lines (5 horizontal)
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = marginTop + (chartH / 5) * i;
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(marginLeft + chartW, y);
    }
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = AXIS_COLOR;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const val = globalMax - ((globalMax - globalMin) / 5) * i;
      const y = marginTop + (chartH / 5) * i;
      ctx.fillText(formatNumber(val), marginLeft - 6, y + 4);
    }

    // Draw each data series
    columnNames.forEach((col, si) => {
      const color = SERIES_COLORS[si % SERIES_COLORS.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      let started = false;

      for (let i = 0; i < data.length; i++) {
        const v = data[i][col];
        if (v === undefined || typeof v !== 'number') continue;

        const x = marginLeft + (i / Math.max(maxPoints - 1, 1)) * chartW;
        const y = marginTop + chartH - ((v - globalMin) / (globalMax - globalMin)) * chartH;

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Glow effect for latest point
      if (data.length > 0) {
        const lastEntry = data[data.length - 1];
        const lastVal = lastEntry[col];
        if (lastVal !== undefined && typeof lastVal === 'number') {
          const x = marginLeft + ((data.length - 1) / Math.max(maxPoints - 1, 1)) * chartW;
          const y = marginTop + chartH - ((lastVal - globalMin) / (globalMax - globalMin)) * chartH;

          // Glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Solid dot
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // Legend at bottom
    const legendY = H - 8;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    let legendX = marginLeft;

    columnNames.forEach((col, si) => {
      const color = SERIES_COLORS[si % SERIES_COLORS.length];

      // Color dot
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(legendX + 5, legendY - 3, 4, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(col, legendX + 14, legendY);
      legendX += ctx.measureText(col).width + 30;
    });
  }, [dataHistory, columnNames, maxPoints]);

  // Observe resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();

    const observer = new ResizeObserver(() => {
      resizeCanvas();
      draw();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [resizeCanvas, draw]);

  // Redraw on data change
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
}

/** Format a number for Y-axis display */
function formatNumber(n) {
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  if (Math.abs(n) >= 100) return n.toFixed(0);
  if (Math.abs(n) >= 10) return n.toFixed(1);
  return n.toFixed(2);
}
