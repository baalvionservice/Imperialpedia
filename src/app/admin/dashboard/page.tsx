
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  TrendingUp, 
  Globe, 
  ShieldAlert, 
  Lock, 
  Settings, 
  ArrowUpRight, 
  Loader2,
  Activity,
  Search,
  CheckCircle2,
  Calendar,
  Download,
  ChevronRight,
  Plus,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardMetrics, DashboardMetrics } from '@/services/mock-api/analytics';
import { getSeoAnalytics } from '@/services/mock-api/analytics';
import { getAdminCreatorAnalytics } from '@/services/mock-api/creators';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/**
 * Integrated Administrative Mission Control.
 * Aggregates all previously implemented admin modules into a single summary view.
 */
export default function AdminDashboardSummaryPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [seo, setSeo] = useState<any>(null);
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [metricsRes, seoRes, creatorsRes] = await Promise.all([
          getDashboardMetrics(),
          getSeoAnalytics(),
          getAdminCreatorAnalytics()
        ]);
        setMetrics(metricsRes.data);
        setSeo(seoRes.data);
        setCreators(creatorsRes.data);
      } catch (e) {
        console.error('Failed to sync administrative intelligence', e);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse font-bold uppercase tracking-widest text-muted-foreground">
          Synchronizing Global Control Matrix...
        </Text>
      </div>
    );
  }

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(val);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Mission Control</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Integrated Dashboard</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Traversing the Imperialpedia Index across 1,000,000+ programmatic nodes.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30">
            <Download className="mr-2 h-4 w-4" /> Export Global Audit
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90">
            <Zap className="mr-2 h-4 w-4" /> Real-time Refresh
          </Button>
        </div>
      </header>

      {/* Domain Summary Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Reach Node */}
        <Card className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Traffic Pulse</CardTitle>
            <Activity className="h-4 w-4 text-primary group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(metrics.activeUsers)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.4% reader velocity
            </div>
          </CardContent>
        </Card>

        {/* Content Node */}
        <Card className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Intelligence Index</CardTitle>
            <FileText className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalArticles.toLocaleString()}</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              Across 12 taxonomy hubs
            </div>
          </CardContent>
        </Card>

        {/* SEO Node */}
        <Card className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Search Authority</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{seo?.avgPosition || '12.4'}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +0.8 CTR momentum
            </div>
          </CardContent>
        </Card>

        {/* Network Node */}
        <Card className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expert Network</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAuthors}</div>
            <div className="flex items-center text-[10px] text-amber-500 font-bold mt-1">
              <CheckCircle2 className="h-3 w-3 mr-1" /> 100% vetted compliance
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Momentum Chart */}
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl">
          <CardHeader className="bg-card/30 border-b border-white/5 p-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">System Pulse</CardTitle>
              <CardDescription>Correlation between traffic velocity and intelligence depth.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold" asChild>
              <Link href="/admin/analytics">Deep Dive <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.trends}>
                <defs>
                  <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
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
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#8272F2" 
                  fillOpacity={1} 
                  fill="url(#colorPulse)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#69B9FF" 
                  fillOpacity={0}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Action Matrix */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-none shadow-xl bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-primary" /> Integrity Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <Text variant="caption" className="font-bold">Pending Moderation</Text>
                  <Badge className="bg-amber-500/10 text-amber-500 border-none font-bold text-[10px]">5 Items</Badge>
                </div>
                <Button size="sm" variant="ghost" className="w-full justify-between h-8 text-xs text-primary font-bold" asChild>
                  <Link href="/admin/moderation">Review Queue <ChevronRight className="h-3 w-3" /></Link>
                </Button>
              </div>
              <div className="p-4 rounded-xl bg-card border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <Text variant="caption" className="font-bold">Vetting Requests</Text>
                  <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px]">3 Experts</Badge>
                </div>
                <Button size="sm" variant="ghost" className="w-full justify-between h-8 text-xs text-primary font-bold" asChild>
                  <Link href="/admin/creators/verification">Expert Verification <ChevronRight className="h-3 w-3" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Strategic Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: 'Role Governance', href: '/admin/roles', icon: Lock },
                { label: 'pSEO Health Audit', href: '/admin/seo-audit', icon: Globe },
                { label: 'System Preferences', href: '/admin/settings', icon: Settings },
                { label: 'User Directory', href: '/admin/users', icon: Users },
              ].map((link) => (
                <Button key={link.label} variant="ghost" className="w-full justify-between h-10 text-xs rounded-xl hover:bg-white/5 group" asChild>
                  <Link href={link.href}>
                    <div className="flex items-center gap-3">
                      <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      {link.label}
                    </div>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Leaderboard Fragment */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Network Momentum</CardTitle>
              <CardDescription>Top-performing intelligence nodes by verified experts.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-secondary font-bold" asChild>
              <Link href="/admin/analytics/creators">Full Expert Audit <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-white/5">
          {creators.slice(0, 3).map((creator) => (
            <div key={creator.id} className="p-6 space-y-4 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden relative">
                  <img src={creator.avatar} alt={creator.name} className="object-cover" />
                </div>
                <div>
                  <Text variant="bodySmall" weight="bold">{creator.name}</Text>
                  <Text variant="caption" className="text-muted-foreground">@{creator.username}</Text>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Text variant="label" className="text-[8px] opacity-50">Reach</Text>
                  <Text variant="bodySmall" weight="bold">{formatCompact(creator.totalViews)}</Text>
                </div>
                <div className="space-y-1">
                  <Text variant="label" className="text-[8px] opacity-50">Engagement</Text>
                  <Text variant="bodySmall" weight="bold" className="text-emerald-500">{creator.engagementRate}%</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">pSEO Engine Stable</Text>
            <Text variant="caption" className="text-muted-foreground">1.2M nodes synchronized.</Text>
          </div>
        </div>
        
        <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">API Gateway Optimal</Text>
            <Text variant="caption" className="text-muted-foreground">42ms avg response latency.</Text>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-secondary/5 border border-secondary/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Search Index Fresh</Text>
            <Text variant="caption" className="text-muted-foreground">Last crawl completed 14m ago.</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
