export type Transaction = {
  id: string;
  date: string; // ISO
  amount: number;
  status: 'success' | 'failed' | 'pending';
  method: 'Apple Pay' | 'Google Pay' | 'ACH' | 'Credit Card';
  region: 'NA' | 'EU' | 'MENA' | 'SEA' | 'SA' | 'AF';
  location: string;
};

const paymentMethods = ['Apple Pay', 'Google Pay', 'ACH', 'Credit Card'] as const;
const regions = ['NA', 'EU', 'MENA', 'SEA', 'SA', 'AF'] as const;

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDailySeries(days = 30) {
  const today = new Date();
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const base = 40000 + i * 1000 + rand(-5000, 5000);
    return {
      date: d.toISOString().slice(0, 10),
      volume: Math.max(8000, base),
      count: Math.max(100, Math.round(base / 60)),
      successRate: 0.94 + Math.random() * 0.05,
    };
  });
}

export function generateTransactions(n = 25): Transaction[] {
  const series = generateDailySeries(30);
  const latestDate = series[series.length - 1].date;
  return Array.from({ length: n }).map((_, i) => {
    const method = paymentMethods[rand(0, paymentMethods.length - 1)];
    const region = regions[rand(0, regions.length - 1)];
    const statusRoll = Math.random();
    const status = statusRoll < 0.92 ? 'success' : statusRoll < 0.97 ? 'failed' : 'pending';
    const amount = rand(10, 500) * 10;
    return {
      id: `tx_${Date.now()}_${i}`,
      date: latestDate,
      amount,
      status,
      method,
      region,
      location: regionToSampleCity(region),
    };
  });
}

function regionToSampleCity(r: Transaction['region']): string {
  switch (r) {
    case 'NA': return 'Dearborn, USA';
    case 'EU': return 'London, UK';
    case 'MENA': return 'Dubai, UAE';
    case 'SEA': return 'Kuala Lumpur, MY';
    case 'SA': return 'São Paulo, BR';
    case 'AF': return 'Cairo, EG';
  }
}

export function aggregateByRegion(transactions: Transaction[]) {
  return transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.region] = (acc[t.region] || 0) + 1;
    return acc;
  }, {});
}

export function aggregateMethods(transactions: Transaction[]) {
  return transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.method] = (acc[t.method] || 0) + 1;
    return acc;
  }, {});
}

export function computeHeroMetrics(series = generateDailySeries(30)) {
  const totalVolume = series.reduce((sum, d) => sum + d.volume, 0);
  const totalCount = series.reduce((sum, d) => sum + d.count, 0);
  const avgSuccess = series.reduce((sum, d) => sum + d.successRate, 0) / series.length;
  const avgValue = totalCount ? totalVolume / totalCount : 0;
  return { totalVolume, totalCount, successRate: avgSuccess, avgValue };
}

export function computeZakatAndRecurring(series = generateDailySeries(30)) {
  const totalVolume = series.reduce((sum, d) => sum + d.volume, 0);
  const zakat = totalVolume * 0.025; // 2.5%
  const mrr = Math.round(totalVolume * 0.18); // mock recurring proportion
  return { zakat, mrr };
}

