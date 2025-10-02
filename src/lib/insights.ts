import { Lead } from "@/types";

export type Insights = {
  totals: {
    businesses: number;
    withEmail: number;
    avgRating: number | null;
    medianRating: number | null;
    avgReviews: number | null;
  };
  ratingBuckets: Array<{ bucket: string; count: number }>;
  categoryShare: Array<{ category: string; count: number }>;
  topRated: Array<{ id: string; name: string; rating: number; reviewCount: number }>;
  reviewLeaders: Array<{ id: string; name: string; reviewCount: number; rating?: number }>;
  emailCoveragePct: number;
  saturationIndex: number;
  opportunityScore: number;
  insights: string[];
};

export function computeInsights(leads: Lead[], radiusKm: number = 25): Insights {
  const L = leads.filter(Boolean);
  const n = L.length;
  
  const ratings = L.map((l) => l.rating).filter(
    (x): x is number => typeof x === "number" && !isNaN(x)
  );
  const reviews = L.map((l) => l.reviewCount).filter(
    (x): x is number => typeof x === "number" && !isNaN(x)
  );

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;

  const median = (arr: number[]) => {
    if (!arr.length) return null;
    const s = [...arr].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };

  // Rating buckets
  const buckets = [
    { k: "<3", f: (r: number) => r < 3 },
    { k: "3–3.9", f: (r: number) => r >= 3 && r < 4 },
    { k: "4–4.4", f: (r: number) => r >= 4 && r < 4.5 },
    { k: "4.5–5", f: (r: number) => r >= 4.5 },
  ];
  const ratingBuckets = buckets.map((b) => ({
    bucket: b.k,
    count: ratings.filter((r) => b.f(r)).length,
  }));

  // Categories
  const catMap = new Map<string, number>();
  L.forEach((l) => {
    const c = (l.category || "Uncategorized").trim();
    catMap.set(c, (catMap.get(c) || 0) + 1);
  });
  const categoryShare = Array.from(catMap, ([category, count]) => ({
    category,
    count,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Top rated
  const topRated = L.filter((l) => typeof l.rating === "number")
    .sort(
      (a, b) =>
        (b.rating || 0) - (a.rating || 0) ||
        (b.reviewCount || 0) - (a.reviewCount || 0)
    )
    .slice(0, 5)
    .map((l) => ({
      id: l.id,
      name: l.name,
      rating: l.rating!,
      reviewCount: l.reviewCount || 0,
    }));

  // Review leaders
  const reviewLeaders = L.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 5)
    .map((l) => ({
      id: l.id,
      name: l.name,
      reviewCount: l.reviewCount || 0,
      rating: l.rating,
    }));

  // Email coverage
  const withEmail = L.filter((l) => !!l.email).length;
  const emailCoveragePct = n ? Math.round((withEmail / n) * 100) : 0;

  // Saturation Index: businesses per area unit
  const area = Math.PI * Math.pow(Math.max(radiusKm, 1), 2);
  const saturationIndex = Math.round((n / Math.max(area, 1)) * 100);

  // Opportunity Score (0–100)
  const lowRated = ratings.filter((r) => r < 4).length;
  const lowRatedPct = n ? lowRated / n : 0;
  const satPenalty = Math.min(saturationIndex / 50, 1);
  const coverageBoost = emailCoveragePct / 100;
  const opportunity = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (0.5 * lowRatedPct + 0.4 * (1 - satPenalty) + 0.1 * coverageBoost) * 100
      )
    )
  );

  // Generate insights
  const insights: string[] = [];
  
  insights.push(`Market size: ${n} businesses within ${radiusKm}km radius.`);
  
  const dominantBucket = ratingBuckets.reduce((max, b) => 
    b.count > max.count ? b : max
  , ratingBuckets[0]);
  insights.push(`Rating distribution: ${dominantBucket.bucket} range dominates with ${dominantBucket.count} businesses.`);
  
  const opportunityLevel = opportunity >= 70 ? "High" : opportunity >= 40 ? "Medium" : "Low";
  insights.push(`Opportunity score: ${opportunity}/100 — ${opportunityLevel} market potential for new entrants.`);

  if (emailCoveragePct < 50) {
    insights.push(`Only ${emailCoveragePct}% of businesses have email addresses — significant data enrichment opportunity.`);
  }

  return {
    totals: {
      businesses: n,
      withEmail,
      avgRating: avg(ratings),
      medianRating: median(ratings),
      avgReviews: avg(reviews),
    },
    ratingBuckets,
    categoryShare,
    topRated,
    reviewLeaders,
    emailCoveragePct,
    saturationIndex,
    opportunityScore: opportunity,
    insights,
  };
}
