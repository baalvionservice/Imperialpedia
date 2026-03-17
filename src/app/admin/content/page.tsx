'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, Clock, 
  ChevronRight, ArrowRight, Layers, User, Loader2, CheckCircle2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { adminService } from '@/services/mock-api/admin';
import { AdminArticle, EditorialStatus } from '@/types/admin';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function ContentEmpire() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      const res = await adminService.getArticles();
      setArticles(res.data);
      setLoading(false);
    }
    loadData();
  }, []);

  const getStatusColor = (status: EditorialStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'Draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  const handleDelete = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    toast({ title: "Node Purged", description: "Article has been removed from the index.", variant: "destructive" });
  };

  if (loading) return <div className="py-40 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

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
        <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95">
          <Plus className="mr-2 h-4 w-4" /> Provision New Node
        </Button>
      </header>

      {/* Toolbar */}
      <div className="bg-card/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search the 1M+ node index by title or expert..." 
            className="pl-12 bg-background/50 h-12 border-white/10 rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 bg-background/30 gap-2 font-bold text-xs">
            <Filter className="h-4 w-4 text-primary" /> Filter Segment
          </Button>
        </div>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Intelligence Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Expert Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Quality</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Lifecycle</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map((article) => (
                <TableRow key={article.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors truncate max-w-[300px]">{article.title}</span>
                      <span className="text-[9px] text-muted-foreground font-mono uppercase mt-1">ID: {article.id} • {article.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-secondary" />
                      <span className="text-xs font-medium">{article.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold font-mono text-primary">{article.qualityScore}%</span>
                      <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${article.qualityScore}%` }} /></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge className={cn("text-[8px] font-bold uppercase border-none px-2 h-5", getStatusColor(article.status))}>{article.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-secondary"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-destructive" onClick={() => handleDelete(article.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card border-none bg-primary/5 p-8 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 w-fit text-primary"><Layers className="h-6 w-6" /></div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-primary flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Approval Pipeline
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-2 leading-relaxed">
              Every intelligence node follows our mandatory audit handshake: Draft → Review → Compliance → chief Editor → Published.
            </Text>
          </div>
        </Card>

        <Card className="glass-card border-none bg-secondary/5 p-8 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-secondary/10 w-fit text-secondary"><Clock className="h-6 w-6" /></div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-secondary flex items-center gap-2">
              <Clock className="h-4 w-4" /> Global Scheduling
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-2 leading-relaxed">
              Manage multi-region release cycles. Target specific discovery peak hours in New York, London, and Singapore clusters.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
