'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/design-system/typography/text';
import { 
  Plus, 
  FileEdit, 
  Eye, 
  Users, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  Heart,
  ChevronRight,
  Loader2,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { getCreatorDashboardStats, getCreatorContent } from '@/services/mock-api/creators';
import { CreatorContentItem, CreatorDashboardSummary } from '@/types';
import { format } from 'date-fns';

export default function CreatorDashboardPage() {
  const [stats, setStats] = useState<CreatorDashboardSummary | null>(null);
  const [content, setContent] = useState<CreatorContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, contentRes] = await Promise.all([
          getCreatorDashboardStats('u-1'),
          getCreatorContent('u-1')
        ]);
        setStats(statsRes.data);
        setContent(contentRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="text-muted-foreground animate-pulse">Syncing creator intelligence...</Text>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Published</Badge>;
      case 'scheduled': return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Scheduled</Badge>;
      default: return <Badge variant="secondary" className="opacity-70">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest">Creator Studio</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">Expert Command Center</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Welcome back. Your audience has grown by 12% this week.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="shadow-lg shadow-primary/20">
            <Link href="/creator/dashboard/create">
              <Plus className="mr-2 h-4 w-4" /> Create Insight
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Intelligence Nodes</CardTitle>
            <FileEdit className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalArticles}</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">+4 this month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Audience</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.totalFollowers || 0 / 1000).toFixed(1)}k</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">+1.2k new experts</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Global Reach</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.totalViews || 0 / 1000000).toFixed(1)}M</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">Trending in Economics</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.engagementRate}%</div>
            <p className="text-[10px] text-primary font-bold mt-1">Top 5% of Creators</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Pipeline */}
      <Card className="glass-card border-none overflow-hidden">
        <Tabs defaultValue="all" className="w-full">
          <CardHeader className="border-b bg-card/30 pb-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <CardTitle className="text-xl">Content Pipeline</CardTitle>
                <CardDescription>Manage your research, drafts, and published intelligence.</CardDescription>
              </div>
              <TabsList className="bg-background/50 border border-white/5">
                <TabsTrigger value="all">All Content</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          
          <TabsContent value="all" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Insight Title</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-muted/20">
                    <TableCell className="font-bold py-4">
                      <div className="flex flex-col">
                        <span className="text-sm">{item.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">Modified {format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold uppercase">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span className="text-[10px] font-mono">{(item.views / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span className="text-[10px] font-mono">{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span className="text-[10px] font-mono">{item.comments}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                        <Link href={`/creator/dashboard/create?id=${item.id}`}>
                          Edit <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Specific filters would go here in TabsContent for published/drafts/scheduled */}
          <TabsContent value="published" className="p-12 text-center text-muted-foreground italic">
            Filter logic applied. Showing published intelligence.
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
