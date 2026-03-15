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
import { TrendingUp, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * High-fidelity Compound Interest Calculator.
 */
export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('7');
  const [years, setYears] = useState<string>('10');
  const [monthly, setMonthly] = useState<string>('500');
  
  const [result, setResult] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const final = financialMath.calculateCompoundInterest(
      Number(principal),
      Number(rate),
      Number(years),
      Number(monthly)
    );
    setResult(final);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setPrincipal('10000');
    setRate('7');
    setYears('10');
    setMonthly('500');
    setResult(null);
    setIsModalOpen(false);
  };

  const formattedResult = result ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result) : '';

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container isNarrow>
        <Button variant="ghost" size="sm" className="mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary group" asChild>
          <Link href="/financial-tools"><ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard</Link>
        </Button>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary mb-4">
            <TrendingUp className="h-6 w-6" />
            <Text variant="label" className="font-bold">Wealth Building Tool</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4">Compound Interest Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg">
            Understand the power of time and consistent contributions on your portfolio growth.
          </Text>
        </header>

        <Card className="glass-card border-none shadow-2xl overflow-hidden">
          <div className="bg-primary/5 px-8 py-4 border-b border-white/5">
            <Text variant="caption" className="text-primary font-bold uppercase tracking-widest">Input Parameters</Text>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="principal">Initial Principal ($)</Label>
                  <Input 
                    id="principal" 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input 
                    id="rate" 
                    type="number" 
                    step="0.1"
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="years">Time Horizon (Years)</Label>
                  <Input 
                    id="years" 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="monthly">Monthly Contribution ($)</Label>
                  <Input 
                    id="monthly" 
                    type="number" 
                    value={monthly} 
                    onChange={(e) => setMonthly(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleReset} className="h-14 flex-1 rounded-2xl font-bold">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button type="submit" className="h-14 flex-1 bg-primary hover:bg-primary/90 rounded-2xl font-bold shadow-xl shadow-primary/20">
                  Run Projection
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/5 border border-secondary/20">
          <Text variant="bodySmall" className="text-muted-foreground leading-relaxed italic">
            "Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it." — Albert Einstein
          </Text>
        </div>

        <CalculatorResultModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onReset={handleReset}
          title="Projected Future Value"
          result={formattedResult}
          description={`With an initial investment of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(principal))} and monthly contributions of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(monthly))}, your portfolio is projected to grow to ${formattedResult} over ${years} years at a ${rate}% annual rate.`}
        />
      </Container>
    </main>
  );
}
