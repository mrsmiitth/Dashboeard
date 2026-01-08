import { createClient } from '@supabase/supabase-js';

// ملاحظة: AntiGravity سيتعرف على مفاتيحك تلقائياً لأنك قمت بالربط في الخطوة السابقة
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface PlantNeed {
    id: string;
    plantName: string;
    dailyIrrigationLiters: number;
    fertilizerType: string;
    maxTemp: number;
    icon?: string;
}

export const getPlantNeeds = async (): Promise<PlantNeed[]> => {
    const { data, error } = await supabase
        .from('plant_needs')
        .select('*');

    if (error) {
        console.error('Error:', error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        plantName: item.plant_name,
        dailyIrrigationLiters: item.water_liters_day,
        fertilizerType: item.fertilizer_type,
        maxTemp: item.max_heat_threshold,
        icon: item.plant_name.includes('نخل') ? '🌴' : '🌱'
    }));
};