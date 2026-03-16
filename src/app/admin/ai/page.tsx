'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Brain, 
  Zap, 
  Sparkles, 
  Loader2, 
  Search, 
  CheckCircle2, 
  Target,
  FileText,
  Terminal,
  RefreshCw,
  Plus,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  ChevronRight,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function AIOrchestrationPage() {
  const [generating, setGenerating] = useState(false);
  const [activeModel, setActiveModel] = useState('Claude 3.5 Sonnet');

  const handleGenerate = async () => {
    setGenerating(true);
    toast({ title: "Synthesis Initiated", description: "Claude is traversing the global market wire for breaking updates..." });
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    toast({ title: "Draft Synchronized", description: "Algorithmic research node ready for audit." });
  };

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Brain className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Intelligence Orchestration</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">AI Workspace</Text>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-white/10 bg-card/30 h-11">
            <Terminal className="mr-2 h-4 w-4 text-primary" /> Model Registry
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95"
          >
            {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Intelligence
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Algorithmic Draft Queue</CardTitle>
                <CardDescription>Review and refine automatically generated research nodes.</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] uppercase font-bold h-6">Priority Ingestion</Badge>
              </div>
            </CardHeader>
            <div className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { topic: "The Impact of QT on Tech Multiples", model: "Claude 3.5", score: 94, status: "Ready" },
                  { topic: "Yield Curve Inversion: A 50-Year Audit", model: "Gemini 1.5 Pro", score: 88, status: "Reviewing" },
                  { topic: "DeFi Liquidity Hub Adoption", model: "Claude 3.5", score: 91, status: "Ready" }
                ].map((item, i) => (
                  <div key={i} className="p-6 hover:bg-white/5 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-2xl bg-background/50 border border-white/5 text-muted-foreground group-hover:text-primary transition-all">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <Text variant="body" weight="bold" className="group-hover:text-primary transition-colors">{item.topic}</Text>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                          <span>{item.model}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-emerald-500">{item.score}% SEO Score</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border-none px-2 h-5",
                        item.status === 'Ready' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      )}>{item.status}</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CardFooter className="p-4 bg-muted/10 border-t border-white/5 justify-center">
              <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                Explore Full Ingestion Matrix
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card border-none bg-primary/5 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Zap className="h-24 w-24 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                <TrendingUp className="h-4 w-4" /> Growth Directives
              </div>
              <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
                "AI suggests expanding into the **'Carbon Credits'** taxonomy. Discovery volume for related nodes has spiked by 450% this cycle."
              </Text>
            </Card>

            <Card className="glass-card border-none bg-secondary/5 p-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                <Cpu className="h-4 w-4" /> Compute Vitals
              </div>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-bold uppercase"><span>Token Efficiency</span><span>92%</span></div>
                  <Progress value={92} className="h-1 bg-white/5" />
                </div>
                <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground">
                  <span>Inference Latency</span>
                  <span className="text-foreground">420ms</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Controls */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Fact-Check Precision', value: '99.8%' },
                { label: 'SEO Authority Alignment', value: '82%' },
                { label: 'Ingestion Success', value: '100%' },
                { label: 'Instructional Fidelity', value: '94%' }
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0">
                  <Text variant="label" className="text-[10px] opacity-50 uppercase font-bold">{stat.label}</Text>
                  <span className="text-sm font-mono font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] bg-secondary/5 border border-secondary/20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center text-secondary mx-auto shadow-2xl">
              <RefreshCw className="h-8 w-8" />
            </div>
            <Text variant="bodySmall" weight="bold">Model Benchmarking</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed block">
              Auditing **Claude 3.5 Sonnet** against institutional ethics nodes. Integrity state is synchronized.
            </Text>
            <Button variant="outline" className="w-full h-11 rounded-xl border-secondary/20 text-secondary font-bold text-xs uppercase">
              Switch Provider
            </Button>
          </div>

          <Card className="glass-card border-none bg-background/30 p-8 flex items-start gap-4">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
              "Every AI-generated node is cryptographically signed and archived in the immutable governance ledger."
            </Text>
          </Card>
        </aside>
      </div>
    </div>
  );
}