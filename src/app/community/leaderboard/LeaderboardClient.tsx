'use client';

import React from 'react';
import { CommunityData, LeaderboardEntry } from '@/types/community';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ShieldCheck, 
  Zap, 
  Star, 
  Medal,
  ChevronRight,
  Info,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LeaderboardClientProps {
  data: CommunityData;
}

export function LeaderboardClient({ data }: LeaderboardClientProps) {
  const { userReputation, leaderboard } = data;

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Trophy className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Platform Meritocracy</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Community Leaderboard</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Recognizing the world's leading financial contributors and intelligence nodes.
          </Text>
        </div>
        <Tabs defaultValue="monthly" className="w-full md:w-auto">
          <TabsList className="bg-card/30 border border-white/5 p-1 h-11 rounded-xl">
            <TabsTrigger value="weekly" className="px-6 rounded-lg font-bold text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="px-6 rounded-lg font-bold text-xs">Monthly</TabsTrigger>
            <TabsTrigger value="all-time" className="px-6 rounded-lg font-bold text-xs">All-time</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal Stats & Badges */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none bg-primary/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Zap className="h-32 w-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Award className="h-4 w-4" /> My Authority Node
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary border border-primary/20">
                    {userReputation.level}
                  </div>
                  <Badge className="absolute -bottom-2 -right-2 bg-primary text-white text-[8px] font-bold h-5 px-1.5">LVL</Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-end">
                    <Text variant="body" weight="bold">{userReputation.reputationScore.toLocaleString()}</Text>
                    <Text variant="caption" className="text-muted-foreground">Next: 1,500</Text>
                  </div>
                  <Progress value={userReputation.nextLevelProgress} className="h-1.5 bg-white/5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background/40 border border-white/5 text-center">
                  <div className="text-xl font-bold">{userReputation.activityPoints}</div>
                  <Text variant="label" className="text-[8px] opacity-50 uppercase font-bold">Contribution Points</Text>
                </div>
                <div className="p-4 rounded-xl bg-background/40 border border-white/5 text-center">
                  <div className="text-xl font-bold">#142</div>
                  <Text variant="label" className="text-[8px] opacity-50 uppercase font-bold">Global Rank</Text>
                </div>
              </div>

              <div className="space-y-4">
                <Text variant="label" className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Active Badges</Text>
                <div className="space-y-3">
                  {userReputation.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 rounded-xl bg-background/20 border border-white/5 group hover:border-primary/30 transition-colors">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <Text variant="caption" weight="bold" className="block">{badge.name}</Text>
                        <Text variant="caption" className="text-[9px] text-muted-foreground line-clamp-1">{badge.description}</Text>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
                  View Full Gallery <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] border border-secondary/20 bg-secondary/5 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Star className="h-16 w-16 text-secondary" />
            </div>
            <Text variant="label" className="text-secondary font-bold uppercase">Badge Bounty</Text>
            <Text variant="h3" className="font-bold">Next Achievement</Text>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <Text variant="bodySmall" weight="bold">Community Pillar</Text>
                <Text variant="caption" className="text-muted-foreground">Reach 100 upvotes on a single node.</Text>
              </div>
            </div>
            <Progress value={42} className="h-1 bg-white/5" />
            <Text variant="caption" className="text-[9px] text-muted-foreground uppercase font-bold">42/100 Upvotes secured</Text>
          </div>
        </div>

        {/* Right Column: Podium & Table */}
        <div className="lg:col-span-8 space-y-8">
          {/* Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {topThree.map((entry, idx) => (
              <Card 
                key={entry.username} 
                className={cn(
                  "glass-card border-none relative overflow-hidden group hover:translate-y-[-4px] transition-all",
                  idx === 0 ? "md:scale-110 z-10 border-primary/20 shadow-2xl" : ""
                )}
              >
                {idx === 0 && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                )}
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative mx-auto w-20 h-20">
                    <Avatar className={cn(
                      "w-20 h-20 border-4",
                      idx === 0 ? "border-primary ring-4 ring-primary/10" : 
                      idx === 1 ? "border-zinc-400" : "border-amber-700"
                    )}>
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback>{entry.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                      idx === 0 ? "bg-primary text-white" : 
                      idx === 1 ? "bg-zinc-400 text-zinc-900" : "bg-amber-700 text-white"
                    )}>
                      <Medal className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <Text variant="body" weight="bold" className="group-hover:text-primary transition-colors">{entry.username}</Text>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {entry.badges.slice(0, 1).map(b => (
                        <Badge key={b} variant="secondary" className="bg-primary/5 text-primary border-none text-[8px] font-bold uppercase h-4 px-1.5">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="text-2xl font-bold tracking-tighter">{entry.reputationScore.toLocaleString()}</div>
                    <Text variant="label" className="text-[8px] opacity-50 uppercase font-bold">Reputation Nodes</Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full List */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                    <TableHead className="w-16 text-center font-bold text-[10px] uppercase tracking-widest py-4">Rank</TableHead>
                    <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">Contributor Node</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest">Achievements</TableHead>
                    <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest">Authority Score</TableHead>
                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Trajectory</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((entry) => (
                    <TableRow key={entry.username} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                      <TableCell className="text-center font-mono font-bold text-muted-foreground">
                        #{entry.rank}
                      </TableCell>
                      <TableCell className="py-5 pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-xl border border-white/10 group-hover:border-primary/30 transition-colors">
                            <AvatarImage src={entry.avatar} />
                            <AvatarFallback>{entry.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-bold">{entry.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {entry.badges.map(badge => (
                            <Badge key={badge} variant="outline" className="bg-background/50 border-white/10 text-[8px] font-bold uppercase h-4 px-1.5">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {entry.reputationScore.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end">
                          <div className={cn(
                            "p-1.5 rounded-lg bg-background/50 border border-white/5",
                            entry.trend === 'up' ? "text-emerald-500" : entry.trend === 'down' ? "text-destructive" : "text-muted-foreground"
                          )}>
                            {entry.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : entry.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="glass-card border-none bg-background/30 p-8 flex items-start gap-6">
            <Info className="h-6 w-6 text-primary shrink-0" />
            <div className="space-y-2">
              <Text variant="bodySmall" weight="bold">Authority Calculation Metric</Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed">
                Reputation nodes are calculated based on the precision of your forecasts, the peer-reviewed quality of your intelligence nodes, and consistent high-fidelity community engagement. Top contributors receive increased reach in the Discovery Engine and early access to the generative research studio.
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
