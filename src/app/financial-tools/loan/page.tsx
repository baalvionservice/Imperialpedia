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
import { CreditCard, RefreshCcw, ArrowLeft, Info, Landmark } from 'lucide-react';
import Link from 'next/link';

/**
 * High-fidelity Loan Repayment Calculator.
 * Calculates EMI, total interest, and total repayment for various loan types.
 */
export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState<string>('250000');
  const [rate, setRate] = useState<string>('6.5');
  const [years, setYears] = useState<string>('30');
  
  const [results, setResults] = useState<{
    monthly: number;
    total: number;
    interest: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = financialMath.getLoanSummary(
      Number(principal),
      Number(rate),
      Number(years)
    );
    
    setResults({
      monthly: summary.monthlyPayment,
      total: summary.totalRepayment,
      interest: summary.totalInterest
    });
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setPrincipal('250000');
    setRate('6.5');
    setYears('30');
    setResults(null);
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
          <div className="flex items-center gap-3 text-secondary mb-4">
            <CreditCard className="h-6 w-6" />
            <Text variant="label" className="font-bold tracking-widest">Debt Management</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Loan Repayment Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Calculate your monthly obligation and total cost of borrowing for mortgages, auto loans, or personal financing.
          </Text>
        </header>

        <Card className="glass-card border-none shadow-2xl overflow-hidden">
          <div className="bg-secondary/5 px-8 py-4 border-b border-white/5 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-secondary" />
            <Text variant="caption" className="text-secondary font-bold uppercase tracking-widest">Financing Parameters</Text>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="principal" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Loan Amount ($)</Label>
                  <Input 
                    id="principal" 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl border-white/10 focus:ring-secondary"
                    placeholder="e.g. 250000"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="rate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Annual Interest Rate (%)</Label>
                  <Input 
                    id="rate" 
                    type="number" 
                    step="0.01"
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl border-white/10 focus:ring-secondary"
                    placeholder="e.g. 6.5"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="years" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Loan Tenure (Years)</Label>
                  <Input 
                    id="years" 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(e.target.value)}
                    className="h-12 bg-background/50 rounded-xl border-white/10 focus:ring-secondary"
                    placeholder="e.g. 30"
                    required
                  />
                </div>

                <div className="flex items-center p-4 rounded-xl bg-secondary/5 border border-secondary/10 mt-6">
                  <Info className="h-5 w-5 text-secondary mr-3 shrink-0" />
                  <Text variant="caption" className="text-muted-foreground italic">
                    Calculates a standard amortized monthly payment (EMI) based on the inputs provided.
                  </Text>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="button" variant="outline" onClick={handleReset} className="h-14 flex-1 rounded-2xl font-bold border-white/10 hover:bg-white/5 transition-all">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset Tool
                </Button>
                <Button type="submit" className="h-14 flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl font-bold shadow-xl shadow-secondary/20 transition-all scale-[1.02] active:scale-100">
                  Analyze Repayment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <Text variant="bodySmall" className="text-muted-foreground leading-relaxed italic relative z-10">
            "Understanding the total cost of debt is critical for long-term fiscal stability. Interest rates are the primary lever in determining the actual price of your capital over time." — Financial Intelligence Index
          </Text>
        </div>

        {results && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Estimated Monthly Payment"
            result={formatCurrency(results.monthly)}
            description={`For a ${formatCurrency(Number(principal))} loan at ${rate}% over ${years} years, your monthly payment is ${formatCurrency(results.monthly)}. The total interest cost will be ${formatCurrency(results.interest)}, resulting in a total repayment of ${formatCurrency(results.total)}.`}
          />
        )}
      </Container>
    </main>
  );
}
