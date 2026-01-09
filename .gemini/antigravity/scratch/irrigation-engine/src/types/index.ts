export type UUID = string;

// 1. Irrigation Center
export interface IrrigationCenter {
  id: UUID;
  name: string;
  location: { x: number; y: number };
  pumpCapacityLph?: number;
  defaultFlowRate?: number;
  defaultEmitterCount?: number;
  region?: Region;
  soilType?: SoilType;
  notes?: string;
}

// 2. Zones
export type PlantCategory = 'Palm' | 'Olive' | 'Citrus' | 'Grape' | 'Lawn' | 'Fruit' | 'Ornamental';
export type IrrigationMethod = 'Auto' | 'Drip' | 'Bubbler' | 'Sprinkler' | 'Basin';
export type Region = 'Central' | 'Qassim' | 'Coastal' | 'Northern';
export type SoilType = 'Sandy' | 'Clay' | 'Loam';

export interface Zone {
  id: UUID;
  name: string;
  plantCategory: PlantCategory;
  treeCount: number;
  irrigationMethod: IrrigationMethod;
  distanceFromCenter: number; // meters
  x: number;
  y: number;
  areaSqM?: number;
  isActive: boolean;
  custom?: Partial<IrrigationRecommendation>;
}

// 3. Monthly Water Demand
export interface MonthlyWaterDemand {
  id: UUID;
  zoneId: UUID;
  monthIndex: number; // 0 (Jan) - 11 (Dec)
  waterLitersPerDay: number;
  waterCubicMetersPerMonth: number;
  isOverridden: boolean;

  // Specific Schedule Info
  frequencyDescription?: string;
  amountPerSession?: number; // Numeric max for calculation
  amountRange?: string; // Display string "400 - 500"
  stage?: string; // Phenological Stage (e.g. "Flowering")
  notes?: string;
}

// 4. Irrigation Recommendations
export interface IrrigationRecommendation {
  id: UUID;
  zoneId: UUID;
  method: IrrigationMethod;
  emittersPerTree: number;
  flowRatePerEmitter: number; // LPH
  runtimeMinutes: number;
  daysPerWeek: number;
  pipeDiameterMm: number;
  isOverridden: boolean;
}

// 5. Irrigation Network
export type SegmentType = 'Main' | 'Sub-main' | 'Lateral';

export interface NetworkSegment {
  id: UUID;
  zoneId?: UUID;
  type: SegmentType;
  diameterMm: number;
  lengthM: number;
  material: string;
}

// 6. BOQ
export type BOQItemCategory = string;

export interface BOQItem {
  id: UUID;
  category: BOQItemCategory;
  specification: string;
  quantity: number;
  unit: string;
  zoneId?: UUID;
}

// Global App State
export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface AppState {
  center: IrrigationCenter;
  zones: Zone[];
  waterDemands: Record<UUID, MonthlyWaterDemand[]>;
  recommendations: Record<UUID, IrrigationRecommendation>;
  activeView: 'dashboard' | 'setup' | 'zones' | 'demand' | 'recommendations' | 'simulation' | 'boq' | 'warnings' | 'fertilization' | 'operations' | 'pest' | 'harvest' | 'plant_needs';

  networkSegments: NetworkSegment[];
  boqItems: BOQItem[];
  language: Language;
  theme: Theme;
  mapScale: number; // pixels per meter
}
