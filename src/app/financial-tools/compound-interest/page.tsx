'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { financialMath } from '@/modules/calculators/utils/calculations';
import { CalculatorResultModal } from '@/modules/calculators/components/CalculatorResultModal';
import { TrendingUp, RefreshCcw, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('7');
  const [years, setYears] = useState<string>('10');
  const [frequency, setFrequency] = useState<string>('12');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [result, setResult] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const p = Number(principal);
    const r = Number(rate);
    const y = Number(years);

    if (!principal || p < 0) newErrors.principal = "Must be 0 or greater";
    if (!rate || r < 0 || r > 100) newErrors.rate = "Rate must be 0-100%";
    if (!years || y <= 0) newErrors.years = "Horizon must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const final = financialMath.calculateCompoundInterest(
      Number(principal),
      Number(rate),
      Number(years),
      0,
      Number(frequency)
    );
    setResult(final);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setPrincipal('10000');
    setRate('7');
    setYears('10');
    setFrequency('12');
    setErrors({});
    setResult(null);
    setIsModalOpen(false);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container isNarrow>
        <Button variant="ghost" size="sm" className="mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary group" asChild>
          <Link href="/financial-tools"><ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard</Link>
        </Button>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary mb-4">
            <TrendingUp className="h-6 w-6" />
            <Text variant="label" className="font-bold tracking-widest">Financial Intelligence</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Compound Interest Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Determine the future value of your investments by analyzing the power of time and compounding frequency.
          </Text>
        </header>

        <div className="space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <div className="bg-primary/5 px-8 py-4 border-b border-white/5 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <Text variant="caption" className="text-primary font-bold uppercase tracking-widest">Growth Parameters</Text>
            </div>
            <CardContent className="p-8">
              <form onSubmit={handleCalculate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="principal" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Initial Principal ($)</Label>
                    <Input 
                      id="principal" 
                      type="number" 
                      value={principal} 
                      onChange={(e) => setPrincipal(e.target.value)}
                      error={errors.principal}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 10000"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="rate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Annual Interest Rate (%)</Label>
                    <Input 
                      id="rate" 
                      type="number" 
                      step="0.1"
                      value={rate} 
                      onChange={(e) => setRate(e.target.value)}
                      error={errors.rate}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 7.5"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="years" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time Horizon (Years)</Label>
                    <Input 
                      id="years" 
                      type="number" 
                      value={years} 
                      onChange={(e) => setYears(e.target.value)}
                      error={errors.years}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 20"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="frequency" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Compounding Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="h-12 bg-background/50 rounded-xl border-white/10">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-Annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={handleReset} className="h-14 flex-1 rounded-2xl font-bold border-white/10 hover:bg-white/5 transition-all">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset Tool
                  </Button>
                  <Button type="submit" className="h-14 flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all scale-[1.02] active:scale-100">
                    Calculate Projections
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="glass-card border-none shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20 py-4 px-8">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-5 w-5" /> Summary Result
                  </CardTitle>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 font-bold uppercase tracking-tighter">
                    Calculation Stable
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-2">
                    <Text variant="label" className="text-muted-foreground">Estimated Future Value</Text>
                    <div className="text-5xl font-bold tracking-tighter text-foreground">
                      {formatCurrency(result)}
                    </div>
                    <Text variant="caption" className="text-emerald-500 font-bold">
                      +{formatCurrency(result - Number(principal))} in total earnings
                    </Text>
                  </div>
                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 italic text-sm text-muted-foreground leading-relaxed">
                    "Based on a {rate}% annual rate, your initial capital of {formatCurrency(Number(principal))} is projected to grow significantly over the next {years} years."
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-12 p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/20 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
          <Text variant="bodySmall" className="text-muted-foreground leading-relaxed italic relative z-10">
            "Compound interest is the engine of wealth. By reinvesting your returns, you allow your capital to grow at an accelerating rate over time." — Financial Intelligence Index
          </Text>
        </div>

        {result && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Projected Growth"
            result={formatCurrency(result)}
            description={`With an initial investment of ${formatCurrency(Number(principal))}, your portfolio is projected to grow to ${formatCurrency(result)} over ${years} years at a ${rate}% annual rate.`}
          />
        )}
      </Container>
    </main>
  );
}
