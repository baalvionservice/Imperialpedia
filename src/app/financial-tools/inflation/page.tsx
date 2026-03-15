'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { financialMath } from '@/modules/calculators/utils/calculations';
import { CalculatorResultModal } from '@/modules/calculators/components/CalculatorResultModal';
import { ArrowUpRight, RefreshCcw, ArrowLeft, Info, Gauge } from 'lucide-react';
import Link from 'next/link';

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState<string>('5000');
  const [rate, setRate] = useState<string>('3');
  const [years, setYears] = useState<string>('10');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [result, setResult] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!amount || Number(amount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!rate || Number(rate) < 0 || Number(rate) > 100) newErrors.rate = "Rate must be 0-100%";
    if (!years || Number(years) <= 0) newErrors.years = "Horizon must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const final = financialMath.calculateInflationImpact(
      Number(amount),
      Number(rate),
      Number(years)
    );
    setResult(final);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setAmount('5000');
    setRate('3');
    setYears('10');
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
          <Link href="/financial-tools">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Back to Dashboard
          </Link>
        </Button>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary mb-4">
            <ArrowUpRight className="h-6 w-6" />
            <Text variant="label" className="font-bold tracking-widest uppercase">Purchasing Power Analysis</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Inflation Impact Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Visualize how inflation erodes the value of your capital over time and determine the future cost of today's goods.
          </Text>
        </header>

        <Card className="glass-card border-none shadow-2xl overflow-hidden">
          <div className="bg-primary/5 px-8 py-4 border-b border-white/5 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <Text variant="caption" className="text-primary font-bold uppercase tracking-widest">Economic Parameters</Text>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Amount ($)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    error={errors.amount}
                    className="h-12 bg-background/50 rounded-xl border-white/10"
                    placeholder="e.g. 5000"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="rate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expected Inflation Rate (%)</Label>
                  <Input 
                    id="rate" 
                    type="number" 
                    step="0.1"
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    error={errors.rate}
                    className="h-12 bg-background/50 rounded-xl border-white/10"
                    placeholder="e.g. 3.2"
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
                    placeholder="e.g. 10"
                  />
                </div>

                <div className="flex items-center p-4 rounded-xl bg-primary/5 border border-primary/10 mt-6">
                  <Info className="h-5 w-5 text-primary mr-3 shrink-0" />
                  <Text variant="caption" className="text-muted-foreground italic">
                    Calculates the future value required to maintain current purchasing power.
                  </Text>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleReset} className="h-14 flex-1 rounded-2xl font-bold border-white/10 hover:bg-white/5 transition-all">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset Tool
                </Button>
                <Button type="submit" className="h-14 flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all scale-[1.02] active:scale-100">
                  Analyze Impact
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {result && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Future Equivalent Value"
            result={formatCurrency(result)}
            description={`With an average annual inflation rate of ${rate}%, you will need ${formatCurrency(result)} in ${years} years to match today's ${formatCurrency(Number(amount))}.`}
          />
        )}
      </Container>
    </main>
  );
}
