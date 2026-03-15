import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  FileText, 
  FileEdit, 
  Users, 
  BarChart3, 
  Plus, 
  Settings, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

/**
 * The Central Admin Dashboard landing page.
 * Aggregates platform-wide statistics and recent publishing activity.
 */
export default function AdminDashboardPage() {
  // Mock Stats Data
  const stats = [
    { title: 'Total Articles', value: '1,248', icon: FileText, color: 'text-primary', description: '+12% from last month' },
    { title: 'Drafts', value: '24', icon: FileEdit, color: 'text-secondary', description: 'Requires review' },
    { title: 'Platform Reach', value: '850K', icon: BarChart3, color: 'text-primary', description: 'Monthly unique views' },
    { title: 'Active Creators', value: '15', icon: Users, color: 'text-secondary', description: '3 new this week' },
  ];

  // Mock Recent Activity
  const recentActivity = [
    { id: '1', title: 'Understanding Yield Curve Inversion', author: 'The Market Maven', status: 'Published', date: '2 hours ago' },
    { id: '2', title: 'Macro Trends 2026', author: 'Expert Editor', status: 'Draft', date: '5 hours ago' },
    { id: '3', title: 'Compound Interest Basics', author: 'Wealth Builder', status: 'Published', date: 'Yesterday' },
    { id: '4', title: 'Recession Proof Portfolio', author: 'Market Maven', status: 'Review', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Text variant="h1" className="text-3xl font-bold">Admin Command Center</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Managing the world's most scalable financial intelligence engine.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/outline"><Plus className="mr-2 h-4 w-4" /> Create Article</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Track the latest content updates across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 
                        item.status === 'Draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="link" className="mt-4 text-primary p-0 h-auto" asChild>
              <Link href="/admin/content">View all activity <ArrowRight className="ml-2 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Links & System Health */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/admin/glossary">Glossary Index <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/categories/economics">Economics Hub <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/topics">Topic Matrix <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">pSEO Engine</span>
                  <span className="text-emerald-500 font-bold">Stable</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Sitemap Status</span>
                  <span className="text-emerald-500 font-bold">Indexed</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">AI Generator</span>
                  <span className="text-emerald-500 font-bold">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
