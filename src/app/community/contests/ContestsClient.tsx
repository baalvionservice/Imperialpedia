'use client';

import React, { useState } from 'react';
import { CommunityData } from '@/types/community';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  Target, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Users,
  Search,
  Zap,
  Layers,
  Flame,
  Filter,
  History,
  Lock,
  PieChart,
  CalendarDays
} from 'lucide-react';
import { PollCard } from '@/modules/content-engine/components/PollCard';
import { ContestCard } from '@/modules/community/components/ContestCard';
import { Input } from '@/components/ui/input';

interface ContestsClientProps {
  data: CommunityData;
}

/**
 * Enhanced Hub for community forecasts and prediction contests.
 * Refined for Prompt 38 with sub-categorization and visual telemetry.
 */
export function ContestsClient({ data }: ContestsClientProps) {
  const [activeTab, setActiveTab] = useState('contests');
  const [search, setSearch] = useState('');

  const ongoingContests = data.predictionContests.filter(c => c.status === 'ongoing');
  const upcomingContests = data.predictionContests.filter(c => c.status === 'upcoming');
  const closedContests = data.predictionContests.filter(c => c.status === 'closed');

  const activePolls = data.polls.filter(p => p.status === 'active');
  const closedPolls = data.polls.filter(p => p.status === 'closed');

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Target className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Crowdsourced Intelligence Hub</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Polls & Contests</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1 text-base max-w-xl leading-relaxed">
            Challenge the markets. Participate in community-led forecasts and earn reputation nodes via the precision algorithm.
          </Text>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search challenges..." 
              className="pl-10 h-11 w-64 bg-card/30 border-white/10 rounded-xl" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-white/10 bg-card/30">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Strategic Hero - Championship Highlight */}
      <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Trophy className="h-64 w-64 text-primary" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="w-20 h-20 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-2xl shrink-0">
            <Sparkles className="h-10 w-10 animate-pulse" />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <Badge className="bg-primary text-white border-none font-bold uppercase text-[9px] h-5 px-3">Season 4 Championship</Badge>
              <Text variant="label" className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Expert League</Text>
            </div>
            <Text variant="h2" className="text-2xl lg:text-3xl font-bold tracking-tight">March Market Madness is LIVE</Text>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed max-w-2xl text-base">
              Predict the weekly winners across 12 taxonomies. Top 3 participants this cycle receive the **"Grand Oracle"** immutable badge and 1,000 Reputation Nodes.
            </Text>
          </div>
          <Button size="lg" className="h-14 px-10 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 shrink-0 group">
            Enter Arena <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 gap-4">
          <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-2xl">
            <TabsTrigger value="contests" className="px-8 gap-2 rounded-xl font-bold text-sm data-[state=active]:bg-primary">
              <Trophy className="h-4 w-4" /> Prediction Contests
            </TabsTrigger>
            <TabsTrigger value="polls" className="px-8 gap-2 rounded-xl font-bold text-sm data-[state=active]:bg-primary">
              <Activity className="h-4 w-4" /> Global Polls
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> {ongoingContests.length + activePolls.length} Active Nodes</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> {upcomingContests.length} Planned</div>
          </div>
        </div>

        {/* CONTESTS TAB */}
        <TabsContent value="contests" className="mt-0 space-y-16 animate-in fade-in duration-500">
          {/* Ongoing Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <Text variant="h4" className="font-bold">Ongoing Challenges</Text>
                  <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold text-[9px]">Live Decision Loops</Text>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold text-xs group">
                Full Matrix <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingContests.map(contest => (
                <ContestCard key={contest.id} contest={contest} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upcoming Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 px-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <Text variant="h4" className="font-bold">Upcoming Matrix</Text>
                  <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold text-[9px]">Future Forecast Nodes</Text>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {upcomingContests.map(contest => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </div>

            {/* Closed Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 px-2">
                <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                  <History className="h-5 w-5" />
                </div>
                <div>
                  <Text variant="h4" className="font-bold">Settled Contests</Text>
                  <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold text-[9px]">Historical Verdicts</Text>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 opacity-70">
                {closedContests.map(contest => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* POLLS TAB */}
        <TabsContent value="polls" className="mt-0 space-y-16 animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <Text variant="h4" className="font-bold">Active Sentiment Polls</Text>
                <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold text-[9px]">Real-time Opinion Mining</Text>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePolls.map(poll => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <Text variant="h4" className="font-bold">Closed Forecasts</Text>
                <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold text-[9px]">Final Data Handshakes</Text>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grayscale">
              {closedPolls.map(poll => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="p-12 rounded-[3.5rem] bg-secondary/5 border-2 border-dashed border-secondary/20 text-center space-y-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-secondary/10 flex items-center justify-center mx-auto shadow-xl">
              <Users className="h-10 w-10 text-secondary" />
            </div>
            <div className="max-w-xl mx-auto">
              <Text variant="h3" className="font-bold">Propose a Sentiment Node?</Text>
              <Text variant="bodySmall" className="text-muted-foreground mt-2 text-base leading-relaxed">
                Verified independent experts and institutional analysts can propose platform-wide polls to gauge market psychology and discover diverging trends.
              </Text>
            </div>
            <Button variant="outline" className="rounded-2xl border-secondary/30 text-secondary hover:bg-secondary/10 font-bold h-14 px-10 transition-all scale-105 active:scale-95">
              Submit Forecast Proposal
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analytical Meta Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        <Card className="glass-card p-8 space-y-4 border-none shadow-xl bg-card/30">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-primary uppercase tracking-widest text-[10px]">Precision Weighting</Text>
            <Text variant="h4" className="mt-1 mb-2 font-bold text-lg">Forecasting ROI</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Historical precision is a primary weight in the **Reputation Node** algorithm. High-fidelity oracles receive a 2.4x discovery reach multiplier.
            </Text>
          </div>
        </Card>
        
        <Card className="glass-card p-8 space-y-4 border-none shadow-xl bg-card/30">
          <div className="p-3 rounded-2xl bg-secondary/10 text-secondary w-fit">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-secondary uppercase tracking-widest text-[10px]">Automatic Settlement</Text>
            <Text variant="h4" className="mt-1 mb-2 font-bold text-lg">Immutable Verdicts</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Contest points are settled immediately via the **Data Handshake** with verified market wires. All decisions are finalized in the system audit trail.
            </Text>
          </div>
        </Card>

        <Card className="glass-card p-8 space-y-4 border-none shadow-xl bg-card/30">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit">
            <PieChart className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-emerald-500 uppercase tracking-widest text-[10px]">Syndicated Sentiment</Text>
            <Text variant="h4" className="mt-1 mb-2 font-bold text-lg">Retail Pulse Node</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Aggregated community votes are fed into the **AI Sentiment Pulse** engine to identify Divergence Signals between retail and institutional nodes.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
