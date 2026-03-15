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
  Twitter,
  Linkedin,
  Globe,
  Github,
  Youtube,
  ArrowUpRight,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Award,
  GraduationCap,
  Briefcase,
  Zap,
  Search,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArticleCard } from '@/modules/content-engine/components/ArticleCard';
import { getCreatorContent, getCreators } from '@/services/mock-api/creators';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CreatorProfileClientProps {
  creator: CreatorProfile;
}

/**
 * Institutional Expert Profile Hub.
 * Features credential matrix, impact telemetry, and published intelligence registry.
 */
export function CreatorProfileClient({ creator }: CreatorProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(creator.stats.followersCount);
  const [content, setContent] = useState<CreatorContentItem[]>([]);
  const [relatedCreators, setRelatedCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadExtraData() {
      try {
        const [contentRes, creatorsRes] = await Promise.all([
          getCreatorContent(creator.id),
          getCreators()
        ]);
        setContent(contentRes.data);
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

  const filteredContent = content.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Profile Header Card */}
      <Card className="glass-card overflow-hidden border-none shadow-2xl relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <CardContent className="p-8 lg:p-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
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
                    <Badge className="bg-secondary text-secondary-foreground border-none h-8 px-3 rounded-xl font-bold uppercase text-[10px]">
                      <ShieldCheck className="mr-1.5 h-4 w-4" /> Verified Expert
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Text variant="h4" className="text-primary font-bold uppercase tracking-widest text-sm">
                    {creator.title}
                  </Text>
                  <span className="text-muted-foreground opacity-40">•</span>
                  <Text variant="bodySmall" className="text-muted-foreground font-normal">
                    @{creator.username}
                  </Text>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 py-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold tracking-tighter">{followers.toLocaleString()}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold tracking-tighter">{creator.stats.articlesCount}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Insights</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold tracking-tighter">{(creator.stats.totalReads || 0).toLocaleString()}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total Reads</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold tracking-tighter text-primary">{creator.stats.engagementScore || 92}%</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Engagement</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Intelligence Column */}
        <div className="lg:col-span-8 space-y-12">
          <Tabs defaultValue="published" className="w-full space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-4">
              <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-2xl">
                <TabsTrigger value="published" className="px-8 h-10 gap-2 rounded-xl font-bold text-xs data-[state=active]:bg-primary">
                  <BookOpen className="h-4 w-4" /> Published Research
                </TabsTrigger>
                <TabsTrigger value="guides" className="px-8 h-10 gap-2 rounded-xl font-bold text-xs data-[state=active]:bg-primary">
                  <Layers className="h-4 w-4" /> Strategy Guides
                </TabsTrigger>
              </TabsList>
              
              <div className="relative group w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Filter research nodes..." 
                  className="pl-10 h-10 bg-card/30 border-white/10 rounded-xl text-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="published" className="mt-0">
              <Card className="glass-card border-none shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/20 border-b border-white/5">
                        <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Intelligence Title</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest">Taxonomy</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Reads</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Likes</TableHead>
                        <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContent.map((item) => (
                        <TableRow key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                          <TableCell className="py-5 pl-8">
                            <Link href={`/articles/${item.slug}`} className="text-sm font-bold text-foreground/90 leading-tight block group-hover:text-primary transition-colors">
                              {item.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[8px] font-bold uppercase h-5 px-2">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-mono text-xs font-bold opacity-70">
                            {(item.reads || 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center font-mono text-xs font-bold text-primary">
                            {(item.likes || 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 bg-muted/10 border-t border-white/5 flex justify-center">
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    Load Full Index <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="py-20 text-center bg-card/10 rounded-[3rem] border border-dashed border-white/5">
              <Layers className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <Text variant="h4" className="text-muted-foreground">No Strategy Guides Published</Text>
              <Text variant="caption" className="text-muted-foreground/60 mt-2 block">Premium educational nodes will appear here.</Text>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Context Column */}
        <div className="lg:col-span-4 space-y-10">
          {/* Credentials Card */}
          <Card className="glass-card border-none shadow-xl h-fit">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Credential Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <Text variant="label" className="text-[9px] opacity-50 font-bold uppercase tracking-widest block mb-1">Professional Tenure</Text>
                    <Text variant="bodySmall" weight="bold">{creator.yearsExperience || 10}+ Years Experience</Text>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <Text variant="label" className="text-[9px] opacity-50 font-bold uppercase tracking-widest block mb-1">Academic Background</Text>
                    <Text variant="bodySmall" weight="bold">{creator.education || 'Institutional Researcher'}</Text>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <Text variant="label" className="text-[9px] opacity-50 font-bold uppercase tracking-widest">Authority Badges</Text>
                <div className="flex flex-wrap gap-2">
                  {creator.badges?.map(badge => (
                    <Badge key={badge} className="bg-primary text-white border-none text-[9px] font-bold uppercase h-6 px-3 shadow-lg">
                      <Award className="w-3 h-3 mr-1.5" /> {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expert Network Mini-Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <Text variant="h4" className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" /> Expert Network
              </Text>
              <Button variant="ghost" size="sm" className="h-7 text-primary text-[10px] font-bold uppercase">View All</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {relatedCreators.map((expert) => (
                <Link key={expert.id} href={`/creator/${expert.id}`} className="group">
                  <Card className="glass-card border-none hover:border-primary/30 transition-all p-4 text-center">
                    <Avatar className="h-12 w-12 rounded-xl mx-auto mb-3 border border-white/5">
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback>{expert.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Text variant="caption" weight="bold" className="group-hover:text-primary transition-colors line-clamp-1">{expert.displayName.split(' ')[0]}</Text>
                    <Text variant="caption" className="text-[8px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">{expert.category}</Text>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[3rem] bg-secondary/5 border border-secondary/20 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap className="h-16 w-16 text-secondary" />
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
              <Activity className="h-4 w-4" /> Tactical Access
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "Subscribe to **Pro Intelligence** to access {creator.displayName.split(' ')[0]}'s private research nodes and high-fidelity strategy models."
            </Text>
            <Button className="w-full h-11 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-xs" asChild>
              <Link href="/premium/subscribe">Unlock Expert Feed</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
