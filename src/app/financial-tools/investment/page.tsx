'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { financialMath } from '@/modules/calculators/utils/calculations';
import { CalculatorResultModal } from '@/modules/calculators/components/CalculatorResultModal';
import { PieChart as PieIcon, RefreshCcw, ArrowLeft, Info, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function InvestmentReturnPage() {
  const [principal, setPrincipal] = useState<string>('5000');
  const [monthly, setMonthly] = useState<string>('500');
  const [rate, setRate] = useState<string>('8');
  const [years, setYears] = useState<string>('20');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const p = Number(principal);
    const m = Number(monthly);
    const r = Number(rate);
    const y = Number(years);

    if (!principal || p < 0) newErrors.principal = "Required (>= 0)";
    if (!monthly || m < 0) newErrors.monthly = "Required (>= 0)";
    if (!rate || r < 0 || r > 100) newErrors.rate = "Required (0-100%)";
    if (!years || y <= 0) newErrors.years = "Required (> 0)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = financialMath.calculateInvestmentGrowth(
      Number(principal),
      Number(monthly),
      Number(rate),
      Number(years)
    );
    setResult(data.finalValue);
    setChartData(data.chartData);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setPrincipal('5000');
    setMonthly('500');
    setRate('8');
    setYears('20');
    setErrors({});
    setResult(null);
    setChartData([]);
    setIsModalOpen(false);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container>
        <Button variant="ghost" size="sm" className="mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary group" asChild>
          <Link href="/financial-tools">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Back to Dashboard
          </Link>
        </Button>

        <header className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-sm">
              <PieIcon className="h-7 w-7" />
            </div>
            <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest text-[10px] font-bold px-3 py-1">
              Investment ROI
            </Badge>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Investment ROI Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Project your long-term wealth accumulation by modeling recurring contributions against historical market benchmarks.
          </Text>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none shadow-2xl h-fit">
              <div className="bg-primary/5 px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <Text variant="caption" className="text-primary font-bold uppercase tracking-widest">Growth Inputs</Text>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="principal" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Principal ($)</Label>
                    <Input 
                      id="principal" 
                      type="number" 
                      value={principal} 
                      onChange={(e) => setPrincipal(e.target.value)}
                      error={errors.principal}
                      className="h-11 bg-background/50 border-white/10"
                      placeholder="5000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthly" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Monthly Contribution ($)</Label>
                    <Input 
                      id="monthly" 
                      type="number" 
                      value={monthly} 
                      onChange={(e) => setMonthly(e.target.value)}
                      error={errors.monthly}
                      className="h-11 bg-background/50 border-white/10"
                      placeholder="500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expected Annual Return (%)</Label>
                    <Input 
                      id="rate" 
                      type="number" 
                      step="0.1"
                      value={rate} 
                      onChange={(e) => setRate(e.target.value)}
                      error={errors.rate}
                      className="h-11 bg-background/50 border-white/10"
                      placeholder="8"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Time Horizon (Years)</Label>
                    <Input 
                      id="years" 
                      type="number" 
                      value={years} 
                      onChange={(e) => setYears(e.target.value)}
                      error={errors.years}
                      className="h-11 bg-background/50 border-white/10"
                      placeholder="20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button type="submit" className="h-12 w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all">
                      Analyze Projections
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleReset} className="h-10 w-full text-muted-foreground hover:text-foreground">
                      <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Reset Parameters
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {result && (
              <Card className="glass-card border-none bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-left-4 duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Text variant="label" className="text-primary">Summary Value</Text>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{formatCurrency(result)}</div>
                  <Text variant="caption" className="text-muted-foreground">Projected capital in {years} years.</Text>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-8">
            <Card className="glass-card border-none shadow-2xl h-full overflow-hidden flex flex-col">
              <CardHeader className="bg-card/30 border-b border-white/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Growth Trajectory
                </CardTitle>
                <CardDescription>Visualizing the power of recurring contributions and compound market yields.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 flex-grow flex flex-col justify-center min-h-[400px]">
                {chartData.length > 0 ? (
                  <div className="h-[350px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="year" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                        <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} formatter={(value: number) => [formatCurrency(value), 'Capital Maturity']} />
                        <Area type="monotone" dataKey="balance" stroke="#8272F2" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-50">
                    <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <Text variant="bodySmall" className="italic">Define your investment goals to generate a visual performance chart.</Text>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {result && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Projected Asset Maturity"
            result={formatCurrency(result)}
            description={`Starting with ${formatCurrency(Number(principal))} and adding ${formatCurrency(Number(monthly))} monthly, your capital is projected to reach ${formatCurrency(result)} over ${years} years.`}
          />
        )}
      </Container>
    </main>
  );
}
