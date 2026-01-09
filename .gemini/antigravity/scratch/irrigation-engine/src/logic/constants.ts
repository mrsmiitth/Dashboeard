export const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Seasonal factors (0.0 to 1.5) representing water need relative to base
// Simplified generic curve for Middle East / Saudi Arabia (Peak in Jul/Aug)
export const SEASONAL_FACTORS_FRUIT = [
    0.6, 0.7, 0.9, 1.1, 1.3, 1.45, 1.5, 1.45, 1.3, 1.1, 0.8, 0.6
];

export const SEASONAL_FACTORS_ORNAMENTAL = [
    0.5, 0.6, 0.8, 1.0, 1.2, 1.3, 1.35, 1.3, 1.2, 1.0, 0.7, 0.5
];

export const BASE_LITERS_PER_TREE_FRUIT = 80; // Avg mature fruit tree
export const BASE_LITERS_PER_TREE_ORNAMENTAL = 40; // Avg ornamental tree

// Emitter specs
export const STANDARD_EMITTER_FLOW = 8; // LPH
export const BUBBLER_FLOW = 240; // LPH (High flow)
export const DRIP_EMITTERS_PER_TREE_SMALL = 2;
export const DRIP_EMITTERS_PER_TREE_MED = 4;
export const DRIP_EMITTERS_PER_TREE_LARGE = 6;

// Pipe Specs (Max Safe Flow in LPH for typical PVC/PE pipes to stay < 1.5 m/s)
export const PIPE_FLOW_LIMITS: Record<number, number> = {
    16: 800,
    20: 1200,
    25: 2200,    // 1 inch
    32: 3800,    // 1.25 inch
    40: 6000,    // 1.5 inch
    50: 10000,   // 2 inch
    63: 18000,   // 2.5 inch
    75: 28000,   // 3 inch
    90: 42000,
    110: 65000
};

export const DISTANCE_THRESHOLD_FOR_UPSIZING = 100; // meters. If > 100m, consider upsizing.
