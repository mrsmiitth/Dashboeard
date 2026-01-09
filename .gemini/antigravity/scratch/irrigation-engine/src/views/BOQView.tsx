import React from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { Download } from 'lucide-react';

export const BOQView: React.FC = () => {
    const { boqItems, zones } = useStore();
    const { t } = useTranslation();

    const handleExport = () => {
        // Simple CSV export
        const headers = ['Category', 'Specification', 'Quantity', 'Unit', 'Zone'];
        const rows = boqItems.map(item => [
            item.category,
            item.specification,
            item.quantity,
            item.unit,
            item.zoneId ? zones.find(z => z.id === item.zoneId)?.name || 'Unknown' : 'Shared'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'boq_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{t('nav.boq.title')}</h2>
                <button
                    onClick={handleExport}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)',
                        color: 'var(--text-main)', cursor: 'pointer'
                    }}
                >
                    <Download size={16} /> {t('btn.exportCSV')}
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '12px 16px' }}>{t('th.category')}</th>
                            <th style={{ padding: '12px 16px' }}>{t('th.spec')}</th>
                            <th style={{ padding: '12px 16px' }}>{t('th.qty')}</th>
                            <th style={{ padding: '12px 16px' }}>{t('th.unit')}</th>
                            <th style={{ padding: '12px 16px' }}>{t('th.zone')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boqItems.map(item => (
                            <tr key={item.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{item.category}</td>
                                <td style={{ padding: '12px 16px', color: 'var(--text-main)' }}>{item.specification}</td>
                                <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-accent-400)' }}>{Math.ceil(item.quantity)}</td>
                                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{item.unit}</td>
                                <td style={{ padding: '12px 16px', color: 'var(--text-dim)' }}>
                                    {item.zoneId ? zones.find(z => z.id === item.zoneId)?.name : t('val.masterNetwork')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
