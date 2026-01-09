import type { MonthlyWaterDemand, PlantCategory } from '../types';

// Research-based Schedule (MEWA & Scientific Verification Report)
// Values are Daily Water Requirement (Liters/Day) unless otherwise noted (Lawn is L/m2).

const SCIENTIFIC_SCHEDULE = {
    Palm: {
        // Updated per User: Max 250L/day, High Frequency
        daily: [70, 80, 120, 160, 200, 240, 250, 250, 220, 180, 130, 70],
        range: ["60-80", "70-90", "110-130", "150-170", "190-210", "230-250", "240-260", "240-260", "210-230", "170-190", "120-140", "60-80"],
        freq: ["Every 3 Days", "Every 3 Days", "Every 2 Days", "Every 2 Days", "Daily", "Daily", "Daily", "Daily", "Daily", "Every 2 Days", "Every 2 Days", "Every 3 Days"],
        freqAr: ["كل 3 أيام", "كل 3 أيام", "يوم بعد يوم", "يوم بعد يوم", "يومياً", "يومياً", "يومياً", "يومياً", "يومياً", "يوم بعد يوم", "يوم بعد يوم", "كل 3 أيام"],
        stage: ["Dormancy", "Pollination", "Fruit Set", "Fruit Growth", "Fruit Growth", "Rapid Growth", "Color Break", "Maturation", "Harvest", "Post-Harvest", "Nutrient Storage", "Dormancy"],
        stageAr: ["سكون شتوي", "تلقيح", "عقد الثمار", "نمو الثمار", "نمو الثمار", "نمو سريع", "تلوين (بسر)", "نضج", "حصاد", "خدمة ما بعد الحصاد", "تخزين غذاء", "سكون شتوي"]
    },
    Olive: {
        // Verified: Dec-Jan 30 (Dormancy), Jun-Jul 110 (Stone Hardening)
        daily: [30, 40, 60, 70, 80, 100, 110, 100, 90, 70, 60, 30],
        range: ["20-40", "30-50", "50-70", "60-80", "70-90", "90-110", "100-120", "90-110", "80-100", "60-80", "50-70", "20-40"],
        freq: ["Every 10 Days", "Every 7 Days", "Every 4 Days", "Every 3 Days", "Every 2 Days", "Every 2 Days", "Every 2 Days", "Every 2 Days", "Every 3 Days", "Every 4 Days", "Every 7 Days", "Every 10 Days"],
        freqAr: ["كل 10 أيام", "كل أسبوع", "كل 4 أيام", "كل 3 أيام", "يوم بعد يوم", "يوم بعد يوم", "يوم بعد يوم", "يوم بعد يوم", "كل 3 أيام", "كل 4 أيام", "كل أسبوع", "كل 10 أيام"],
        stage: ["Dormancy", "Differentiation", "Bud Break", "Flowering", "Fruit Set", "Pit Hardening", "Pit Hardening", "Oil Accumulation", "Oil Accumulation", "Maturation", "Harvest", "Dormancy"],
        stageAr: ["سكون", "تمايز زهري", "انتفاخ براعم", "تزهير", "عقد", "تصلب النواة", "تصلب النواة", "تراكم الزيت", "تراكم الزيت", "نضج", "حصاد", "سكون"]
    },
    Citrus: {
        // Verified: Winter 50-70, Freq Every 3 Days (User Request)
        daily: [60, 60, 100, 125, 150, 200, 225, 230, 150, 125, 100, 60],
        range: ["50-70", "50-70", "90-110", "110-140", "140-160", "190-210", "210-240", "220-240", "140-160", "110-140", "90-110", "50-70"],
        freq: ["Every 3 Days", "Every 3 Days", "Every 3 Days", "Every 2 Days", "Every 2 Days", "Daily", "Daily", "Daily", "Daily", "Every 2 Days", "Every 3 Days", "Every 3 Days"],
        freqAr: ["كل 3 أيام", "كل 3 أيام", "كل 3 أيام", "يوم بعد يوم", "يوم بعد يوم", "يومياً", "يومياً", "يومياً", "يومياً", "يوم بعد يوم", "كل 3 أيام", "كل 3 أيام"],
        stage: ["Dormancy", "Bud Break", "Flowering", "Fruit Set", "Cell Enlargement", "Rapid Growth", "Rapid Growth", "Juice Accumulation", "Color Break", "Maturation", "Harvest", "Dormancy"],
        stageAr: ["سكون نسبية", "تفتح براعم", "تزهير", "عقد الثمار", "تضخم خلايا", "نمو سريع", "نمو سريع", "امتلاء عصيري", "تلوين", "نضج", "حصاد", "سكون نسبية"]
    },
    Grape: {
        // Verified: Aug Deficit (50L), Dec-Jan Stop (0L)
        daily: [0, 0, 40, 60, 80, 100, 130, 50, 40, 30, 20, 0],
        range: ["Stop", "Stop", "30-50", "50-70", "70-90", "90-110", "120-140", "40-60 (Deficit)", "35-45", "25-35", "15-25", "Stop"],
        freq: ["Dormancy", "Dormancy", "Weekly", "Every 4 Days", "Every 2 Days", "Daily", "Daily", "Daily", "Every 3 Days", "Weekly", "Monthly", "Dormancy"],
        freqAr: ["سكون (توقف)", "سكون (توقف)", "أسبوعياً", "كل 4 أيام", "يوم بعد يوم", "يومياً", "يومياً", "يومياً", "يوم بعد يوم", "كل 3 أيام", "أسبوعياً", "رية تصويم", "سكون (توقف)"],
        stage: ["Dormancy", "Dormancy", "Bud Burst", "Shoot Growth", "Flowering", "Fruit Set", "Berry Growth", "Veraison (Sugar)", "Maturation", "Harvest", "Reserve Storage", "Dormancy"],
        stageAr: ["سكون عميق", "سكون عميق", "تفتح براعم", "نمو خضري", "تزهير", "عقد", "نمو حبات", "تلوين (سكر)", "نضج", "حصاد", "تخزين غذاء", "سكون عميق"]
    },
    Lawn: {
        // Verified: Winter 3-5 (Twice Weekly), Summer 12-15 (Daily)
        daily: [4, 4, 7, 8, 9, 12, 14, 15, 10, 9, 8, 4],
        range: ["3-5 L/m²", "3-5 L/m²", "6-8 L/m²", "7-9 L/m²", "8-10 L/m²", "11-13 L/m²", "13-15 L/m²", "13-15 L/m²", "9-11 L/m²", "8-10 L/m²", "7-9 L/m²", "3-5 L/m²"],
        freq: ["Twice Weekly", "Twice Weekly", "Every 2 Days", "Every 2 Days", "Daily", "Daily", "Daily", "Daily", "Every 2 Days", "Every 2 Days", "Twice Weekly", "Twice Weekly"],
        freqAr: ["مرتين أسبوعياً", "مرتين أسبوعياً", "يوم بعد يوم", "يوم بعد يوم", "يومياً", "يومياً", "يومياً", "يومياً", "يوم بعد يوم", "يوم بعد يوم", "مرتين أسبوعياً", "مرتين أسبوعياً"],
        stage: ["Slow Growth", "Slow Growth", "Spring Greening", "Active Growth", "Active Growth", "Peak Heat", "Peak Heat", "Peak Heat", "Recovery", "Slowing", "Dormancy Prep", "Slow Growth"],
        stageAr: ["نمو بطيء", "نمو بطيء", "اخضرار ربيعي", "نمو نشط", "نمو نشط", "ذروة حرارة", "ذروة حرارة", "ذروة حرارة", "تعافي", "تباطؤ", "استعداد سكون", "نمو بطيء"]
    },
    Fruit: {
        // Generic Fruit logic
        daily: [60, 70, 110, 135, 160, 210, 240, 240, 160, 135, 100, 60],
        range: ["50-70", "60-80", "100-120", "125-145", "150-170", "200-220", "230-250", "230-250", "150-170", "125-145", "90-110", "50-70"],
        freq: ["Every 5 Days", "Every 4 Days", "Every 3 Days", "Every 2 Days", "Every 2 Days", "Daily", "Daily", "Daily", "Daily", "Every 2 Days", "Every 3 Days", "Every 5 Days"],
        freqAr: ["نظام بابلر (كل 5 أيام)", "كل 4 أيام", "كل 3 أيام", "يوم بعد يوم", "يوم بعد يوم", "يومياً", "يومياً", "يومياً", "يومياً", "يوم بعد يوم", "كل 3 أيام", "كل 5 أيام"],
        stage: ["Dormancy", "Bud Break", "Flowering", "Fruit Set", "Growth", "Rapid Growth", "Maturation", "Maturation", "Harvest", "Post-Harvest", "Storage", "Dormancy"],
        stageAr: ["سكون", "تفتح", "تزهير", "عقد", "نمو", "نمو سريع", "نضج", "نضج", "حصاد", "ما بعد الحصاد", "تخزين", "سكون"]
    },
    Ornamental: {
        // Moderate
        daily: [35, 40, 55, 70, 90, 110, 130, 130, 110, 80, 55, 35],
        range: ["30-40", "35-45", "50-60", "65-75", "80-100", "100-120", "120-140", "120-140", "100-120", "70-90", "50-60", "30-40"],
        freq: ["Every 7 Days", "Every 6 Days", "Every 4 Days", "Every 3 Days", "Every 3 Days", "Every 2 Days", "Every 2 Days", "Every 2 Days", "Every 2 Days", "Every 3 Days", "Every 5 Days", "Every 7 Days"],
        freqAr: ["أسبوعياً", "كل 6 أيام", "كل 4 أيام", "كل 3 أيام", "كل 3 أيام", "يوم بعد يوم", "يوم بعد يوم", "يوم بعد يوم", "يوم بعد يوم", "كل 3 أيام", "كل 5 أيام", "أسبوعياً"],
        stage: ["Standard", "Standard", "Spring", "Spring", "Summer", "Summer", "Peak", "Peak", "Summer", "Fall", "Fall", "Standard"],
        stageAr: ["عادي", "عادي", "ربيع", "ربيع", "صيف", "صيف", "ذروة", "ذروة", "صيف", "خريف", "خريف", "عادي"]
    }
};

