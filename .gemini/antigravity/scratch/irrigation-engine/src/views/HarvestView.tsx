import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { HARVEST_CALENDAR } from '../logic/harvestCalendar';
import type { HarvestEntry } from '../logic/harvestCalendar';
import {
    ShoppingBasket,
    CalendarCheck,
    Scale,
    ThermometerSnowflake,
    Timer
} from 'lucide-react';

export const HarvestView: React.FC = () => {
    const { zones } = useStore();
    const currentMonth = new Date().getMonth() + 1;

    const activeCrops = useMemo(() => {
        return Array.from(new Set(zones.map(z => z.plantCategory)));
    }, [zones]);

    const harvestSchedule = useMemo(() => {
        return HARVEST_CALENDAR.filter(h => activeCrops.includes(h.crop));
    }, [activeCrops]);

    // Group by status
    const activeHarvest = harvestSchedule.filter(h => currentMonth >= h.startMonth && currentMonth <= h.endMonth);
    const upcomingHarvest = harvestSchedule.filter(h => h.startMonth > currentMonth).sort((a, b) => a.startMonth - b.startMonth);

    return (
        <div className="harvest-view fade-in">
            {/* Header */}
            <div className="view-header" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShoppingBasket size={28} className="text-accent" /> تقويم الحصاد والجني
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                    علامات النضج ومواعيد الحصاد المثالية للمحاصيل
                </p>
            </div>

            {/* 1. Active Harvest Windows */}
            <section className="active-harvest mb-8">
                <h3 style={{ color: '#facc15', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Timer size={24} /> موسم الحصاد الحالي (شهر {currentMonth})
                </h3>

                {activeHarvest.length === 0 ? (
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        لا يوجد محاصيل جاهزة للحصاد في هذا الوقت من السنة.
                    </div>
                ) : (
                    <div className="harvest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
                        {activeHarvest.map((item, idx) => (
                            <HarvestCard key={idx} item={item} isActive />
                        ))}
                    </div>
                )}
            </section>

            {/* 2. Upcoming */}
            {upcomingHarvest.length > 0 && (
                <section className="upcoming-harvest">
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CalendarCheck size={20} /> المواسم القادمة
                    </h3>
                    <div className="harvest-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {upcomingHarvest.map((item, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(255,255,255,0.02)',
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div>
                                    <span style={{ fontWeight: 600, color: 'var(--color-primary-300)' }}>{item.crop} {item.variety ? `- ${item.variety}` : ''}</span>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>يبدأ في شهر {item.startMonth}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                                    المدة: {item.endMonth - item.startMonth + 1} أشهر
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

const HarvestCard: React.FC<{ item: HarvestEntry, isActive?: boolean }> = ({ item, isActive }) => (
    <div className="harvest-card" style={{
        background: 'linear-gradient(145deg, rgba(234, 179, 8, 0.05) 0%, rgba(234, 179, 8, 0.01) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        position: 'relative'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.25rem', color: '#fde047' }}>
                {item.crop} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.variety}</span>
            </h4>
            {isActive && (
                <span style={{ background: '#ca8a04', color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', height: 'fit-content' }}>
                    جاهز للحصاد
                </span>
            )}
        </div>

        <div className="harvest-specs">
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#fde047', marginBottom: '0.5rem' }}>
                    <Scale size={16} /> علامات النضج (Maturity Indices)
                </strong>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                    {item.maturitySigns}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)' }}>طريقة الحصاد</span>
                    <div style={{ fontSize: '0.9rem' }}>{item.method}</div>
                </div>
                <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        <ThermometerSnowflake size={14} /> ما بعد الحصاد
                    </span>
                    <div style={{ fontSize: '0.9rem' }}>{item.postHarvest}</div>
                </div>
            </div>
        </div>
    </div>
);
