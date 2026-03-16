
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Search, 
  Calendar,
  Download,
  Loader2,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Activity,
  ArrowRight,
  Target,
  ShieldAlert,
  Sparkles,
  Layers,
  MessageSquare,
  ArrowBigUp,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { getAdminAnalyticsData } from '@/services/mock-api/analytics';
import { AdminAnalyticsData } from '@/types/analytics';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

/**
 * Platform Analytics & Reporting Terminal.
 */
export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getAdminAnalyticsData();
        if (response.data) setData(response.data);
      } catch (e) {
        console.error('Analytics sync failure', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="text-muted-foreground animate-pulse font-bold uppercase tracking-widest">
          Aggregating Platform Intelligence...
        </Text>
      </div>
    );
  }

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(val);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <BarChart3 className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Intelligence Engine</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Analytics & Reporting</Text>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={period} onValueChange={(v: any) => setPeriod(v)} className="w-auto">
            <TabsList className="bg-card/30 border border-white/5 h-11 px-1 rounded-xl">
              <TabsTrigger value="weekly" className="rounded-lg px-4 font-bold text-[10px] uppercase">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-lg px-4 font-bold text-[10px] uppercase">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="h-11 px-6 rounded-xl border-white/10 bg-card/30 gap-2 font-bold text-xs">
            <Download className="h-4 w-4" /> Export Datasets
          </Button>
        </div>
      </header>

      {/* Aggregate Engagement Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl bg-primary/5 group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">User Activity</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.user_activity[data.user_activity.length - 1].active_users} Active</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-2.5 w-2.5" /> +{data.user_activity[data.user_activity.length - 1].new_signups} signups today
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Engagement Node</CardTitle>
            <MessageSquare className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(data.engagement_metrics.comments)} Comments</div>
            <p className="text-[10px] text-muted-foreground mt-1">Daily aggregated dialogue</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl bg-emerald-500/5">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Revenue Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.revenue_metrics[data.revenue_metrics.length - 1].amount)}</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">Platform Accrual Stable</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Index Coverage</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M+ Nodes</div>
            <p className="text-[10px] text-muted-foreground mt-1">Programmatic SEO Active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">User Activity Momentum</CardTitle>
              <CardDescription>Correlation between active users and new registrations.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase px-3 h-7">Live Stream</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.user_activity}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="active_users" name="Active Users" stroke="#8272F2" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl h-full flex flex-col">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Zap className="h-4 w-4" /> Feature Utilization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.feature_usage} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" stroke="#888888" fontSize={9} width={100} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10' }} />
                    <Bar dataKey="usage_count" fill="#8272F2" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
