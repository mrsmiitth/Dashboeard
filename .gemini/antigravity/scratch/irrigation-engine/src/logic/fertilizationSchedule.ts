export interface FertilizationEntry {
    crop: "Palm" | "Olive" | "Citrus" | "Grape" | "Lawn";
    month: number; // 1-12
    type: "Organic" | "NPK" | "Micronutrients";
    material: string; // "Compost", "Urea", "Potassium Sulfate", etc.
    amount: string; // "10-15 kg/tree" or "500g/tree"
    application: string; // "في خندق 70-100 سم من الجذع"
    frequency: string; // "مرة واحدة" or "3 دفعات"
    criticalNote?: string;
}

export const FERTILIZATION_SCHEDULE: FertilizationEntry[] = [
    // النخيل - Palm
    {
        crop: "Palm",
        month: 1, // يناير
        type: "Organic",
        material: "سماد عضوي متحلل (كمبوست)",
        amount: "10-15 كجم/نخلة",
        application: "في خندق نصف دائري 70-100 سم من الجذع، عمق 30 سم",
        frequency: "مرة واحدة (خدمة شتوية)",
        criticalNote: "⚠️ يمكن زيادة الكمية إلى 50 كجم للأشجار الكبيرة كل بضع سنوات"
    },
    {
        crop: "Palm",
        month: 2,
        type: "NPK",
        material: "يوريا (نيتروجين)",
        amount: "500 جم/نخلة",
        application: "دفعة أولى - نثر حول الجذع",
        frequency: "الدفعة 1 من 3",
        criticalNote: "تحفيز النمو الخضري قبل التلقيح"
    },
    {
        crop: "Palm",
        month: 3,
        type: "Micronutrients",
        material: "حديد + زنك + بورون (مخلبي)",
        amount: "رش ورقي حسب التعليمات",
        application: "رش على السعف الأخضر صباحاً",
        frequency: "مرة واحدة",
        criticalNote: "⚠️ ضروري في التربة القلوية لمنع الاصفرار"
    },
    {
        crop: "Palm",
        month: 4,
        type: "NPK",
        material: "يوريا (نيتروجين)",
        amount: "500 جم/نخلة",
        application: "دفعة ثانية",
        frequency: "الدفعة 2 من 3"
    },
    {
        crop: "Palm",
        month: 4,
        type: "NPK",
        material: "سلفات البوتاسيوم",
        amount: "700 جم/نخلة",
        application: "دفعة أولى - بعد العقد",
        frequency: "الدفعة 1 من 3-4",
        criticalNote: "⚠️ أهم عنصر لجودة الثمار وحلاوتها"
    },
    {
        crop: "Palm",
        month: 5,
        type: "NPK",
        material: "يوريا (نيتروجين)",
        amount: "500 جم/نخلة",
        application: "دفعة ثالثة (أخيرة)",
        frequency: "الدفعة 3 من 3",
        criticalNote: "⚠️ لا تضف نيتروجين بعد مايو - يؤخر النضج"
    },
    {
        crop: "Palm",
        month: 5,
        type: "Micronutrients",
        material: "حديد + زنك (مخلبي)",
        amount: "رش ورقي",
        application: "رش ورقي",
        frequency: "مرة واحدة"
    },
    {
        crop: "Palm",
        month: 6,
        type: "NPK",
        material: "سلفات البوتاسيوم",
        amount: "700 جم/نخلة",
        application: "دفعة ثانية",
        frequency: "الدفعة 2 من 3-4"
    },
    {
        crop: "Palm",
        month: 7,
        type: "NPK",
        material: "سلفات البوتاسيوم",
        amount: "700 جم/نخلة",
        application: "دفعة أخيرة - مرحلة التلوين",
        frequency: "الدفعة 3 من 3-4"
    },

    // الزيتون - Olive
    {
        crop: "Olive",
        month: 3,
        type: "Micronutrients",
        material: "بورون",
        amount: "رش ورقي حسب التعليمات",
        application: "رش قبل التزهير",
        frequency: "مرة واحدة",
        criticalNote: "⚠️ حرج جداً - الزيتون شره للبورون، نقصه = تشوه ثمار وموت قمم"
    },
    {
        crop: "Olive",
        month: 4,
        type: "NPK",
        material: "نيتروجين (يوريا أو سلفات نشادر)",
        amount: "حسب عمر الشجرة",
        application: "نثر حول الجذع",
        frequency: "مرة واحدة ربيعية",
        criticalNote: "دعم النمو الخضري الذي سيحمل ثمار العام القادم"
    },

    // الحمضيات - Citrus
    {
        crop: "Citrus",
        month: 2,
        type: "NPK",
        material: "سلفات النشادر (نيتروجين)",
        amount: "حسب عمر الشجرة",
        application: "نثر حول الجذع",
        frequency: "الدفعة 1 من 3",
        criticalNote: "⚠️ سلفات النشادر تقلل قلوية التربة"
    },
    {
        crop: "Citrus",
        month: 2,
        type: "NPK",
        material: "فوسفور + بوتاسيوم",
        amount: "حسب عمر الشجرة",
        application: "أواخر الشتاء",
        frequency: "مرة واحدة"
    },
    {
        crop: "Citrus",
        month: 3,
        type: "Micronutrients",
        material: "حديد + زنك + منجنيز (مخلبي)",
        amount: "رش ورقي",
        application: "رش على النموات الحديثة",
        frequency: "مرة واحدة",
        criticalNote: "⚠️ ضروري جداً في التربة القلوية السعودية"
    },
    {
        crop: "Citrus",
        month: 5,
        type: "NPK",
        material: "نيتروجين",
        amount: "حسب عمر الشجرة",
        application: "دفعة ثانية",
        frequency: "الدفعة 2 من 3"
    },
    {
        crop: "Citrus",
        month: 6,
        type: "Micronutrients",
        material: "عناصر صغرى مخلبية",
        amount: "رش ورقي",
        application: "رش ورقي",
        frequency: "مرة واحدة"
    },
    {
        crop: "Citrus",
        month: 7,
        type: "NPK",
        material: "بوتاسيوم",
        amount: "حسب عمر الشجرة",
        application: "أثناء نمو الثمار",
        frequency: "مرة واحدة",
        criticalNote: "تحسين حجم الثمرة وسمك القشرة"
    },
    {
        crop: "Citrus",
        month: 8,
        type: "NPK",
        material: "نيتروجين",
        amount: "حسب عمر الشجرة",
        application: "دفعة ثالثة",
        frequency: "الدفعة 3 من 3"
    },
    {
        crop: "Citrus",
        month: 9,
        type: "Micronutrients",
        material: "عناصر صغرى",
        amount: "رش ورقي",
        application: "رش ورقي",
        frequency: "مرة واحدة"
    },

    // العنب - Grape
    {
        crop: "Grape",
        month: 7,
        type: "NPK",
        material: "بوتاسيوم",
        amount: "حسب عمر الكرمة",
        application: "مرحلة النضج",
        frequency: "مرة واحدة",
        criticalNote: "⚠️ يزيد نسبة السكر (Brix) وجودة العنب"
    },
    {
        crop: "Grape",
        month: 7,
        type: "Micronutrients",
        material: "مغنيسيوم",
        amount: "رش ورقي",
        application: "رش ورقي",
        frequency: "مرة واحدة",
        criticalNote: "منع جفاف عنق العنقود"
    },

    // الثيل - Lawn
    {
        crop: "Lawn",
        month: 3,
        type: "NPK",
        material: "يوريا (نيتروجين عالي)",
        amount: "حسب المساحة",
        application: "نثر + ري فوري",
        frequency: "شهري من مارس-أكتوبر",
        criticalNote: "للحفاظ على اللون الأخضر"
    },
    {
        crop: "Lawn",
        month: 4,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 5,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 6,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 6,
        type: "Micronutrients",
        material: "حديد مخلبي",
        amount: "رش أو مع الري",
        application: "رش ورقي أو مع التنقيط",
        frequency: "عند ظهور اصفرار",
        criticalNote: "⚠️ لاستعادة اللون الأخضر"
    },
    {
        crop: "Lawn",
        month: 7,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 8,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 9,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري"
    },
    {
        crop: "Lawn",
        month: 10,
        type: "NPK",
        material: "سماد مركب NPK",
        amount: "حسب المساحة",
        application: "نثر + ري",
        frequency: "شهري (آخر دفعة)"
    }
];
