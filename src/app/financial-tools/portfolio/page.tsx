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
import { 
  Layers, 
  RefreshCcw, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  PieChart as PieChartIcon, 
  TrendingUp,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface PortfolioAsset {
  id: string;
  name: string;
  investment: string;
  returnRate: string;
}

/**
 * High-fidelity Portfolio Return Calculator.
 * Models aggregate returns across multiple asset classes with visual allocation tracking.
 */
export default function PortfolioCalculatorPage() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    { id: '1', name: 'Stocks', investment: '10000', returnRate: '10' },
    { id: '2', name: 'Bonds', investment: '5000', returnRate: '4' },
    { id: '3', name: 'Real Estate', investment: '20000', returnRate: '7' },
  ]);
  
  const [results, setResults] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addAsset = () => {
    setAssets([...assets, { id: Math.random().toString(), name: '', investment: '0', returnRate: '0' }]);
  };

  const removeAsset = (id: string) => {
    if (assets.length > 1) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const updateAsset = (id: string, field: keyof PortfolioAsset, value: string) => {
    setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAssets = assets.map(a => ({
      name: a.name || 'Unnamed Asset',
      investment: Number(a.investment),
      returnRate: Number(a.returnRate)
    }));

    const summary = financialMath.calculatePortfolioSummary(formattedAssets);
    setResults(summary);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setAssets([
      { id: '1', name: 'Stocks', investment: '10000', returnRate: '10' },
      { id: '2', name: 'Bonds', investment: '5000', returnRate: '4' },
      { id: '3', name: 'Real Estate', investment: '20000', returnRate: '7' },
    ]);
    setResults(null);
    setIsModalOpen(false);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const COLORS = ['#8272F2', '#69B9FF', '#10b981', '#f59e0b', '#ef4444'];

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
          <div className="flex items-center gap-3 text-primary mb-4">
            <Layers className="h-6 w-6" />
            <Text variant="label" className="font-bold tracking-widest uppercase">Multi-Asset Modeling</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">Portfolio ROI Architect</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Architect a diversified portfolio by assigning capital and return expectations to various asset classes. Visualize aggregate growth and individual contributions.
          </Text>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Asset Configuration */}
          <div className="lg:col-span-7">
            <Card className="glass-card border-none shadow-2xl">
              <CardHeader className="bg-card/30 border-b border-white/5 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Asset Matrix</CardTitle>
                  <CardDescription>Define your allocation nodes.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addAsset} className="h-9 rounded-xl border-primary/20 text-primary hover:bg-primary/5">
                  <Plus className="mr-2 h-4 w-4" /> Add Asset
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-4">
                    {assets.map((asset, idx) => (
                      <div key={asset.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end p-4 rounded-xl bg-background/40 border border-white/5 relative group">
                        <div className="sm:col-span-4 space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Asset Name</Label>
                          <Input 
                            value={asset.name} 
                            onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                            placeholder="e.g. Equities"
                            className="bg-background/50 h-10"
                          />
                        </div>
                        <div className="sm:col-span-4 space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Investment ($)</Label>
                          <Input 
                            type="number"
                            value={asset.investment} 
                            onChange={(e) => updateAsset(asset.id, 'investment', e.target.value)}
                            className="bg-background/50 h-10"
                          />
                        </div>
                        <div className="sm:col-span-3 space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Exp. Return (%)</Label>
                          <Input 
                            type="number"
                            step="0.1"
                            value={asset.returnRate} 
                            onChange={(e) => updateAsset(asset.id, 'returnRate', e.target.value)}
                            className="bg-background/50 h-10"
                          />
                        </div>
                        <div className="sm:col-span-1 flex justify-center">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive h-10 w-10"
                            onClick={() => removeAsset(asset.id)}
                            disabled={assets.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl font-bold shadow-lg shadow-primary/20">
                      Calculate Performance
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset} className="h-12 px-6 rounded-xl">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Performance Visualization */}
          <div className="lg:col-span-5 space-y-8">
            {results ? (
              <>
                <Card className="glass-card border-none shadow-2xl overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <PieChartIcon className="h-4 w-4 text-primary" /> Allocation Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="investment"
                          nameKey="name"
                        >
                          {results.breakdown.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="glass-card border-none p-6 text-center">
                    <Text variant="label" className="text-[10px] text-muted-foreground block mb-1">Total Value</Text>
                    <Text variant="h3" className="text-primary font-bold">{formatCurrency(results.totalValue)}</Text>
                  </Card>
                  <Card className="glass-card border-none p-6 text-center">
                    <Text variant="label" className="text-[10px] text-muted-foreground block mb-1">Aggregate Return</Text>
                    <Text variant="h3" className="text-emerald-500 font-bold">+{results.weightedReturn.toFixed(1)}%</Text>
                  </Card>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[3rem] opacity-30 text-center space-y-4">
                <Layers className="h-16 w-16 text-muted-foreground" />
                <div>
                  <Text variant="h4">Awaiting Parameters</Text>
                  <Text variant="bodySmall">Configure your assets to see the visual intelligence breakdown.</Text>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/20 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
          <Text variant="bodySmall" className="text-muted-foreground leading-relaxed italic relative z-10">
            "Diversification is the only free lunch in finance. By intelligently spreading your capital across uncorrelated assets, you can optimize for higher expected returns while managing systemic risk." — Imperialpedia Intelligence
          </Text>
        </div>

        {results && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Projected Portfolio Value"
            result={formatCurrency(results.totalValue)}
            description={`Your diversified portfolio, with a total investment of ${formatCurrency(results.totalInvestment)}, is projected to grow by ${formatCurrency(results.totalProfit)} (+${results.weightedReturn.toFixed(2)}%) based on your asset-level return expectations.`}
          />
        )}
      </Container>
    </main>
  );
}
