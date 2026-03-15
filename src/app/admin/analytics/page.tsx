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
  Calculator, 
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

/**
 * Main Platform Analytics & Reporting Dashboard for administrators.
 * Aggregates core system metrics, user activity, revenue, and content performance.
 */
export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getAdminAnalyticsData();
        setData(response.data);
      } catch (e) {
        console.error('Failed to sync analytics matrix', e);
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
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Visualizing growth, engagement, and content performance across the Imperialpedia index.
          </Text>
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
            <Users className="h-4 w-4 text-primary group-hover:animate-pulse" />
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
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <ArrowBigUp className="h-2.5 w-2.5" /> {formatCompact(data.engagement_metrics.upvotes)}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Zap className="h-2.5 w-2.5" /> {formatCompact(data.engagement_metrics.shares)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl bg-emerald-500/5">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Revenue Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.revenue_metrics[data.revenue_metrics.length - 1].amount)}</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-2.5 w-2.5" /> Platform Accrual Stable
            </p>
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
        {/* User Activity Visualization */}
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">User Activity Momentum</CardTitle>
              <CardDescription>Correlation between active users and new registrations.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest px-3">Live Stream</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.user_activity}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#69B9FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#69B9FF" stopOpacity={0}/>
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
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area 
                  type="monotone" 
                  dataKey="active_users" 
                  name="Active Users"
                  stroke="#8272F2" 
                  fillOpacity={1} 
                  fill="url(#colorActive)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="new_signups" 
                  name="New Signups"
                  stroke="#69B9FF" 
                  fillOpacity={1} 
                  fill="url(#colorSignups)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature usage Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl h-full flex flex-col">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Zap className="h-4 w-4" /> Feature Utilization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.feature_usage} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} vertical={true} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="feature" 
                      type="category" 
                      stroke="#888888" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    />
                    <Bar dataKey="usage_count" name="Usage Count" fill="#8272F2" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 text-secondary font-bold text-[10px] uppercase mb-2">
                  <Sparkles className="h-3 w-3" /> Growth Insight
                </div>
                <Text variant="caption" className="italic text-muted-foreground leading-relaxed">
                  "Watchlist Hub adoption is up 45% following the deployment of the real-time sentiment node."
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Performance Matrix */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Intelligence Report Matrix
            </CardTitle>
            <CardDescription>Auditing individual content node impact and conversion.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold text-xs group">
            View All Content <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-4">Intelligence Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Classification</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Global Reach</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Interaction Node</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Decision Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.content_reports.map((report) => (
                <TableRow key={report.id} className="group hover:bg-white/5 border-b border-white/5 transition-colors">
                  <TableCell className="pl-8 py-5">
                    <Text variant="bodySmall" weight="bold" className="group-hover:text-primary transition-colors">{report.title}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] font-bold uppercase">
                      {report.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-sm">
                    {formatCompact(report.views)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-emerald-500 font-bold text-xs">
                      <ArrowUpRight className="h-3 w-3" /> {formatCompact(report.likes)} likes
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold uppercase px-3 h-6">Optimized</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Revenue Matrix */}
      <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary shadow-2xl">
              <DollarSign className="h-8 w-8" />
            </div>
            <div>
              <Text variant="h2" className="text-2xl font-bold">Revenue Momentum</Text>
              <Text variant="bodySmall" className="text-muted-foreground leading-relaxed mt-2">
                Monitoring high-fidelity platform accrual across institutional and expert member tiers.
              </Text>
            </div>
            <Button className="w-fit rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 h-12 px-8">
              Audit Settlement Ledger
            </Button>
          </div>
          
          <div className="lg:col-span-8 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenue_metrics}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="amount" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} name="Daily Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
