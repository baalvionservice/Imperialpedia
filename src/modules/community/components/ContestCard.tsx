'use client';

import React from 'react';
import { PredictionContest } from '@/types/community';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  Users, 
  Clock, 
  ArrowRight, 
  Zap, 
  Layers,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ContestCardProps {
  contest: PredictionContest;
}

/**
 * A high-fidelity card component for community prediction contests.
 */
export function ContestCard({ contest }: ContestCardProps) {
  const isUpcoming = contest.status === 'upcoming';
  const isClosed = contest.status === 'closed';

  return (
    <Card className={cn(
      "glass-card border-none transition-all duration-300 hover:translate-y-[-4px] group",
      contest.status === 'ongoing' ? "ring-1 ring-primary/20 shadow-xl shadow-primary/5" : ""
    )}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <Badge className={cn(
            "border-none text-[9px] font-bold uppercase px-3 h-6",
            contest.status === 'ongoing' ? "bg-emerald-500 text-white" :
            contest.status === 'upcoming' ? "bg-amber-500/10 text-amber-500" :
            "bg-muted text-muted-foreground"
          )}>
            {contest.status}
          </Badge>
          <div className="p-2 rounded-lg bg-background/50 border border-white/5">
            <Trophy className={cn(
              "h-4 w-4",
              contest.status === 'ongoing' ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
          {contest.name}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed mt-2 line-clamp-2">
          {contest.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Involved Assets */}
        <div className="space-y-2">
          <Text variant="label" className="text-[10px] text-muted-foreground font-bold">Involved Nodes</Text>
          <div className="flex flex-wrap gap-1.5">
            {contest.assets.map(asset => (
              <Badge key={asset} variant="secondary" className="bg-primary/5 text-primary border-none text-[9px] font-bold px-2 py-0.5">
                {asset}
              </Badge>
            ))}
          </div>
        </div>

        {/* Top Participants Snapshot */}
        {!isUpcoming && contest.participants.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Text variant="label" className="text-[10px] text-muted-foreground font-bold">Top Participants</Text>
              <Text variant="caption" className="text-[9px] text-primary font-bold">View full list</Text>
            </div>
            <div className="space-y-2">
              {contest.participants.slice(0, 2).map((p, i) => (
                <div key={p.username} className="flex items-center justify-between p-2 rounded-xl bg-background/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/10">
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback>{p.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] font-bold">{p.username}</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-primary">{p.points} PTS</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prize Pool */}
        {contest.reward && (
          <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
            <Text variant="label" className="text-secondary text-[9px] font-bold uppercase mb-1 block">Prize Reward</Text>
            <Text variant="caption" className="font-bold text-foreground leading-snug">
              {contest.reward}
            </Text>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 border-t border-white/5 mt-4 bg-muted/10">
        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
            <Clock className="h-3 w-3" />
            {isClosed ? 'Concluded' : `Ends ${format(new Date(contest.endsAt), 'MMM d')}`}
          </div>
          
          <Button 
            disabled={isClosed}
            className={cn(
              "h-9 px-4 rounded-xl text-xs font-bold transition-all",
              contest.status === 'ongoing' ? "bg-primary hover:bg-primary/90" : "bg-muted text-muted-foreground"
            )}
          >
            {isUpcoming ? <><Lock className="h-3 w-3 mr-1.5" /> Upcoming</> : isClosed ? 'View Results' : 'Enter Contest'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
