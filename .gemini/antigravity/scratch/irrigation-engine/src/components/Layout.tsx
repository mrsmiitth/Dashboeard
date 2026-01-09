import React from 'react';
import {
    MapPin,
    Trees,
    Droplets,
    Lightbulb,
    Share2,
    ClipboardList,
    AlertTriangle,
    Sun,
    LayoutDashboard,
    Sprout,
    Scissors,
    Bug,
    ShoppingBasket
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { activeView, setActiveView } = useStore();

    // Map of views to Arabic labels and Icons
    const NAV_ITEMS = [
        { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
        { id: 'plant_needs', label: 'احتياجات النباتات', icon: Sprout },
        { id: 'setup', label: 'إعداد المزرعة', icon: MapPin },
        { id: 'zones', label: 'المناطق الزراعية', icon: Trees },
        { id: 'demand', label: 'الاحتياج المائي', icon: Droplets },
        { id: 'recommendations', label: 'التوصيات', icon: Lightbulb },
        { id: 'simulation', label: 'المحاكاة', icon: Share2 },
        { id: 'operations', label: 'العمليات', icon: Scissors },
        { id: 'fertilization', label: 'التسميد', icon: Sprout },
        { id: 'pest', label: 'المكافحة', icon: Bug },
        { id: 'harvest', label: 'الحصاد', icon: ShoppingBasket },
        { id: 'boq', label: 'جداول الكميات', icon: ClipboardList },
        { id: 'warnings', label: 'تنبيهات', icon: AlertTriangle },
    ] as const;

    const currentTitle = NAV_ITEMS.find(n => n.id === activeView)?.label;

    return (
        <div className="flex h-screen bg-slate-950 font-sans text-right" dir="rtl">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">

                {/* Header */}
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        <span className="text-emerald-500">مزرعة</span> حائل
                    </h1>
                    <p className="text-slate-500 text-xs mt-1 font-medium">
                        نظام إدارة الري الذكي - إصدار 2030
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    "text-sm font-bold",
                                    isActive
                                        ? "bg-emerald-600/20 text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] border border-emerald-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                                )}
                            >
                                <Icon size={20} className={isActive ? "text-emerald-400" : "text-slate-500"} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer Hail Identity */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                        <span>الموقع:</span>
                        <span className="text-slate-300">مشروع: حائل، السعودية</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>الوحدات:</span>
                        <span className="text-slate-300">مترية</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800/50 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-slate-800 text-[10px] text-emerald-500/80">
                            Irrigation Engine v2.4
                        </span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-slate-950 relative">
                {/* Top Bar */}
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-8 shrink-0">
                    <h2 className="text-xl font-bold text-white">
                        {currentTitle}
                    </h2>

                    {/* Top Actions */}
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                            <Sun size={16} />
                        </div>
                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs ring-4 ring-emerald-500/5">
                            ع
                        </div>
                    </div>
                </header>

                {/* Viewport */}
                <div className="flex-1 overflow-auto p-8 relative">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Internal utility since we removed the external import to reduce deps
function cn(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

