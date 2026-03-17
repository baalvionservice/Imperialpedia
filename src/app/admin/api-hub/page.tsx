'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Terminal, 
  Plus, 
  Search, 
  Settings2, 
  Zap, 
  Activity, 
  Globe, 
  ShieldCheck,
  RefreshCw,
  Loader2,
  Trash2,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function APIIntegrationHub() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const mockAPIs = [
    { id: 'api-1', name: "AlphaVantage Real-time", type: "Market Data", status: "Active", latency: "42ms", usage: "85%" },
    { id: 'api-2', name: "Claude 3.5 Sonnet", type: "AI Engine", status: "Active", latency: "1.2s", usage: "42%" },
    { id: 'api-3', name: "Stripe Gateway", type: "Payments", status: "Active", latency: "180ms", usage: "12%" },
    { id: 'api-4', name: "Google Search Console", type: "SEO", status: "Warning", latency: "850ms", usage: "98%" },
  ];

  const handleTest = (name: string) => {
    toast({ title: "API Handshake Initiated", description: `Testing connection to ${name}... Connection verified.` });
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Terminal className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">External Connectivity</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">API Integration Hub</Text>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8">
          <Plus className="mr-2 h-4 w-4" /> Add New Endpoint
        </Button>
      </header>

      {/* API Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Endpoints', value: '12', icon: Terminal, color: 'text-primary' },
          { label: 'Global Latency', value: '420ms', icon: Activity, color: 'text-secondary' },
          { label: 'Uptime (30d)', value: '99.98%', icon: ShieldCheck, color: 'text-emerald-500' },
          { label: 'Active Keys', value: '4', icon: Lock, color: 'text-amber-500' }
        ].map((v) => (
          <Card key={v.label} className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={cn("p-3 rounded-2xl bg-background/50 border border-white/5 transition-transform group-hover:scale-110", v.color)}>
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">{v.value}</div>
                <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest leading-none">{v.label}</Text>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <CardTitle className="text-xl">Integrations Matrix</CardTitle>
            <CardDescription>Manage keys, endpoints, and data ingestion logic for all platform dependencies.</CardDescription>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search dependencies..." 
              className="pl-10 h-11 bg-background/50 border-white/10 rounded-xl text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Service Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Taxonomy</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Avg Latency</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Quota Usage</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAPIs.filter(api => api.name.toLowerCase().includes(search.toLowerCase())).map((api) => (
                <TableRow key={api.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-8">
                    <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">{api.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase border-white/10 bg-black/20 px-2 h-5">
                      {api.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs font-bold text-muted-foreground">{api.latency}</TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-primary">{api.usage}</span>
                      <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: api.usage }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border-none px-2 h-5",
                        api.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      )}>{api.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary" onClick={() => handleTest(api.name)}><RefreshCw className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary"><Settings2 className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Zap className="h-32 w-32 text-primary rotate-12" />
          </div>
          <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            <ShieldCheck className="h-4 w-4" /> Security Node
          </div>
          <Text variant="body" className="text-foreground/90 leading-relaxed font-medium italic border-l-2 border-primary/20 pl-6 py-2">
            "The **Claude 3.5** handshake is currently utilizing an encrypted proxy layer to ensure zero-leakage of our proprietary pSEO taxonomy logic."
          </Text>
        </Card>

        <div className="p-10 rounded-[3rem] bg-card/30 border border-white/5 flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-muted text-muted-foreground">
              <Info className="h-6 w-6" />
            </div>
            <Text variant="h3" className="font-bold">Integration Policy</Text>
          </div>
          <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
            All third-party data nodes must undergo a **Handshake Validation** cycle before being committed to the production discovery feed. Quota monitoring is enforced at the kernel level.
          </Text>
          <Button variant="link" className="p-0 h-auto text-primary font-bold text-[10px] uppercase w-fit group">
            Review API Documentation <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
