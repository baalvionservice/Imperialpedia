
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
  BarChart3,
  Server,
  Database,
  RotateCcw,
  ShieldCheck,
  ToggleLeft,
  Terminal,
  Cpu,
  History
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardMetrics, DashboardMetrics } from '@/services/mock-api/analytics';
import { getSeoAnalytics } from '@/services/mock-api/analytics';
import { getAdminCreatorAnalytics } from '@/services/mock-api/creators';
import { systemService } from '@/services/data/system-service';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

/**
 * Integrated Administrative Mission Control.
 * Aggregates content management, user control, feature flags, and infrastructure status.
 */
export default function AdminDashboardSummaryPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [seo, setSeo] = useState<any>(null);
  const [creators, setCreators] = useState<any[]>([]);
  const [flags, setFlags] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [metricsRes, seoRes, creatorsRes, flagsRes, logsRes] = await Promise.all([
          getDashboardMetrics(),
          getSeoAnalytics(),
          getAdminCreatorAnalytics(),
          systemService.getFeatureFlags(),
          systemService.getAdminLogs()
        ]);
        setMetrics(metricsRes.data);
        setSeo(seoRes.data);
        setCreators(creatorsRes.data);
        setFlags(flagsRes.data || []);
        setLogs(logsRes.data || []);
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
    <div className="space-y-8 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Admin mission control</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Integrated Command Hub</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Orchestrating platform intelligence and infrastructure across the Imperialpedia Index.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30 h-11 px-6">
            <Download className="mr-2 h-4 w-4" /> Global Audit
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8">
            <Zap className="mr-2 h-4 w-4" /> Deploy Alpha
          </Button>
        </div>
      </header>

      {/* Primary Aggregate matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ecosystem Health</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500 group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Stable</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">99.98% Uptime SLA</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Accuracy</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <Progress value={92.4} className="h-1 mt-2 bg-primary/10" />
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.5k</div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Gross Month-to-date</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl bg-destructive/5">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Critical Flags</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-[10px] text-destructive font-bold mt-1">Action required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content & Roles Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Content Pipeline */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Intelligence Pipeline
                </CardTitle>
                <CardDescription>Managing workflow states for expert research nodes.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold" asChild>
                <Link href="/admin/scheduler">Full Scheduler <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-b border-white/5">
                  <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">Insight Node</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest">Expert</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest">Lifecycle Status</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { title: 'The Yield Curve supercycle', author: 'Market Maven', status: 'Review' },
                  { title: 'DeFi Liquidity Nodes v2', author: 'Sarah Crypto', status: 'Draft' },
                  { title: 'Passive Income Architecture', author: 'Eleanor Vance', status: 'Approved' },
                ].map((item, i) => (
                  <TableRow key={i} className="hover:bg-white/5 border-b border-white/5 group">
                    <TableCell className="pl-6 py-4">
                      <span className="text-sm font-bold truncate max-w-[200px] block">{item.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{item.author}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[9px] font-bold uppercase border-none px-2 h-5",
                        item.status === 'Approved' ? "bg-emerald-500/10 text-emerald-500" : 
                        item.status === 'Review' ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* User Roles & Permissions Summary */}
          <Card className="glass-card border-none shadow-2xl">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Governance Roles</CardTitle>
                <CardDescription>Persona architecture and capability nodes.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-9 rounded-xl border-white/10" asChild>
                <Link href="/admin/roles">Manage Roles</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {[
                  { role: 'Administrator', users: 5, permission: 'Full System' },
                  { role: 'Expert Editor', users: 12, permission: 'Publishing' },
                ].map((r, i) => (
                  <div key={i} className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Text variant="bodySmall" weight="bold" className="uppercase tracking-tight">{r.role}</Text>
                      <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] font-bold">{r.users} Users</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Primary Capability</span>
                      <span className="font-bold text-primary">{r.permission}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System & Infrastructure Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Feature Flags Panel */}
          <Card className="glass-card border-none shadow-xl bg-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-primary">
                <Zap className="h-4 w-4" /> Feature Gateways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {flags.slice(0, 3).map((flag) => (
                <div key={flag.id} className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-white/5">
                  <div className="space-y-0.5">
                    <Text variant="caption" className="font-bold text-[11px]">{flag.name}</Text>
                    <Text variant="caption" className="text-[9px] text-muted-foreground block">{flag.module}</Text>
                  </div>
                  <Switch checked={flag.enabled} className="scale-75" />
                </div>
              ))}
              <Button variant="link" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary h-8" asChild>
                <Link href="/admin/feature-flags">View All Gateways</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Infrastructure Health */}
          <Card className="glass-card border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" /> Infrastructure Node
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-secondary" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Last Backup</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px]">Success</Badge>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <Text variant="caption" className="text-muted-foreground font-mono">bak-8F2D-stable</Text>
                  <Text variant="caption" className="text-[9px]">4h ago</Text>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Deploy Hash</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[9px]">
                    <CheckCircle2 className="h-3 w-3" /> LIVE
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 border border-white/5 font-mono text-[10px] text-muted-foreground flex justify-between">
                  <span>SHA-256: 4a1c...9e0b</span>
                  <RotateCcw className="h-3 w-3 cursor-pointer hover:text-primary transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Summary */}
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" /> System Logs Buffer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {logs.slice(0, 3).map((log) => (
                  <div key={log.id} className="p-4 space-y-1 hover:bg-white/5 transition-colors group">
                    <Text variant="caption" className="font-bold text-[10px] text-foreground group-hover:text-primary transition-colors">{log.action}</Text>
                    <div className="flex justify-between items-center text-[9px] text-muted-foreground font-mono">
                      <span>{log.admin}</span>
                      <span>{format(new Date(log.date), 'HH:mm:ss')}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest border-t border-white/5 rounded-none" asChild>
                <Link href="/admin/control/activity-log">View Global Trail</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Insight Fragment */}
      <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="w-20 h-20 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-2xl shrink-0">
            <BarChart3 className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-2">
            <Text variant="h2" className="text-2xl font-bold">Platform Ingestion Pulse</Text>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed max-w-2xl">
              pSEO Engine is successfully crawling **1.2M nodes**. Average ingestion latency is 42ms. CDN cache-hit ratio remains optimized at 98.4%.
            </Text>
          </div>
          <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary/30 hover:bg-primary/5 shrink-0" asChild>
            <Link href="/admin/analytics/full-overview">Ecosystem Analytics</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

import { DollarSign as DollarSignIcon } from 'lucide-react';
