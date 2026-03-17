'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { TrendingUp, TrendingDown, Minus, Activity, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketOverview() {
  const indices = [
    { label: 'S&P 500', value: '5,120.42', change: '+1.24%', trend: 'up' },
    { label: 'NASDAQ', value: '16,274.94', change: '+1.56%', trend: 'up' },
    { label: 'DOW 30', value: '38,905.66', change: '-0.12%', trend: 'down' },
    { label: 'BTC/USD', value: '$64,250', change: '+5.20%', trend: 'up' },
  ];

  const movers = [
    { name: 'NVIDIA (NVDA)', price: '$875.20', change: '+5.24%', trend: 'up' },
    { name: 'Apple (AAPL)', price: '$182.50', change: '-0.85%', trend: 'down' },
    { name: 'Tesla (TSLA)', price: '$175.30', change: '+2.10%', trend: 'up' },
    { name: 'Amazon (AMZN)', price: '$178.40', change: '+1.15%', trend: 'up' },
  ];

  return (
    <section className="mt-[-40px] relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Indices Matrix */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {indices.map((idx) => (
            <Card key={idx.label} className="glass-card border-none shadow-xl hover:border-primary/20 transition-all group cursor-default">
              <CardContent className="p-5 space-y-2">
                <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest">{idx.label}</Text>
                <div className="text-xl font-bold tracking-tighter">{idx.value}</div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold",
                  idx.trend === 'up' ? "text-emerald-500" : "text-destructive"
                )}>
                  {idx.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {idx.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Movers Panel */}
        <Card className="lg:col-span-4 glass-card border-none shadow-2xl overflow-hidden">
          <div className="bg-primary/10 px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Market Movers</Text>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {movers.map((m) => (
                <div key={m.name} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="space-y-0.5">
                    <Text variant="bodySmall" weight="bold" className="group-hover:text-primary transition-colors text-sm">{m.name}</Text>
                    <Text variant="caption" className="text-muted-foreground font-mono text-[10px]">{m.price}</Text>
                  </div>
                  <div className={cn(
                    "text-xs font-bold font-mono px-2 py-1 rounded-lg",
                    m.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                  )}>
                    {m.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
