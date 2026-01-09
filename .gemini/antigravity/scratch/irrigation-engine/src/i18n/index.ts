import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
    en: {
        'app.title': 'Antigravity',
        'app.subtitle': 'Irrigation Decision Engine',
        'nav.dashboard': 'Dashboard',
        'nav.setup': 'Irrigation Center',
        'nav.zones': 'Zones Manager',
        'nav.demand': 'Water Demand',
        'nav.recs': 'Recommendations',
        'nav.simulation': 'Network Simulation',
        'nav.boq': 'Bill of Quantities',
        'nav.fertilization': 'Fertilization Plan',
        'nav.operations': 'Technical Operations',
        'nav.pest': 'Pest Control',
        'nav.harvest': 'Harvest Calendar',
        'nav.warnings': 'Warnings & Insights',
        'label.project': 'Project: Hail, KSA',
        'label.units': 'Units: Metric',
        'btn.saveContinue': 'Save & Continue',
        'btn.addZone': 'Add New Zone',
        'btn.export': 'Export CSV',
        'th.month': 'Month',
        'th.factor': 'Season Factor',
        'th.daily': 'Daily (L)',
        'th.monthly': 'Monthly (m³)',
        'th.override': 'Override',
        'th.freq': 'Frequency',
        'th.session': 'Liters/Session',
        'th.duration': 'Duration (min)',
        'lbl.litersPerTree': 'L / Tree',
        'lbl.centerName': 'Center / Project Name',
        'lbl.pumpCap': 'Pump Capacity (L/h)',
        'lbl.notes': 'Notes',
        'lbl.zoneName': 'Zone Name',
        'lbl.plantCat': 'Plant Category',
        'lbl.treeCount': 'Tree Count',
        'lbl.dist': 'Dist. from Center (m)',
        'lbl.method': 'Irrigation Method',

        // Plant Categories
        'val.fruit': 'Other Fruit',
        'val.ornamental': 'Other Ornamental',
        'val.palm': 'Date Palm',
        'val.olive': 'Olive',
        'val.citrus': 'Citrus (Lemon/Orange)',
        'val.grape': 'Grape',
        'val.lawn': 'Lawn / Thiel',

        'val.drip': 'Drip',
        'val.bubbler': 'Bubbler',
        'val.sprinkler': 'Sprinkler',
        'val.basin': 'Basin',
        'lbl.advice': 'Soil Moisture Advice',

        'val.auto': 'Auto (Rec)',
        'warn.friction': 'High Friction Risk (Long Dist + Small Pipe)',
        'warn.override': 'System recommendations overridden',
        'warn.nominal': 'All Systems Nominal',
        'warn.noRisks': 'No design risks or conflicts detected.',
        'lbl.warning': 'Warning',
        'lbl.note': 'Note',
        'lbl.totalAnnual': 'Total Annual Budget',
        'lbl.peakMonth': 'Peak Month Usage',
        'lbl.year': 'Year',
        'lbl.basedOn': 'Based on current schedule & regional adjustments',
        'lbl.prevMonth': 'Previous Month',
        'lbl.nextMonth': 'Next Month',
        'lbl.total': 'Total',
        'btn.print': 'Print Schedule',
        'val.dormancy': 'Winter Dormancy',
        'lbl.alertCritical': 'Critical Action Required',
        'lbl.alertWarning': 'Warnings',
        'lbl.alertInfo': 'Seasonal Tips',
        'warn.freq.citrus': 'Every 3 Days (Not Daily!)',
        'warn.freq.lawn': 'Twice Weekly (Win)',
        'warn.msg.friction': 'High risk of pressure drop. Distance is high but pipe is small. Consider upsizing.',
        'warn.msg.override': 'System recommendations have been manually overridden. Verify hydraulic feasibility.',
        'warn.msg.zeroTrees': 'Zone has 0 trees. Water demand is zero.',

        'tip.clay': '💡 Clay Soil Tip: Ensure soil is dry 20-30cm deep before next cycle to prevent root rot.',

        'warn.scientific': 'ℹ️ Values based on Verified Scientific Report & MEWA Standards 2030.',
        'warn.olive': '⚠️ Science Alert: Olive is drought-tolerant. Excess water causes Verticillium Wilt.',
        'warn.citrus': '⚠️ Science Alert: Avoid winter flooding. High risk of Root Asphyxiation & Gummosis.',
        'warn.flowering': '🌸 Flowering Stability (Mar-Apr): Do NOT change irrigation >10% to prevent blossom drop.',
        'warn.heat': '☀️ Ha\'il Peak Heat (Jul-Aug): If Temp >45°C, increase Lawn water by 10% (Night Irrigation only).',
        'warn.sugar': '🍇 Sugar Stress (Aug): Water Reduced by 20% to concentrate sugars (Veraison Stage).',
        'warn.frost': '❄️ Frost Alert (Jan/Dec): Irrigate in evening if Temp <0°C to protect roots.',

        // Recs View
        'lbl.currentSchedule': 'Current Schedule',
        'lbl.modified': 'Modified',
        'lbl.pipeDiameter': 'Pipe Diameter (mm)',
        'lbl.runtime': 'Runtime (min/cycle)',
        'lbl.emittersPerTree': 'Emitters / Tree',
        'lbl.flowRate': 'Emitter Flow Rate (L/h)',
        'lbl.region': 'Region / Climate Zone',
        'lbl.soilType': 'Soil Type',
        'lbl.calcRuntime': 'Run Time (Minutes)',
        'lbl.runtimeFormula': 'Formula: (Daily / (Flow × Count)) × 60',

        // BOQ View
        'nav.boq.title': 'Bill of Quantities (BOQ)',
        'btn.exportCSV': 'Export CSV',
        'th.category': 'Category',
        'th.spec': 'Specification',
        'th.qty': 'Quantity',
        'th.unit': 'Unit',
        'th.zone': 'Zone / Location',
        'val.masterNetwork': 'Master Network',
        'val.unknown': 'Unknown',

        // Simulation
        'lbl.dragHint': 'Drag zones to reposition & update distance',

        // Scenarios
        'scen.label': 'Water Source / Network Pressure',
        'scen.20m': '20m Height (2.0 Bar) - Excellent',
        'scen.desc.20m': 'Excellent pressure for drippers and sprinklers',
        'scen.15m': '15m Height (1.5 Bar) - Good',
        'scen.desc.15m': 'Good pressure, large sprinklers might be weak',
        'scen.10m': '10m Height (1.0 Bar) - Critical',
        'scen.desc.10m': 'Critical minimum for pressure-compensating drippers',
        'scen.5m': '5m Height (0.5 Bar) - Very Weak',
        'scen.desc.5m': 'Very weak (Basin/Flood only, drippers inefficient)',

        // Scenario Details
        'lbl.height': 'Height',
        'lbl.pressure': 'Pressure',
        'lbl.flowCap': 'Flow Capacity',

        // Validation Alerts
        'alert.oliveMax': 'Current: {current} L. Max Safe Limit: {max} L. Excess water causes Verticillium Wilt.',
        'alert.citrusWinter': 'Current: {current} L. Max Safe Limit: {max} L. Risk of Root Rot/Gummosis in cold soil.',
        'alert.grapeDormancy': 'Current: {current} L. Grapevines must stop irrigation (Dormancy) to form fruit buds.',
        'alert.title': 'Warning',

        // Regions
        'reg.Central': 'Central (Riyadh)',
        'reg.Qassim': 'Qassim/Madinah (+15%)',
        'reg.Coastal': 'Coastal (Jeddah/Qatif) (-20%)',
        'reg.Northern': 'Northern (Jouf/Tabuk) (-25%)',

        // Soil
        'soil.Loam': 'Sandy Loam (Standard)',
        'soil.Sandy': 'Sandy (High Drainage)',
        'soil.Clay': 'Clay (High Retention)',
    },
    ar: {
        'app.title': 'أنتي غرافيتي',
        'app.subtitle': 'محرك قرارات الري',
        'nav.dashboard': 'لوحة القيادة',
        'nav.setup': 'مركز الري',
        'nav.zones': 'إدارة المناطق',
        'nav.demand': 'الاحتياج المائي',
        'nav.recs': 'التوصيات الفنية',
        'nav.simulation': 'محاكاة الشبكة',
        'nav.boq': 'جداول الكميات',
        'nav.fertilization': 'خطة التسميد',
        'nav.operations': 'العمليات الفنية',
        'nav.pest': 'مكافحة الآفات',
        'nav.harvest': 'موسم الحصاد',
        'nav.warnings': 'تنبيهات ومؤشرات',
        'label.project': 'المشروع: حائل، السعودية',
        'label.units': 'الوحدات: مترية',
        'btn.saveContinue': 'حفظ ومتابعة',
        'btn.addZone': 'إضافة منطقة جديدة',
        'btn.export': 'تصدير CSV',
        'th.month': 'الشهر',
        'th.factor': 'معامل الموسم',
        'th.daily': 'يومي (لتر)',
        'th.monthly': 'شهري (م³)',
        'th.override': 'تعديل يدوي',
        'th.freq': 'عدد مرات الري',
        'th.session': 'الكمية للرية (لتر)',
        'th.duration': 'مدة الري (دقيقة)',
        'lbl.litersPerTree': 'لتر / شجرة',
        'lbl.centerName': 'اسم المركز / المشروع',
        'lbl.pumpCap': 'سعة المضخة (لتر/ساعة)',
        'lbl.notes': 'ملاحظات',
        'lbl.zoneName': 'اسم المنطقة',
        'lbl.plantCat': 'نوع النبات',
        'lbl.treeCount': 'عدد الأشجار / المساحة',
        'lbl.dist': 'البعد عن المركز (م)',
        'lbl.method': 'نظام الري',

        // Plant Categories
        'val.fruit': 'أشجار مثمرة (أخرى)',
        'val.ornamental': 'زينة (أخرى)',
        'val.palm': 'نخيل',
        'val.olive': 'زيتون',
        'val.citrus': 'حمضيات (ليمون/برتقال)',
        'val.grape': 'عنب',
        'val.lawn': 'ثيل (مسطح أخضر)',

        'val.drip': 'تقطير',
        'val.bubbler': 'ببلر (فقاعي)',
        'val.sprinkler': 'رشاش',
        'val.basin': 'غمر / حوض',
        'lbl.advice': 'توجيهات رطوبة التربة',

        'val.auto': 'تلقائي (موصى به)',
        'warn.friction': 'خطر فاقد ضغط (مسافة طويلة + أنبوب صغير)',
        'warn.override': 'تم تعديل التوصيات يدوياً',
        'warn.nominal': 'النظام يعمل بكفاءة',
        'warn.noRisks': 'لا توجد تعارضات أو مخاطر في التصميم.',
        'lbl.warning': 'تحذير',
        'lbl.note': 'ملاحظة',
        'lbl.totalAnnual': 'إجمالي الميزانية السنوية',
        'lbl.peakMonth': 'ذروة الاستهلاك الشهري',
        'lbl.year': 'سنة',
        'lbl.basedOn': 'بناءً على الجدول الحالي والتعديلات الإقليمية',
        'lbl.prevMonth': 'الشهر السابق',
        'lbl.nextMonth': 'الشهر التالي',
        'lbl.total': 'المجموع الكلي',
        'btn.print': 'طباعة الجدول',
        'val.dormancy': 'سكون شتوي 🌙',
        'lbl.alertCritical': 'إجراءات حرجة - تطبيق فوري 🔴',
        'lbl.alertWarning': 'تنبيهات 🟡',
        'lbl.alertInfo': 'نصائح موسمية 💡',
        'warn.freq.citrus': 'كل 3 أيام (ليس يومي!) 🔴',
        'warn.freq.lawn': 'مرتين أسبوعياً فقط 🔴',
        'warn.msg.friction': 'خطر فاقد ضغط عالي. المسافة بعيدة والأنبوب صغير. يفضل تكبير القطر.',
        'warn.msg.override': 'تم تعديل التوصيات يدوياً. يرجى التحقق من الجدوى الهيدروليكية.',
        'warn.msg.zeroTrees': 'المنطقة تحتوي على 0 أشجار. الطلب المائي صفر.',

        'tip.clay': '💡 نصيحة للتربة الطينية: تأكد أن التربة جافة بعمق 20-30 سم قبل الرية التالية لتجنب تعفن الجذور.',

        'warn.scientific': 'ℹ️ الأرقام تستند لتقرير التحقق الفني ومعايير وزارة البيئة 2030.',
        'warn.olive': '⚠️ تنبيه علمي: الزيتون يتحمل الجفاف. الري الزائد يسبب ذبول الفيرتيسيليوم الفتاك.',
        'warn.citrus': '⚠️ تنبيه علمي: تجنب التغريق الشتوي للحمضيات لتفادي التصمغ واختناق الجذور.',
        'warn.flowering': '🌸 ثبات التزهير (مارس-أبريل): يمنع تغيير كمية الري >10% لتجنب تساقط الأزهار.',
        'warn.heat': '☀️ ذروة حرارة حائل (يوليو-أغسطس): إذا الحرارة >45°م، زد ري الثيل 10% (ري ليلي حصراً).',
        'warn.sugar': '🍇 إجهاد السكر (أغسطس): تم خفض الماء 20% لتركيز السكر في العنب (مرحلة التلوين).',
        'warn.frost': '❄️ تنبيه الصقيع (يناير/ديسمبر): يجب الري مساءً إذا الحرارة <0°م لتدفئة الجذور.',

        // Recs View
        'lbl.currentSchedule': 'الجدول الحالي',
        'lbl.modified': 'معدل',
        'lbl.pipeDiameter': 'قطر الأنبوب (ملم)',
        'lbl.runtime': 'مدة الري (دقيقة/دورة)',
        'lbl.emittersPerTree': 'عدد النقاطات / شجرة',
        'lbl.flowRate': 'تدفق النقاط (لتر/ساعة)',
        'lbl.region': 'المنطقة / المناخ',
        'lbl.soilType': 'نوع التربة',
        'lbl.calcRuntime': 'وقت التشغيل (دقيقة)',
        'lbl.runtimeFormula': 'المعادلة: (اليومي / (التدفق × العدد)) × 60',

        // BOQ View
        'nav.boq.title': 'جداول الكميات (BOQ)',
        'btn.exportCSV': 'تصدير CSV',
        'th.category': 'الفئة',
        'th.spec': 'المواصفات',
        'th.qty': 'الكمية',
        'th.unit': 'الوحدة',
        'th.zone': 'المنطقة / الموقع',
        'val.masterNetwork': 'الشبكة الرئيسية',
        'val.unknown': 'غير معروف',

        // Simulation
        'lbl.dragHint': 'اسحب المناطق لتغيير الموقع وتحديث المسافات',

        // Scenarios
        'scen.label': 'مصدر المياه / ضغط الشبكة',
        'scen.20m': 'ارتفاع 20 متر (2.0 بار) - ممتاز',
        'scen.desc.20m': 'ضغط ممتاز لتشغيل النقاطات والرشاشات',
        'scen.15m': 'ارتفاع 15 متر (1.5 بار) - جيد',
        'scen.desc.15m': 'ضغط جيد، قد يضعف أداء الرشاشات الكبيرة',
        'scen.10m': 'ارتفاع 10 متر (1.0 بار) - حرج',
        'scen.desc.10m': 'الحد الأدنى الحرج للنقاطات المعوضة للضغط',
        'scen.5m': 'ارتفاع 5 متر (0.5 بار) - ضعيف جداً',
        'scen.desc.5m': 'ضغط ضعيف جداً (ري بالغمر فقط، النقاطات لن تعمل بكفاءة)',

        // Scenario Details
        'lbl.height': 'الارتفاع',
        'lbl.pressure': 'الضغط',
        'lbl.flowCap': 'سعة التدفق',

        // Validation Alerts
        'alert.oliveMax': 'الحالي: {current} لتر. الحد الآمن: {max} لتر. الري الزائد يسبب ذبول شلل (Verticillium).',
        'alert.citrusWinter': 'الحالي: {current} لتر. الحد الآمن: {max} لتر. خطر تعفن الجذور في الشتاء.',
        'alert.grapeDormancy': 'الحالي: {current} لتر. يجب إيقاف ري العنب (سكون) لتحفيز البراعم.',
        'alert.title': 'تنبيه',

        // Regions
        'reg.Central': 'الوسطى (الرياض)',
        'reg.Qassim': 'القصيم/المدينة (+15%)',
        'reg.Coastal': 'الساحلية (القطيف) (-20%)',
        'reg.Northern': 'الشمالية (الجوف) (-25%)',

        // Soil
        'soil.Loam': 'رملية طمية (قياسية)',
        'soil.Sandy': 'رملية (نفاذية عالية)',
        'soil.Clay': 'طينية (احتفاظ عالي)',
    }
};

// Helper hook
import { useStore } from '../store/useStore';

export const useTranslation = () => {
    const { language } = useStore();
    const t = (key: string) => {
        const k = key as keyof typeof translations['en'];
        return translations[language][k] || translations['en'][k] || key;
    };
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    return { t, dir, language };
};
