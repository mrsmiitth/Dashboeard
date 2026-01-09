import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { Move } from 'lucide-react';

export const SimulationView: React.FC = () => {
    const { zones, center, updateZone, mapScale } = useStore();
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Interaction State
    const [draggingZoneId, setDraggingZoneId] = useState<string | null>(null);

    // Draw Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Full Resize
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }

        const cx = canvas.width / 2; // Center of screen = Irrigation Center
        const cy = canvas.height / 2;

        // 1. Clear
        // Detect theme for background?
        const theme = document.documentElement.getAttribute('data-theme');
        ctx.fillStyle = theme === 'light' ? '#e2e8f0' : '#0f141a'; // Grid bg
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Grid Lines (10m grid)
        ctx.strokeStyle = theme === 'light' ? '#cbd5e1' : '#1e293b';
        ctx.lineWidth = 1;
        const gridSize = 10 * mapScale; // 10 meters * scale

        // Vertical grid
        for (let x = cx % gridSize; x < canvas.width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        // Horizontal grid
        for (let y = cy % gridSize; y < canvas.height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // 3. Draw Center
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = theme === 'light' ? '#000' : '#fff';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(center.name, cx, cy - 25);

        // 4. Draw Zones
        zones.forEach(zone => {
            if (!zone.isActive) return;

            // coordinates are relative to center (0,0)
            const zoneScreenX = cx + zone.x;
            const zoneScreenY = cy + zone.y;

            // Pipe Line
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(zoneScreenX, zoneScreenY);
            ctx.stroke();

            // Zone Node
            ctx.fillStyle = zone.plantCategory === 'Fruit' ? '#10b981' : '#f59e0b';
            ctx.beginPath();
            ctx.arc(zoneScreenX, zoneScreenY, 12, 0, Math.PI * 2);
            ctx.fill();

            // Selection Highlight
            if (zone.id === draggingZoneId) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Labels
            ctx.fillStyle = theme === 'light' ? '#334155' : '#ccc';
            ctx.font = '12px Inter';
            ctx.fillText(zone.name, zoneScreenX, zoneScreenY + 28);

            // Distance Label on line
            const midX = (cx + zoneScreenX) / 2;
            const midY = (cy + zoneScreenY) / 2;
            ctx.fillStyle = theme === 'light' ? '#475569' : '#94a3b8';
            ctx.fillText(`${zone.distanceFromCenter}m`, midX, midY);
        });

    }, [zones, center, mapScale, draggingZoneId]);

    // Mouse Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Check hit test on zones
        // reverse traverse to get top-most?
        for (const zone of zones) {
            const zx = cx + zone.x;
            const zy = cy + zone.y;
            const dist = Math.sqrt((x - zx) ** 2 + (y - zy) ** 2);
            if (dist < 20) { // Hit radius
                setDraggingZoneId(zone.id);
                return;
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingZoneId) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        // New relative position
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const newRelX = mouseX - cx;
        const newRelY = mouseY - cy;

        updateZone(draggingZoneId, { x: newRelX, y: newRelY });
    };

    const handleMouseUp = () => {
        setDraggingZoneId(null);
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{t('nav.simulation')}</h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Move size={16} />
                    <span>{t('lbl.dragHint')}</span>
                </div>
            </div>

            <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', cursor: draggingZoneId ? 'grabbing' : 'default' }}>
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </div>
        </div>
    );
};
