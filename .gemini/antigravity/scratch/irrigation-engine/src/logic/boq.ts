import { v4 as uuidv4 } from 'uuid';
import type { Zone, NetworkSegment, IrrigationRecommendation, BOQItem } from '../types';

export const generateBOQ = (
    _zones: Zone[],
    _recommendations: Record<string, IrrigationRecommendation>,
    _segments: NetworkSegment[]
): BOQItem[] => {
    // Verified Project BOQ (Hail, KSA) - Manual Override based on User Specification
    // This ignores dynamic calculation to ensure exact procurement quantities.

    const items: BOQItem[] = [
        // 1. Plastic Pipes (Hard Network - U-PVC/PE 6 bar)
        {
            id: uuidv4(),
            category: 'Hard Network / الشبكة الصلبة',
            specification: 'Pipe 3" (90mm) - Main Line / ماصورة 3 بوصة',
            quantity: 2,
            unit: 'pcs/pipes',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Hard Network / الشبكة الصلبة',
            specification: 'Pipe 2" (63mm) - Carrier Lines / ماصورة 2 بوصة',
            quantity: 100,
            unit: 'pcs/pipes',
            zoneId: undefined
        },

        // 2. Fittings / قطع التركيب
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Elbow 90° 2" / كوع 2 بوصة',
            quantity: 30,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Tee 2" / قسام تي 2 بوصة',
            quantity: 20,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'End Cap 2" / سدة نهاية 2 بوصة',
            quantity: 15,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Socket 2" / جلبه 2 بوصة',
            quantity: 30,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Union 2" / شد وصل 2 بوصة',
            quantity: 6,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Reducer 3" to 2" / مسلوب 3 إلى 2 بوصة',
            quantity: 5,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Clamp Saddle 2"x¾" / كدة 2 بوصة مع فتحة رشاش',
            quantity: 20,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Fittings / قطع تركيب',
            specification: 'Swing Joint or Nipple / كوع سن أو نبل',
            quantity: 20,
            unit: 'pcs',
            zoneId: undefined
        },

        // 3. Adhesives & Consumables
        {
            id: uuidv4(),
            category: 'Consumables / مواد لاصقة',
            specification: 'Hot Glue High Pressure (US) / غراء حار أمريكي',
            quantity: 4,
            unit: 'cans (500g)',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Consumables / مواد لاصقة',
            specification: 'Cleaner / منظف مواسير',
            quantity: 2,
            unit: 'cans',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Consumables / مواد لاصقة',
            specification: 'Teflon Tape / شطرطون سباكة',
            quantity: 10,
            unit: 'rolls',
            zoneId: undefined
        },

        // 4. Flexible Network (LDPE)
        {
            id: uuidv4(),
            category: 'Flexible Network / الشبكة المرنة',
            specification: 'Hose 16mm Blind (400m) / لي زراعي 16 ملم سادة',
            quantity: 6,
            unit: 'rolls',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Flexible Network / الشبكة المرنة',
            specification: 'Spaghetti Tube 6mm / لي مكرونة',
            quantity: 3,
            unit: 'rolls',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Flexible Network / الشبكة المرنة',
            specification: 'Start Connector 16mm / وصلة بداية',
            quantity: 450,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Flexible Network / الشبكة المرنة',
            specification: 'End Plug 16mm (Glasses) / نظارات نهاية خط',
            quantity: 5,
            unit: 'bags (100)',
            zoneId: undefined
        },

        // 5. Emitters & Sprinklers
        {
            id: uuidv4(),
            category: 'Emitters / المنقطات والرشاشات',
            specification: 'Bubbler (Palm) - Rain Bird/Jain / ببلر للنخيل',
            quantity: 150,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Emitters / المنقطات والرشاشات',
            specification: 'Drippers PC (Tree) / نقاطات خارجية',
            quantity: 1500,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Emitters / المنقطات والرشاشات',
            specification: 'Pop-up Rotary (Lawn) / رشاشات ثيل',
            quantity: 20,
            unit: 'pcs',
            zoneId: undefined
        },

        // 6. Control & Electrical
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Electric Valve 2" / محبس كهربائي',
            quantity: 5,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Valve Box / صندوق محبس',
            quantity: 5,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Controller (Timer) 6 Stations / جهاز تايمر',
            quantity: 1,
            unit: 'device',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Control Wire 1.5mm / سلك إشارة',
            quantity: 1,
            unit: 'roll',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Disc Filter 3" / فلتر زراعي',
            quantity: 1,
            unit: 'pcs',
            zoneId: undefined
        },
        {
            id: uuidv4(),
            category: 'Control / التحكم والكهرباء',
            specification: 'Submersible Pump 5HP / غطاس 5 حصان',
            quantity: 1,
            unit: 'pcs',
            zoneId: undefined
        }
    ];

    return items;
};
