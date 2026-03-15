'use client';

import React, { useState } from 'react';
import { generateAutomatedRecap, AutomatedRecapOutput } from '@/ai/flows/automated-recap-flow';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  History, 
  Loader2, 
  Search, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Target,
  MessageSquare,
  Globe,
  PieChart
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/**
 * AI Automated Recap Dashboard.
 * Specialized tool for generating structured market summaries over custom periods.
 */
export default function AutomatedRecapPage() {
  const [subject, setSubject] = useState('');
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AutomatedRecapOutput | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setLoading(true);
    setResult(null);
    
    try {
      const output = await generateAutomatedRecap({ subject, period });
      setResult(output);
      toast({
        title: "Intelligence Recapped",
        description: `Your ${period}ly summary for ${subject.toUpperCase()} is ready.`,
      });
    } catch (error) {
      console.error('AI Recap Engine failure', error);
      toast({
        variant: "destructive",
        title: "Generation Exception",
        description: "The AI engine encountered an error while synthesizing the periodic recap.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20 pt-12">
      <Container>
        <header className="mb-12 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <History className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Chronological Intelligence Node</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Automated Recap</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Synthesize the market cycle. Generate concise, high-fidelity recaps of market performance, news events, and social sentiment over any period.
          </Text>
        </header>

        <div className="max-w-3xl mx-auto mb-16">
          <Card className="glass-card shadow-2xl border-white/10 overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 space-y-2">
                    <Text variant="label" className="text-[10px] opacity-50 ml-1">Period</Text>
                    <Select value={period} onValueChange={(val: any) => setPeriod(val)}>
                      <SelectTrigger className="h-12 bg-background/50 border-white/5 rounded-xl">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Day">Daily Snapshot</SelectItem>
                        <SelectItem value="Week">Weekly Retrospective</SelectItem>
                        <SelectItem value="Month">Monthly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-8 space-y-2">
                    <Text variant="label" className="text-[10px] opacity-50 ml-1">Subject</Text>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="Asset, sector, or portfolio name..." 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="h-12 pl-12 bg-background/50 border-white/10 rounded-xl font-bold"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  type="submit" 
                  disabled={loading || !subject.trim()} 
                  className="w-full h-14 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all scale-[1.01] active:scale-100"
                >
                  {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
                  {loading ? 'Synthesizing Intelligence...' : `Generate ${period}ly Recap`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {loading && !result && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 relative">
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 animate-ping opacity-20" />
              <History className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <Text variant="h3" className="font-bold mb-2">Aggregating Chronological Matrix</Text>
            <Text variant="bodySmall" className="text-muted-foreground text-center max-w-sm">
              Analyzing price action, news buffers, and sentiment trends for the requested {period.toLowerCase()}ly window...
            </Text>
          </div>
        )}

        {result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Overview Hero */}
            <Card className="glass-card border-none bg-primary/5 shadow-xl">
              <CardContent className="p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <PieChart className="h-10 w-10" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <Badge className="bg-primary text-white border-none font-bold uppercase tracking-widest text-[10px]">
                      {period}ly Recap
                    </Badge>
                    <Text variant="label" className="text-muted-foreground">{subject.toUpperCase()}</Text>
                  </div>
                  <Text variant="h2" className="text-2xl font-bold italic leading-relaxed">
                    "{result.overview}"
                  </Text>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Movements & Events */}
              <div className="lg:col-span-8 space-y-8">
                {/* Key Movements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <Text variant="h4" className="font-bold">Significant Movements</Text>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {result.key_movements.map((move, i) => (
                      <Card key={i} className="glass-card border-white/5 bg-background/40 hover:border-primary/30 transition-colors">
                        <CardContent className="p-5 flex justify-between items-center">
                          <Text variant="bodySmall" weight="bold">{move.asset}</Text>
                          <Badge className={cn(
                            "font-mono font-bold text-xs",
                            move.change.includes('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                          )}>
                            {move.change}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Notable Events */}
                <Card className="glass-card border-none shadow-2xl overflow-hidden">
                  <CardHeader className="bg-card/30 border-b border-white/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" /> Notable System Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {result.notable_events.map((event, i) => (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                        <Text variant="bodySmall" className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {event}
                        </Text>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Sentiment & Recommendations */}
              <div className="lg:col-span-4 space-y-8">
                {/* Confidence Meter */}
                <Card className="glass-card border-none shadow-xl bg-card/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recap Reliability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-end mb-1">
                      <div className="text-4xl font-bold text-primary">{result.confidence_score}%</div>
                      <Text variant="label" className="text-[10px] opacity-50">Audit Conf.</Text>
                    </div>
                    <Progress value={result.confidence_score} className="h-1.5 bg-white/5" />
                  </CardContent>
                </Card>

                {/* Sentiment Recap */}
                <Card className="glass-card border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-white/5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" /> Sentiment Recap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-500 tracking-tighter">Positive</div>
                      <Text variant="caption" className="text-muted-foreground italic leading-relaxed">"{result.social_sentiment_recap.positive}"</Text>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold uppercase text-destructive tracking-tighter">Negative</div>
                      <Text variant="caption" className="text-muted-foreground italic leading-relaxed">"{result.social_sentiment_recap.negative}"</Text>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold uppercase text-secondary tracking-tighter">Neutral</div>
                      <Text variant="caption" className="text-muted-foreground italic leading-relaxed">"{result.social_sentiment_recap.neutral}"</Text>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="glass-card border-none shadow-2xl bg-primary/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Target className="h-16 w-16 text-primary" />
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Strategic Directives
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.ai_recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="mt-1 w-4 h-4 rounded bg-primary/20 flex items-center justify-center text-primary shrink-0">
                          <ArrowRight className="h-2.5 w-2.5" />
                        </div>
                        <Text variant="caption" className="font-bold leading-relaxed">{rec}</Text>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-8 rounded-[3rem] border border-secondary/20 bg-secondary/5 text-center space-y-4">
                  <Text variant="label" className="text-secondary font-bold">Deep Dive suite</Text>
                  <Text variant="h4" className="font-bold">Investigate Specifics?</Text>
                  <Text variant="bodySmall" className="text-muted-foreground leading-relaxed block">
                    Use our Catalyst or Risk scanners for granular asset auditing.
                  </Text>
                  <Button variant="link" className="text-secondary font-bold text-xs" asChild>
                    <a href="/ai-analyst/catalyst-detection">Explore Full Suite <ArrowRight className="ml-1 h-3 w-3" /></a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
