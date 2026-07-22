/**
 * Datos OMS de curvas de crecimiento (peso/edad 0-24 meses)
 * Fuente: WHO Child Growth Standards (LMS parameters)
 * Los percentiles se calculan: X = M * (1 + L*S*Z)^(1/L)
 * Z-scores: P3=-1.881, P10=-1.282, P25=-0.674, P50=0, P75=0.674, P90=1.282, P97=1.881
 */

const Z = {
  P3: -1.881,
  P10: -1.282,
  P25: -0.674,
  P50: 0,
  P75: 0.674,
  P90: 1.282,
  P97: 1.881,
};

const PERCENTILES = ['P3', 'P10', 'P25', 'P50', 'P75', 'P90', 'P97'];

// LMS data points from WHO (known months)
const BOYS_LMS = [
  { month: 0,  L: 0.3487, M: 3.3464, S: 0.14602 },
  { month: 1,  L: 0.2297, M: 4.4709, S: 0.13395 },
  { month: 2,  L: 0.1970, M: 5.5675, S: 0.12385 },
  { month: 3,  L: 0.1738, M: 6.3762, S: 0.11727 },
  { month: 4,  L: 0.1553, M: 7.0023, S: 0.11316 },
  { month: 5,  L: 0.1395, M: 7.5105, S: 0.11080 },
  { month: 6,  L: 0.1257, M: 7.9340, S: 0.10958 },
  { month: 7,  L: null,   M: null,   S: null },   // interpolated
  { month: 8,  L: null,   M: null,   S: null },   // interpolated
  { month: 9,  L: 0.0917, M: 8.9462, S: 0.10827 },
  { month: 10, L: null,   M: null,   S: null },
  { month: 11, L: null,   M: null,   S: null },
  { month: 12, L: 0.0660, M: 9.6479, S: 0.10958 },
  { month: 13, L: null,   M: null,   S: null },
  { month: 14, L: null,   M: null,   S: null },
  { month: 15, L: 0.0454, M: 10.2315, S: 0.11209 },
  { month: 16, L: null,   M: null,   S: null },
  { month: 17, L: null,   M: null,   S: null },
  { month: 18, L: 0.0280, M: 10.7670, S: 0.11498 },
  { month: 19, L: null,   M: null,   S: null },
  { month: 20, L: null,   M: null,   S: null },
  { month: 21, L: 0.0127, M: 11.2818, S: 0.11800 },
  { month: 22, L: null,   M: null,   S: null },
  { month: 23, L: null,   M: null,   S: null },
  { month: 24, L: -0.0011, M: 11.7794, S: 0.12100 },
];

const GIRLS_LMS = [
  { month: 0,  L: 0.3809, M: 3.2322, S: 0.14171 },
  { month: 1,  L: 0.1714, M: 4.1873, S: 0.13724 },
  { month: 2,  L: 0.0962, M: 5.1282, S: 0.13000 },
  { month: 3,  L: 0.0402, M: 5.8458, S: 0.12619 },
  { month: 4,  L: -0.0050, M: 6.4237, S: 0.12402 },
  { month: 5,  L: -0.0430, M: 6.8985, S: 0.12274 },
  { month: 6,  L: -0.0756, M: 7.2970, S: 0.12204 },
  { month: 7,  L: null,   M: null,   S: null },
  { month: 8,  L: null,   M: null,   S: null },
  { month: 9,  L: -0.1507, M: 8.2254, S: 0.12174 },
  { month: 10, L: null,   M: null,   S: null },
  { month: 11, L: null,   M: null,   S: null },
  { month: 12, L: -0.2024, M: 8.9481, S: 0.12273 },
  { month: 13, L: null,   M: null,   S: null },
  { month: 14, L: null,   M: null,   S: null },
  { month: 15, L: -0.2402, M: 9.5708, S: 0.12450 },
  { month: 16, L: null,   M: null,   S: null },
  { month: 17, L: null,   M: null,   S: null },
  { month: 18, L: -0.2691, M: 10.1455, S: 0.12667 },
  { month: 19, L: null,   M: null,   S: null },
  { month: 20, L: null,   M: null,   S: null },
  { month: 21, L: -0.2920, M: 10.6947, S: 0.12903 },
  { month: 22, L: null,   M: null,   S: null },
  { month: 23, L: null,   M: null,   S: null },
  { month: 24, L: -0.3110, M: 11.2356, S: 0.13156 },
];

