// ملاحظة: في الإنتاج، استخدم متغيرات البيئة بدلاً من الثوابت
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_KEY
// );

export interface PlantNeed {
    id: string;
    plantName: string;
    dailyIrrigationLiters: number;
    fertilizerType: string;
    maxTemp: number;
    icon?: string;
}

export const getPlantNeeds = async (): Promise<PlantNeed[]> => {
    // في الإنتاج، قم بجلب البيانات من Supabase
    // const { data, error } = await supabase.from('plant_needs').select('*');
    // if (error) {
    //   console.error('Error fetching plant needs:', error);
    //   return [];
    // }
    // return data || [];

    // حالياً: استخدم بيانات وهمية
    return [
        {
            id: '1',
            plantName: 'نخيل',
            dailyIrrigationLiters: 150,
            fertilizerType: 'سماد عضوي',
            maxTemp: 50,
            icon: '🌴'
        },
        {
            id: '2',
            plantName: 'زيتون',
            dailyIrrigationLiters: 45,
            fertilizerType: 'متوازن 20-20-20',
            maxTemp: 40,
            icon: '🫒'
        },
        {
            id: '3',
            plantName: 'حمضيات',
            dailyIrrigationLiters: 60,
            fertilizerType: 'مخلوط حمضيات',
            maxTemp: 35,
            icon: '🍋'
        }
    ];
};