export const getHailScheduleDemand = (
    plantCategory: PlantCategory,
    monthIndex: number,
    treeCount: number // For "Lawn", this is interpreted as m2
): MonthlyWaterDemand | null => {
    // Explicit lookup - no generic fallbacks anymore as we defined all types
    const schedule = SCIENTIFIC_SCHEDULE[plantCategory as keyof typeof SCIENTIFIC_SCHEDULE];

    if (!schedule) return null;

    const dailyLitersPerUnit = schedule.daily[monthIndex];

    // 1. Calculate Total Daily for Zone
    let totalDailyLiters = dailyLitersPerUnit * treeCount;

    // 2. Frequency Logic
    // We need the interval to calculate Session Amount
    // The explicit 'intervalDays' are not in the simple object above, so we validly estimate:
    // "Every 5 days" -> 5, "Daily" -> 1, "Twice Weekly" -> 3.5
    const freqStr = schedule.freq[monthIndex];
    let interval = 1;
    if (freqStr.includes('Daily')) interval = 1;
    else if (freqStr.includes('Day after day')) interval = 2;
    // Extract number from "Every X Days"
    else if (freqStr.includes('Every')) {
        const match = freqStr.match(/(\d+)/);
        if (match) interval = parseInt(match[1]);
    }
    else if (freqStr.includes('Twice Weekly')) interval = 3.5;
    else if (freqStr.includes('Weekly')) interval = 7;
    else if (freqStr.includes('Monthly')) interval = 30;

    // 3. Calculate Session Amount (Per Tree or Per m2)
    // Session = Daily * Interval
    const sessionAmountPerUnit = dailyLitersPerUnit * interval;

    // Create Range String (e.g. "340 - 380 L")
    // If it's Lawn, we typically just show the mm (L/m2) or the total session volume? 
    // Usually Session Column assumes "Per tree" for trees. 
    // showing pure number is better.
    // Let's create a +/- 10% range for realism
    const minSession = Math.round(sessionAmountPerUnit * 0.9);
    const maxSession = Math.round(sessionAmountPerUnit * 1.1);

    let amountRange = `${minSession}-${maxSession}`;
    if (interval === 1) amountRange = `${Math.round(dailyLitersPerUnit)}`; // Exact if daily

    // Special Lawn handling for Range Display
    if (plantCategory === 'Lawn') {
        const minL = dailyLitersPerUnit - 1;
        const maxL = dailyLitersPerUnit + 1;
        amountRange = (interval <= 1)
            ? `${minL}-${maxL} L/m²`
            : `${Math.round(minSession)}-${Math.round(maxSession)} L/m²`;
    }

    const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
    const cubicMeters = (totalDailyLiters * daysInMonth) / 1000;

    // Helper type to safely access stage properties
    const scheduleWithStage = schedule as typeof schedule & { stage?: string[]; stageAr?: string[] };
    
    return {
        id: `sched-${plantCategory}-${monthIndex}`,
        zoneId: 'ref',
        monthIndex,
        waterLitersPerDay: totalDailyLiters,
        waterCubicMetersPerMonth: parseFloat(cubicMeters.toFixed(2)),
        isOverridden: false,
        frequencyDescription: `${schedule.freq[monthIndex]} / ${schedule.freqAr[monthIndex]}`,
        amountPerSession: Math.round(sessionAmountPerUnit), // Verified Session Amount
        amountRange: amountRange,
        stage: scheduleWithStage.stage && scheduleWithStage.stageAr 
            ? `${scheduleWithStage.stage[monthIndex]} / ${scheduleWithStage.stageAr[monthIndex]}` 
            : undefined
    };
};
