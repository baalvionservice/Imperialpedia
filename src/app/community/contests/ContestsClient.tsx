'use client';

import React, { useState } from 'react';
import { CommunityData } from '@/types/community';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Filter
} from 'lucide-react';
import { PollCard } from '@/modules/content-engine/components/PollCard';
import { ContestCard } from '@/modules/community/components/ContestCard';
import { Input } from '@/components/ui/input';

interface ContestsClientProps {
  data: CommunityData;
}

/**
 * Interactive hub for community forecasts and prediction contests.
 */
export function ContestsClient({ data }: ContestsClientProps) {
  const [activeTab, setActiveTab] = useState('contests');
  const [search, setSearch] = useState('');

  const ongoingContests = data.predictionContests.filter(c => c.status === 'ongoing');
  const upcomingContests = data.predictionContests.filter(c => c.status === 'upcoming');
  const closedContests = data.predictionContests.filter(c => c.status === 'closed');

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Target className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Crowdsourced Intelligence</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Polls & Contests</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Challenge the markets. Participate in community-led forecasts and earn reputation nodes.
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

      {/* Strategic Hero */}
      <Card className="glass-card border-none bg-primary/5 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Trophy className="h-64 w-64 text-primary" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="w-20 h-20 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-2xl shrink-0">
            <Sparkles className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <Badge className="bg-primary text-white border-none font-bold uppercase text-[9px] h-5 px-2">Q1 Championship</Badge>
              <Text variant="label" className="text-muted-foreground">Expert League</Text>
            </div>
            <Text variant="h2" className="text-2xl font-bold tracking-tight">March Market Madness active</Text>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed max-w-2xl">
              Predict the weekly winners across 12 taxonomies to climb the global leaderboard. Top 3 participants this cycle will receive the "Grand Oracle" immutable badge.
            </Text>
          </div>
          <Button size="lg" className="h-14 px-10 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 shrink-0">
            Enter Championship
          </Button>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 gap-4">
          <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-2xl">
            <TabsTrigger value="contests" className="px-8 gap-2 rounded-xl font-bold text-sm data-[state=active]:bg-primary">
              <Trophy className="h-4 w-4" /> Contests ({data.predictionContests.length})
            </TabsTrigger>
            <TabsTrigger value="polls" className="px-8 gap-2 rounded-xl font-bold text-sm data-[state=active]:bg-primary">
              <Activity className="h-4 w-4" /> Global Polls ({data.polls.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> {ongoingContests.length} Live</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> {upcomingContests.length} Planned</div>
          </div>
        </div>

        {/* CONTESTS TAB */}
        <TabsContent value="contests" className="mt-0 space-y-12 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <Flame className="h-5 w-5 text-amber-500" />
              <Text variant="h4" className="font-bold">Ongoing Challenges</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingContests.map(contest => (
                <ContestCard key={contest.id} contest={contest} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2 text-muted-foreground">
                <Layers className="h-5 w-5" />
                <Text variant="h4" className="font-bold">Upcoming Matrix</Text>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {upcomingContests.map(contest => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2 text-muted-foreground">
                <ChevronRight className="h-5 w-5" />
                <Text variant="h4" className="font-bold">Archived Decisions</Text>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {closedContests.map(contest => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* POLLS TAB */}
        <TabsContent value="polls" className="mt-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.polls.map(poll => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
          
          <div className="mt-16 p-12 rounded-[3rem] border-2 border-dashed border-white/5 text-center space-y-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-muted/20 flex items-center justify-center mx-auto">
              <Users className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div>
              <Text variant="h3" className="font-bold">Have a custom forecast?</Text>
              <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto mt-2">
                Verified experts can propose platform-wide polls to gauge institutional sentiment.
              </Text>
            </div>
            <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-bold h-12 px-8">
              Propose Forecast Node
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Global Meta Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Precision Rewards</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Forecasting precision is a primary weight in the **Reputation Node** algorithm. High-precision users receive 2.4x discovery reach.
            </Text>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-secondary/10 text-secondary shrink-0">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Real-time Settlement</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Contest points are settled immediately upon verified market data handshake. All decisions are finalized via the platform audit trail.
            </Text>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Expert Verification</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">
              Participation in contests is open to all tiers, but the "Grand Oracle" badge requires a verified institutional or independent expert profile.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
