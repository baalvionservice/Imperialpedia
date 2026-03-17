'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, FileText, Brain, DollarSign, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Loader2, Sparkles,
  Activity, Zap, ShieldAlert
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { adminService } from '@/services/mock-api/admin';
import { PlatformDashboardStats, RevenueMetric } from '@/types/admin';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState<PlatformDashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenueMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [s, r] = await Promise.all([
        adminService.getStats(),
        adminService.getRevenueTrends()
      ]);
      setStats(s.data);
      setRevenue(r.data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground">Aggregating platform intelligence...</Text>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-primary', trend: '+12.4%' },
    { label: 'Articles', value: stats.articlesPublished.toLocaleString(), icon: FileText, color: 'text-secondary', trend: '+850' },
    { label: 'AI Generated', value: stats.aiGenerated.toLocaleString(), icon: Brain, color: 'text-emerald-500', trend: '45%' },
    { label: 'Revenue', value: stats.revenue, icon: DollarSign, color: 'text-amber-500', trend: '+18.2%' },
  ];

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">System Orchestration</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Mission Control</Text>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 h-10 px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Normal
          </Badge>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-10 px-6">
            Run Index Audit
          </Button>
        </div>
      </header>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl bg-background/50 border border-white/5 transition-transform group-hover:scale-110", kpi.color)}>
                  <kpi.icon size={20} />
                </div>
                <Badge variant="outline" className="text-[8px] font-bold border-white/10 uppercase bg-black/20">{kpi.trend}</Badge>
              </div>
              <div className="text-3xl font-bold tracking-tighter">{kpi.value}</div>
              <Text variant="label" className="text-[10px] opacity-50 uppercase font-bold tracking-widest mt-1">{kpi.label}</Text>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Momentum Visualization */}
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Revenue Momentum</CardTitle>
              <CardDescription>Consolidated growth across primary monetization nodes.</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Subs</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Ads</span></div>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <defs>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="subscriptions" name="Subscriptions" stroke="#8272F2" fillOpacity={1} fill="url(#colorSubs)" strokeWidth={3} />
                <Area type="monotone" dataKey="ads" name="Display Ads" stroke="#69B9FF" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts & Triage Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Priority Triage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { title: "Revision Needed: ESG Audit", type: "content", status: "High" },
                  { title: "New Expert Application", type: "author", status: "Medium" },
                  { title: "Sitemap Ingestion Error", type: "system", status: "Critical" },
                ].map((alert, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="space-y-1">
                      <Text variant="bodySmall" weight="bold" className="group-hover:text-primary transition-colors">{alert.title}</Text>
                      <Text variant="caption" className="text-muted-foreground uppercase text-[8px] font-bold">{alert.type}</Text>
                    </div>
                    <Badge variant={alert.status === 'Critical' ? 'destructive' : 'outline'} className="text-[8px] font-bold h-5 px-2">
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-12 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary rounded-none border-t border-white/5">
                View Governance Log
              </Button>
            </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/20 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
              <Zap className="h-4 w-4" /> AI Strategy Node
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "The current index reach is peaking in the **Fixed Income** taxonomy. Recommend provisioning 3 new automated research drafts for Q2."
            </Text>
            <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold uppercase group/link" asChild>
              <Link href="/admin/ai">
                Open AI Content Lab <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
