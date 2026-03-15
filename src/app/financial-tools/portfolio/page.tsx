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
} from 'lucide-react';
import Link from 'next/link';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
} from 'recharts';

interface PortfolioAsset {
  id: string;
  name: string;
  investment: string;
  returnRate: string;
  error?: string;
}

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

  const validate = () => {
    let isValid = true;
    const newAssets = assets.map(asset => {
      let error = "";
      if (!asset.name) error = "Name required";
      if (Number(asset.investment) < 0) error = "Invalid investment";
      if (Number(asset.returnRate) < 0 || Number(asset.returnRate) > 100) error = "Invalid return (0-100%)";
      
      if (error) isValid = false;
      return { ...asset, error };
    });
    setAssets(newAssets);
    return isValid;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
            Architect a diversified portfolio by assigning capital and return expectations to various asset classes.
          </Text>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                    {assets.map((asset) => (
                      <div key={asset.id} className="p-4 rounded-xl bg-background/40 border border-white/5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
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
                        {asset.error && <p className="text-[10px] font-bold text-destructive uppercase">{asset.error}</p>}
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

          <div className="lg:col-span-5 space-y-8">
            {results ? (
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
                      <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
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

        {results && (
          <CalculatorResultModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReset={handleReset}
            title="Projected Portfolio Value"
            result={formatCurrency(results.totalValue)}
            description={`Your diversified portfolio is projected to grow by ${formatCurrency(results.totalProfit)} (+${results.weightedReturn.toFixed(2)}%) based on your asset allocation.`}
          />
        )}
      </Container>
    </main>
  );
}
