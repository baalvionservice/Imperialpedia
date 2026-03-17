'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Sparkles, Zap, Search, Target, Layout, 
  ArrowRight, Loader2, RefreshCw, Send, Settings2,
  CheckCircle2, Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function AIContentLab() {
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('draft');

  const handleGenerate = async () => {
    setGenerating(true);
    toast({ title: "Synthesis Initiated", description: "Analyst Kernel v4.2 is traversing global news clusters..." });
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    toast({ title: "Draft Synchronized", description: "AI intelligence node ready for human audit." });
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Brain className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Intelligence Synthesis</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">AI Content Lab</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 bg-card/30 h-11 px-6">
            <Settings2 className="mr-2 h-4 w-4 text-primary" /> Kernel Config
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95"
          >
            {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Strategy Draft
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8">
              <div className="flex items-center justify-between">
                <CardTitle>Drafting Matrix</CardTitle>
                <div className="flex bg-background/50 border border-white/5 p-1 rounded-xl h-10">
                  {['Research', 'News Summary', 'FAQ Gen'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t.toLowerCase())}
                      className={cn(
                        "px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        activeTab === t.toLowerCase() ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-4">
                <Text variant="h3" className="font-bold text-2xl">Proposed Node: Analyzing the Q2 Bond Yield Divergence</Text>
                <div className="flex flex-wrap gap-2">
                  {['Macro', 'Bonds', 'Fed', 'Liquidity'].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] px-3 h-6">#{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-background/50 border border-white/5 space-y-6 italic text-foreground/80 leading-relaxed">
                <p>"As we traverse into the second fiscal cycle of 2026, the structural decoupling between short-term treasury nodes and long-tail inflation expectations has reached a critical threshold..."</p>
                <p>"The analyst engine suggests focusing on the **Institutional Liquidity Buffer** as the primary driver for this divergence. Cross-linking to the 'Yield Curve Inversion' glossary node is recommended for optimal pSEO discoverability..."</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest">SEO Score</Text>
                    <span className="text-sm font-mono font-bold text-emerald-500">92/100</span>
                  </div>
                  <Progress value={92} className="h-1 bg-white/5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest">Readability</Text>
                    <span className="text-sm font-mono font-bold text-primary">Master Tier</span>
                  </div>
                  <Progress value={85} className="h-1 bg-white/5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <Text variant="label" className="text-[9px] opacity-50 uppercase font-bold tracking-widest">Link Depth</Text>
                    <span className="text-sm font-mono font-bold text-secondary">8 Nodes</span>
                  </div>
                  <Progress value={60} className="h-1 bg-white/5" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 bg-muted/10 border-t border-white/5 flex justify-end gap-3">
              <Button variant="ghost" className="rounded-xl h-11 px-6 font-bold text-xs uppercase">Discard</Button>
              <Button className="rounded-xl h-11 px-10 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Commit to Editorial Queue <ArrowRight size={14} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* AI Control Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Target className="h-4 w-4" /> Discovery Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Keyword Gap Analysis', status: 'Running', color: 'text-emerald-500' },
                { label: 'Sentiment Pulse Crawl', status: 'Active', color: 'text-primary' },
                { label: 'Competitor Triage', status: 'Standby', color: 'text-muted-foreground' }
              ].map(job => (
                <div key={job.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <Text variant="bodySmall" weight="bold">{job.label}</Text>
                  <Badge variant="outline" className={cn("text-[8px] font-bold uppercase", job.color.replace('text-', 'bg-').replace('text-', 'border-').replace('500', '500/10'))}>
                    {job.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] bg-secondary/5 border border-secondary/20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center text-secondary mx-auto shadow-2xl">
              <RefreshCw className="h-8 w-8" />
            </div>
            <Text variant="bodySmall" weight="bold">Intelligence Feed Sync</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed block">
              Auditing **Claude 3.5 Sonnet** against trailing 24h market wires. Discovery state is nominal.
            </Text>
            <Button variant="outline" className="w-full h-11 rounded-xl border-secondary/20 text-secondary font-bold text-xs uppercase">
              Force Handshake
            </Button>
          </div>

          <Card className="glass-card border-none bg-background/30 p-8 flex items-start gap-4">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
              "AI-generated nodes are automatically subjected to human fact-check triage before entering the 'Compliance' status node."
            </Text>
          </Card>
        </aside>
      </div>
    </div>
  );
}
