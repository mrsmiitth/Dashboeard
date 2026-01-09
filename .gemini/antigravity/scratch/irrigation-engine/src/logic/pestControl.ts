export interface PestEntry {
    id: string;
    crop: "Palm" | "Olive" | "Citrus" | "Grape" | "Lawn";
    name: string;
    scientificName?: string;
    riskMonths: number[]; // Array of month numbers (1-12)
    severity: "Critical" | "Warning" | "Info";
    symptoms: string;
    prevention: string;
    treatment: string;
    imageUrl?: string; // Placeholder for future
}

export const PEST_DATABASE: PestEntry[] = [
    // --- PALM ---
    {
        id: "palm-weevil",
        crop: "Palm",
        name: "سوسة النخيل الحمراء (Red Palm Weevil)",
        scientificName: "Rhynchophorus ferrugineus",
        riskMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All year, peak in warm months
        severity: "Critical",
        symptoms: "ذبول السعف الحديث، وجود أنفاق ونشارة خشبية، رائحة تخمر كريهة، موت القمة النامية.",
        prevention: "نظافة الرأس، عدم جرح النخلة، الرش الوقائي بعد التقليم، استخدام المصائد الفرمونية.",
        treatment: "الحقن المباشر بالمبيد في المناطق المصابة، التبخير، أو إزالة النخلة بالكامل في الحالات المتأخرة وحرقها."
    },
    {
        id: "palm-dust-mite",
        crop: "Palm",
        name: "حلم الغبار (الغبرة)",
        scientificName: "Oligonychus afrasiaticus",
        riskMonths: [6, 7, 8], // Summer
        severity: "Warning",
        symptoms: "وجود نسيج عنكبوتي كثيف على الثمار، فيتحول لونها للأحمر ثم البني وتجف.",
        prevention: "غسل العذوق بالماء (الرذاذ) لتقليل الغبار، إزالة الحشائش.",
        treatment: "الرش بمبيدات العناكب (Miticides) كالكبريت الميكروني عند بداية الإصابة."
    },

    // --- OLIVE ---
    {
        id: "olive-fly",
        crop: "Olive",
        name: "ذبابة ثمار الزيتون",
        scientificName: "Bactrocera oleae",
        riskMonths: [9, 10, 11], // Fall/Harvest
        severity: "Critical",
        symptoms: "ثقوب صغيرة في الثمار، تلون الثمار وتساقطها المبكر، رداءة الزيت.",
        prevention: "تعليق المصائد الصفراء اللاصقة لمراقبة الكثافة، الجني المبكر.",
        treatment: "الرش الجزئي (طعوم سامة) لقتل الحشرات الكاملة قبل وضع البيض."
    },
    {
        id: "olive-moth",
        crop: "Olive",
        name: "عثة الزيتون (فراشة الزيتون)",
        scientificName: "Prays oleae",
        riskMonths: [3, 4, 5], // Flower generation
        severity: "Warning",
        symptoms: "تآكل الأزهار (الجيل الزهري) مما يقلل العقد.",
        prevention: "Tillage (حراثة) للقضاء على الشرانق المشتية.",
        treatment: "استخدام بكتيريا (Bt) المكافحة الحيوية."
    },

    // --- CITRUS ---
    {
        id: "citrus-leafminer",
        crop: "Citrus",
        name: "صانعة أنفاق أوراق الحمضيات",
        scientificName: "Phyllocnistis citrella",
        riskMonths: [3, 4, 5, 9, 10], // New growth flushes
        severity: "Warning",
        symptoms: "أنفاق متعرجة فضية اللون على الأوراق الحديثة، التفاف الأوراق وتشوهها.",
        prevention: "تجنب التسميد النيتروجيني المفرط الذي يحفز النمو الخضري الغزير.",
        treatment: "رش ربيعي وخريفي بمبيدات جهازية (Imidacloprid)."
    },

    // --- GRAPE ---
    {
        id: "grape-mealybug",
        crop: "Grape",
        name: "البق الدقيقي",
        scientificName: "Planococcus citri",
        riskMonths: [5, 6, 7],
        severity: "Critical",
        symptoms: "وجود حشرات قطنية بيضاء، إفراز ندوة عسلية تسبب العفن الأسود على العناقيد.",
        prevention: "تقليم جيد للتهوية، إزالة القلف السائب.",
        treatment: "استخدام الزيوت المعدنية شتاءً، والمبيدات المتخصصة صيفاً."
    },

    // --- LAWN ---
    {
        id: "lawn-grubs",
        crop: "Lawn",
        name: "ديدان الجذور (Grubs)",
        riskMonths: [8, 9, 10],
        severity: "Warning",
        symptoms: "بقع صفراء ميتة في العشب، سهولة اقتلاع العشب (لأن الجذور مأكولة).",
        prevention: "تهوية التربة، عدم الري المفرط.",
        treatment: "استخدام مبيدات محببة متخصصة لليرقات."
    }
];
