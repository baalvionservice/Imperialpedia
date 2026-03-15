'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { financialMath } from '@/modules/calculators/utils/calculations';
import { CalculatorResultModal } from '@/modules/calculators/components/CalculatorResultModal';
import { CreditCard, RefreshCcw, ArrowLeft, Info, Landmark, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState<string>('250000');
  const [rate, setRate] = useState<string>('6.5');
  const [years, setYears] = useState<string>('30');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [results, setResults] = useState<{
    monthly: number;
    total: number;
    interest: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const p = Number(principal);
    const r = Number(rate);
    const y = Number(years);

    if (!principal || p <= 0) newErrors.principal = "Required (> 0)";
    if (!rate || r < 0 || r > 100) newErrors.rate = "Required (0-100%)";
    if (!years || y <= 0) newErrors.years = "Required (> 0)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
    setErrors({});
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
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary shadow-sm">
              <Landmark className="h-7 w-7" />
            </div>
            <Badge variant="outline" className="text-secondary border-secondary/30 uppercase tracking-widest text-[10px] font-bold px-3 py-1">
              Debt Management
            </Badge>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Loan Repayment Engine</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Analyze your monthly obligations and the total cost of capital for mortgages, personal financing, or auto loans.
          </Text>
        </header>

        <div className="space-y-8">
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
                      error={errors.principal}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 250000"
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
                      error={errors.rate}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 6.5"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="years" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Loan Tenure (Years)</Label>
                    <Input 
                      id="years" 
                      type="number" 
                      value={years} 
                      onChange={(e) => setYears(e.target.value)}
                      error={errors.years}
                      className="h-12 bg-background/50 rounded-xl border-white/10"
                      placeholder="e.g. 30"
                    />
                  </div>

                  <div className="flex items-center p-4 rounded-xl bg-secondary/5 border border-secondary/10 mt-6">
                    <Info className="h-5 w-5 text-secondary mr-3 shrink-0" />
                    <Text variant="caption" className="text-muted-foreground italic">
                      Models a standard amortized repayment schedule based on target market rates.
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

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="glass-card border-none bg-secondary/5 border-secondary/20">
                <CardContent className="p-6">
                  <Text variant="label" className="text-secondary mb-1">Monthly Payment</Text>
                  <div className="text-2xl font-bold">{formatCurrency(results.monthly)}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-none">
                <CardContent className="p-6">
                  <Text variant="label" className="text-muted-foreground mb-1">Total Interest</Text>
                  <div className="text-2xl font-bold text-amber-500">{formatCurrency(results.interest)}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-none">
                <CardContent className="p-6">
                  <Text variant="label" className="text-muted-foreground mb-1">Total Repayment</Text>
                  <div className="text-2xl font-bold">{formatCurrency(results.total)}</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {results && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Estimated Monthly Payment"
            result={formatCurrency(results.monthly)}
            description={`For a ${formatCurrency(Number(principal))} loan at ${rate}% over ${years} years, your fixed monthly commitment is ${formatCurrency(results.monthly)}.`}
          />
        )}
      </Container>
    </main>
  );
}
