'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CreatorProfile, CreatorContentItem } from '@/types';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Globe,
  Github,
  Youtube,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArticleCard } from '@/modules/content-engine/components/ArticleCard';
import { getCreatorContent, getCreators } from '@/services/mock-api/creators';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CreatorProfileClientProps {
  creator: CreatorProfile;
}

export function CreatorProfileClient({ creator }: CreatorProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(creator.stats.followersCount);
  const [content, setContent] = useState<CreatorContentItem[]>([]);
  const [relatedCreators, setRelatedCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExtraData() {
      try {
        const [contentRes, creatorsRes] = await Promise.all([
          getCreatorContent(creator.id),
          getCreators()
        ]);
        setContent(contentRes.data);
        // Mock related experts by filtering current out
        setRelatedCreators(creatorsRes.data.filter(c => c.id !== creator.id).slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadExtraData();
  }, [creator.id]);

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowers(prev => prev - 1);
    } else {
      setFollowers(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'github': return <Github className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Profile Header Card */}
      <Card className="glass-card overflow-hidden border-none shadow-2xl relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <CardContent className="p-8 lg:p-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
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

              <div className="flex flex-wrap gap-8 py-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{followers.toLocaleString()}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{creator.stats.articlesCount}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Insights</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{(creator.stats.totalViews / 1000000).toFixed(1)}M</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Organic Reach</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant={isFollowing ? "outline" : "default"} 
                  className={`h-14 px-10 rounded-2xl font-bold text-base transition-all ${!isFollowing ? 'shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90' : ''}`}
                  onClick={toggleFollow}
                >
                  {isFollowing ? (
                    <><UserMinus className="mr-2 h-5 w-5" /> Unfollow</>
                  ) : (
                    <><UserPlus className="mr-2 h-5 w-5" /> Follow Expert</>
                  )}
                </Button>
                
                {creator.socialLinks && creator.socialLinks.length > 0 && (
                  <div className="flex items-center gap-2 px-4 bg-white/5 rounded-2xl border border-white/5 h-14">
                    {creator.socialLinks.map((link, idx) => (
                      <Button key={idx} variant="ghost" size="icon" className="hover:text-primary transition-colors" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                          {getSocialIcon(link.platform)}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Profile Tabs */}
      <Tabs defaultValue="about" className="space-y-8">
        <TabsList className="bg-card/30 border border-white/5 p-1 h-14 w-full lg:w-auto justify-start">
          <TabsTrigger value="about" className="px-8 h-12 gap-2 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Info className="h-4 w-4" /> About
          </TabsTrigger>
          <TabsTrigger value="content" className="px-8 h-12 gap-2 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BookOpen className="h-4 w-4" /> Intelligence ({creator.stats.articlesCount})
          </TabsTrigger>
          <TabsTrigger value="followers" className="px-8 h-12 gap-2 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="h-4 w-4" /> Network
          </TabsTrigger>
        </TabsList>

        {/* ABOUT TAB */}
        <TabsContent value="about" className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" /> Professional Narrative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="body" className="text-lg leading-relaxed text-foreground/80">
                    {creator.bio}
                  </Text>
                  
                  <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Text variant="label" className="text-muted-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4" /> Taxonomy Focus
                      </Text>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5 text-primary font-bold">
                          {creator.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Text variant="label" className="text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" /> Expertise Matrix
                      </Text>
                      <div className="flex flex-wrap gap-2">
                        {creator.specialties.map(spec => (
                          <Badge key={spec} variant="secondary" className="px-3 py-1 font-medium bg-secondary/10 text-secondary border-none">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="bodySmall" className="text-muted-foreground">
                    Joined the Imperialpedia network on {format(new Date(creator.joinedDate), 'MMMM d, yyyy')}. 
                    Regularly contributes to the {creator.category} intelligence hubs with deep-dive macro analysis.
                  </Text>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-secondary" /> Expert Context
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold">Primary Region</Text>
                    <Text variant="bodySmall" weight="bold">{creator.region}</Text>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold">Verification</Text>
                    <Text variant="bodySmall" weight="bold" className="text-emerald-500">{creator.verified ? 'Vetted' : 'Standard'}</Text>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <Text variant="caption" className="text-muted-foreground uppercase tracking-widest font-bold">Following</Text>
                    <Text variant="bodySmall" weight="bold">{creator.stats.followingCount.toLocaleString()}</Text>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 rounded-[2rem] bg-secondary/10 border border-secondary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="h-12 w-12 text-secondary" />
                </div>
                <Text variant="label" className="text-secondary mb-2">Collaboration</Text>
                <Text variant="h3" className="mb-4">Partner with Experts</Text>
                <Text variant="bodySmall" className="text-muted-foreground leading-relaxed mb-6">
                  Verified experts like {creator.displayName.split(' ')[0]} are available for strategic research partnerships.
                </Text>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-background font-bold h-12 rounded-xl">Contact Expert</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <Text variant="h3" className="font-bold">Published Intelligence</Text>
              <Button variant="ghost" size="sm" className="font-bold text-primary gap-1 group" asChild>
                <Link href={`/creator/${creator.id}/content`}>
                  Manage Feed <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {content.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.map((article) => (
                  <ArticleCard 
                    key={article.id} 
                    article={{
                      ...article,
                      description: article.snippet || '',
                      authorId: creator.displayName,
                      publishedAt: article.createdAt,
                      updatedAt: article.createdAt,
                      status: 'published',
                      readingTime: 8,
                      featuredImage: `https://picsum.photos/seed/${article.id}/800/600`,
                      tags: article.tags
                    } as any} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-card/10 rounded-[3rem] border border-dashed border-white/5">
                <Text variant="body" className="text-muted-foreground">No insights published yet.</Text>
              </div>
            )}
          </div>
        </TabsContent>

        {/* FOLLOWERS TAB */}
        <TabsContent value="followers" className="animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-6">
              <Text variant="h3" className="font-bold">Expert Network</Text>
              <Text variant="bodySmall" className="text-muted-foreground">Experts and analysts following {creator.displayName}'s research.</Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCreators.map((expert) => (
                <Link key={expert.id} href={`/creator/${expert.id}`} className="group">
                  <Card className="glass-card hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20 rounded-2xl border-2 border-white/5 group-hover:border-primary/30 transition-colors">
                          <AvatarImage src={expert.avatar} />
                          <AvatarFallback>{expert.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Text variant="body" weight="bold" className="group-hover:text-primary transition-colors truncate block">
                            {expert.displayName}
                          </Text>
                          <Text variant="caption" className="text-muted-foreground">@{expert.username}</Text>
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] font-bold uppercase">
                          {expert.category}
                        </Badge>
                        <div className="pt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View Profile <ArrowRight className="ml-1.5 h-3 w-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
