'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Loader2,
  ChevronRight,
  Plus,
  Zap,
  BarChart3,
  History,
  Terminal,
  Edit,
  CheckCircle2,
  Trash2,
  Activity,
  Globe,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { getCmsDashboardData } from '@/services/mock-api/admin-cms';
import { CMSDashboardData } from '@/types/system';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

/**
 * Institutional Mission Control.
 * Central command hub for platform-wide governance and intelligence auditing.
 */
export default function AdminCmsDashboardPage() {
  const [data, setData] = useState<CMSDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCmsDashboardData();
        setData(response.data);
      } catch (e) {
        console.error('Governance sync failure', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAction = (title: string, action: string) => {
    toast({
      title: `Action Initiated: ${action}`,
      description: `Targeting node: "${title}" across clusters.`,
    });
  };

  if (loading || !data) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground">
          Establishing Governance Handshake...
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Platform Command</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Mission Control</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Orchestrating the discovery of 1M+ intelligence nodes.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 h-11 px-6 bg-card/30">
            <Globe className="mr-2 h-4 w-4" /> Global View
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95">
            <Plus className="mr-2 h-4 w-4" /> Provision Node
          </Button>
        </div>
      </header>

      {/* Aggregate Vitals Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network Reach', value: '1.2M+', icon: Globe, color: 'text-primary' },
          { label: 'Active Experts', value: '156', icon: Users, color: 'text-secondary' },
          { label: 'Integrity Tasks', value: '5', icon: ShieldAlert, color: 'text-destructive' },
          { label: 'Node Health', value: 'Optimal', icon: Activity, color: 'text-emerald-500' },
        ].map((v) => (
          <Card key={v.label} className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-xl bg-background/50 border border-white/5 group-hover:scale-110 transition-transform", v.color)}>
                  <v.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-white/10 bg-black/20">{v.label}</Badge>
              </div>
              <div className="text-3xl font-bold tracking-tighter">{v.value}</div>
              <Text variant="label" className="text-[10px] opacity-50 uppercase font-bold tracking-widest mt-1">Live Node Status</Text>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* INTELLIGENCE MANAGEMENT HUB */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Intelligence Lifecycle</CardTitle>
                  <CardDescription>Managing research nodes and expert output across the index.</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold text-xs uppercase group">
                Full Matrix <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-b border-white/5">
                    <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Intelligence Title</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest">Expert Node</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Lifecycle</TableHead>
                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.cms_content.map((item) => (
                    <TableRow key={item.content_id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                      <TableCell className="py-5 pl-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors truncate max-w-[300px] block">{item.title}</span>
                          <span className="text-[9px] text-muted-foreground font-mono uppercase mt-1">Modified: {item.last_updated}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                            {item.author.charAt(0)}
                          </div>
                          <span className="text-xs font-medium">{item.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge className={cn(
                            "text-[9px] font-bold uppercase border-none h-5 px-2",
                            item.status === 'Published' ? "bg-emerald-500/10 text-emerald-500" : 
                            item.status === 'Review' ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
                          )}>
                            {item.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary transition-all" onClick={() => handleAction(item.title, 'Refine')}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-destructive transition-all" onClick={() => handleAction(item.title, 'Purge')}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* DYNAMIC SYSTEM LOGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card border-none shadow-xl bg-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="h-32 w-32 text-primary rotate-12" />
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <Zap className="h-4 w-4" /> Strategy Insight
                </div>
                <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
                  "Platform reach is currently peaking in the **Economics** taxonomy. Recommend prioritizing expert verification for candidates with macro-economic credentials."
                </Text>
                <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs uppercase group/link" asChild>
                  <Link href="/admin/analytics">
                    Review Growth Analytics <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-background/30 shadow-xl overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-4 border-b border-white/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Cluster Pulse
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 flex-grow flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                      <span>Index Sync</span>
                      <span className="text-emerald-500">Nominal</span>
                    </div>
                    <Progress value={98} className="h-1 bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                      <span>Traversal Latency</span>
                      <span className="text-primary">18ms</span>
                    </div>
                    <Progress value={85} className="h-1 bg-white/5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* GOVERNANCE AUDIT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="glass-card border-none shadow-2xl overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Terminal className="h-4 w-4" /> Audit Ledger
                </CardTitle>
                <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-bold h-5 px-2">LIVE STREAM</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto no-scrollbar">
                {data.system_logs.map((log, i) => (
                  <div key={i} className="p-5 hover:bg-white/5 transition-colors space-y-3 group cursor-default">
                    <div className="flex justify-between items-start">
                      <Text variant="caption" className="font-bold text-foreground/90 group-hover:text-primary transition-colors leading-relaxed">
                        {log.event}
                      </Text>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">
                      <div className="flex items-center gap-1.5"><User className="h-2.5 w-2.5" /> {log.user}</div>
                      <div className="flex items-center gap-1.5"><Clock className="h-2.5 w-2.5" /> {log.timestamp.split(' ')[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/10 border-t border-white/5">
              <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary rounded-none" asChild>
                <Link href="/admin/control/audit-trail">Full Governance Logs</Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="p-8 rounded-[3rem] border border-secondary/20 bg-secondary/5 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <ShieldCheck className="h-24 w-24 text-secondary" />
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest">
              <Lock className="h-4 w-4" /> Identity Sealed
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
              "Your administrative session is cryptographically signed. All node modifications are immutable and mirrored to the secondary governance cluster."
            </Text>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { User } from 'lucide-react';
