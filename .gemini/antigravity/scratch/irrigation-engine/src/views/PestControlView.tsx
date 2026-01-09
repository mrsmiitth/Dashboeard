import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PEST_DATABASE, type PestEntry } from '../logic/pestControl';
import {
    Bug,
    ShieldCheck,
    AlertTriangle,
    Search,
    AlertOctagon
} from 'lucide-react';


export const PestControlView: React.FC = () => {
    const { zones } = useStore();
    const [currentMonth] = useState<number>(new Date().getMonth() + 1);
    const [showAllLibrary, setShowAllLibrary] = useState(false);

    // 1. Identify active crops
    const activeCrops = useMemo(() => {
        return Array.from(new Set(zones.map(z => z.plantCategory)));
    }, [zones]);

    // 2. Filter Active Pests (Current Month)
    const activeAlerts = useMemo(() => {
        return PEST_DATABASE.filter(pest =>
            // Cast to string to avoid strict union mismatch issues if PlantCategory is wider
            (activeCrops as string[]).includes(pest.crop) &&
            pest.riskMonths.includes(currentMonth)
        );
    }, [activeCrops, currentMonth]);

    // 3. Separate by Severity
    const criticalPests = activeAlerts.filter(p => p.severity === 'Critical');
    const warningPests = activeAlerts.filter(p => p.severity !== 'Critical');

    // Month Name Helper
    const monthName = new Intl.DateTimeFormat('ar-SA', { month: 'long' }).format(new Date());

    return (
        <div className="pest-view fade-in">
            {/* Header */}
            <div className="view-header" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bug size={28} className="text-accent" /> مكافحة الآفات والوقاية
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                    تنبيهات الآفات النشطة لشهر <strong>{monthName}</strong> وسبل المكافحة
                </p>
            </div>

            {/* Active Alerts Section */}
            <section className="alerts-section">
                {activeAlerts.length === 0 ? (
                    <div className="safe-state" style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '16px',
                        padding: '2rem',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <ShieldCheck size={48} color="#22c55e" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: '#22c55e', margin: '0 0 0.5rem' }}>الوضع آمن ومستقر</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            لا توجد نشاطات وبائية حرجة مسجلة لهذا الشهر للمحاصيل المزروعة لديك.
                            <br />واصل المتابعة الدورية للنظافة والري المنتظم.
                        </p>
                    </div>
                ) : (
                    <div className="alerts-grid">
                        {/* Critical Alerts */}
                        {criticalPests.length > 0 && (
                            <div className="severity-group critical-group" style={{ marginBottom: '2rem' }}>
                                <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <AlertOctagon size={24} /> تهديدات حرجة (نشطة الآن)
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                                    {criticalPests.map((pest) => (
                                        <PestCard key={pest.id} pest={pest} isCritical />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Warning Alerts */}
                        {warningPests.length > 0 && (
                            <div className="severity-group warning-group" style={{ marginBottom: '2rem' }}>
                                <h3 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <AlertTriangle size={24} /> تنبيهات وقائية
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                                    {warningPests.map((pest) => (
                                        <PestCard key={pest.id} pest={pest} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Toggle Full Library */}
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <button
                    onClick={() => setShowAllLibrary(!showAllLibrary)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    {showAllLibrary ? 'إخفاء الدليل الشامل' : 'عرض دليل الآفات الشامل'}
                    <Search size={16} />
                </button>
            </div>

            {showAllLibrary && (
                <section className="library-section fade-in">
                    <h3 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                        سجل الآفات الكامل (حسب محاصيلك)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {PEST_DATABASE
                            .filter(p => (activeCrops as string[]).includes(p.crop) && !activeAlerts.includes(p))
                            .map(pest => (
                                <PestCard key={pest.id} pest={pest} />
                            ))
                        }
                    </div>
                </section>
            )}
        </div>
    );
};

// Internal Card Component for Cleaner Code
const PestCard: React.FC<{ pest: PestEntry, isCritical?: boolean }> = ({ pest, isCritical }) => (
    <div className={`pest-card ${isCritical ? 'critical' : ''}`} style={{
        background: isCritical ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        border: isCritical ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
    }}>
        {/* Badge */}
        <div style={{
            position: 'absolute', left: '1rem', top: '1rem',
            background: isCritical ? '#ef4444' : '#f59e0b',
            color: '#fff', fontSize: '0.75rem', fontWeight: 700,
            padding: '2px 8px', borderRadius: '4px'
        }}>
            {isCritical ? 'CRITICAL' : 'WARNING'}
        </div>

        {/* Header */}
        <div style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: isCritical ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem' }}>{pest.name}</h4>
            <span style={{ fontSize: '0.9rem', color: isCritical ? '#fca5a5' : 'var(--text-muted)', fontStyle: 'italic' }}>
                {pest.scientificName} ({pest.crop})
            </span>
        </div>

        {/* Details */}
        <div className="pest-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '2px' }}>الأعراض:</strong>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{pest.symptoms}</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#86efac', marginBottom: '4px' }}>🛡️ الوقاية:</strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{pest.prevention}</p>
            </div>

            <div style={{ background: isCritical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: isCritical ? '#fca5a5' : '#93c5fd', marginBottom: '4px' }}>💊 العلاج / المكافحة:</strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-lighter)' }}>{pest.treatment}</p>
            </div>
        </div>
    </div>
);
