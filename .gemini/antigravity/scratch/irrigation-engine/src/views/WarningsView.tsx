import React from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const WarningsView: React.FC = () => {
    const { zones, recommendations, waterDemands } = useStore();
    const { t } = useTranslation();

    const warnings: { id: string; type: 'warning' | 'info'; message: string; zoneName: string }[] = [];

    zones.forEach(zone => {
        const rec = recommendations[zone.id];
        const demands = waterDemands[zone.id];

        if (!rec || !demands) return;

        // Rule 1: High Friction / Pressure Loss Risk
        if (zone.distanceFromCenter > 100 && rec.pipeDiameterMm < 32) {
            warnings.push({
                id: `fric-${zone.id}`,
                type: 'warning',
                message: t('warn.msg.friction'),
                zoneName: zone.name
            });
        }

        // Rule 2: Manual Override Check
        if (rec.isOverridden) {
            warnings.push({
                id: `ovr-${zone.id}`,
                type: 'info',
                message: t('warn.msg.override'),
                zoneName: zone.name
            });
        }

        // Rule 3: Missing Inputs
        if (zone.treeCount === 0) {
            warnings.push({
                id: `tre-${zone.id}`,
                type: 'warning',
                message: t('warn.msg.zeroTrees'),
                zoneName: zone.name
            });
        }
    });

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>{t('nav.warnings')}</h2>

            {warnings.length === 0 ? (
                <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-accent-400)' }}>
                    <CheckCircle size={48} style={{ marginBottom: '16px', opacity: 0.8 }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t('warn.nominal')}</h3>
                    <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>{t('warn.noRisks')}</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {warnings.map(w => (
                        <div key={w.id} className="glass-panel" style={{
                            padding: '16px',
                            borderLeft: w.type === 'warning' ? '4px solid var(--hue-danger)' : '4px solid var(--color-primary-400)',
                            display: 'flex', gap: '16px', alignItems: 'flex-start'
                        }}>
                            <AlertTriangle size={24} color={w.type === 'warning' ? '#ef4444' : '#60a5fa'} />
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                                    {w.zoneName} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>— {w.type === 'warning' ? t('lbl.warning') : t('lbl.note')}</span>
                                </div>
                                <p style={{ color: 'var(--text-main)' }}>{w.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
