'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { financialMath } from '@/modules/calculators/utils/calculations';
import { CalculatorResultModal } from '@/modules/calculators/components/CalculatorResultModal';
import { Sunrise, RefreshCcw, ArrowLeft, Info, TrendingUp, Wallet } from 'lucide-react';
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

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [savings, setSavings] = useState<string>('50000');
  const [monthly, setMonthly] = useState<string>('1000');
  const [rate, setRate] = useState<string>('7');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!currentAge || Number(currentAge) <= 0) newErrors.currentAge = "Age must be > 0";
    if (!retirementAge || Number(retirementAge) <= Number(currentAge)) newErrors.retirementAge = "Must be older than current age";
    if (!savings || Number(savings) < 0) newErrors.savings = "Must be 0 or greater";
    if (!monthly || Number(monthly) < 0) newErrors.monthly = "Must be 0 or greater";
    if (!rate || Number(rate) < 0 || Number(rate) > 100) newErrors.rate = "Rate must be 0-100%";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = financialMath.calculateRetirementCorpus(
      Number(savings),
      Number(monthly),
      Number(rate),
      Number(currentAge),
      Number(retirementAge)
    );
    setResult(data.finalValue);
    setChartData(data.chartData);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setCurrentAge('30');
    setRetirementAge('65');
    setSavings('50000');
    setMonthly('1000');
    setRate('7');
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
          <div className="flex items-center gap-3 text-secondary mb-4">
            <Sunrise className="h-6 w-6" />
            <Text variant="label" className="font-bold tracking-widest uppercase">Retirement Intelligence</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Nest Egg Architect</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Project your total wealth at retirement by modeling current capital, future contributions, and long-term market growth.
          </Text>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card className="glass-card border-none shadow-2xl h-full">
              <div className="bg-secondary/5 px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-secondary" />
                <Text variant="caption" className="text-secondary font-bold uppercase tracking-widest">Financial Inputs</Text>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Age</Label>
                      <Input 
                        id="currentAge" 
                        type="number" 
                        value={currentAge} 
                        onChange={(e) => setCurrentAge(e.target.value)}
                        error={errors.currentAge}
                        className="h-11 bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Retirement Age</Label>
                      <Input 
                        id="retirementAge" 
                        type="number" 
                        value={retirementAge} 
                        onChange={(e) => setRetirementAge(e.target.value)}
                        error={errors.retirementAge}
                        className="h-11 bg-background/50 border-white/10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="savings" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Retirement Savings ($)</Label>
                    <Input 
                      id="savings" 
                      type="number" 
                      value={savings} 
                      onChange={(e) => setSavings(e.target.value)}
                      error={errors.savings}
                      className="h-11 bg-background/50 border-white/10"
                      placeholder="50000"
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
                      placeholder="1000"
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
                      placeholder="7"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button type="submit" className="h-12 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl font-bold shadow-lg shadow-secondary/20 transition-all">
                      Generate Projection
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleReset} className="h-10 w-full text-muted-foreground hover:text-foreground">
                      <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Reset Goals
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="glass-card border-none shadow-2xl h-full overflow-hidden flex flex-col">
              <CardHeader className="bg-card/30 border-b border-white/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" /> Corpus Growth Chart
                </CardTitle>
                <CardDescription>Visualizing the accumulation phase from age {currentAge} to {retirementAge}.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 flex-grow flex flex-col justify-center min-h-[400px]">
                {chartData.length > 0 ? (
                  <div className="h-[350px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#69B9FF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#69B9FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="age" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} formatter={(value: number) => [formatCurrency(value), 'Projected Corpus']} />
                        <Area type="monotone" dataKey="balance" stroke="#69B9FF" fillOpacity={1} fill="url(#colorCorpus)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-50">
                    <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
                      <Sunrise className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <Text variant="bodySmall" className="italic">Define your retirement targets to see your personalized growth trajectory.</Text>
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
            title="Projected Retirement Corpus"
            result={formatCurrency(result)}
            description={`Based on your inputs, you are on track to have a total nest egg of ${formatCurrency(result)} by age ${retirementAge}.`}
          />
        )}
      </Container>
    </main>
  );
}
