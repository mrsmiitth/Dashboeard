import { v4 as uuidv4 } from 'uuid';
import type { Zone, NetworkSegment, IrrigationRecommendation } from '../types';

export const generateNetworkSegments = (
    zones: Zone[],
    recommendations: Record<string, IrrigationRecommendation>
): NetworkSegment[] => {
    const segments: NetworkSegment[] = [];

    // For this simulation, assuming a Star Topology or specialized layout based on available data.
    // Since we only have 'distance', we model a distinct line from Center (or Main header) to each Zone.

    zones.forEach(zone => {
        if (!zone.isActive) return;

        const rec = recommendations[zone.id];
        const diameter = rec ? rec.pipeDiameterMm : 50; // default if missing

        // 1. Sub-main line (Center to Zone Valve)
        segments.push({
            id: uuidv4(),
            zoneId: zone.id,
            type: 'Sub-main',
            diameterMm: diameter,
            lengthM: zone.distanceFromCenter,
            material: 'PVC Class 3' // Default assumption
        });

        // 2. Lateral lines (Internal to Zone)
        // Estimation: sqrt(area)? Or just based on trees?
        // If we assume trees are spaced 4m apart (typical), total lateral length ~ trees * 4m / rows?
        // Simplified engineering rule: ~4m per tree for lateral pipe.
        const lateralLength = zone.treeCount * 4;

        segments.push({
            id: uuidv4(),
            zoneId: zone.id,
            type: 'Lateral',
            diameterMm: 16, // Standard lateral
            lengthM: lateralLength,
            material: 'GR' // Emitter pipe
        });
    });

    return segments;
};
