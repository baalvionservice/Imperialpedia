'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  Globe, 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  ArrowUpRight, 
  BarChart3, 
  MousePointer2, 
  Link as LinkIcon, 
  Loader2,
  Calendar,
  Download,
  ChevronRight,
  TrendingDown,
  Minus
} from 'lucide-react';
import Link from 'next/link';
import { analyticsService } from '@/services/data/analytics-service';
import { SeoAnalytics } from '@/types/analytics';
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

export default function SeoPerformanceMonitoringPage() {
  const [data, setData] = useState<SeoAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await analyticsService.getSeoAnalytics();
        if (response.data) setData(response.data);
      } catch (e) {
        console.error(e);
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
          Syncing Search Engine Intelligence...
        </Text>
      </div>
    );
  }

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(val);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-emerald-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-destructive" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/admin/analytics"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <Globe className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Organic Authority</Text>
            </div>
            <Text variant="h1" className="text-3xl font-bold">SEO Performance</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-card/30">
            <Calendar className="mr-2 h-4 w-4" /> 30 Day Outlook
          </Button>
          <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 font-bold">
            <Download className="mr-2 h-4 w-4" /> Export SEO Audit
          </Button>
        </div>
      </header>

      {/* High-Level Search Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Indexed Pages</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(data.indexedPages)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +2.4% index depth
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average CTR</CardTitle>
            <MousePointer2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.clickThroughRate}%</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +0.8% vs Q4 baseline
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average Position</CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{data.avgPosition}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Climbing top 100
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Organic Backlinks</CardTitle>
            <LinkIcon className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(data.backlinks)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Authority scaling
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Search Console Trends */}
        <Card className="lg:col-span-8 glass-card border-none shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-card/30 p-6">
            <div>
              <CardTitle className="text-lg">Visibility Momentum</CardTitle>
              <CardDescription>Visualizing organic clicks vs total search impressions.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold">LIVE SYNC</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#69B9FF" stopOpacity={0.1}/>
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
                  tickFormatter={(val) => val.split('-')[2]}
                />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#69B9FF" 
                  fillOpacity={1} 
                  fill="url(#colorImpressions)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#8272F2" 
                  fillOpacity={1} 
                  fill="url(#colorClicks)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SEO Context / Insights */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-none shadow-xl bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Authority Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Domain Authority (DA)</span>
                  <span className="font-bold">64/100</span>
                </div>
                <div className="w-full bg-muted/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[64%] transition-all duration-1000" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-medium">Trust Flow</span>
                  <span className="font-bold">52/100</span>
                </div>
                <div className="w-full bg-muted/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[52%] transition-all duration-1000" />
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl border border-white/5 bg-card/30">
                <Text variant="caption" className="italic text-muted-foreground leading-relaxed">
                  "Programmatic pages in the **Glossary Index** are seeing a 45% higher CTR than static articles this month. Recommend increasing internal linking from Glossary terms to Expert Profiles."
                </Text>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-[2rem] border border-secondary/20 bg-secondary/5 space-y-4">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <TrendingUp className="h-4 w-4" /> Strategy Tip
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Top opportunity: **Retirement Planning** keywords are showing high impression volume but low position (avg #18). Directing more backlink authority to this cluster could trigger a 200% traffic lift.
            </Text>
          </div>
        </div>
      </div>

      {/* Keyword Performance Matrix */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Keyword Performance Matrix</CardTitle>
            <CardDescription>Top organic search queries driving traffic to the Intelligence Index.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold">
            View Search Console Hub <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">Search Query</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Avg. Position</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Total Clicks</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Impressions</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">CTR</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right pr-6">Momentum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topKeywords.map((item, idx) => (
                <TableRow key={idx} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-6">
                    <span className="text-sm font-bold">{item.keyword}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-xs font-bold">#{item.position}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs font-bold">{formatCompact(item.clicks)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs text-muted-foreground">{formatCompact(item.impressions)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold">
                      {((item.clicks / item.impressions) * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end">
                      <div className="p-1.5 rounded-lg bg-background/50 border border-white/5">
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
