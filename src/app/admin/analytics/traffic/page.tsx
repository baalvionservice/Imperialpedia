'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Users, 
  Eye, 
  Clock, 
  Activity, 
  ArrowLeft,
  Download,
  Loader2,
  TrendingUp,
  MapPin,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { analyticsService } from '@/services/data/analytics-service';
import { TrafficAnalytics } from '@/types/analytics';
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
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function TrafficMonitoringPage() {
  const [data, setData] = useState<TrafficAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await analyticsService.getTrafficAnalytics();
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
          Syncing Platform Traffic Nodes...
        </Text>
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

  const deviceData = [
    { name: 'Desktop', value: data.deviceBreakdown.desktop, icon: Monitor, color: '#8272F2' },
    { name: 'Mobile', value: data.deviceBreakdown.mobile, icon: Smartphone, color: '#69B9FF' },
    { name: 'Tablet', value: data.deviceBreakdown.tablet, icon: Tablet, color: '#10b981' },
  ];

  const COLORS = ['#8272F2', '#69B9FF', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/admin/analytics"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Activity className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">System Flow</Text>
            </div>
            <Text variant="h1" className="text-3xl font-bold">Traffic Monitoring</Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Export Logs
          </Button>
        </div>
      </header>

      {/* Real-time Pulse Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none shadow-xl bg-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Pulse</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeUsers.toLocaleString()}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              Active readers now
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Session Depth</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(data.sessionDuration)}</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              Avg. persistence per node
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Node Views</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompact(data.pageViews)}</div>
            <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +18% session volume
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exit Resistance</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(100 - data.bounceRate).toFixed(1)}%</div>
            <div className="flex items-center text-[10px] text-muted-foreground font-bold mt-1">
              Retention efficiency
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hourly Velocity Chart */}
        <Card className="lg:col-span-2 glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Network Velocity</CardTitle>
            <CardDescription>Visualizing request volume across the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.hourlyTraffic}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8272F2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8272F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#888888" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#8272F2' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#8272F2" 
                  fillOpacity={1} 
                  fill="url(#colorTraffic)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Access Layer</CardTitle>
            <CardDescription>Breakdown by hardware taxonomy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1822', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${device.color}15`, color: device.color }}>
                      <device.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold">{device.name}</span>
                  </div>
                  <span className="font-mono text-sm">{device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution Matrix */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Global Market Reach</CardTitle>
              <CardDescription>Geographic distribution of the intelligence network.</CardDescription>
            </div>
            <Badge variant="outline" className="border-secondary/20 bg-secondary/5 text-secondary">
              <Globe className="mr-2 h-3 w-3" /> Live Data
            </Badge>
          </div>
        </CardHeader>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.geoBreakdown} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="country" 
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
                <Bar dataKey="users" fill="#69B9FF" radius={[0, 4, 4, 0]} barSize={30}>
                  {data.geoBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <Text variant="bodySmall" weight="bold" className="text-primary flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" /> Market Expansion Tip
              </Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
                "Audience growth in **Singapore (APAC)** has exceeded benchmarks by 45% this quarter. The system suggests increasing expert coverage of Asian-Pacific trade flows and digital currency regulations."
              </Text>
            </div>
            
            <div className="space-y-4">
              <Text variant="label" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth Nodes</Text>
              {data.geoBreakdown.slice(0, 3).map((geo) => (
                <div key={geo.country} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold">{geo.country}</span>
                    <span className="text-muted-foreground">{geo.percentage}% volume</span>
                  </div>
                  <div className="w-full bg-muted/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full transition-all duration-1000" style={{ width: `${geo.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
