import { v4 as uuidv4 } from 'uuid';
import type { Zone, IrrigationRecommendation, IrrigationMethod } from '../types';
import {
    STANDARD_EMITTER_FLOW,
    BUBBLER_FLOW,
    DRIP_EMITTERS_PER_TREE_MED,
    PIPE_FLOW_LIMITS,
    DISTANCE_THRESHOLD_FOR_UPSIZING
} from './constants';

export const generateRecommendation = (
    zone: Zone,
    peakDailyDemandLiters: number
): IrrigationRecommendation => {

    // 1. Determine Method (if Auto)
    let method: IrrigationMethod = zone.irrigationMethod;
    if (method === 'Auto') {
        switch (zone.plantCategory) {
            case 'Palm': method = 'Basin'; break;
            case 'Olive':
            case 'Citrus':
            case 'Grape': method = 'Bubbler'; break;
            case 'Lawn': method = 'Sprinkler'; break;
            case 'Fruit': method = 'Drip'; break;
            default: method = 'Bubbler';
        }
    }

    // 2. Determine Emitters & Flow
    let emittersPerTree = 1;
    let flowRatePerEmitter = 0; // LPH

    if (method === 'Drip') {
        emittersPerTree = DRIP_EMITTERS_PER_TREE_MED;
        flowRatePerEmitter = STANDARD_EMITTER_FLOW;
    } else if (method === 'Bubbler') {
        emittersPerTree = 1;
        flowRatePerEmitter = BUBBLER_FLOW; // ~100LPH or user defined
    } else if (method === 'Basin') {
        // For Palm Basin, we need high flow to fill it fast. 
        // Usually open pipe or high flow bubbler.
        emittersPerTree = 1;
        flowRatePerEmitter = 200; // High flow
    } else if (method === 'Sprinkler') {
        // For lawn, 'treeCount' is actually 'sq meters' usually?
        // Assuming user inputs Area in treeCount field for Lawn for simplicity or we treat 'treeCount' as units.
        // Let's assume 1 unit = 1 sqm for Lawn?
        // The table says "Lawn (Sprinkler) 950L Daily". That's likely per generic area unit or per specific zone.
        // If user inputs '1' for lawn zone, it means 1 zone of lawn requiring that table amount.
        emittersPerTree = 1;
        flowRatePerEmitter = 50;
    } else {
        emittersPerTree = 1;
        flowRatePerEmitter = 50;
    }

    // 3. Calculate Runtime
    // Peak demand is usually determined by the schedule now.
    // But for sizing, we still use peak.

    // Peak demand per tree (avg)
    const peakDemandPerTree = peakDailyDemandLiters / (zone.treeCount || 1);

    const totalFlowPerTree = emittersPerTree * flowRatePerEmitter;
    const hoursNeeded = totalFlowPerTree > 0 ? peakDemandPerTree / totalFlowPerTree : 0;
    const runtimeMinutes = Math.ceil(hoursNeeded * 60);

    // 4. Determine Pipe Diameter
    const zoneTotalFlowLPH = zone.treeCount * totalFlowPerTree;

    let pipeDiameterMm = 0;
    const sizes = Object.keys(PIPE_FLOW_LIMITS).map(Number).sort((a, b) => a - b);

    for (const size of sizes) {
        if (PIPE_FLOW_LIMITS[size] >= zoneTotalFlowLPH) {
            pipeDiameterMm = size;
            break;
        }
    }
    if (pipeDiameterMm === 0) pipeDiameterMm = 110;

    // Distance Penalty
    if (zone.distanceFromCenter > DISTANCE_THRESHOLD_FOR_UPSIZING) {
        const currentIndex = sizes.indexOf(pipeDiameterMm);
        if (currentIndex < sizes.length - 1) {
            pipeDiameterMm = sizes[currentIndex + 1];
        }
    }

    return {
        id: uuidv4(),
        zoneId: zone.id,
        method,
        emittersPerTree,
        flowRatePerEmitter,
        runtimeMinutes,
        daysPerWeek: 7,
        pipeDiameterMm,
        isOverridden: false
    };
};
