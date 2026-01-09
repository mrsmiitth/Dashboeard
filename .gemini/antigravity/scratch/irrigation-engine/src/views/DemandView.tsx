import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Zone } from '../types';
import { useTranslation } from '../i18n';
import { Calendar, Printer } from 'lucide-react';
import { calculateIrrigationDetails } from '../logic/waterDemand';

const Callout = ({ children, icon }: { children: React.ReactNode, icon: string }) => (
    <div style={{
        background: 'rgba(59, 130, 246, 0.1)',
        borderLeft: '4px solid #3b82f6',
        padding: '16px',
        marginBottom: '24px',
        borderRadius: '4px',
        display: 'flex',
        gap: '12px'
    }}>
        <div style={{ fontSize: '1.2rem' }}>{icon}</div>
        <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            {children}
        </div>
    </div>
);

export const DemandView: React.FC = () => {
    const { zones, waterDemands, addZone } = useStore();
    const { t, language } = useTranslation();

    // Default to current month
    const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(new Date().getMonth());

    if (zones.length === 0) {
        return (
            <div className="p-8 text-center">
                <div style={{ marginBottom: '16px', fontSize: '1.2rem', color: 'var(--text-dim)' }}>{t('nav.zones')}?</div>
                <button
                    onClick={() => {
                        const crops: Array<Omit<Zone, 'id' | 'isActive' | 'x' | 'y'>> = [
                            { name: 'Nakhil', plantCategory: 'Palm', treeCount: 55, distanceFromCenter: 50, irrigationMethod: 'Auto' },
                            { name: 'Citrus', plantCategory: 'Citrus', treeCount: 60, distanceFromCenter: 80, irrigationMethod: 'Auto' },
                            { name: 'Lawn', plantCategory: 'Lawn', treeCount: 20, distanceFromCenter: 15, irrigationMethod: 'Auto' },
                            { name: 'Olive', plantCategory: 'Olive', treeCount: 100, distanceFromCenter: 120, irrigationMethod: 'Auto' },
                            { name: 'Grape', plantCategory: 'Grape', treeCount: 60, distanceFromCenter: 100, irrigationMethod: 'Auto' }
                        ];
                        crops.forEach(c => addZone(c));
                    }}
                    style={{
                        padding: '12px 24px',
                        background: 'var(--color-primary-600)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}
                    id="btn-populate"
                >
                    + إضافة مناطق افتراضية (Add Default Zones)
                </button>
            </div>
        );
    }

    // Helper to get localized month name
    const getMonthName = (idx: number) => {
        const date = new Date(2024, idx, 1);
        return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'long' }).format(date);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{t('nav.demand')}</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={() => window.print()}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 16px',
                            background: 'var(--color-primary-600)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        <Printer size={18} />
                        {t('btn.print')}
                    </button>

                    <Calendar size={20} className="text-muted" />
                    <select
                        value={selectedMonthIdx}
                        onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-panel)',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            minWidth: '150px'
                        }}
                    >
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <option key={idx} value={idx}>{getMonthName(idx)}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Callout icon="💡">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                        <strong>للنخيل بنظام الأحواض:</strong>
                        <ul style={{ listStyleType: 'disc', paddingRight: '20px', marginTop: '4px' }}>
                            <li>الكمية اليومية: 65 لتر</li>
                            <li>الري اليومي = 65 لتر/رية</li>
                            <li>الري كل 6 أيام = 390 لتر/رية (65 × 6)</li>
                        </ul>
                    </div>
                    <div>
                        <strong>عند التطوير للري الحديث:</strong> ستستخدم الكمية اليومية مباشرة (65 لتر/يوم)
                    </div>
                </div>
            </Callout>

            <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '16px' }}>{t('lbl.zoneName')}</th>
                            <th style={{ padding: '16px' }}>{t('lbl.plantCategory')}</th>
                            <th style={{ padding: '16px' }}>{t('lbl.treeCount')}</th>
                            <th style={{ padding: '16px' }}>الكمية اليومية</th>
                            <th style={{ padding: '16px' }}>التكرار</th>
                            <th style={{ padding: '16px' }}>كمية الرية (أحواض)</th>
                            <th style={{ padding: '16px' }}>الإجمالي الشهري</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones.map((zone) => {
                            const demand = waterDemands[zone.id]?.[selectedMonthIdx];
                            // Fallback if demand hasn't been calculated yet for some reason
                            const demandVal = demand?.waterLitersPerDay || 0;

                            const details = calculateIrrigationDetails(
                                demandVal,
                                zone.plantCategory,
                                selectedMonthIdx
                            );

                            return (
                                <tr key={zone.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-primary-300)' }}>
                                        {zone.name}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        {t(`val.${zone.plantCategory.toLowerCase()}`)}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>{zone.treeCount}</td>

                                    {/* الكمية اليومية */}
                                    <td style={{ padding: '12px 16px' }}>
                                        {details.dailyAmount > 0 ? (
                                            <span>{details.dailyAmount.toFixed(1)} لتر/شجرة/يوم</span>
                                        ) : (
                                            <span className="badge-dormancy">🌙 سكون</span>
                                        )}
                                    </td>

                                    {/* التكرار */}
                                    <td style={{ padding: '12px 16px' }} className={details.frequency !== 'يومي' ? 'highlight-frequency' : ''}>
                                        <span className="frequency-badge">
                                            {details.frequency}
                                        </span>
                                    </td>

                                    {/* كمية الرية للأحواض */}
                                    <td style={{ padding: '12px 16px' }} className="session-amount">
                                        {details.sessionAmount > 0 ? (
                                            <>
                                                <strong>{details.sessionAmount}</strong> لتر/رية
                                                {details.frequency !== 'يومي' && (
                                                    <div className="note">للأحواض التقليدية</div>
                                                )}
                                            </>
                                        ) : '-'}
                                    </td>

                                    {/* الإجمالي الشهري */}
                                    <td style={{ padding: '12px 16px' }}>
                                        {(details.dailyAmount * zone.treeCount * 30).toLocaleString()} لتر
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
