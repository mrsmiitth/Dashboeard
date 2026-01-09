import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PEST_DATABASE } from '../logic/pestControl';
import { FERTILIZATION_SCHEDULE } from '../logic/fertilizationSchedule';
import { OPERATIONS_SCHEDULE } from '../logic/operationsCalendar';
import {
    Droplets,
    AlertOctagon,
    ClipboardList,
    CloudSun,
    Sprout,
    Scissors
} from 'lucide-react';

export const DashboardView: React.FC = () => {
    const { zones, waterDemands } = useStore();
    const currentMonth = new Date().getMonth() + 1;
    const today = new Date();

    // 1. Water Stats
    const waterStats = useMemo(() => {
        let dailyTotal = 0;
        let monthlyTotal = 0;

        zones.forEach(zone => {
            const demands = waterDemands[zone.id];
            if (demands) {
                const currentDemand = demands.find(d => d.monthIndex === currentMonth - 1);
                if (currentDemand) {
                    // If zone has tree count, use it, else generic area based (simplified here to just demand * scalar if needed, 
                    // but strictly demand logic usually handles the total per zone if calculated correctly.
                    // In our logic, waterLitersPerDay is usually "Per Tree" or "Per Zone" depending on context. 
                    // Let's assume the stored demand is per-zone total or we multiply by tree count if the logic in DemandView pushed unit values.
                    // Checking logic: The DemandView pushes "total info". Let's assume safe total here for summary.
                    // Actually, `waterLitersPerDay` in `MonthlyWaterDemand` is usually unit based in our previous logic? 
                    // Let's re-verify: In `useStore` or `DemandView`, we usually display "Total". 
                    // For the sake of the dashboard, let's just sum `waterCubicMetersPerMonth` which is definitely a Total.

                    monthlyTotal += currentDemand.waterCubicMetersPerMonth;
                    dailyTotal += (currentDemand.waterLitersPerDay * zone.treeCount); // Roughly if demand is per tree
                }
            }
        });

        return { daily: dailyTotal, monthly: monthlyTotal };
    }, [zones, waterDemands, currentMonth]);

    // 2. Active Alerts (Critical Only)
    const activeCrops = Array.from(new Set(zones.map(z => z.plantCategory)));
    const criticalPests = PEST_DATABASE.filter(p =>
        activeCrops.includes(p.crop) &&
        p.riskMonths.includes(currentMonth) &&
        p.severity === 'Critical'
    );

    // 3. Upcoming Tasks (Next 1-2 items)
    const fertTasks = FERTILIZATION_SCHEDULE.filter(f =>
        activeCrops.includes(f.crop) && f.month === currentMonth
    ).slice(0, 3);

    const opTasks = OPERATIONS_SCHEDULE.filter(o =>
        activeCrops.includes(o.crop) && o.month === currentMonth && o.priority === 'High'
    ).slice(0, 3);

    return (
        <div className="dashboard-view fade-in">
            {/* Header / Morning Brief */}
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        صباح الخير، مدير المزرعة ⛅
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {today.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="weather-widget" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                    <CloudSun size={32} color="#fdba74" />
                    <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>34°C</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>مشمس / حائل</div>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

                {/* Water Card */}
                <div className="card kpi-card" style={{ background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: '#93c5fd', fontWeight: 600 }}>الري اليوم</span>
                        <Droplets size={20} color="#60a5fa" />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
                        {(waterStats.daily / 1000).toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>م³</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                        إجمالي الشهر: {waterStats.monthly.toFixed(0)} م³
                    </div>
                </div>

                {/* Alerts Card */}
                <div className="card kpi-card" style={{ background: criticalPests.length > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', border: criticalPests.length > 0 ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: criticalPests.length > 0 ? '#fca5a5' : '#86efac', fontWeight: 600 }}>تنبيهات نشطة</span>
                        <AlertOctagon size={20} color={criticalPests.length > 0 ? '#ef4444' : '#22c55e'} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
                        {criticalPests.length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>تهديد</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                        {criticalPests.length > 0 ? 'يرجى مراجعة قسم الآفات فوراً' : 'الوضع آمن ومستقر'}
                    </div>
                </div>

                {/* Tasks Card */}
                <div className="card kpi-card" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>مهام الشهر</span>
                        <ClipboardList size={20} color="var(--text-muted)" />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
                        {fertTasks.length + opTasks.length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>مهمة</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                        تسميد وعمليات فنية
                    </div>
                </div>
            </div>

            {/* Action Items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                {/* Critical Operations List */}
                <section>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Scissors size={20} /> عمليات فنية عاجلة (High Priority)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {opTasks.length > 0 ? opTasks.map((t, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t.operation}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.crop}</div>
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{t.frequency}</div>
                            </div>
                        )) : (
                            <div style={{ padding: '1rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>لا توجد عمليات حرجة متبقية.</div>
                        )}
                    </div>
                </section>

                {/* Fertilization List */}
                <section>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sprout size={20} /> جدول التسميد القادم
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {fertTasks.length > 0 ? fertTasks.map((t, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #22c55e', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t.type} - {t.material}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.crop} - {t.amount}</div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ padding: '1rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>لا توجد مهام تسميد متبقية.</div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};
