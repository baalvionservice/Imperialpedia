'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  CheckCircle2, 
  Clock,
  Filter,
  ArrowRight,
  MoreVertical,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function ContentManagementPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Mock Content Matrix
  const [content, setContent] = useState([
    { id: 'art-1', title: "Yield Curve Dynamics 2026", author: "Eleanor Vance", category: "Economics", status: "Published", date: "2026-03-15", seoScore: 92 },
    { id: 'art-2', title: "DeFi Liquidity Audit", author: "Sarah Crypto", category: "Web3", status: "Review", date: "2026-03-14", seoScore: 88 },
    { id: 'art-3', title: "Inflation Hedging Strategies", author: "Julian Wealth", category: "Investing", status: "Draft", date: "2026-03-12", seoScore: 74 },
    { id: 'art-4', title: "The Future of Central Banking", author: "Market Maven", category: "Economics", status: "Published", date: "2026-03-10", seoScore: 95 },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleDelete = (id: string) => {
    setContent(prev => prev.filter(item => item.id !== id));
    toast({ title: "Node Purged", description: "Intelligence node has been removed from the index.", variant: "destructive" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published': return <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[9px] uppercase">Published</Badge>;
      case 'Review': return <Badge className="bg-amber-500/10 text-amber-500 border-none font-bold text-[9px] uppercase animate-pulse">In Review</Badge>;
      default: return <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[9px] uppercase">Draft</Badge>;
    }
  };

  const filtered = content.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Layers className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Index Governance</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Content Empire</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 bg-card/30 h-11 px-6">
            <Calendar className="mr-2 h-4 w-4 text-primary" /> Scheduling
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95">
            <Plus className="mr-2 h-4 w-4" /> Provision Node
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-card/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search the 1M+ node index..." 
            className="pl-12 bg-background/50 h-12 border-white/10 rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10 bg-background/30"><Filter className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10 bg-background/30"><MoreVertical className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Intelligence Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Expert Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">SEO Score</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <Text variant="caption" className="mt-4 block animate-pulse font-bold tracking-widest uppercase">Indexing Content Matrix...</Text>
                  </TableCell>
                </TableRow>
              ) : filtered.map((item) => (
                <TableRow key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors truncate max-w-[300px] block">{item.title}</span>
                      <span className="text-[9px] text-muted-foreground font-mono uppercase mt-1">ID: {item.id} • {item.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[10px] uppercase">{item.author.charAt(0)}</div>
                      <span className="text-xs font-medium">{item.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-primary">{item.seoScore}%</span>
                      <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${item.seoScore}%` }} /></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Strategic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-none bg-primary/5 p-8 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <ShieldCheck className="h-24 w-24 text-primary" />
          </div>
          <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-widest">
            <CheckCircle2 className="h-4 w-4" /> Approval Pipeline
          </div>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            Every research node requires a human audit before being committed to the public index. Content from **Verified Experts** receives 4-hour review priority.
          </Text>
        </Card>

        <Card className="glass-card border-none bg-secondary/5 p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-secondary font-bold text-xs uppercase tracking-widest">
            <Clock className="h-4 w-4" /> Global Scheduling
          </div>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            Manage multi-region release cycles. Target specific discovery peak hours in New York, London, and Singapore clusters.
          </Text>
          <Button variant="link" className="p-0 h-auto text-secondary text-xs font-bold w-fit group">
            View Regional Calendar <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}