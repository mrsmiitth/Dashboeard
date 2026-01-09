export interface PlantNeed {
    id: string;
    name_ar: string;
    daily_water_liters: number;
    fertilizer_type: string;
    max_temp_c: number;
    icon: string;
}

export const MOCK_DATA: PlantNeed[] = [
    {
        id: '1',
        name_ar: 'طماطم',
        daily_water_liters: 2.5,
        fertilizer_type: 'NPK 10-10-10',
        max_temp_c: 30,
        icon: '🍅'
    },
    {
        id: '2',
        name_ar: 'خيار',
        daily_water_liters: 3.0,
        fertilizer_type: 'نيتروجين عالي',
        max_temp_c: 28,
        icon: '🥒'
    },
    {
        id: '3',
        name_ar: 'نخيل',
        daily_water_liters: 150,
        fertilizer_type: 'سماد عضوي',
        max_temp_c: 50,
        icon: '🌴'
    },
    {
        id: '4',
        name_ar: 'زيتون',
        daily_water_liters: 45,
        fertilizer_type: 'متوازن 20-20-20',
        max_temp_c: 40,
        icon: '🫒'
    },
    {
        id: '5',
        name_ar: 'حمضيات',
        daily_water_liters: 60,
        fertilizer_type: 'مخلوط حمضيات',
        max_temp_c: 35,
        icon: '🍋'
    },
    {
        id: '6',
        name_ar: 'خس',
        daily_water_liters: 0.5,
        fertilizer_type: 'نيتروجين',
        max_temp_c: 24,
        icon: '🥬'
    },
    {
        id: '7',
        name_ar: 'فلفل',
        daily_water_liters: 2.2,
        fertilizer_type: 'متوازن',
        max_temp_c: 30,
        icon: '🌶️'
    },
    {
        id: '8',
        name_ar: 'باذنجان',
        daily_water_liters: 2.8,
        fertilizer_type: 'فوسفور عالي',
        max_temp_c: 32,
        icon: '🍆'
    }
];

export const getPlantNeeds = async (): Promise<PlantNeed[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DATA), 500);
    });
};
