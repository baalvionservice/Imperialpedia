'use client';

import React, { useState } from 'react';
import { PremiumAnalytics } from '@/types/premium';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3,
  History,
  Target,
  Sparkles,
  Info,
  Download,
  RotateCcw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PremiumAnalyticsClientProps {
  analytics: PremiumAnalytics[];
}

/**
 * Interactive Premium Analytics suite.
 * Features longitudinal sentiment tracking, portfolio deep-dives, and strategy backtesting.
 */
export function PremiumAnalyticsClient({ analytics }: PremiumAnalyticsClientProps) {
  const deepDive = analytics.find(a => a.type === 'portfolio_deep_dive');
  const sentiment = analytics.find(a => a.type === 'historical_sentiment');
  const backtesting = analytics.find(a => a.type === 'backtesting');

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <Sparkles className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Institutional Telemetry</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Advanced Analytics Suite</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30 h-11 px-6">
            <History className="mr-2 h-4 w-4" /> 90 Day Cycle
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-6">
            <Download className="mr-2 h-4 w-4" /> Export Datasets
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sentiment Analysis Column */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Longitudinal Sentiment Drift
                </CardTitle>
                <CardDescription>Correlation between social emotion and market price indices.</CardDescription>
              </div>
              <Badge variant="outline" className="border-secondary/20 bg-secondary/5 text-secondary text-[10px] font-bold px-3">PRO FEED</Badge>
            </CardHeader>
            <CardContent className="p-8 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentiment?.data || []}>
                  <defs>
                    <linearGradient id="colorSenti" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => val.split('-').slice(1).join('/')}
                  />
                  <YAxis yAxisId="left" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="sentiment_score" 
                    name="Sentiment Score"
                    stroke="#8272F2" 
                    fillOpacity={1} 
                    fill="url(#colorSenti)" 
                    strokeWidth={3}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="price_index" 
                    name="Market Index"
                    stroke="#69B9FF" 
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Strategy Backtesting Matrix */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" /> Strategy Backtesting Matrix
                </CardTitle>
                <CardDescription>Simulated historical performance across varied risk profiles.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold text-xs"><RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Re-run Simulation</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {backtesting?.results?.map((res, i) => (
                  <div key={i} className="p-8 space-y-6 hover:bg-white/5 transition-colors group">
                    <div className="space-y-1">
                      <Text variant="caption" className="text-muted-foreground uppercase font-bold text-[9px] tracking-widest">Strategy Node</Text>
                      <Text variant="body" weight="bold" className="group-hover:text-primary transition-colors">{res.strategy}</Text>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Text variant="label" className="text-[10px] opacity-50">Backtested Return</Text>
                        <span className="text-2xl font-bold text-emerald-500">{res.mock_return}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold uppercase">
                          <span className="text-muted-foreground">Max Drawdown</span>
                          <span className="text-destructive">{res.max_drawdown}</span>
                        </div>
                        <Progress value={Math.abs(parseFloat(res.max_drawdown)) * 4} className="h-1 bg-white/5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Deep Dive Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none bg-primary/5 shadow-xl relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <BarChart3 className="h-32 w-32 text-primary" />
            </div>
            <CardHeader className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Portfolio Deep-Dive</CardTitle>
                  <Text variant="label" className="text-[9px] text-primary font-bold">Verified Audit Node</Text>
                </div>
              </div>
              <CardDescription className="text-foreground/90 leading-relaxed font-medium italic border-l-2 border-primary/20 pl-4 py-2">
                "{deepDive?.summary}"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex-grow space-y-8">
              <div className="space-y-4">
                <Text variant="label" className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Risk Concentration</Text>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background/50 border border-white/5 space-y-1">
                    <div className="text-sm font-bold">Medium</div>
                    <Text variant="label" className="text-[8px] opacity-50 font-bold uppercase">Volatility Score</Text>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 border border-white/5 space-y-1">
                    <div className="text-sm font-bold text-emerald-500">Stable</div>
                    <Text variant="label" className="text-[8px] opacity-50 font-bold uppercase">Liquidity Health</Text>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                  <TrendingUp className="h-4 w-4" /> Growth Directives
                </div>
                <ul className="space-y-3">
                  {[
                    "Rebalance 5% from Tech to Utilities.",
                    "Hedge Q2 exposure using T-bills.",
                    "Audit decentralized liquidity nodes."
                  ].map((rec, i) => (
                    <li key={i} className="flex gap-3 items-start group">
                      <div className="mt-1 w-4 h-4 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                        <ArrowRight className="h-2.5 w-2.5" />
                      </div>
                      <Text variant="caption" className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                        {rec}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-8 bg-muted/20 border-t border-white/5">
              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
                  Deep-dive logic utilizes standard **Pro Hub** benchmarks. Performance metrics are synchronized every 4 hours.
                </Text>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
