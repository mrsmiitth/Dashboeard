export interface HarvestEntry {
    crop: "Palm" | "Olive" | "Citrus" | "Grape" | "Lawn";
    variety?: string; // Optional (e.g., "Rutab Stage", "Oil")
    startMonth: number;
    endMonth: number;
    maturitySigns: string;
    method: string;
    postHarvest: string; // Storage or handling tips
}

export const HARVEST_CALENDAR: HarvestEntry[] = [
    // --- PALM ---
    {
        crop: "Palm",
        variety: "مرحلة الرطب (Rutab)",
        startMonth: 7,
        endMonth: 8,
        maturitySigns: "تحول لون الثمرة بالكامل (أصفر/أحمر) وترطب نصف الثمرة.",
        method: "الجني اليدوي المتكرر (تلقيط) كل 2-3 أيام.",
        postHarvest: "التبريد السريع (0-4 درجة مئوية) لإيقاف التخمر."
    },
    {
        crop: "Palm",
        variety: "مرحلة التمر (Tamr)",
        startMonth: 9,
        endMonth: 10,
        maturitySigns: "جفاف الثمرة، تماسك القشرة، اللون البني الداكن.",
        method: "قص العذق بالكامل (صرام).",
        postHarvest: "التنظيف، التبخير (لقتل الحشرات)، ثم الكبس أو التغليف."
    },

    // --- OLIVE ---
    {
        crop: "Olive",
        variety: "زيتون المائدة (Table)",
        startMonth: 9,
        endMonth: 10,
        maturitySigns: "وصول الثمار للحجم الكامل، اللون الأخضر المصفر.",
        method: "القطف اليدوي لتجنب الكدمات.",
        postHarvest: "المباشرة فوراً في التخليل (Curing) لإزالة المرارة."
    },
    {
        crop: "Olive",
        variety: "زيتون العصر (Oil)",
        startMonth: 10,
        endMonth: 11,
        maturitySigns: "تلون 60-70% من الثمار باللون البنفسجي/الأسود.",
        method: "القطف بالعصا أو الهز (ميكانيكي).",
        postHarvest: "العصر خلال 24 ساعة للحصول على (Extra Virgin) ومنع التأكسد."
    },

    // --- CITRUS ---
    {
        crop: "Citrus",
        variety: "الليمون (Lemon)",
        startMonth: 1, // Can be multiple times, but main winter crop
        endMonth: 4,
        maturitySigns: "وصول العصير لنسبة >30%، اللون الأصفر الزاهي.",
        method: "القطف بالمقص مع ترك جزء صغير من العنق.",
        postHarvest: "التشميع (Waxing) إذا كان للتخزين الطويل."
    },
    {
        crop: "Citrus",
        variety: "البرتقال (Orange)",
        startMonth: 12,
        endMonth: 2,
        maturitySigns: "نسبة السكر/الحوضة (TSS/Acid) مناسبة للتذوق.",
        method: "القطف اليدوي أو بالمقص.",
        postHarvest: "الفرز وإزالة الثمار المجروحة."
    },

    // --- GRAPE ---
    {
        crop: "Grape",
        startMonth: 6,
        endMonth: 8,
        maturitySigns: "لين الحبات، حلاوة الطعم، تلون البذور بالبني.",
        method: "قص العنقود كاملاً بالمقص.",
        postHarvest: "التبريد الفوري. العنب لا ينضج بعد القطف (Non-climacteric)."
    }
];