/** Linear interpolation between two points */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Find surrounding known points and interpolate */
function interpolateLMS(data, targetMonth) {
  const known = data.filter(d => d.L !== null);
  if (known.length === 0) return null;

  const before = known.filter(d => d.month <= targetMonth);
  const after = known.filter(d => d.month >= targetMonth);

  if (before.length === 0) return after[0];
  if (after.length === 0) return before[before.length - 1];

  const lo = before[before.length - 1];
  const hi = after[0];

  if (lo.month === hi.month) return lo;

  const t = (targetMonth - lo.month) / (hi.month - lo.month);
  return {
    month: targetMonth,
    L: lerp(lo.L, hi.L, t),
    M: lerp(lo.M, hi.M, t),
    S: lerp(lo.S, hi.S, t),
  };
}

/** Calculate percentile value from LMS parameters */
function calcPercentile(L, M, S, z) {
  if (L === 0) {
    return M * Math.exp(S * z);
  }
  const base = 1 + L * S * z;
  if (base <= 0) return 0;
  return M * Math.pow(base, 1 / L);
}

/** Generate full monthly dataset for 0-24 months */
function generateMonthlyData(lmsData) {
  const result = [];
  for (let m = 0; m <= 24; m++) {
    const lms = interpolateLMS(lmsData, m);
    if (!lms) continue;

    const entry = { month: m };
    for (const p of PERCENTILES) {
      entry[p] = parseFloat(calcPercentile(lms.L, lms.M, lms.S, Z[p]).toFixed(3));
    }
    result.push(entry);
  }
  return result;
}

export const whoBoysWeight = generateMonthlyData(BOYS_LMS);
export const whoGirlsWeight = generateMonthlyData(GIRLS_LMS);

export const PERCENTILE_LABELS = PERCENTILES;
export const PERCENTILE_COLORS = {
  P3:  '#D4EDE0',
  P10: '#B8DFC8',
  P25: '#E9D5C8',
  P50: '#C97B84',
  P75: '#E9B4BB',
  P90: '#B8C8DF',
  P97: '#D4C8ED',
};

/** Interpolate percentile values at a given age (handles fractional months) */
function interpolatePercentileValues(ageMonths, isBoy) {
  const data = isBoy ? whoBoysWeight : whoGirlsWeight;
  if (ageMonths <= data[0].month) return data[0];
  if (ageMonths >= data[data.length - 1].month) return data[data.length - 1];

  const before = data.filter(d => d.month <= ageMonths);
  const after = data.filter(d => d.month >= ageMonths);
  const lo = before[before.length - 1];
  const hi = after[0];
  if (!lo || !hi || lo.month === hi.month) return lo || hi;

  const t = (ageMonths - lo.month) / (hi.month - lo.month);
  const entry = { month: ageMonths };
  for (const p of PERCENTILES) {
    entry[p] = lerp(lo[p], hi[p], t);
  }
  return entry;
}

/** Estimate percentile for a given weight at a given age (supports fractional months) */
export function estimatePercentile(weightKg, ageMonths, isBoy) {
  const entry = interpolatePercentileValues(ageMonths, isBoy);
  if (!entry) return null;

  // Find closest percentile
  let closest = PERCENTILES[0];
  let minDiff = Infinity;
  for (const p of PERCENTILES) {
    const diff = Math.abs(entry[p] - weightKg);
    if (diff < minDiff) {
      minDiff = diff;
      closest = p;
    }
  }
  return closest;
}
