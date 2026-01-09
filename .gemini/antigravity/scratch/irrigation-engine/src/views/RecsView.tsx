import React from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { CheckCircle, Calendar, Droplet, AlertTriangle } from 'lucide-react';

export const RecsView: React.FC = () => {
    const { zones, recommendations, updateRecommendation, waterDemands, center } = useStore();
    const { t, language } = useTranslation();

    if (zones.length === 0) return <div className="p-8">{t('nav.zones')}?</div>;

    const currentMonthIdx = new Date().getMonth();
    const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Ideally map these names too! But let's stick to core labels first. 'Jan' is usually understood or we use digits.
    // Or updated in DemandView already.

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>{t('nav.recs')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {zones.map(zone => {
                    const rec = recommendations[zone.id];
                    const demandProfile = waterDemands[zone.id];
                    const curDemand = demandProfile ? demandProfile[currentMonthIdx] : null;

                    if (!rec) return null;

                    // Check if this uses the specific Hail Schedule
                    const isScheduleCrop = ['Palm', 'Olive', 'Citrus', 'Grape', 'Lawn'].includes(zone.plantCategory);

                    return (
                        <div key={zone.id} className="glass-panel" style={{ padding: '24px', position: 'relative', borderTop: '4px solid var(--color-accent-500)' }}>
                            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{zone.name}</h3>
                                {rec.isOverridden && <span style={{ fontSize: '0.75rem', color: 'var(--hue-warning)', border: '1px solid goldenrod', padding: '2px 6px', borderRadius: '4px' }}>{t('lbl.modified')}</span>}
                            </div>

                            {/* SCHEDULE SUMMARY (New Priority) */}
                            {isScheduleCrop && curDemand && (
                                <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--color-primary-800)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary-400)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-primary-300)', fontWeight: 600 }}>
                                        <Calendar size={16} /> {t('lbl.currentSchedule')} ({MONTH_NAMES[currentMonthIdx]})
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Droplet size={14} className="text-accent" />
                                        {curDemand.amountRange || curDemand.amountPerSession} L
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        {language === 'ar'
                                            ? curDemand.frequencyDescription?.split('/')[1]
                                            : curDemand.frequencyDescription?.split('/')[0]}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('lbl.method')}</label>
                                    <div style={{ fontWeight: 600, color: 'var(--color-primary-300)' }}>{rec.method}</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('lbl.pipeDiameter')}</label>
                                    <input
                                        type="number"
                                        value={rec.pipeDiameterMm}
                                        onChange={(e) => updateRecommendation(zone.id, { pipeDiameterMm: Number(e.target.value) })}
                                        style={{ width: '80px', padding: '4px', textAlign: 'right', borderRadius: '4px', border: '1px solid var(--border-active)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                                    />
                                </div>

                                {/* RUNTIME CALCULATOR (User Requested Feature) */}
                                <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--color-accent-400)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle size={14} /> {t('lbl.calcRuntime')}
                                    </h4>

                                    {/* 1. Emitter Flow Rate Input */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('lbl.flowRate')}</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {center.defaultFlowRate && !rec.flowRatePerEmitter && (
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                                    (Default: {center.defaultFlowRate})
                                                </span>
                                            )}
                                            <input
                                                type="number"
                                                value={rec.flowRatePerEmitter || ''}
                                                placeholder={center.defaultFlowRate?.toString()}
                                                onChange={(e) => updateRecommendation(zone.id, { flowRatePerEmitter: Number(e.target.value) })}
                                                style={{ width: '80px', padding: '4px', textAlign: 'right', borderRadius: '4px', border: '1px solid var(--border-active)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Emitter Count Input */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t('lbl.emittersPerTree')}</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {center.defaultEmitterCount && !rec.emittersPerTree && (
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                                    (Default: {center.defaultEmitterCount})
                                                </span>
                                            )}
                                            <input
                                                type="number"
                                                value={rec.emittersPerTree || ''}
                                                placeholder={center.defaultEmitterCount?.toString()}
                                                onChange={(e) => updateRecommendation(zone.id, { emittersPerTree: Number(e.target.value) })}
                                                style={{ width: '80px', padding: '4px', textAlign: 'right', borderRadius: '4px', border: '1px solid var(--border-active)', background: 'var(--bg-app)', color: 'var(--text-main)' }}
                                            />
                                        </div>
                                    </div>

                                    {/* 3. Calculated Result */}
                                    {curDemand && (
                                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{t('lbl.calcRuntime')}</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary-400)' }}>
                                                {(() => {
                                                    // Formula: (Daily Need / (Flow Rate * Count)) * 60
                                                    // Use local value, fallback to default, then 0
                                                    const flow = rec.flowRatePerEmitter || center.defaultFlowRate || 0;
                                                    const count = rec.emittersPerTree || center.defaultEmitterCount || 0;

                                                    const dailyLiters = curDemand.waterLitersPerDay;
                                                    const totalFlow = flow * count;

                                                    if (totalFlow <= 0) return 0;
                                                    return Math.round((dailyLiters / totalFlow) * 60);
                                                })()} <span style={{ fontSize: '0.8rem' }}>min</span>
                                            </span>
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '8px', textAlign: 'right' }}>
                                        {t('lbl.runtimeFormula')}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>{t('lbl.sysCheck')}</div>
                                    {rec.pipeDiameterMm < 20 && zone.distanceFromCenter > 50 && (
                                        <div style={{ color: 'hsl(var(--hue-warning), 80%, 60%)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            ⚠️ {t('warn.friction')}
                                        </div>
                                    )}
                                    {rec.pipeDiameterMm >= 20 && (
                                        <div style={{ color: 'var(--color-accent-500)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CheckCircle size={12} /> {t('warn.nominal')}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
            {/* ALERTS SECTION (Moved from Demand View) */}
            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                    {t('nav.warnings') || 'Alerts & Warnings'}
                </h3>

                {/* 1. Critical Section */}
                {zones.some(z => {
                    const dem = waterDemands[z.id]?.[currentMonthIdx];
                    if (!dem) return false;
                    return (z.plantCategory === 'Olive' && dem.waterLitersPerDay > 150) ||
                        (z.plantCategory === 'Citrus' && [11, 0, 1].includes(currentMonthIdx) && dem.waterLitersPerDay > 100) ||
                        (z.plantCategory === 'Grape' && [11, 0].includes(currentMonthIdx) && dem.waterLitersPerDay > 10);
                }) && (
                        <div className="alert-group critical">
                            <h4 style={{ color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={20} /> {t('lbl.alertCritical')}
                            </h4>
                            {zones.map(z => {
                                const dem = waterDemands[z.id]?.[currentMonthIdx];
                                if (!dem) return null;

                                if (z.plantCategory === 'Olive' && dem.waterLitersPerDay > 150) {
                                    return (
                                        <div key={`crit-olive-${z.id}`} className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', marginBottom: '8px' }}>
                                            <div style={{ fontWeight: 700, color: '#ef4444' }}>⚠️ {z.name} (Olive)</div>
                                            <div>{t('alert.oliveMax') || `Warning: Olive demand ${dem.waterLitersPerDay}L > 150L limit!`}</div>
                                        </div>
                                    );
                                }
                                if (z.plantCategory === 'Citrus' && [11, 0, 1].includes(currentMonthIdx) && dem.waterLitersPerDay > 100) {
                                    return (
                                        <div key={`crit-citrus-${z.id}`} className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', marginBottom: '8px' }}>
                                            <div style={{ fontWeight: 700, color: '#ef4444' }}>⚠️ {z.name} (Citrus Winter)</div>
                                            <div>{t('alert.citrusWinter') || `Critical: Citrus winter irrigation too high (${dem.waterLitersPerDay}L > 100L). Risk of root rot.`}</div>
                                        </div>
                                    );
                                }
                                if (z.plantCategory === 'Grape' && [11, 0].includes(currentMonthIdx) && dem.waterLitersPerDay > 10) {
                                    return (
                                        <div key={`crit-grape-${z.id}`} className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)', marginBottom: '8px' }}>
                                            <div style={{ fontWeight: 700, color: '#ef4444' }}>⚠️ {z.name} (Grape Dormancy)</div>
                                            <div>{t('alert.grapeDormancy') || `Stop Irrigation! Grapevines are dormant.`}</div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )}

                {/* 2. Scientific & Info Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #eab308' }}>
                        <div style={{ fontWeight: 700, color: '#eab308', marginBottom: '8px' }}>{t('lbl.note')}</div>
                        <div>{t('warn.scientific')}</div>
                    </div>

                    {zones.some(z => z.plantCategory === 'Olive') && (
                        <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #eab308' }}>
                            <div style={{ fontWeight: 700, color: '#eab308', marginBottom: '8px' }}>Olive Sensitivity</div>
                            <div>{t('warn.olive')}</div>
                        </div>
                    )}

                    {zones.some(z => ['Palm', 'Lawn'].includes(z.plantCategory)) && (
                        <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #ef4444' }}>
                            <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>Peak Heat (Jul-Aug)</div>
                            <div>{t('warn.heat')}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
