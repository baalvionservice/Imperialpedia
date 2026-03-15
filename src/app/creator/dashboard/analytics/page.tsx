'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/design-system/typography/text';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer2, 
  Share2, 
  DollarSign, 
  Calendar,
  Download,
  Loader2,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { getCreatorAnalytics } from '@/services/mock-api/creators';
import { CreatorDashboardAnalytics } from '@/types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

export default function CreatorAnalyticsPage() {
  const [data, setData] = useState<CreatorDashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCreatorAnalytics('u-1');
        setData(response.data);
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
        <Text variant="bodySmall" className="text-muted-foreground animate-pulse">Aggregating intelligence performance...</Text>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <TrendingUp className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest">Performance Insights</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">Insights Analytics</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Track your reach, engagement, and revenue velocity across the platform.
          </Text>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Last 7 Days
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20">
            <Download className="mr-2 h-4 w-4" /> Export Assets
          </Button>
        </div>
      </header>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data.totalViews / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +15.2% reach velocity
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Intelligence Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +$1,240.50 this week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Platform Engagement</CardTitle>
            <MousePointer2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalEngagement.toLocaleString()}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +4.8% interaction rate
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average RPM</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.avgRpm.toFixed(2)}</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              Optimized for Finance taxonomy
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic & Revenue Chart */}
        <Card className="lg:col-span-2 glass-card">
          <Tabs defaultValue="reach" className="w-full">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-card/30">
              <div>
                <CardTitle>Intelligence Momentum</CardTitle>
                <CardDescription>Daily performance of your research nodes.</CardDescription>
              </div>
              <TabsList className="bg-background/50 border border-white/5">
                <TabsTrigger value="reach">Reach</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="reach" className="mt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.dailyMetrics}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
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
                      contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '8px' }}
                      itemStyle={{ color: '#8272F2' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#8272F2" 
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="revenue" className="mt-0 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.dailyMetrics}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#69B9FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#69B9FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => val.split('-')[2]} />
                    <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '8px' }} itemStyle={{ color: '#69B9FF' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#69B9FF" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Engagement Summary */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Audience Sentiment</CardTitle>
            <CardDescription>Interaction distribution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <Text variant="bodySmall" weight="bold">Viral Velocity</Text>
                  <Text variant="caption" className="text-muted-foreground">Shares are up 24%</Text>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none">High</Badge>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-2"><Eye className="h-3 w-3" /> Monthly Views</span>
                <span className="font-bold">1.2M</span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-muted-foreground flex items-center gap-2"><DollarSign className="h-3 w-3" /> Revenue Payout</span>
                <span className="font-bold">Next cycle: Mar 15</span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[65%]" />
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-white/5 bg-card/30">
              <Text variant="caption" className="italic text-muted-foreground leading-relaxed">
                "Your articles on 'Macro Trends' are achieving 3x the average RPM compared to other categories. Consider focusing your research there."
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content Table */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-card/30 border-b">
          <CardTitle>High-Impact Intelligence</CardTitle>
          <CardDescription>Article-level performance and revenue metrics.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Insight Title</TableHead>
              <TableHead className="text-right">Reach</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.topContent.map((item) => (
              <TableRow key={item.contentId} className="group hover:bg-muted/20">
                <TableCell className="font-bold py-4">
                  <span className="text-sm line-clamp-1">{item.title}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold">{(item.views / 1000).toFixed(1)}k</span>
                    <span className="text-[10px] text-muted-foreground">Unique views</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[10px] font-mono">{item.likes + item.comments + item.shares}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none font-mono">
                    {formatCurrency(item.revenue)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
