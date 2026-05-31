// ---------------------------------------------------------------------------
// Chart data for the Financials page.
// Each fiscal year contains categorised expenditure entries.
// `percentage` is pre-computed so chart components can consume it directly.
// ---------------------------------------------------------------------------

/** A single category slice within a fiscal-year chart. */
export interface ChartEntry {
  /** Display label for the category. */
  category: string;
  /** Amount invested (USD). */
  amount: number;
  /** Fill colour used by the chart (CSS rgb string). */
  fill: string;
  /** Pre-computed percentage of the year's total (0–100, 2 decimals). */
  percentage: number;
}

// ---- colour palette (single source of truth) --------------------------------
const COLORS = {
  animalRights: "rgb(6, 182, 212)",
  underservedCommunities: "rgb(8, 145, 178)",
  administrative: "rgb(14, 116, 144)",
} as const;

// ---- raw figures per year ---------------------------------------------------
interface RawEntry {
  category: string;
  amount: number;
  fill: string;
}

const rawData: Record<number, RawEntry[]> = {
  2023: [
    { category: "Animal Rights and Welfare", amount: 104_728, fill: COLORS.animalRights },
    { category: "Underserved Communities", amount: 37_325, fill: COLORS.underservedCommunities },
  ],
  2022: [
    { category: "Animal Rights and Welfare", amount: 134_589, fill: COLORS.animalRights },
    { category: "Underserved Communities", amount: 33_680, fill: COLORS.underservedCommunities },
    { category: "Administrative", amount: 6_640, fill: COLORS.administrative },
  ],
  2021: [
    { category: "Animal Rights and Welfare", amount: 39_473, fill: COLORS.animalRights },
    { category: "Underserved Communities", amount: 5_623, fill: COLORS.underservedCommunities },
    { category: "Administrative", amount: 2_532, fill: COLORS.administrative },
  ],
};

// ---- build enriched dataset -------------------------------------------------
function buildChartData(raw: Record<number, RawEntry[]>) {
  const dataset: Record<number, ChartEntry[]> = {};

  for (const [yearStr, entries] of Object.entries(raw)) {
    const year = Number(yearStr);
    const total = entries.reduce((sum, e) => sum + e.amount, 0);

    dataset[year] = entries.map((entry) => ({
      category: entry.category,
      amount: entry.amount,
      fill: entry.fill,
      percentage: Math.round((entry.amount / total) * 10_000) / 100, // two-decimal %
    }));
  }

  return dataset;
}

/** Fully enriched chart data, keyed by fiscal year (descending when iterated). */
export const chartData = buildChartData(rawData);

/**
 * Sorted array of available fiscal years (most recent first).
 * Useful for tabs / dropdowns in the Charts component.
 */
export const chartYears: number[] = Object.keys(chartData)
  .map(Number)
  .sort((a, b) => b - a);

/**
 * Returns the total expenditure for a given fiscal year.
 * Returns 0 if the year is not present in the dataset.
 */
export function getYearTotal(year: number): number {
  const entries = chartData[year];
  if (!entries) return 0;
  return entries.reduce((sum, e) => sum + e.amount, 0);
}
