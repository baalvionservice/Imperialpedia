'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  FileText, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  Clock, 
  BarChart3, 
  TrendingUp, 
  ArrowLeft,
  ArrowUpRight,
  Download,
  Loader2,
  Layers,
  Tag as TagIcon
} from 'lucide-react';
import Link from 'next/link';
import { getContentAnalytics, ContentAnalytics } from '@/services/mock-api/analytics';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function ContentPerformancePage() {
  const [data, setData] = useState<ContentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getContentAnalytics();
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
        <Text variant="bodySmall" className="text-muted-foreground animate-pulse">Aggregating Content Intelligence...</Text>
      </div>
    );
  }

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(val);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const COLORS = ['#8272F2', '#69B9FF', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/admin/analytics"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <FileText className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Content Engine</Text>
            </div>
            <Text variant="h1" className="text-3xl font-bold">Content Performance</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Export Audit
          </Button>
        </div>
      </header>

      {/* Aggregate Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(data.totalViews)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12% this month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgEngagement}%</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Stable velocity
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Articles</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalArticles.toLocaleString()}</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              across 12 taxonomies
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Avg. Read Time</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6m 42s</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +15s vs baseline
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Performance Chart */}
        <Card className="lg:col-span-2 glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Taxonomy Reach
            </CardTitle>
            <CardDescription>Comparison of view volume across primary intelligence hubs.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topCategories} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  stroke="#888888" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="views" fill="#8272F2" radius={[0, 4, 4, 0]} barSize={30}>
                  {data.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tag Cloud / Pie chart */}
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-secondary" /> Topic Engagement
            </CardTitle>
            <CardDescription>Distribution of reader intent by topic.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.topTags}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="views"
                  nameKey="tag"
                >
                  {data.topTags.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* High Impact Content Table */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">High-Impact Intelligence</CardTitle>
              <CardDescription>Article-level performance and engagement metrics.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">
              View Detailed Audit <TrendingUp className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">Article Analysis</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Taxonomy</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest">Global Reach</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest">Interaction</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest">Retention</TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">SEO Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topArticles.map((article) => (
                <TableRow key={article.articleId} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="font-bold py-5 pl-6">
                    <span className="text-sm line-clamp-1">{article.title}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-bold uppercase">
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold">{formatCompact(article.views)}</span>
                      <span className="text-[10px] text-muted-foreground">Unique views</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span className="text-[10px] font-mono">{formatCompact(article.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        <span className="text-[10px] font-mono">{formatCompact(article.shares)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs font-mono font-bold text-secondary">{formatTime(article.avgReadTime)}</span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none font-mono font-bold text-xs px-3">
                      {article.seoScore}%
                    </Badge>
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
