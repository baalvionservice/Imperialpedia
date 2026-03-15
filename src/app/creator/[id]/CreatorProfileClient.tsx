'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreatorProfile } from '@/types';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  UserMinus, 
  BookOpen, 
  TrendingUp, 
  ExternalLink,
  Twitter,
  Linkedin,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArticleCard } from '@/modules/content-engine/components/ArticleCard';

interface CreatorProfileClientProps {
  creator: CreatorProfile;
}

export function CreatorProfileClient({ creator }: CreatorProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(creator.stats.followersCount);

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowers(prev => prev - 1);
    } else {
      setFollowers(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Profile Header Hero */}
      <div className="relative rounded-[3rem] overflow-hidden bg-card/20 border border-white/5 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center relative z-10">
          <div className="relative w-32 h-32 lg:w-48 lg:h-48 rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl ring-1 ring-white/10 shrink-0">
            <Image src={creator.avatar} alt={creator.displayName} fill className="object-cover" priority />
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {creator.displayName}
                </Text>
                {creator.verified && (
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30 h-8 px-3 rounded-xl">
                    <ShieldCheck className="mr-1.5 h-4 w-4" /> Verified Expert
                  </Badge>
                )}
              </div>
              <Text variant="h4" className="text-muted-foreground font-normal">
                @{creator.username} • <span className="opacity-70">Joined {format(new Date(creator.joinedDate), 'MMM yyyy')}</span>
              </Text>
            </div>

            <Text variant="body" className="text-xl text-foreground/80 max-w-2xl leading-relaxed">
              {creator.bio}
            </Text>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                variant={isFollowing ? "outline" : "default"} 
                className={`h-14 px-8 rounded-2xl font-bold text-base transition-all ${!isFollowing ? 'shadow-lg shadow-primary/20' : ''}`}
                onClick={toggleFollow}
              >
                {isFollowing ? (
                  <><UserMinus className="mr-2 h-5 w-5" /> Unfollow Expert</>
                ) : (
                  <><UserPlus className="mr-2 h-5 w-5" /> Follow Expert</>
                )}
              </Button>
              
              <div className="flex items-center gap-2 px-6 bg-white/5 rounded-2xl border border-white/5 h-14">
                {creator.socialLinks?.twitter && (
                  <Button variant="ghost" size="icon" className="hover:text-primary"><Twitter className="h-5 w-5" /></Button>
                )}
                {creator.socialLinks?.linkedin && (
                  <Button variant="ghost" size="icon" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Button>
                )}
                <Button variant="ghost" size="icon" className="hover:text-primary"><ExternalLink className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Stats & Info */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg uppercase tracking-widest text-muted-foreground font-bold">Expertise Matrix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {creator.specialties.map(spec => (
                  <Badge key={spec} variant="outline" className="px-4 py-2 rounded-xl text-sm font-bold border-primary/20 hover:bg-primary/10 transition-colors cursor-default">
                    {spec}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <Text variant="bodySmall" className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Audience
                  </Text>
                  <Text variant="body" weight="bold">{followers.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="bodySmall" className="text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Insights Published
                  </Text>
                  <Text variant="body" weight="bold">{creator.stats.articlesCount}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="bodySmall" className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Global Reach
                  </Text>
                  <Text variant="body" weight="bold">{(creator.stats.totalViews / 1000000).toFixed(1)}M</Text>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-8 rounded-[2rem] bg-secondary/10 border border-secondary/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="h-12 w-12 text-secondary" />
            </div>
            <Text variant="label" className="text-secondary mb-2">Platform Contribution</Text>
            <Text variant="h3" className="mb-4">Become an Expert</Text>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed mb-6">
              Join thinkers like {creator.displayName.split(' ')[0]} and share your financial intelligence with millions.
            </Text>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-background font-bold h-12 rounded-xl">Apply Now</Button>
          </div>
        </div>

        {/* Content Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-3 text-primary">
              <BookOpen className="h-6 w-6" />
              <Text variant="h2" className="text-3xl font-bold">Expert Intelligence</Text>
            </div>
            <Text variant="bodySmall" className="text-muted-foreground font-bold">Showing {creator.content.recentArticles.length} recent insights</Text>
          </div>

          {creator.content.recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creator.content.recentArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={{
                    ...article,
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    category: article.category,
                    description: '', // Card handles description clipping
                    authorId: creator.displayName,
                    publishedAt: article.publishedAt,
                    updatedAt: article.publishedAt,
                    status: 'published',
                    readingTime: 8, // Mock
                    featuredImage: `https://picsum.photos/seed/${article.id}/800/600`,
                    tags: []
                  } as any} 
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-card/10 rounded-[3rem] border border-dashed border-white/5">
              <Text variant="body" className="text-muted-foreground">No recent articles published.</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
