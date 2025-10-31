"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercent } from '@/lib/utils';
import {
  generateDailySeries,
  generateTransactions,
  aggregateByRegion,
  aggregateMethods,
  computeHeroMetrics,
  computeZakatAndRecurring
} from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid } from 'recharts';
import { RefreshCw, Globe2, CreditCard, DollarSign, Hash, TrendingUp, Calculator, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import * as React from 'react';

const COLORS = ['#0F766E', '#D4A373', '#22C55E', '#0EA5E9', '#EF4444', '#6366F1'];

export function Dashboard() {
  const [mounted, setMounted] = React.useState(false);
  const [series, setSeries] = React.useState<Array<{ date: string; volume: number; count: number; successRate: number }>>([]);
  const [transactions, setTransactions] = React.useState(() => [] as ReturnType<typeof generateTransactions>);

  React.useEffect(() => {
    setSeries(generateDailySeries(30));
    setTransactions(generateTransactions(25));
    setMounted(true);
  }, []);

  const hero = series.length ? computeHeroMetrics(series) : { totalVolume: 0, totalCount: 0, successRate: 0.0, avgValue: 0 };
  const { zakat, mrr } = series.length ? computeZakatAndRecurring(series) : { zakat: 0, mrr: 0 };
  const regionData = React.useMemo(() => {
    const agg = aggregateByRegion(transactions);
    return Object.entries(agg).map(([region, count]) => ({ region, count }));
  }, [transactions]);
  const methodData = React.useMemo(() => {
    const agg = aggregateMethods(transactions);
    return Object.entries(agg).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  function refreshMock() {
    setSeries(generateDailySeries(30));
    setTransactions(generateTransactions(25));
  }

  if (!mounted) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-10">
        <header className="mb-8 h-10 w-48 animate-pulse rounded bg-black/10" />
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-black/5" />
          ))}
        </section>
        <section className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2 h-80 animate-pulse rounded-lg bg-black/5" />
          <div className="h-80 animate-pulse rounded-lg bg-black/5" />
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">PayGood Analytics</h1>
          <p className="text-sm text-pg-mutedText">Mission-aligned insights for fair payments</p>
        </div>
        <Button onClick={refreshMock} className="gap-2" variant="outline">
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </Button>
      </header>

      {/* Hero metrics */}
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={<DollarSign className="h-4 w-4 text-pg-primary" />} label="Total Transaction Volume" value={formatCurrency(hero.totalVolume)} sub={"Last 30 days"} />
        <MetricCard icon={<Hash className="h-4 w-4 text-pg-primary" />} label="Total Transactions" value={hero.totalCount.toLocaleString()} sub={"Last 30 days"} />
        <MetricCard icon={<TrendingUp className="h-4 w-4 text-pg-primary" />} label="Success Rate" value={formatPercent(hero.successRate * 100)} sub={"Industry-leading"} />
        <MetricCard icon={<Calculator className="h-4 w-4 text-pg-primary" />} label="Avg Transaction Value" value={formatCurrency(hero.avgValue)} sub={"Blended"} />
      </section>

      {/* Charts */}
      <section className="mb-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-pg-primary" />
                  <CardTitle>30-Day Transaction Volume</CardTitle>
                </div>
                <div className="mt-1 text-xl font-semibold">{formatCurrency(series.reduce((s, d) => s + d.volume, 0))}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} hide />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(val: any) => formatCurrency(Number(val))} labelFormatter={(l) => `Date: ${l}`} />
                  <Line type="monotone" dataKey="volume" stroke="#0F766E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-pg-primary" />
              <CardTitle>Payment Methods</CardTitle>
            </div>
            <div className="mt-1 text-sm text-pg-mutedText">Apple Pay, Google Pay, ACH, Credit Card</div>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={methodData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={40}>
                    {methodData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
              {methodData.map((m, i) => (
                <li key={m.name} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {m.name}: <span className="font-medium">{m.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Geo + Mission metrics */}
      <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-pg-primary" />
              <CardTitle>Geographic Distribution</CardTitle>
            </div>
            <div className="mt-1 text-sm text-pg-mutedText">Transactions by region</div>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#D4A373" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-pg-primary" />
              <CardTitle>Zakat & Recurring</CardTitle>
            </div>
            <div className="mt-1 text-sm text-pg-mutedText">Mission-aligned metrics</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-pg-mutedText">Zakat Collection (2.5%)</div>
                <div className="text-xl font-semibold">{formatCurrency(zakat)}</div>
              </div>
              <div>
                <div className="text-xs text-pg-mutedText">Monthly Recurring Revenue</div>
                <div className="text-xl font-semibold">{formatCurrency(mrr)}</div>
              </div>
              <div className="text-xs text-pg-mutedText">Community Impact</div>
              <div className="flex flex-wrap gap-2">
                <Badge>Halal-first</Badge>
                <Badge variant="success">Inclusive</Badge>
                <Badge variant="warning">Global</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent transactions */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <div className="mt-1 text-sm text-pg-mutedText">Real-time feed (mock)</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th>Method</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((t) => (
                    <Tr key={t.id}>
                      <Td className="text-sm text-pg-mutedText">{t.date}</Td>
                      <Td className="font-medium">{formatCurrency(t.amount)}</Td>
                      <Td>
                        <Badge variant={t.status === 'success' ? 'success' : t.status === 'pending' ? 'warning' : 'outline'}>
                          {t.status}
                        </Badge>
                      </Td>
                      <Td>{t.method}</Td>
                      <Td>{t.location}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-10 text-center text-xs text-pg-mutedText">
        Built for PayGood — fairness in payments.
      </footer>
    </main>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {sub ? <div className="mt-1 text-xs text-pg-mutedText">{sub}</div> : null}
      </CardContent>
    </Card>
  );
}


