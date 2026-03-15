'use client';

import React, { useState } from 'react';
import { explainTrend, TrendExplanationOutput } from '@/ai/flows/trend-explanation-flow';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Loader2, 
  Search, 
  Sparkles, 
  Zap, 
  Info,
  ArrowRight,
  BarChart3,
  Target,
  Minus,
  Globe
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/**
 * AI Trend Explanation Dashboard.
 * Specialized tool for analyzing and interpreting market trends across assets and sectors.
 */
export default function TrendExplanationPage() {
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrendExplanationOutput | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setLoading(true);
    setResult(null);
    
    try {
      const output = await explainTrend({ subject });
      setResult(output);
      toast({
        title: "Trend Intelligence Ready",
        description: `Analysis for ${subject.toUpperCase()} is complete.`,
      });
    } catch (error) {
      console.error('AI Trend Engine failure', error);
      toast({
        variant: "destructive",
        title: "Audit Exception",
        description: "The AI engine failed to synthesize the requested trend intelligence.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case 'Bullish':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold uppercase text-[10px] px-3 h-6">Bullish</Badge>;
      case 'Bearish':
        return <Badge variant="destructive" className="font-bold uppercase text-[10px] px-3 h-6">Bearish</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground border-white/10 text-[10px] font-bold uppercase px-3 h-6">Neutral</Badge>;
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Bullish': return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case 'Bearish': return <TrendingDown className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20 pt-12">
      <Container>
        <header className="mb-12 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Activity className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Trend Synthesis Node</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Trend Explainer</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Deconstruct the market cycle. Get structured explanations of trends, identifying their drivers, directional weight, and expected performance impacts.
          </Text>
        </header>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="glass-card shadow-2xl border-primary/20 overflow-hidden">
            <CardContent className="p-6">
              <form onSubmit={handleGenerate} className="flex gap-3">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Enter asset or sector (e.g. AI Stocks, BTC)..." 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-14 pl-12 bg-background/50 border-white/10 rounded-2xl text-lg focus:ring-primary/40 focus:border-primary"
                    disabled={loading}
                  />
                </div>
                <Button 
                  size="lg" 
                  type="submit" 
                  disabled={loading || !subject.trim()} 
                  className="h-14 px-8 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all scale-[1.02] active:scale-100"
                >
                  {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
                  {loading ? 'Synthesizing...' : 'Explain Trend'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {loading && !result && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 relative">
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 animate-ping opacity-20" />
              <Activity className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <Text variant="h3" className="font-bold mb-2 text-primary">Auditing Market Cycles</Text>
            <Text variant="bodySmall" className="text-muted-foreground text-center max-w-sm">
              Analyzing historical trajectory, momentum benchmarks, and driver density for {subject.toUpperCase()}...
            </Text>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Overview & Drivers */}
              <div className="lg:col-span-8 space-y-8">
                <Card className="glass-card border-none shadow-2xl overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-primary text-white border-none px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
                        Trend Intelligence
                      </Badge>
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
                        <Zap className="h-4 w-4" /> Momentum Feed Active
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold leading-tight">Trend Audit: {subject.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Text variant="body" className="text-lg leading-relaxed text-foreground/80 mb-10 pb-10 border-b border-white/5 italic">
                      "{result.overview}"
                    </Text>

                    <div className="space-y-8">
                      <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm uppercase tracking-widest">
                        <Globe className="h-4 w-4" /> Trajectory Drivers
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.key_drivers.map((driver, idx) => (
                          <div key={idx} className="p-5 rounded-2xl bg-background/40 border border-white/5 flex gap-4 items-start group hover:border-primary/30 transition-all">
                            <div className="mt-1 w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight className="h-3 w-3" />
                            </div>
                            <Text variant="bodySmall" className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                              {driver}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Impact & Metrics Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="glass-card border-none bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-widest">
                        <BarChart3 className="h-4 w-4" /> Quantitative Metric
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                        <Text variant="label" className="text-[10px] text-muted-foreground mb-1 block">{result.quantitative_metrics.metric_name}</Text>
                        <div className="flex items-end gap-3">
                          <span className="text-3xl font-bold">{result.quantitative_metrics.value}</span>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-mono font-bold text-xs h-6 px-2 mb-1">
                            {result.quantitative_metrics.change}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-none bg-secondary/5 border-secondary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary uppercase tracking-widest">
                        <Target className="h-4 w-4" /> Potential Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text variant="bodySmall" className="text-muted-foreground leading-relaxed font-medium italic">
                        "{result.potential_impact}"
                      </Text>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column: Direction & Confidence */}
              <div className="lg:col-span-4 space-y-8">
                <Card className="glass-card border-none shadow-xl bg-card/30 relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Strategic Conviction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-5 rounded-[2rem] bg-background/50 border border-white/5 shadow-2xl">
                        {getDirectionIcon(result.trend_direction)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 justify-center mb-1">
                          <Text variant="h3" className="font-bold">{result.trend_direction}</Text>
                          {getDirectionBadge(result.trend_direction)}
                        </div>
                        <Text variant="caption" className="text-muted-foreground uppercase tracking-widest text-[9px] font-bold">Consensus Trajectory</Text>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-end">
                        <Text variant="label" className="text-[10px] opacity-50">Audit Accuracy</Text>
                        <span className="text-2xl font-bold text-primary">{result.confidence_score}%</span>
                      </div>
                      <Progress value={result.confidence_score} className="h-2 bg-white/5" />
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase mb-2">
                        <Info className="h-3 w-3" /> Analysis Note
                      </div>
                      <Text variant="caption" className="italic text-muted-foreground leading-relaxed">
                        Momentum scores are derived from correlated sector growth and social discovery velocity.
                      </Text>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-8 rounded-[3rem] border border-secondary/20 bg-secondary/5 space-y-4 relative overflow-hidden group text-center">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-12 w-12 text-secondary" />
                  </div>
                  <Text variant="label" className="text-secondary font-bold uppercase tracking-widest">Adjacent Audit</Text>
                  <Text variant="h3" className="mb-4">Risk scanner</Text>
                  <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                    Identify hidden vulnerabilities that might derail this trend. Run a risk detection audit for {subject.toUpperCase()}.
                  </Text>
                  <Button variant="link" className="p-0 h-auto text-secondary font-bold text-xs group/btn" asChild>
                    <a href="/ai-analyst/risk-detection">
                      Launch Anomaly Scanner <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </a>
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
