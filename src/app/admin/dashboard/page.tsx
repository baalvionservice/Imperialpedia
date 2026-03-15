
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
  Terminal,
  Cpu,
  History,
  Rocket,
  RefreshCw,
  MoreVertical,
  FlaskConical
} from 'lucide-react';
import Link from 'next/link';
import { getCmsDashboardData, CmsDashboardData } from '@/services/mock-api/admin-cms';
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
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

/**
 * Integrated Admin CMS Mission Control.
 * Orchestrates content, governance, analytics, and infrastructure across the Imperialpedia cluster.
 */
export default function AdminCmsDashboardPage() {
  const [data, setData] = useState<CmsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCmsDashboardData();
        setData(response.data);
      } catch (e) {
        console.error('CMS data sync failure', e);
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
        <Text variant="bodySmall" className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground">
          Establishing Secure Handshake...
        </Text>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Admin mission control</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">System Command Hub</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Orchestrating intelligence nodes and infrastructure for the global index.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30 h-11 px-6">
            <Download className="mr-2 h-4 w-4" /> Export Ledger
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8">
            <Rocket className="mr-2 h-4 w-4" /> Deploy Alpha
          </Button>
        </div>
      </header>

      {/* Vital Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl bg-emerald-500/5">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">System Health</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Stable</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase">99.98% SLA Verified</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">AI Precision</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data.analytics.ai_accuracy * 100).toFixed(1)}%</div>
            <Progress value={data.analytics.ai_accuracy * 100} className="h-1 mt-2 bg-primary/10" />
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Daily Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.analytics.revenue[data.analytics.revenue.length - 1].amount)}</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">+12.4% vs prev cycle</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl bg-destructive/5">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pending Triage</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-[10px] text-destructive font-bold mt-1 uppercase">Action Required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Workflow & Roles */}
        <div className="lg:col-span-8 space-y-8">
          {/* Content & Workflow Manager */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Intelligence Pipeline
                </CardTitle>
                <CardDescription>Managing workflow states for research nodes.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold" asChild>
                <Link href="/admin/scheduler">Full Calendar <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-b border-white/5">
                    <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-4">Node Type</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest">Intelligence Title</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Administrative Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.content_editor.map((item) => (
                    <TableRow key={item.id} className="hover:bg-white/5 border-b border-white/5 group">
                      <TableCell className="pl-8 py-5">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] font-bold uppercase">
                          {item.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold truncate max-w-[300px] block">{item.title || item.term}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-[9px] font-bold uppercase border-none px-2 h-5",
                          item.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : 
                          item.status === 'review' ? "bg-amber-500/10 text-amber-500" : 
                          item.status === 'approved' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5">
                          Audit Node
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Role-based Permissions Panel */}
          <Card className="glass-card border-none shadow-2xl">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lock className="h-5 w-5 text-secondary" /> Persona Architect
                </CardTitle>
                <CardDescription>Defining system capabilities and access boundaries.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-white/10" asChild>
                <Link href="/admin/roles">Configure Matrix</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {data.roles_permissions.map((role, i) => (
                  <div key={i} className="p-8 space-y-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      <Text variant="bodySmall" weight="bold" className="uppercase tracking-tight">{role.role}</Text>
                      <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">{role.userCount} Users</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map(p => (
                        <Badge key={p} variant="outline" className="text-[8px] border-white/10 opacity-60 uppercase">{p}</Badge>
                      ))}
                      {role.permissions.length > 3 && <span className="text-[8px] text-muted-foreground font-bold">+{role.permissions.length - 3}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Analytics & Infrastructure */}
        <div className="lg:col-span-4 space-y-8">
          {/* Feature Gateways Panel */}
          <Card className="glass-card border-none shadow-xl bg-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-primary">
                <Zap className="h-4 w-4" /> Feature Gateways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'AI Content Outliner', module: 'Generative Engine', enabled: true },
                { name: 'pSEO v2 Indexing', module: 'Search Infrastructure', enabled: true },
                { name: 'Monetization Hub', module: 'Payment Node', enabled: false },
              ].map((flag, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-white/5">
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

          {/* Infrastructure Health & Deployment */}
          <Card className="glass-card border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" /> Infrastructure Node
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-secondary" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Snapshot Integrity</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px]">Verified</Badge>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-white/5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Text variant="caption" className="font-bold text-[10px]">{data.backup_status.size}</Text>
                    <Text variant="caption" className="text-[8px] text-muted-foreground uppercase">{format(new Date(data.backup_status.last_backup), 'MMM d, HH:mm')} UTC</Text>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">CDN HIT RATIO</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-500">{data.cache_status.hit_rate}</span>
                </div>
                <Progress value={98.4} className="h-1 bg-white/5" />
              </div>

              <div className="pt-4 border-t border-white/5">
                <Button className="w-full h-11 bg-card hover:bg-white/5 border border-white/10 rounded-xl font-bold text-xs gap-2">
                  <History className="h-4 w-4" /> Access Logs Matrix
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Master Log Buffer */}
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" /> System Logs Buffer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5 max-h-[200px] overflow-y-auto no-scrollbar">
                {data.analytics.system_logs.map((log, i) => (
                  <div key={i} className="p-4 space-y-1 hover:bg-white/5 transition-colors group">
                    <Text variant="caption" className="text-[10px] leading-relaxed text-foreground/80 group-hover:text-primary transition-colors">
                      {log}
                    </Text>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest border-t border-white/5 rounded-none" asChild>
                <Link href="/admin/control/activity-log">Review Global Trail</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Visualization Footer */}
      <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary shadow-2xl">
              <BarChart3 className="h-8 w-8" />
            </div>
            <div>
              <Text variant="h2" className="text-2xl font-bold">Ecosystem Trajectory</Text>
              <Text variant="bodySmall" className="text-muted-foreground leading-relaxed mt-2">
                Aggregated user activity and revenue velocity across the programmatic index nodes.
              </Text>
            </div>
            <Button variant="outline" className="w-fit rounded-xl font-bold border-primary/30 hover:bg-primary/5" asChild>
              <Link href="/admin/analytics/full-overview">Deep Analytics Hub</Link>
            </Button>
          </div>
          
          <div className="lg:col-span-8 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.analytics.user_activity}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="active_users" stroke="#8272F2" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} name="Daily Active Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
