import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
    AppState,
    IrrigationCenter,
    Zone,
    IrrigationRecommendation,
    Language,
    Theme
} from '../types';
import { calculateMonthlyDemand } from '../logic/waterDemand';
import { generateRecommendation } from '../logic/recommendations';
import { generateNetworkSegments } from '../logic/network';
import { generateBOQ } from '../logic/boq';

interface StoreActions {
    setCenter: (center: Partial<IrrigationCenter>) => void;
    addZone: (zone: Omit<Zone, 'id' | 'isActive' | 'x' | 'y'>) => void;
    updateZone: (id: string, updates: Partial<Zone>) => void;
    deleteZone: (id: string) => void;
    toggleZone: (id: string) => void;
    updateDemand: (zoneId: string, monthIndex: number, amount: number) => void;
    updateRecommendation: (zoneId: string, updates: Partial<IrrigationRecommendation>) => void;
    setActiveView: (view: AppState['activeView']) => void;
    setLanguage: (lang: Language) => void;
    setTheme: (theme: Theme) => void;
    recalculateAll: () => void;
}

type Store = AppState & StoreActions;

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            // Initial State
            center: {
                id: uuidv4(),
                name: 'Main Farm Center',
                location: { x: 0, y: 0 },
                pumpCapacityLph: 0
            },
            zones: [],
            waterDemands: {},
            recommendations: {},
            activeView: 'setup',
            networkSegments: [],
            boqItems: [],
            language: 'en',
            theme: 'dark',
            mapScale: 2, // 2 pixels = 1 meter default visual scale

            // Actions
            setLanguage: (lang) => set({ language: lang }),

            setTheme: (theme) => {
                set({ theme });
                // Update DOM for CSS variables
                document.documentElement.setAttribute('data-theme', theme);
            },

            setCenter: (updates) => set((state) => {
                const newCenter = { ...state.center, ...updates };

                // If Region OR Soil changed, we MUST recalculate ALL demands
                let newDemands = state.waterDemands;
                let newRecs = state.recommendations;

                const regionChanged = updates.region && updates.region !== state.center.region;
                const soilChanged = updates.soilType && updates.soilType !== state.center.soilType;

                if (regionChanged || soilChanged) {
                    newDemands = {};
                    newRecs = {};
                    const region = updates.region || state.center.region;
                    const soil = updates.soilType || state.center.soilType;

                    state.zones.forEach(zone => {
                        const demands = calculateMonthlyDemand(zone, region, soil);
                        newDemands[zone.id] = demands;

                        const peakDaily = Math.max(...demands.map(d => d.waterLitersPerDay));
                        const rec = generateRecommendation(zone, peakDaily);
                        newRecs[zone.id] = rec;
                    });
                }

                return {
                    center: newCenter,
                    waterDemands: newDemands === state.waterDemands ? state.waterDemands : newDemands,
                    recommendations: newRecs === state.recommendations ? state.recommendations : newRecs
                };
            }),

            addZone: (zoneInput) => {
                // Random placement if added via list, or explicit logic later
                // Place them at distance x on X axis for simplicity initially
                const dist = zoneInput.distanceFromCenter || 50;
                const scale = get().mapScale;

                const newZone: Zone = {
                    id: uuidv4(),
                    isActive: true,
                    x: dist * scale, // Put it to the right
                    y: 0,
                    ...zoneInput
                };

                const demands = calculateMonthlyDemand(newZone, get().center.region, get().center.soilType);
                const peakDaily = Math.max(...demands.map(d => d.waterLitersPerDay));
                const rec = generateRecommendation(newZone, peakDaily);

                set((state) => {
                    const newZones = [...state.zones, newZone];
                    const newDemands = { ...state.waterDemands, [newZone.id]: demands };
                    const newRecs = { ...state.recommendations, [newZone.id]: rec };

                    const segments = generateNetworkSegments(newZones, newRecs);
                    const boq = generateBOQ(newZones, newRecs, segments);

                    return {
                        zones: newZones,
                        waterDemands: newDemands,
                        recommendations: newRecs,
                        networkSegments: segments,
                        boqItems: boq,
                        activeView: 'zones'
                    };
                });
            },

            updateZone: (id, updates) => {
                set((state) => {
                    // Check if position changed, if so, we might need to recalc Distance?
                    // OR if distance changed, recalc Position?
                    // Let's assume the VIEW driving the update is responsible generally, but...
                    // If we receive x,y update from MAP, we should update Distance.

                    const currentZone = state.zones.find(z => z.id === id);
                    if (!currentZone) return {};

                    let derivedUpdates = { ...updates };

                    // If X/Y provided but Distance NOT provided, calculate Distance
                    if ((updates.x !== undefined || updates.y !== undefined) && updates.distanceFromCenter === undefined) {
                        const newX = updates.x ?? currentZone.x;
                        const newY = updates.y ?? currentZone.y;
                        // Dist = sqrt(x^2 + y^2) / mapScale
                        const pxDist = Math.sqrt(newX * newX + newY * newY);
                        const meters = Math.round(pxDist / state.mapScale); // Round to integer meters
                        derivedUpdates.distanceFromCenter = meters;
                    }
                    // If Distance provided but X/Y NOT provided, we keep angle but push radius? 
                    // Complex. Let's assume manual distance edit in List DOES NOT move map node for now (or just pushes it out on current angle).
                    else if (updates.distanceFromCenter !== undefined && (updates.x === undefined && updates.y === undefined)) {
                        // Push out on current vector
                        const currentDistPx = Math.sqrt(currentZone.x * currentZone.x + currentZone.y * currentZone.y);
                        // Avoid div by zero
                        if (currentDistPx > 0) {
                            const ratio = (updates.distanceFromCenter * state.mapScale) / currentDistPx;
                            derivedUpdates.x = currentZone.x * ratio;
                            derivedUpdates.y = currentZone.y * ratio;
                        } else {
                            // Was at 0,0, move to right
                            derivedUpdates.x = updates.distanceFromCenter * state.mapScale;
                        }
                    }

                    const updatedZones = state.zones.map(z => z.id === id ? { ...z, ...derivedUpdates } : z);

                    const targetZone = updatedZones.find(z => z.id === id)!;

                    let newDemands = { ...state.waterDemands };
                    let newRecs = { ...state.recommendations };

                    // Logic Recalcs
                    const freshDemands = calculateMonthlyDemand(targetZone, state.center.region, state.center.soilType);
                    newDemands[id] = freshDemands;

                    const peakDaily = Math.max(...freshDemands.map(d => d.waterLitersPerDay));

                    const freshRec = generateRecommendation(targetZone, peakDaily);
                    newRecs[id] = freshRec;

                    const segments = generateNetworkSegments(updatedZones, newRecs);
                    const boq = generateBOQ(updatedZones, newRecs, segments);

                    return {
                        zones: updatedZones,
                        waterDemands: newDemands,
                        recommendations: newRecs,
                        networkSegments: segments,
                        boqItems: boq
                    };
                });
            },

            deleteZone: (id) => {
                set((state) => {
                    const newZones = state.zones.filter(z => z.id !== id);
                    const { [id]: _, ...newDemands } = state.waterDemands;
                    const { [id]: __, ...newRecs } = state.recommendations;

                    const segments = generateNetworkSegments(newZones, newRecs);
                    const boq = generateBOQ(newZones, newRecs, segments);

                    return {
                        zones: newZones,
                        waterDemands: newDemands,
                        recommendations: newRecs,
                        networkSegments: segments,
                        boqItems: boq
                    };
                });
            },

            toggleZone: (id) => {
                const state = get();
                const zone = state.zones.find(z => z.id === id);
                if (zone) {
                    state.updateZone(id, { isActive: !zone.isActive });
                }
            },

            updateDemand: (zoneId, monthIndex, amount) => set(state => {
                const demands = state.waterDemands[zoneId] || [];
                const newDemands = demands.map((d, i) => i === monthIndex ? { ...d, waterLitersPerDay: amount, isOverridden: true } : d);
                return {
                    waterDemands: { ...state.waterDemands, [zoneId]: newDemands }
                };
            }),

            updateRecommendation: (zoneId, updates) => set(state => {
                const current = state.recommendations[zoneId];
                if (!current) return {};
                return {
                    recommendations: {
                        ...state.recommendations,
                        [zoneId]: { ...current, ...updates, isOverridden: true }
                    }
                };
            }),

            setActiveView: (view) => set({ activeView: view }),

            recalculateAll: () => {
                const s = get();
                const segments = generateNetworkSegments(s.zones, s.recommendations);
                const boq = generateBOQ(s.zones, s.recommendations, segments);
                set({ networkSegments: segments, boqItems: boq });
            }

        }),
        {
            name: 'irrigation-engine-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                // Restore Theme on load
                if (state && state.theme) {
                    document.documentElement.setAttribute('data-theme', state.theme);
                }
            }
        }
    )
);
