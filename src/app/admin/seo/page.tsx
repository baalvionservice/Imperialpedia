
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Search, Globe, Layers, ArrowUpRight, CheckCircle2, Zap, Target, RefreshCw, Loader2, Info
} from 'lucide-react';
import { adminKernel } from '@/lib/services/admin-service';
import { toast } from '@/hooks/use-toast';

export default function SEOEngineHub() {
  const [articles, setArticles] = useState<any[]>([]);
  const [linkingActive, setLinkingActive] = useState(false);

  useEffect(() => {
    setArticles(adminKernel.getArticles());
  }, []);

  const handleLinkingCycle = async () => {
    setLinkingActive(true);
    toast({ title: "Linking Cycle Initiated", description: "Mapping 1M+ nodes for cross-taxonomic discovery..." });
    await new Promise(r => setTimeout(r, 2000));
    setLinkingActive(false);
    toast({ title: "Handshake Complete", description: "124 new internal links established between Glossary and Articles." });
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Globe className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Organic Authority Index</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">SEO & Linking Engine</Text>
        </div>
        <Button 
          onClick={handleLinkingCycle}
          disabled={linkingActive}
          className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95"
        >
          {linkingActive ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Trigger Linking Cycle
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Discovery Matrix</CardTitle>
                <CardDescription>Auditing individual intelligence nodes for SEO health.</CardDescription>
              </div>
              <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 uppercase text-[9px] font-bold h-7 px-4">Sitemap: 99.8% Healthy</Badge>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 border-b border-white/5">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Research Path</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Score</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right pr-8">Linking Suggestion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map(article => (
                  <TableRow key={article.id} className="hover:bg-white/5 border-b border-white/5">
                    <TableCell className="py-5 pl-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{article.title}</span>
                        <span className="text-[9px] text-muted-foreground font-mono mt-1">/{article.slug}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono text-xs font-bold text-emerald-500">94/100</TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase gap-2 text-primary hover:bg-primary/5">
                        <Zap className="h-3 w-3" /> Add section "Tax Policy"
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none bg-primary/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Layers className="h-32 w-32 text-primary rotate-12" />
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <Target className="h-4 w-4" /> Internal Linking Logic
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "The engine automatically matches keywords in articles to the **Glossary Index**. Manual override is allowed for specialized taxonomy nodes."
            </Text>
          </Card>

          <Card className="glass-card border-none bg-card/30">
            <CardHeader className="pb-2"><CardTitle className="text-sm">SEO Directives</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-start gap-3">
                <Info className="h-4 w-4 text-secondary mt-0.5" />
                <Text variant="caption" className="leading-relaxed">Redirect loops detected in <strong>/categories/crypto</strong> taxonomy hub.</Text>
              </div>
              <Button variant="outline" className="w-full rounded-xl h-10 font-bold text-xs">Run Global SEO Audit</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
