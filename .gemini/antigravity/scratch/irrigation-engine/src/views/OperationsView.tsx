import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { OPERATIONS_SCHEDULE } from '../logic/operationsCalendar';
import {
    ChevronLeft,
    ChevronRight,
    Scissors,
    AlertCircle,
    CheckCircle2,
    Flower,
    Tractor,
    Wind
} from 'lucide-react';

interface Props {
    // Optional props if needed for direct usage, but we'll use useStore mostly
}

export const OperationsView: React.FC<Props> = () => {
    const { zones } = useStore();
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

    // 1. Get crops present in the farm
    const activeCrops = useMemo(() => {
        return Array.from(new Set(zones.map(z => z.plantCategory)));
    }, [zones]);

    // 2. Filter schedule for active crops and selected month
    const monthlyOperations = useMemo(() => {
        return OPERATIONS_SCHEDULE.filter(entry =>
            activeCrops.includes(entry.crop) &&
            entry.month === selectedMonth
        );
    }, [activeCrops, selectedMonth]);

    // 3. Separate Critical vs Normal
    const criticalTasks = monthlyOperations.filter(op => op.priority === 'High');
    const normalTasks = monthlyOperations.filter(op => op.priority === 'Normal');

    // Helper: Month Name
    const getMonthName = (m: number) => {
        // Simple Arabic/English mapping or use Intl
        const date = new Date(2024, m - 1, 1);
        return new Intl.DateTimeFormat('ar-SA', { month: 'long' }).format(date);
    };

    // Helper: Icon based on operation text or consistent mapping
    const getIcon = (opName: string) => {
        if (opName.includes('تقليم') || opName.includes('قص')) return Scissors;
        if (opName.includes('تلقيح') || opName.includes('تزهير')) return Flower;
        if (opName.includes('رش') || opName.includes('وقاية')) return Wind;
        return Tractor; // Default
    };

    return (
        <div className="operations-view fade-in">
            {/* Header & Controls */}
            <div className="view-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        العمليات الفنية الزراعية 🚜
                    </h2>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                        جدول المهام الفنية واليدوية (تقليم، تلقيح، حصاد)
                    </p>
                </div>

                <div className="month-selector" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '12px', gap: '1rem' }}>
                    <button
                        onClick={() => setSelectedMonth(prev => prev === 1 ? 12 : prev - 1)}
                        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div style={{ textAlign: 'center', minWidth: '120px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block' }}>الموسم الحالي</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{getMonthName(selectedMonth)}</span>
                    </div>

                    <button
                        onClick={() => setSelectedMonth(prev => prev === 12 ? 1 : prev + 1)}
                        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
            </div>

            {/* Critical Tasks Section */}
            {criticalTasks.length > 0 && (
                <section className="critical-ops-section" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fca5a5', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={20} /> عمليات حرجة ذات أولوية قصوى
                    </h3>

                    <div className="ops-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                        {criticalTasks.map((task, idx) => {
                            const Icon = getIcon(task.operation);
                            return (
                                <div key={idx} className="op-card critical" style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    padding: '1.5rem', borderRadius: '12px',
                                    display: 'flex', gap: '1rem'
                                }}>
                                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '50%', height: 'fit-content' }}>
                                        <Icon size={24} color="#fca5a5" />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{task.crop === 'Palm' ? 'نخيل' : task.crop === 'Olive' ? 'زيتون' : task.crop === 'Citrus' ? 'حمضيات' : task.crop}</span>
                                            <span className="badge" style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem' }}>HIGH PRIORITY</span>
                                        </div>
                                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{task.operation}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{task.description}</p>
                                        {task.criticalNote && (
                                            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#fca5a5' }}>
                                                {task.criticalNote}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Normal Tasks Section */}
            <section className="normal-ops-section">
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={20} color="var(--color-primary-400)" /> عمليات دورية مجدولة
                </h3>

                {normalTasks.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', color: 'var(--text-muted)' }}>
                        لا توجد عمليات دورية أخرى لهذا الشهر.
                    </div>
                ) : (
                    <div className="ops-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {normalTasks.map((task, idx) => {
                            const Icon = getIcon(task.operation);
                            return (
                                <div key={idx} className="op-item" style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    padding: '1rem 1.5rem', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', gap: '1.5rem'
                                }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '50%' }}>
                                        <Icon size={20} color="#60a5fa" />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--color-primary-300)' }}>{task.crop}</span>
                                            <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }}></span>
                                            <span style={{ fontWeight: 600 }}>{task.operation}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{task.description}</p>
                                    </div>

                                    <div style={{ textAlign: 'left', minWidth: '120px' }}>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)' }}>التكرار</span>
                                        <span style={{ fontSize: '0.9rem' }}>{task.frequency}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Annual Overview (Optional - simplified for now) */}
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                    💡 نصيحة: الالتزام بمواعيد العمليات الفنية (خاصة التقليم والتلقيح) يرفع الإنتاجية بنسبة تصل إلى 40%.
                </p>
            </div>
        </div>
    );
};
