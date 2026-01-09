import React, { useMemo, useState } from 'react';
import { FERTILIZATION_SCHEDULE } from '../logic/fertilizationSchedule';
import { useStore } from '../store/useStore';
import { CheckCircle, Clock, Leaf, Beaker, Sprout, Droplets, ArrowLeft, Filter } from 'lucide-react';


type FertilizerType = 'Organic' | 'NPK' | 'Micronutrients';

interface TypeConfig {
    label: string;
    color: string;
    bg: string;
    icon: any;
}

export const FertilizationView: React.FC = () => {
    const { zones } = useStore();
    const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
    const [filterType, setFilterType] = useState<'All' | FertilizerType>('All');

    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    // Arabic Mappings
    const cropTerms: Record<string, { label: string; icon: string }> = {
        'Palm': { label: 'النخيل', icon: '🌴' },
        'Olive': { label: 'الزيتون', icon: '🫒' },
        'Citrus': { label: 'الحمضيات', icon: '🍊' },
        'Grape': { label: 'العنب', icon: '🍇' },
        'Lawn': { label: 'المسطحات الخضراء', icon: '🌿' },
        'Fruit': { label: 'أشجار مثمرة', icon: '🍎' },
        'Ornamental': { label: 'نباتات زينة', icon: '🌻' }
    };

    const typeConfig: Record<FertilizerType, TypeConfig> = {
        'Organic': { label: 'سماد عضوي', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: Leaf },
        'NPK': { label: 'مركب NPK', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Beaker },
        'Micronutrients': { label: 'عناصر صغرى', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Sprout },
    };

    // Filter Logic
    const monthlyTasks = useMemo(() => {
        const activeCrops = new Set(zones.map(z => z.plantCategory));
        return FERTILIZATION_SCHEDULE.filter(t =>
            t.month === currentMonthIdx + 1 &&
            activeCrops.has(t.crop) &&
            (filterType === 'All' || t.type === filterType)
        );
    }, [currentMonthIdx, zones, filterType]);

    // Stats
    const stats = useMemo(() => ({
        total: monthlyTasks.length,
        organic: monthlyTasks.filter(t => t.type === 'Organic').length,
        chemical: monthlyTasks.filter(t => t.type === 'NPK' || t.type === 'Micronutrients').length
    }), [monthlyTasks]);

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <Sprout className="text-emerald-500" />
                        جدول التسميد
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        خطة التسميد الشهرية للحفاظ على صحة وإنتاجية النباتات
                    </p>
                </div>

                {/* Month Selector */}
                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                        onClick={() => setCurrentMonthIdx(prev => (prev - 1 + 12) % 12)}
                        className="p-2 hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
                    >
                        <ArrowLeft className="rotate-180" size={18} />
                    </button>
                    <div className="min-w-[120px] text-center font-bold text-slate-200">
                        {months[currentMonthIdx]} <span className="text-slate-500 text-xs font-normal">({currentMonthIdx + 1})</span>
                    </div>
                    <button
                        onClick={() => setCurrentMonthIdx(prev => (prev + 1) % 12)}
                        className="p-2 hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="text-slate-400 text-xs mb-1">إجمالي المهام</div>
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                </div>
                <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl">
                    <div className="text-emerald-400/80 text-xs mb-1">عضوي حيوي</div>
                    <div className="text-2xl font-bold text-emerald-400">{stats.organic}</div>
                </div>
                <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
                    <div className="text-blue-400/80 text-xs mb-1">كيميائي (NPK)</div>
                    <div className="text-2xl font-bold text-blue-400">{stats.chemical}</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={() => setFilterType(prev => prev === 'All' ? 'Organic' : 'All')}
                >
                    <div className="text-slate-400 text-xs">تصفية</div>
                    <Filter size={18} className={filterType !== 'All' ? 'text-emerald-400' : 'text-slate-500'} />
                </div>
            </div>

            {/* Schedule Timeline */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 min-h-[400px]">
                {monthlyTasks.length > 0 ? (
                    <div className="space-y-4">
                        {monthlyTasks.map((task, idx) => {
                            const typeStyle = typeConfig[task.type] || typeConfig['NPK'];
                            const TypeIcon = typeStyle.icon;

                            return (
                                <div key={idx} className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500/30 rounded-xl p-4 transition-all hover:translate-x-[-4px]">
                                    {/* Decoration Line */}
                                    <div className={`absolute right-0 top-4 bottom-4 w-1 rounded-l-full ${typeStyle.bg.replace('/10', '')}`}></div>

                                    <div className="flex flex-col md:flex-row md:items-center gap-4 pr-3">
                                        {/* Icon & Crop */}
                                        <div className="flex items-center gap-3 w-48 shrink-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${typeStyle.bg} ${typeStyle.color}`}>
                                                <TypeIcon size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-200">
                                                    {cropTerms[task.crop]?.label || task.crop}
                                                </div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    {cropTerms[task.crop]?.icon} {task.crop}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-[10px] text-slate-500">المادة السمادية</div>
                                                <div className="text-sm font-medium text-slate-200">{task.material}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-500">الكمية المقررة</div>
                                                <div className="text-sm font-medium text-slate-200">{task.amount}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-500">طريقة الإضافة</div>
                                                <div className="text-sm font-medium text-slate-300 flex items-center gap-1">
                                                    <Droplets size={12} /> {task.application}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-500">التكرار</div>
                                                <div className="text-sm font-medium text-slate-300 flex items-center gap-1">
                                                    <Clock size={12} /> {task.frequency}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status / Action - Visual only for now */}
                                        <div className="w-32 flex justify-end">
                                            <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700 flex items-center gap-2 opacity-50">
                                                <CheckCircle size={12} />
                                                <span>مجدولة</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Critical Note */}
                                    {task.criticalNote && (
                                        <div className="mt-3 mr-14 text-xs text-amber-500/80 bg-amber-500/5 px-3 py-2 rounded-lg border border-amber-500/10">
                                            ملاحظة هامة: {task.criticalNote}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-60">
                        <Leaf size={48} className="text-slate-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-400">لا توجد مهام تسميد لهذا الشهر</h3>
                        <p className="text-slate-500 text-sm mt-2">
                            يمكنك الانتقال للأشهر الأخرى للاطلاع على الجدول السنوي
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

