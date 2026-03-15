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
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardMetrics, DashboardMetrics } from '@/services/mock-api/analytics';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

/**
 * Main Platform Analytics Dashboard for administrators.
 * Aggregates core system metrics and provides deep-dive links to specialized modules.
 */
export default function AnalyticsDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await getDashboardMetrics();
        setMetrics(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (loading || !metrics) {
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

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <BarChart3 className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Intelligence Engine</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">Global Analytics Hub</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Orchestrating growth across the Imperialpedia programmatic index.
          </Text>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30">
            <Calendar className="mr-2 h-4 w-4" /> Monthly Review
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold">
            <Download className="mr-2 h-4 w-4" /> Export Datasets
          </Button>
        </div>
      </header>

      {/* Specialty Intelligence Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'SEO Authority', href: '/admin/analytics/seo', icon: Globe, color: 'text-primary', desc: 'Rankings' },
          { label: 'Traffic Pulse', href: '/admin/analytics/traffic', icon: Activity, color: 'text-secondary', desc: 'Visitors' },
          { label: 'User Activity', href: '/admin/analytics/engagement', icon: Target, color: 'text-primary', desc: 'Retention' },
          { label: 'Content Depth', href: '/admin/analytics/content', icon: FileText, color: 'text-secondary', desc: 'Engagement' },
          { label: 'Expert Network', href: '/admin/analytics/creators', icon: Users, color: 'text-primary', desc: 'Creators' },
          { label: 'Moderation', href: '/admin/analytics/moderation', icon: ShieldAlert, color: 'text-amber-500', desc: 'Integrity' },
        ].map((node) => (
          <Link key={node.href} href={node.href}>
            <Card className="glass-card p-4 hover:border-primary/40 transition-all group h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background/50 border border-white/5 ${node.color}`}>
                    <node.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <Text variant="bodySmall" weight="bold" className="text-xs">{node.label}</Text>
                    <Text variant="caption" className="text-muted-foreground text-[9px] uppercase font-bold">{node.desc}</Text>
                  </div>
                </div>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-primary" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Primary Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalArticles.toLocaleString()}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12 this week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expert Authors</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAuthors}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +3 pending vetting
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Readers</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(metrics.activeUsers)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +8.4% daily growth
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Engines Used</CardTitle>
            <Calculator className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(metrics.calculatorsUsed)}</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              Top: Compound Interest
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Search Queries</CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(metrics.searchQueries)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +15.2% intent volume
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Trend visualization */}
      <Tabs defaultValue="traffic" className="w-full">
        <Card className="glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-card/30 border-b border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">System Momentum</CardTitle>
              <CardDescription>Visualizing growth trends across platform domains.</CardDescription>
            </div>
            <TabsList className="bg-background/50 border border-white/5 p-1 rounded-xl h-11">
              <TabsTrigger value="traffic" className="rounded-lg px-6 font-bold text-xs data-[state=active]:bg-primary">Traffic Velocity</TabsTrigger>
              <TabsTrigger value="network" className="rounded-lg px-6 font-bold text-xs data-[state=active]:bg-primary">Network Growth</TabsTrigger>
              <TabsTrigger value="interaction" className="rounded-lg px-6 font-bold text-xs data-[state=active]:bg-primary">Engine Interaction</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent className="p-8">
            <TabsContent value="traffic" className="mt-0 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.trends}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
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
                    tickFormatter={(val) => val.split('-')[2]}
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#8272F2' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="traffic" 
                    stroke="#8272F2" 
                    fillOpacity={1} 
                    fill="url(#colorTraffic)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="network" className="mt-0 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => val.split('-')[2]}
                  />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Bar dataKey="users" fill="#69B9FF" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="interaction" className="mt-0 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.trends}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                  <Area type="step" dataKey="usage" stroke="#10b981" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Insight Sidebar / System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <BarChart3 className="h-12 w-12" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <Text variant="h3" className="font-bold">Intelligence Index Scaling</Text>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
              The platform is currently operating at <span className="text-emerald-500 font-bold">102% efficiency</span> compared to last month's ingestion benchmarks. All pSEO taxonomies are synchronized and sitemaps are verified.
            </Text>
            <div className="pt-2">
              <Button variant="link" className="p-0 text-secondary h-auto text-xs font-bold" asChild>
                <Link href="/admin/health">View infrastructure telemetry <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-none bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Market Intent Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="caption" className="text-muted-foreground italic leading-relaxed">
              "Search volume for 'Recession Hedging' has spiked 420% in the last 48 hours. The system recommends prioritizing expert analysis on fixed-income and gold cycles."
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
