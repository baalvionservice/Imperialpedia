'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Loader2, 
  Download, 
  CreditCard,
  PieChart as PieIcon,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Layers,
  ArrowRight,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getMediaAdminData } from '@/services/mock-api/admin-media';
import { MediaAdminDashboardData, AdPerformanceNode } from '@/types/admin-media';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function MonetizationGovernancePage() {
  const [data, setData] = useState<MediaAdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await getMediaAdminData();
      if (response.data) setData(response.data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground">
          Synchronizing Fiscal Ledger...
        </Text>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(val);

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <DollarSign className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Fiscal Orchestration</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Monetization & Finance</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-white/10 bg-card/30">
            <Calendar className="mr-2 h-4 w-4 text-primary" /> Monthly Statement
          </Button>
          <Button className="rounded-xl shadow-lg shadow-emerald-900/20 font-bold bg-emerald-600 hover:bg-emerald-700 h-11 px-8 transition-all scale-105 active:scale-95">
            <Download className="mr-2 h-4 w-4" /> Export Audit Ledger
          </Button>
        </div>
      </header>

      {/* REVENUE VITALS MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: formatCurrency(data.stats.monthlyRevenue), icon: DollarSign, color: 'text-emerald-500', trend: '+12.4%' },
          { label: 'Active Subs', value: formatCompact(data.stats.totalSubscribers), icon: CreditCard, color: 'text-primary', trend: '+850' },
          { label: 'Avg. RPM', value: '$12.45', icon: Activity, color: 'text-secondary', trend: '+4.2%' },
          { label: 'Ad Performance', value: '92%', icon: Zap, color: 'text-amber-500', trend: 'Stable' }
        ].map((v) => (
          <Card key={v.label} className="glass-card border-none shadow-xl group hover:border-emerald-500/20 transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={cn("p-2 rounded-xl bg-background/50 border border-white/5", v.color)}>
                  <v.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-white/10 bg-black/20">{v.trend}</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tighter">{v.value}</div>
                <Text variant="label" className="text-[10px] opacity-50 uppercase font-bold tracking-widest mt-1">{v.label}</Text>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* AD MANAGEMENT HUB */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <PieIcon className="h-5 w-5 text-primary" /> Ad Placement Integrity
                </CardTitle>
                <CardDescription>Auditing display, affiliate, and sponsored content yield.</CardDescription>
              </div>
              <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-bold h-7 px-4">LIVE SYNC</Badge>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-b border-white/5">
                    <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Placement Node</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">CTR %</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Impressions</TableHead>
                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Yield (Revenue)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.adPerformance.map((ad) => (
                    <TableRow key={ad.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                      <TableCell className="py-5 pl-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground/90">{ad.placement}</span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">{ad.type} network</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm font-bold text-primary">{ad.ctr}%</TableCell>
                      <TableCell className="text-center font-mono text-xs opacity-70">{formatCompact(ad.impressions)}</TableCell>
                      <TableCell className="text-right pr-8">
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-xs h-7 px-3">
                          {formatCurrency(ad.revenue)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* AI CONTENT MONETIZATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card border-none shadow-xl bg-primary/5 p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Sparkles className="h-24 w-24 text-primary" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Zap className="h-6 w-6" /></div>
                  <Text variant="h3" className="font-bold">Yield per AI Node</Text>
                </div>
                <div className="text-4xl font-bold tracking-tighter">$4.20</div>
                <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
                  "Average revenue generated by automatically crawlable AI intelligence nodes. Current efficiency: 3.2x higher than manual retail nodes."
                </Text>
              </div>
            </Card>

            <Card className="glass-card border-none bg-background/30 p-10 flex flex-col justify-center h-full">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Target className="h-4 w-4" /> Revenue Directives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <Text variant="caption" className="font-bold">Increase sponsored placements in Macro Hub</Text>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 transition-all cursor-default">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  <Text variant="caption" className="font-bold">Optimize affiliate nodes for 'Broker' keywords</Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FINANCIAL SUMMARY SIDEBAR */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="glass-card border-none shadow-xl bg-card/30 flex flex-col h-full">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Global Settlement Node
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex-grow space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest">Base Currency</Text>
                    <div className="text-xl font-bold font-mono">USD ($)</div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] h-5 px-2">Verified</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Accrual Buffer</span>
                    <span className="text-primary">$42,500.00</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[65%]" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase">
                    <Globe className="h-3.5 w-3.5" /> FX Handshake
                  </div>
                  <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
                    "Platform FX rates are synchronized with the **Institutional FX Oracle** every 60 seconds. Settlement for non-USD creators is scheduled for Mar 25."
                  </Text>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/10 border-t border-white/5 flex justify-center">
              <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-emerald-500 rounded-none">
                Audit Settlement Ledger
              </Button>
            </CardFooter>
          </Card>

          <div className="p-10 rounded-[3.5rem] bg-secondary/5 border border-secondary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Layers className="h-32 w-32 text-secondary" />
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest mb-4">
              <Target className="h-4 w-4" /> Subscription Vitals
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-bold">Churn Resistance</span>
                <span className="text-emerald-500 font-bold">92.4%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-bold">LTV Projection</span>
                <span className="text-secondary font-bold">$420 / node</span>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto text-secondary text-xs font-bold uppercase mt-6 group/link">
              View Detailed Retention <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
