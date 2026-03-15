'use client';

import React, { useState } from 'react';
import { Poll } from '@/types/community';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, Users, Clock, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface PollCardProps {
  poll: Poll;
}

/**
 * Interactive poll component for community sentiment forecasting.
 */
export function PollCard({ poll }: PollCardProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleVote = (idx: number) => {
    setSelectedOption(idx);
    setHasVoted(true);
  };

  return (
    <Card className="glass-card border-none bg-primary/5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Target className="h-24 w-24" />
      </div>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Target className="h-4 w-4" />
          <Text variant="label" className="text-[10px] font-bold">Community Forecast</Text>
        </div>
        <CardTitle className="text-lg leading-tight">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {poll.options.map((option, idx) => {
            const percentage = Math.round((poll.votes[idx] / poll.totalVotes) * 100);
            return (
              <div key={idx} className="space-y-1.5">
                <button
                  disabled={hasVoted}
                  onClick={() => handleVote(idx)}
                  className={cn(
                    "w-full flex justify-between items-center p-3 rounded-xl border transition-all text-left",
                    hasVoted && selectedOption === idx ? "border-primary bg-primary/10" : "border-white/5 bg-background/40 hover:border-primary/30",
                    hasVoted && "cursor-default"
                  )}
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    {hasVoted && selectedOption === idx && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                    {option}
                  </span>
                  {hasVoted && <span className="text-xs font-mono font-bold text-primary">{percentage}%</span>}
                </button>
                {hasVoted && (
                  <Progress value={percentage} className="h-1 bg-white/5" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
            <div className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {poll.totalVotes.toLocaleString()} votes</div>
            <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 2d left</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { cn } from '@/lib/utils';
