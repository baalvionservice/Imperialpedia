'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2, 
  Share2, 
  Search, 
  Calendar,
  Filter,
  Download,
  Loader2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { getContentAnalytics, ContentAnalytics } from '@/services/mock-api/analytics';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

export default function AnalyticsDashboardPage() {
  const [data, setData] = useState<ContentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await getContentAnalytics();
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="text-muted-foreground animate-pulse">Aggregating platform intelligence...</Text>
      </div>
    );
  }

  const COLORS = ['#8272F2', '#69B9FF', '#947eff', '#b4a6ff', '#e9e6ff'];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Text variant="h1" className="text-3xl font-bold">Platform Analytics</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Measuring the growth and impact of the Imperialpedia Intelligence Index.
          </Text>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </header>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data.totalViews / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5% vs last month
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Articles Indexed</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalArticles}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +42 this week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Avg. Engagement</CardTitle>
            <MousePointer2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgEngagement}%</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +0.8% organic growth
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4K</div>
            <div className="flex items-center text-[10px] text-amber-500 font-bold mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> -2.1% viral velocity
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Traffic Chart */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Platform Traffic Trend</CardTitle>
            <CardDescription>Daily organic page views across the intelligence engine.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyViews}>
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
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#8272F2" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#8272F2', strokeWidth: 2, stroke: '#1C1822' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Reach */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Views by financial classification.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topCategories} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    stroke="#888888" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  />
                  <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                    {data.topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Articles Table */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Performing Intelligence</CardTitle>
              <CardDescription>Articles driving the most platform engagement.</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">SEO Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topArticles.map((article) => (
                  <TableRow key={article.articleId}>
                    <TableCell className="font-bold py-4">
                      <div className="flex flex-col">
                        <span className="text-sm">{article.title}</span>
                        <div className="flex gap-1 mt-1">
                          {article.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold">
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      {article.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 bg-muted rounded-full h-1 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full" 
                            style={{ width: `${article.seoScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500">{article.seoScore}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Tags & Keywords */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hot Topics</CardTitle>
            <CardDescription>Trending intelligence nodes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.topTags.map((tag, idx) => (
                <div key={tag.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{tag.tag}</span>
                      <span className="text-[10px] text-muted-foreground">{(tag.views / 1000).toFixed(1)}k related views</span>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                <Search className="h-3 w-3" /> SEO Insight
              </div>
              <Text variant="caption" className="text-muted-foreground leading-relaxed">
                "Macroeconomics" views are up 24% this week. Consider assigning more articles on yield curves and central bank policy.
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
