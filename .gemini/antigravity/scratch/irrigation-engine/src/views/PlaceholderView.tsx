import React from 'react';
import { Construction } from 'lucide-react';

interface Props {
    title: string;
}

export const PlaceholderView: React.FC<Props> = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
            <div className="bg-slate-900/50 p-6 rounded-full border border-slate-800 mb-6">
                <Construction className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-200 mb-2">{title}</h2>
            <p className="text-slate-500 max-w-md">
                جاري تطوير البيانات التشغيلية لمزرعة حائل
            </p>
        </div>
    );
};
