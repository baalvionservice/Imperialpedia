'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  Users, 
  FileText, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  Loader2,
  Activity,
  ArrowUpRight,
  Bell,
  ChevronRight,
  BarChart3,
  Globe
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { systemService } from '@/services/data/system-service';
import { AdminHomeOverview } from '@/types/system';
import Link from 'next/link';

export default function AdminDashboardOverview() {
  const [data, setData] = useState<AdminHomeOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await systemService.getAdminHomeOverview();
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
          Establishing Command Handshake...
        </Text>
      </div>
    );
  }

  const mockChartData = [
    { date: 'Mon', views: 12000, revenue: 450 },
    { date: 'Tue', views: 15000, revenue: 520 },
    { date: 'Wed', views: 14000, revenue: 480 },
    { date: 'Thu', views: 18000, revenue: 610 },
    { date: 'Fri', views: 22000, revenue: 750 },
    { date: 'Sat', views: 19000, revenue: 680 },
    { date: 'Sun', views: 25000, revenue: 820 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <Text variant="label" className="text-primary font-bold uppercase tracking-widest text-[10px] mb-1">Global Intelligence</Text>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Mission Control</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 bg-card/30">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8">
            Trigger Audit
          </Button>
        </div>
      </header>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: data.totalUsers.toLocaleString(), icon: Users, color: 'text-primary', trend: '+12%' },
          { label: 'Indexed Nodes', value: '1.2M+', icon: Globe, color: 'text-secondary', trend: '+45k' },
          { label: 'Daily Revenue', value: '$4,250', icon: DollarSign, color: 'text-emerald-500', trend: '+8%' },
          { label: 'AI Content', value: '15.4k', icon: Zap, color: 'text-amber-500', trend: '+24%' },
        ].map((w) => (
          <Card key={w.label} className="glass-card border-none shadow-xl group hover:scale-[1.02] transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-xl bg-background/50 border border-white/5", w.color)}>
                  <w.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[8px] font-bold border-white/10 uppercase bg-black/20">{w.trend}</Badge>
              </div>
              <div className="text-3xl font-bold tracking-tighter">{w.value}</div>
              <Text variant="label" className="text-[10px] opacity-50 uppercase font-bold tracking-widest mt-1">{w.label}</Text>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Network Momentum</CardTitle>
              <CardDescription>Daily reach vs. revenue velocity across the index.</CardDescription>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold">LIVE SYNC</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="views" name="Global Reach" stroke="#8272F2" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-primary/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap className="h-24 w-24 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <Activity className="h-4 w-4" /> System Pulse
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "The AI ingestion pipeline is processing 120 nodes/minute. Discovery velocity has increased by 15% following the Q1 taxonomy re-sharding."
            </Text>
            <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs mt-4 group/link" asChild>
              <Link href="/admin/ai">Enter AI Workspace <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" /></Link>
            </Button>
          </Card>

          <Card className="glass-card border-none shadow-xl">
            <CardHeader className="pb-2 border-b border-white/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Recent Audits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { user: "Eleanor Vance", action: "Approved AI Node: Fed Policy", time: "10m ago" },
                  { user: "Julian Wealth", action: "Suspended Vendor #42", time: "1h ago" },
                  { user: "System", action: "Rotated API Gateway Keys", time: "2h ago" }
                ].map((act, i) => (
                  <div key={i} className="p-4 flex flex-col gap-1 hover:bg-white/5 transition-colors cursor-default">
                    <Text variant="bodySmall" weight="bold" className="text-foreground/90">{act.action}</Text>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>{act.user}</span>
                      <span className="font-mono">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}