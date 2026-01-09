import { v4 as uuidv4 } from 'uuid';

export interface PlantNeed {
    id: string;
    plantName: string;
    dailyIrrigationLiters: number;
    fertilizerType: string;
    maxTemp: number; // Maximum well-tolerated temperature in Celsius
    icon?: string; // Optional icon/emoji
}

export const MOCK_PLANT_NEEDS: PlantNeed[] = [
    {
        id: uuidv4(),
        plantName: 'طماطم',
        dailyIrrigationLiters: 2.5,
        fertilizerType: 'NPK 10-10-10',
        maxTemp: 30,
        icon: '🍅'
    },
    {
        id: uuidv4(),
        plantName: 'خيار',
        dailyIrrigationLiters: 3.0,
        fertilizerType: 'نيتروجين عالي',
        maxTemp: 28,
        icon: '🥒'
    },
    {
        id: uuidv4(),
        plantName: 'نخيل',
        dailyIrrigationLiters: 150,
        fertilizerType: 'سماد عضوي',
        maxTemp: 50,
        icon: '🌴'
    },
    {
        id: uuidv4(),
        plantName: 'زيتون',
        dailyIrrigationLiters: 45,
        fertilizerType: 'متوازن 20-20-20',
        maxTemp: 40,
        icon: '🫒'
    },
    {
        id: uuidv4(),
        plantName: 'حمضيات',
        dailyIrrigationLiters: 60,
        fertilizerType: 'مخلوط حمضيات',
        maxTemp: 35,
        icon: '🍋'
    },
    {
        id: uuidv4(),
        plantName: 'خس',
        dailyIrrigationLiters: 0.5,
        fertilizerType: 'نيتروجين',
        maxTemp: 24,
        icon: '🥬'
    },
    {
        id: uuidv4(),
        plantName: 'باذنجان',
        dailyIrrigationLiters: 2.8,
        fertilizerType: 'فوسفور عالي',
        maxTemp: 32,
        icon: '🍆'
    },
    {
        id: uuidv4(),
        plantName: 'فلفل',
        dailyIrrigationLiters: 2.2,
        fertilizerType: 'متوازن',
        maxTemp: 30,
        icon: '🌶️'
    }
];

export const getPlantNeeds = (): Promise<PlantNeed[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PLANT_NEEDS);
        }, 300);
    });
};
