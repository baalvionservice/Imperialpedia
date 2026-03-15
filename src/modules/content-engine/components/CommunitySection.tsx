'use client';

import React, { useEffect, useState } from 'react';
import { getCommunityData } from '@/services/mock-api/community';
import { CommunityData } from '@/types/community';
import { Text } from '@/design-system/typography/text';
import { CommentCard } from './CommentCard';
import { PollCard } from './PollCard';
import { TrendingDiscussions } from './TrendingDiscussions';
import { Loader2, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Comprehensive community engagement section for article pages.
 */
export function CommunitySection() {
  const [data, setData] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunity() {
      try {
        const response = await getCommunityData();
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCommunity();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <Text variant="bodySmall" className="text-muted-foreground italic">Synchronizing community nodes...</Text>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-24 space-y-12 border-t border-white/5 pt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Text variant="h2" className="text-3xl font-bold tracking-tight">Community Intelligence</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Exchange insights with our verified expert network.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
              </div>
            ))}
          </div>
          <Text variant="label" className="text-[10px] text-muted-foreground font-bold">1.2k Active</Text>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Discussion Thread */}
        <div className="lg:col-span-8 space-y-10">
          {/* Post Comment */}
          <Card className="glass-card border-none shadow-xl bg-primary/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <Text variant="caption" className="font-bold uppercase tracking-widest text-primary">Post Analysis</Text>
              </div>
              <Textarea 
                placeholder="Share your perspective on this research..." 
                className="bg-background/50 border-white/5 min-h-[100px] resize-none focus:ring-primary/20"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase rounded-lg border-white/10">Bullish</Button>
                  <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase rounded-lg border-white/10">Bearish</Button>
                </div>
                <Button className="rounded-xl h-10 px-6 font-bold shadow-lg shadow-primary/20">Submit insight</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {data.comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          <Button variant="ghost" className="w-full h-14 rounded-2xl border-2 border-dashed border-white/5 text-muted-foreground hover:text-primary font-bold">
            <Plus className="mr-2 h-4 w-4" /> Load deeper dialogue
          </Button>
        </div>

        {/* Community Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {data.polls.map(poll => (
            <PollCard key={poll.id} poll={poll} />
          ))}
          
          <TrendingDiscussions topics={data.trendingDiscussions} />

          <Card className="glass-card border-none bg-secondary/5 border-secondary/20 p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4" /> Community Policy
              </div>
              <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
                "Verified experts are required to link primary sources for any data-heavy claims. Please maintain a professional, analytical tone in all threads."
              </Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
