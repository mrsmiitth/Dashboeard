import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../i18n';
import { Plus, Trash2, Power, Trees, Sprout, Leaf, Calendar } from 'lucide-react';
import type { PlantCategory, IrrigationMethod, Zone } from '../types';

export const ZonesView: React.FC = () => {
    const { zones, addZone, deleteZone, toggleZone, waterDemands } = useStore();
    const { t, language } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: 'Zone 1',
        plantCategory: 'Palm' as PlantCategory,
        treeCount: 20,
        distanceFromCenter: 100,
        irrigationMethod: 'Auto' as IrrigationMethod
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addZone({
            name: formData.name,
            plantCategory: formData.plantCategory,
            treeCount: Number(formData.treeCount),
            distanceFromCenter: Number(formData.distanceFromCenter),
            irrigationMethod: formData.irrigationMethod
        });
        setIsAdding(false);
        // Reset
        setFormData(prev => ({
            ...prev,
            name: `Zone ${zones.length + 2}`,
            distanceFromCenter: prev.distanceFromCenter + 50
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getIcon = (cat: PlantCategory) => {
        if (cat === 'Palm') return <Trees />;
        if (cat === 'Lawn') return <Leaf />;
        return <Sprout />;
    };

    const currentMonthIdx = new Date().getMonth();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>{t('nav.zones')} ({zones.length})</h2>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {zones.length === 0 && (
                        <button
                            onClick={() => {
                                const crops: Array<Omit<Zone, 'id' | 'isActive' | 'x' | 'y'>> = [
                                    { name: 'Nakhil (نخيل)', plantCategory: 'Palm', treeCount: 55, distanceFromCenter: 50, irrigationMethod: 'Auto' },
                                    { name: 'Citrus (حمضيات)', plantCategory: 'Citrus', treeCount: 60, distanceFromCenter: 100, irrigationMethod: 'Auto' },
                                    { name: 'Lawn (ثيل)', plantCategory: 'Lawn', treeCount: 200, distanceFromCenter: 20, irrigationMethod: 'Auto' },
                                    { name: 'Olive (زيتون)', plantCategory: 'Olive', treeCount: 100, distanceFromCenter: 150, irrigationMethod: 'Auto' },
                                    { name: 'Grape (عنب)', plantCategory: 'Grape', treeCount: 60, distanceFromCenter: 120, irrigationMethod: 'Auto' },
                                    { name: 'Fruit Trees (أشجار مثمرة)', plantCategory: 'Fruit', treeCount: 40, distanceFromCenter: 180, irrigationMethod: 'Auto' },
                                    { name: 'Ornamental (زينة)', plantCategory: 'Ornamental', treeCount: 80, distanceFromCenter: 40, irrigationMethod: 'Auto' }
                                ];
                                crops.forEach(c => addZone(c));
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 20px',
                                backgroundColor: 'var(--color-accent-600)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <Sprout size={20} style={{ [language === 'ar' ? 'marginLeft' : 'marginRight']: '8px' }} />
                            {t('btn.populate') || (language === 'ar' ? 'إضافة افتراضي' : 'Populate Default')}
                        </button>
                    )}
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 20px',
                            backgroundColor: 'var(--color-primary-500)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Plus size={20} style={{ [language === 'ar' ? 'marginLeft' : 'marginRight']: '8px' }} />
                        {t('btn.addZone')}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {isAdding && (
                    <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--color-primary-500)' }}>
                        <h4 style={{ marginBottom: '16px', color: 'var(--color-primary-300)' }}>{t('btn.addZone')}</h4>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('lbl.zoneName')}
                                style={{ padding: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', borderRadius: '4px' }}
                                autoFocus
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <select
                                    name="plantCategory"
                                    value={formData.plantCategory}
                                    onChange={handleChange}
                                    style={{ padding: '8px', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', borderRadius: '4px' }}
                                >
                                    <option value="Palm">{t('val.palm')}</option>
                                    <option value="Olive">{t('val.olive')}</option>
                                    <option value="Citrus">{t('val.citrus')}</option>
                                    <option value="Grape">{t('val.grape')}</option>
                                    <option value="Lawn">{t('val.lawn')}</option>
                                    <option value="Fruit">{t('val.fruit')}</option>
                                    <option value="Ornamental">{t('val.ornamental')}</option>
                                </select>

                                <select
                                    name="irrigationMethod"
                                    value={formData.irrigationMethod}
                                    onChange={handleChange}
                                    style={{ padding: '8px', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', borderRadius: '4px' }}
                                >
                                    <option value="Auto">{t('val.auto')}</option>
                                    <option value="Drip">{t('val.drip')}</option>
                                    <option value="Bubbler">{t('val.bubbler')}</option>
                                    <option value="Sprinkler">{t('val.sprinkler')}</option>
                                    <option value="Basin">{t('val.basin')}</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('lbl.treeCount')}</label>
                                    <input
                                        type="number"
                                        name="treeCount"
                                        value={formData.treeCount}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '8px', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', borderRadius: '4px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('lbl.dist')}</label>
                                    <input
                                        type="number"
                                        name="distanceFromCenter"
                                        value={formData.distanceFromCenter}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '8px', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', borderRadius: '4px' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <button type="submit" style={{ flex: 1, padding: '8px', background: 'var(--color-primary-600)', color: 'white', border: 'none', borderRadius: '4px' }}>Add</button>
                                <button type="button" onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '8px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Existing Zones */}
                {zones.map(zone => {
                    // Get current schedule if available
                    const dem = waterDemands[zone.id]?.[currentMonthIdx];

                    return (
                        <div key={zone.id} className="glass-panel" style={{ padding: '24px', opacity: zone.isActive ? 1 : 0.6, position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--color-primary-600)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {getIcon(zone.plantCategory)}
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>{zone.name}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t(`val.${zone.plantCategory.toLowerCase()}` as any) || zone.plantCategory}</span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button onClick={() => toggleZone(zone.id)} style={{ background: 'none', border: 'none', color: zone.isActive ? 'var(--color-accent-400)' : 'var(--text-dim)', marginInlineEnd: '8px' }}>
                                        <Power size={18} />
                                    </button>
                                    <button onClick={() => deleteZone(zone.id)} style={{ background: 'none', border: 'none', color: 'var(--hue-danger)' }}>
                                        <Trash2 size={18} color="hsl(var(--hue-danger), 70%, 50%)" />
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                                <div style={{ background: 'var(--bg-app)', padding: '8px', borderRadius: '4px' }}>
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{t('lbl.treeCount')}</div>
                                    <div style={{ fontWeight: 600 }}>{zone.treeCount}</div>
                                </div>
                                <div style={{ background: 'var(--bg-app)', padding: '8px', borderRadius: '4px' }}>
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{t('lbl.dist')}</div>
                                    <div style={{ fontWeight: 600 }}>{zone.distanceFromCenter}m</div>
                                </div>
                            </div>

                            {/* Schedule Badge */}
                            {dem && dem.amountRange && (
                                <div style={{ marginTop: '16px', fontSize: '0.8rem', background: 'var(--bg-input)', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}> <Calendar size={12} /> {t('lbl.currentSchedule')}:</div>
                                    <div style={{ fontWeight: 600, marginTop: '2px', color: 'var(--color-accent-400)' }}>{dem.amountRange}L</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
