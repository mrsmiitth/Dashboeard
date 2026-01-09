import {
    BASE_LITERS_PER_TREE_FRUIT,
    BASE_LITERS_PER_TREE_ORNAMENTAL,
    DAYS_IN_MONTH,
    SEASONAL_FACTORS_FRUIT,
    SEASONAL_FACTORS_ORNAMENTAL
} from './constants';
import { getHailScheduleDemand } from './hailSchedule';
import type { Zone, MonthlyWaterDemand, Region, SoilType } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const calculateMonthlyDemand = (zone: Zone, region: Region = 'Central', soilType: SoilType = 'Loam'): MonthlyWaterDemand[] => {

    // Region Multipliers: Qassim +15%, Coastal -20%, Northern -25%
    let multiplier = 1.0;
    if (region === 'Qassim') multiplier = 1.15;
    if (region === 'Coastal') multiplier = 0.80;
    if (region === 'Northern') multiplier = 0.75;

    // Soil Multipliers: Sandy +10% (Drainage), Clay 0% (Just Alert), Loam 0%
    if (soilType === 'Sandy') multiplier = multiplier * 1.10;

    // We calculate for all 12 months
    const demands: MonthlyWaterDemand[] = [];

    for (let i = 0; i < 12; i++) {
        // 1. Try Specific Scientific Schedule
        const specificDemand = getHailScheduleDemand(zone.plantCategory, i, zone.treeCount);

        if (specificDemand) {
            const adjustedDaily = Math.round(specificDemand.waterLitersPerDay * multiplier);
            // Also adjust total M3
            const days = DAYS_IN_MONTH[i];
            const adjustedM3 = Math.round(((adjustedDaily * days) / 1000) * 10) / 10;

            demands.push({
                ...specificDemand,
                id: uuidv4(),
                zoneId: zone.id,
                waterLitersPerDay: adjustedDaily,
                waterCubicMetersPerMonth: adjustedM3,
                amountPerSession: adjustedDaily, // Simplified for now, complex freq logic would strictly recalc session amount but Daily is the budget source
                amountRange: specificDemand.amountRange ? `${specificDemand.amountRange} (x${multiplier})` : undefined
            });
            continue;
        }

        // 2. Fallback: Generic Logic
        const baseLiters = (zone.plantCategory === 'Fruit' || zone.plantCategory === 'Palm' || zone.plantCategory === 'Citrus' || zone.plantCategory === 'Grape' || zone.plantCategory === 'Olive')
            ? BASE_LITERS_PER_TREE_FRUIT
            : BASE_LITERS_PER_TREE_ORNAMENTAL;

        const factors = (zone.plantCategory === 'Fruit' || zone.plantCategory === 'Palm')
            ? SEASONAL_FACTORS_FRUIT
            : SEASONAL_FACTORS_ORNAMENTAL;

        const factor = factors[i];

        const rawDaily = zone.treeCount * baseLiters * factor * multiplier;
        const waterLitersPerDay = Math.round(rawDaily);
        const days = DAYS_IN_MONTH[i];
        const waterM3 = (waterLitersPerDay * days) / 1000;
        const waterCubicMetersPerMonth = Math.round(waterM3 * 10) / 10;

        demands.push({
            id: uuidv4(),
            zoneId: zone.id,
            monthIndex: i,
            waterLitersPerDay,
            waterCubicMetersPerMonth,
            isOverridden: false,
            frequencyDescription: 'Daily / يومياً',
            amountPerSession: waterLitersPerDay,
            amountRange: `${waterLitersPerDay}`,
            notes: 'Generic estimation'
        });
    }

    return demands;
};

// --- New Logic Requested by User --- (Added Jan 2026)

export function calculateIrrigationDetails(
    demand: number, // Liters/day
    plantCategory: string,
    monthIdx: number // 0-based index
): {
    dailyAmount: number;
    frequency: string; // "Daily", "Every 3 days", "Twice a week"
    sessionAmount: number; // For Basins
} {
    const month = monthIdx + 1; // Convert to 1-based for user logic matching

    // Cases requested by user
    if (plantCategory === 'Citrus' && month <= 2) {
        return {
            dailyAmount: demand,
            frequency: 'كل 3 أيام',
            sessionAmount: Math.round(demand * 3)
        };
    }

    if (plantCategory === 'Lawn' && month <= 2) {
        return {
            dailyAmount: demand,
            frequency: 'مرتين أسبوعياً',
            sessionAmount: Math.round(demand * 3.5)
        };
    }

    if (plantCategory === 'Grape' && (month === 12 || month === 1)) {
        return {
            dailyAmount: 0,
            frequency: 'توقف كامل',
            sessionAmount: 0
        };
    }

    // Default Case (Daily)
    return {
        dailyAmount: demand,
        frequency: 'يومي',
        sessionAmount: demand // For Drip = Daily Amount
    };
}
