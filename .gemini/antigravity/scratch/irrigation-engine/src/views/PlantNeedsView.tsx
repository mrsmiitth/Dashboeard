import React, { useEffect, useState } from 'react';
import { Droplets, Sprout, ThermometerSun, Edit3, X, Check } from 'lucide-react';
import { getPlantNeeds, PlantNeed } from '../logic/plantNeeds';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const PlantNeedsView: React.FC = () => {
    const [needs, setNeeds] = useState<PlantNeed[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
    const [editAmount, setEditAmount] = useState<number | null>(null);

    useEffect(() => {
        getPlantNeeds().then(data => {
            setNeeds(data);
            setLoading(false);
        });
    }, []);

    const handleSave = (id: string) => {
        if (editAmount !== null) {
            setNeeds(prev => prev.map(p =>
                p.id === id ? { ...p, dailyIrrigationLiters: editAmount } : p
            ));
            setSelectedPlantId(null);
            setEditAmount(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400 animate-pulse dir-rtl">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-900/50" dir="rtl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                    <Sprout className="w-8 h-8 text-emerald-500" />
                    <span className="bg-gradient-to-l from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        احتياجات النباتات
                    </span>
                </h1>
                <p className="text-slate-400 mt-2 font-light">
                    دليل الاحتياجات المائية والسمادية اليومية لكل صنف.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {needs.map((plant) => {
                    const isEditing = selectedPlantId === plant.id;

                    return (
                        <div
                            key={plant.id}
                            className={cn(
                                "bg-slate-800 border border-slate-700/60 rounded-xl p-6",
                                "hover:border-emerald-500/50 transition-all duration-300",
                                "shadow-lg hover:shadow-emerald-900/10 group relative overflow-hidden",
                                isEditing ? "ring-2 ring-emerald-500" : ""
                            )}
                        >
                            <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        if (isEditing) {
                                            setSelectedPlantId(null);
                                        } else {
                                            setSelectedPlantId(plant.id);
                                            setEditAmount(plant.dailyIrrigationLiters);
                                        }
                                    }}
                                    className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                                    title="تعديل"
                                >
                                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                                <div className="text-4xl bg-slate-900/80 p-3 rounded-2xl border border-slate-700/30 group-hover:scale-110 transition-transform">
                                    {plant.icon || '🌱'}
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                                    {plant.plantName}
                                </h3>
                            </div>

                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-sky-500/10 p-1.5 rounded-lg">
                                        <Droplets className="w-4 h-4 text-sky-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 uppercase font-semibold mb-0.5">الري اليومي</div>
                                        {isEditing ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="number"
                                                    value={editAmount ?? ''}
                                                    onChange={(e) => setEditAmount(Number(e.target.value))}
                                                    className="w-20 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:border-emerald-500 outline-none"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleSave(plant.id)}
                                                    className="p-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded transition-colors"
                                                >
                                                    <Check size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="font-mono text-sky-200 text-lg cursor-pointer hover:text-sky-100" onClick={() => { setSelectedPlantId(plant.id); setEditAmount(plant.dailyIrrigationLiters); }}>
                                                {plant.dailyIrrigationLiters} <span className="text-sm">لتر/يوم</span>
                                            </div>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-lime-500/10 p-1.5 rounded-lg">
                                        <Sprout className="w-4 h-4 text-lime-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 uppercase font-semibold mb-0.5">نظام التسميد</div>
                                        <div className="text-lime-200 text-sm font-medium">{plant.fertilizerType}</div>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-orange-500/10 p-1.5 rounded-lg">
                                        <ThermometerSun className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-500 uppercase font-semibold mb-0.5">تحمل الحرارة</div>
                                        <div className="font-mono text-orange-200 font-bold">{plant.maxTemp}°C</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};