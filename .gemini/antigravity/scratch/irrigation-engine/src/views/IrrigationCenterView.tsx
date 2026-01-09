import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { Droplets, Activity, Gauge, ArrowDown } from 'lucide-react';

const SCENARIOS = [
    { id: '20m', height: 20, bar: 2.0, capacity: 360000 },
    { id: '15m', height: 15, bar: 1.5, capacity: 310000 },
    { id: '10m', height: 10, bar: 1.0, capacity: 250000 },
    { id: '5m', height: 5, bar: 0.5, capacity: 170000 },
];

export const IrrigationCenterView: React.FC = () => {
    const { center, setCenter, setActiveView } = useStore();
    const { t } = useTranslation();

    // Find valid scenario matching current capacity, or default to 20m
    const currentScenario = SCENARIOS.find(s => Math.abs(s.capacity - (center.pumpCapacityLph || 0)) < 1000) || SCENARIOS[0];
    const [selectedId, setSelectedId] = useState(currentScenario.id);

    useEffect(() => {
        // If we have a new center with 0 capacity, set default
        if (!center.pumpCapacityLph) {
            setCenter({ pumpCapacityLph: SCENARIOS[0].capacity });
        }
    }, []);

    const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = e.target.value;
        setSelectedId(newId);
        const scen = SCENARIOS.find(s => s.id === newId);
        if (scen) {
            setCenter({ pumpCapacityLph: scen.capacity });
        }
    };

    const activeScen = SCENARIOS.find(s => s.id === selectedId) || SCENARIOS[0];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', background: 'linear-gradient(to right, var(--color-primary-300), var(--color-accent-300))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('nav.setup')}
            </h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '32px' }}>{t('label.project')}</p>

            <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--text-muted)' }}>
                        {t('lbl.centerName')}
                    </label>
                    <input
                        type="text"
                        value={center.name}
                        onChange={(e) => setCenter({ name: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-active)',
                            background: 'var(--bg-input)',
                            color: 'var(--text-main)',
                            fontSize: '1.1rem'
                        }}
                    />
                </div>

                {/* Global Defaults Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--text-muted)' }}>
                            {t('lbl.flowRate')} (Global Default)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 30"
                            value={center.defaultFlowRate || ''}
                            onChange={(e) => setCenter({ defaultFlowRate: Number(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-active)',
                                background: 'var(--bg-input)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--text-muted)' }}>
                            {t('lbl.emittersPerTree')} (Global Default)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 2"
                            value={center.defaultEmitterCount || ''}
                            onChange={(e) => setCenter({ defaultEmitterCount: Number(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-active)',
                                background: 'var(--bg-input)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500, color: 'var(--color-accent-400)' }}>
                        {t('scen.label')}
                    </label>

                    <select
                        value={selectedId}
                        onChange={handleScenarioChange}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '2px solid var(--color-primary-600)',
                            background: 'var(--bg-panel)',
                            color: 'var(--text-main)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {SCENARIOS.map(s => (
                            <option key={s.id} value={s.id}>
                                {t(`scen.${s.id}`)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Info Card */}
                <div style={{
                    marginTop: '24px',
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '16px'
                }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ArrowDown size={14} /> {t('lbl.height')}
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{activeScen.height} m</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Gauge size={14} /> {t('lbl.pressure')}
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: activeScen.bar < 1.0 ? 'var(--hue-danger)' : 'var(--color-accent-400)' }}>
                            {activeScen.bar} Bar
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Droplets size={14} /> {t('lbl.flowCap')}
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                            {activeScen.capacity.toLocaleString()} L/h
                        </span>
                    </div>

                    <div style={{ gridColumn: '1 / -1', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={16} color="var(--color-primary-400)" />
                            {t(`scen.desc.${activeScen.id}`)}
                        </span>
                    </div>

                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => setActiveView('zones')}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'var(--color-primary-500)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                    >
                        {t('btn.saveContinue')}
                    </button>
                </div>
            </div>
        </div>
    );
};
