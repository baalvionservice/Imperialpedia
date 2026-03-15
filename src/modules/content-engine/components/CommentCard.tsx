'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageSquare, 
  Flag, 
  MoreHorizontal,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
}

/**
 * A sophisticated comment card with reputation, sentiment voting, and threading.
 */
export function CommentCard({ comment, isReply = false }: CommentCardProps) {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);

  return (
    <div className={cn(
      "space-y-4 animate-in fade-in duration-500",
      isReply ? "ml-8 lg:ml-12 mt-4 pt-4 border-l-2 border-white/5 pl-6" : ""
    )}>
      <div className="flex items-start gap-4">
        <Avatar className={cn(
          "rounded-xl border border-white/10",
          isReply ? "h-8 w-8" : "h-10 w-10"
        )}>
          <AvatarImage src={comment.avatar} />
          <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                {comment.username}
              </span>
              {comment.badge && (
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[8px] font-bold uppercase py-0 h-4">
                  {comment.badge}
                </Badge>
              )}
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono bg-white/5 px-1.5 rounded">
                <Zap className="h-2.5 w-2.5 text-amber-500" /> {comment.reputationScore}
              </div>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {format(new Date(comment.timestamp), 'MMM d, HH:mm')}
              </span>
            </div>

            <Badge className={cn(
              "border-none text-[9px] font-bold uppercase h-5",
              comment.bullBearVote === 'Bull' ? "bg-emerald-500/10 text-emerald-500" :
              comment.bullBearVote === 'Bear' ? "bg-destructive/10 text-destructive" :
              "bg-muted text-muted-foreground"
            )}>
              {comment.bullBearVote === 'Bull' ? <TrendingUp className="h-2.5 w-2.5 mr-1" /> : 
               comment.bullBearVote === 'Bear' ? <TrendingDown className="h-2.5 w-2.5 mr-1" /> : null}
              {comment.bullBearVote}
            </Badge>
          </div>

          <div className="p-4 rounded-2xl bg-card/50 border border-white/5 group hover:border-primary/20 transition-all shadow-sm">
            <Text variant="bodySmall" className="text-foreground/90 leading-relaxed">
              {comment.content}
            </Text>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center bg-background/50 border border-white/5 rounded-lg h-8 overflow-hidden">
              <button 
                onClick={() => setUpvotes(v => v + 1)}
                className="px-2 hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500 transition-colors border-r border-white/5"
              >
                <ArrowBigUp className="h-4 w-4" />
              </button>
              <span className="px-2 text-[10px] font-bold font-mono text-muted-foreground">
                {upvotes - downvotes}
              </span>
              <button 
                onClick={() => setDownvotes(v => v + 1)}
                className="px-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <ArrowBigDown className="h-4 w-4" />
              </button>
            </div>

            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-muted-foreground hover:text-primary">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Reply
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <Flag className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map(reply => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
