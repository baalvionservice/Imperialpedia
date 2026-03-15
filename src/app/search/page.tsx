'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { Text } from '@/design-system/typography/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Search as SearchIcon, 
  Loader2, 
  Sparkles, 
  BookOpen, 
  User, 
  Calculator as CalcIcon, 
  Database,
  ArrowRight,
  SearchX,
  TrendingUp,
  X,
  Layers,
  Filter,
  Tag as TagIcon,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  SortAsc,
  Flame,
  Landmark,
  ShieldCheck,
  Star
} from 'lucide-react';
import { SearchResult, SearchResultType, SearchSuggestion, AdvancedSearchFilters, SearchSortOption, TopicRecommendation } from '@/types';
import { searchService } from '@/services/data/search-service';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Global search page for the Imperialpedia platform.
 * Supports cross-entity discovery with real-time auto-suggestions, category filtering, tag chips, and sorting.
 * Now includes a trending highlights section and topic recommendation engine.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [popularContent, setPopularContent] = useState<SearchResult[]>([]);
  const [recommendations, setRecommendations] = useState<TopicRecommendation[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [isRecsLoading, setIsRecsLoading] = useState(true);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Advanced Filter & Sort States
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SearchSortOption>('relevance');

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch Popular Content and Recommendations on Mount
  useEffect(() => {
    async function loadInitialData() {
      setIsPopularLoading(true);
      setIsRecsLoading(true);
      try {
        const [popularRes, recsRes] = await Promise.all([
          searchService.getPopularContent(),
          searchService.getRecommendedTopics()
        ]);
        setPopularContent(popularRes.data);
        setRecommendations(recsRes.data);
      } catch (e) {
        console.error('Initial data fetch failed', e);
      } finally {
        setIsPopularLoading(false);
        setIsRecsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Suggestions Fetch Effect
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSuggestionsLoading(true);
      setShowSuggestions(true);
      try {
        const response = await searchService.getSuggestions(query);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Suggestions failed', error);
      } finally {
        setIsSuggestionsLoading(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Full Results Fetch Effect
  const handlePerformSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim().length < 2 && selectedAuthor === 'all' && selectedCategory === 'all') return;

    setIsLoading(true);
    setShowSuggestions(false);
    setSelectedTags([]); // Clear tag filters on new search
    
    const filters: AdvancedSearchFilters = {
      author: selectedAuthor,
      category: selectedCategory,
      sortBy: sortBy
    };

    try {
      const response = await searchService.performSearch(query, filters);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-trigger search when sorting changes
  useEffect(() => {
    if (results.length > 0) {
      handlePerformSearch();
    }
  }, [sortBy]);

  // Extract unique tags from current results
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    results.forEach(r => r.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [results]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredResults = useMemo(() => {
    let filtered = results;
    
    // 1. Tab Filter (EntityType)
    if (activeTab !== 'all') {
      if (activeTab === 'topic') {
        filtered = filtered.filter(r => r.type === 'topic' || r.type === 'glossary');
      } else {
        filtered = filtered.filter(r => r.type === activeTab);
      }
    }

    // 2. Dynamic Tag Filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(r => 
        selectedTags.every(tag => r.tags?.includes(tag))
      );
    }

    return filtered;
  }, [results, activeTab, selectedTags]);

  const getResultIcon = (type: SearchResultType | string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4 text-primary" />;
      case 'author': return <User className="h-4 w-4 text-secondary" />;
      case 'calculator': return <CalcIcon className="h-4 w-4 text-primary" />;
      case 'glossary': return <Database className="h-4 w-4 text-secondary" />;
      case 'topic': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'TrendingUp': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'Landmark': return <Landmark className="h-4 w-4 text-secondary" />;
      case 'BarChart3': return <BarChart3 className="h-4 w-4 text-primary" />;
      case 'Layers': return <Layers className="h-4 w-4 text-secondary" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      default: return <SearchIcon className="h-4 w-4" />;
    }
  };

  const getResultBadge = (type: SearchResultType) => {
    const labels: Record<string, string> = {
      article: 'Intelligence',
      author: 'Expert',
      calculator: 'Engine',
      glossary: 'Definition',
      topic: 'Taxonomy'
    };
    return (
      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 bg-primary/5 text-primary">
        {labels[type] || type}
      </Badge>
    );
  };

  const handleResetFilters = () => {
    setSelectedAuthor('all');
    setSelectedCategory('all');
    setSortBy('relevance');
    setQuery('');
    setResults([]);
    setSelectedTags([]);
  };

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Section spacing="md">
        <Container>
          <header className="mb-12 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold">Intelligence Discovery</Text>
            </div>
            <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Global Search</Text>
            <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
              Explore the Imperialpedia Index. Instantly find expert analysis, planning tools, and market terminology.
            </Text>
          </header>

          <div className="max-w-2xl mx-auto mb-12 space-y-4" ref={searchContainerRef}>
            <div className="relative">
              <form onSubmit={handlePerformSearch} className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search by topic, expert, or tool..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  className="h-14 pl-12 pr-12 text-lg rounded-2xl border-primary/20 bg-card/50 backdrop-blur-sm focus:ring-primary/40 focus:border-primary transition-all shadow-xl"
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {query && (
                    <button 
                      type="button" 
                      onClick={() => { setQuery(''); setSuggestions([]); setResults([]); setSelectedTags([]); }}
                      className="p-1 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {isLoading && (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  )}
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && (query.length >= 2) && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 glass-card border-primary/20 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <CardContent className="p-2">
                    {isSuggestionsLoading ? (
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="space-y-1">
                        <div className="px-3 py-2">
                          <Text variant="label" className="text-[9px] text-primary/60">Live Suggestions</Text>
                        </div>
                        {suggestions.map((suggestion) => (
                          <Link 
                            key={suggestion.id} 
                            href={suggestion.route}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/20 text-muted-foreground group-hover:text-primary transition-colors">
                              {getResultIcon(suggestion.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <Text variant="bodySmall" weight="bold" className="truncate block">
                                {suggestion.title}
                              </Text>
                              <Text variant="caption" className="text-muted-foreground uppercase text-[8px] tracking-tighter">
                                {suggestion.type}
                              </Text>
                            </div>
                            <ArrowRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </Link>
                        ))}
                        <button 
                          onClick={() => handlePerformSearch()}
                          className="w-full text-center py-3 border-t border-white/5 hover:bg-muted transition-colors"
                        >
                          <Text variant="caption" className="font-bold text-primary">View all results for "{query}"</Text>
                        </button>
                      </div>
                    ) : (
                      <div className="p-8 text-center opacity-50">
                        <SearchX className="h-8 w-8 mx-auto mb-2" />
                        <Text variant="caption">No instant matches for "{query}"</Text>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Advanced Filters Panel */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="w-full">
              <div className="flex justify-center">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                    <Filter className="h-3 w-3" />
                    {isAdvancedOpen ? 'Hide Refinement' : 'Refine Discovery'}
                    {isAdvancedOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <Card className="glass-card border-white/5 bg-card/30">
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Text variant="label" className="text-[10px] opacity-50 ml-1">Expert Author</Text>
                        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                          <SelectTrigger className="bg-background/50 border-white/10 rounded-xl h-11">
                            <User className="h-3.5 w-3.5 mr-2 text-secondary" />
                            <SelectValue placeholder="All Experts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Experts</SelectItem>
                            <SelectItem value="The Market Maven">The Market Maven</SelectItem>
                            <SelectItem value="Julian Wealth">Julian Wealth</SelectItem>
                            <SelectItem value="Eleanor Vance">Eleanor Vance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Text variant="label" className="text-[10px] opacity-50 ml-1">Category Hub</Text>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="bg-background/50 border-white/10 rounded-xl h-11">
                            <Layers className="h-3.5 w-3.5 mr-2 text-primary" />
                            <SelectValue placeholder="All Taxonomies" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Taxonomies</SelectItem>
                            <SelectItem value="Economics">Economics</SelectItem>
                            <SelectItem value="Investing">Investing</SelectItem>
                            <SelectItem value="Markets">Markets</SelectItem>
                            <SelectItem value="Retirement">Retirement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button onClick={() => handlePerformSearch()} className="flex-1 rounded-xl h-11 font-bold shadow-lg shadow-primary/20">
                        Apply Advanced Filters
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleResetFilters} className="h-11 w-11 rounded-xl border-white/10" title="Reset All">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {!query && results.length === 0 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {/* Popular Content Discovery */}
              <div>
                <div className="flex items-center gap-2 mb-6 px-2">
                  <Flame className="h-5 w-5 text-amber-500" />
                  <Text variant="h4" className="font-bold">Trending Intelligence</Text>
                </div>
                
                <Carousel className="w-full">
                  <CarouselContent className="-ml-4">
                    {isPopularLoading ? (
                      [1, 2, 3].map(i => (
                        <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                          <Skeleton className="h-48 w-full rounded-2xl" />
                        </CarouselItem>
                      ))
                    ) : popularContent.map((item) => (
                      <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <Link href={item.route}>
                          <Card className="glass-card h-full transition-all hover:border-primary/40 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                              {getResultIcon(item.type)}
                            </div>
                            <CardHeader className="p-6 pb-2">
                              <div className="flex justify-between items-start mb-2">
                                {getResultBadge(item.type)}
                                {item.views && (
                                  <Text variant="label" className="text-[8px] text-emerald-500 font-bold">
                                    {(item.views / 1000).toFixed(1)}k Views
                                  </Text>
                                )}
                              </div>
                              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-2">
                              <CardDescription className="text-xs line-clamp-2 text-muted-foreground leading-relaxed">
                                {item.snippet}
                              </CardDescription>
                              <div className="mt-4 flex items-center text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
                                View Intelligence <ArrowRight className="ml-1 h-3 w-3" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block">
                    <CarouselPrevious className="absolute -left-12 top-1/2" />
                    <CarouselNext className="absolute -right-12 top-1/2" />
                  </div>
                </Carousel>
              </div>

              {/* Recommended Topics Matrix */}
              <div>
                <div className="flex items-center gap-2 mb-6 px-2">
                  <Star className="h-5 w-5 text-primary" />
                  <Text variant="h4" className="font-bold">Recommended for You</Text>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {isRecsLoading ? (
                    [1, 2, 3, 4, 5].map(i => (
                      <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                    ))
                  ) : recommendations.map((topic) => (
                    <Link key={topic.id} href={`/tags/${topic.slug}`}>
                      <Card className="glass-card hover:border-primary/40 transition-all group overflow-hidden h-full">
                        <CardContent className="p-4 flex flex-col h-full justify-between">
                          <div className="flex justify-between items-start mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              {getResultIcon(topic.icon || 'topic')}
                            </div>
                            {topic.isTrending && (
                              <Badge className="bg-amber-500/10 text-amber-500 border-none text-[8px] px-1.5 h-4 font-bold">HOT</Badge>
                            )}
                          </div>
                          <div>
                            <Text variant="bodySmall" weight="bold" className="group-hover:text-primary transition-colors block mb-1">
                              {topic.name}
                            </Text>
                            <Text variant="caption" className="text-[9px] text-muted-foreground uppercase tracking-widest">
                              {topic.category}
                            </Text>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSelectedTags([]); }} className="w-full">
            {(results.length > 0) && (
              <div className="flex justify-center mb-8">
                <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-xl overflow-x-auto no-scrollbar justify-start sm:justify-center w-full sm:w-auto">
                  <TabsTrigger value="all" className="px-6 rounded-lg font-bold text-xs">All Results</TabsTrigger>
                  <TabsTrigger value="article" className="px-6 rounded-lg font-bold text-xs gap-2">
                    <BookOpen className="h-3.5 w-3.5" /> Intelligence
                  </TabsTrigger>
                  <TabsTrigger value="author" className="px-6 rounded-lg font-bold text-xs gap-2">
                    <User className="h-3.5 w-3.5" /> Experts
                  </TabsTrigger>
                  <TabsTrigger value="calculator" className="px-6 rounded-lg font-bold text-xs gap-2">
                    <CalcIcon className="h-3.5 w-3.5" /> Engines
                  </TabsTrigger>
                  <TabsTrigger value="topic" className="px-6 rounded-lg font-bold text-xs gap-2">
                    <Layers className="h-3.5 w-3.5" /> Topics
                  </TabsTrigger>
                </TabsList>
              </div>
            )}

            {/* Tag Filtering & Sorting Section */}
            {results.length > 0 && (
              <div className="max-w-4xl mx-auto mb-12 space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Filter className="h-3.5 w-3.5" />
                      <Text variant="label" className="text-[10px]">Filter by Topic Node</Text>
                    </div>
                    {selectedTags.length > 0 && (
                      <button 
                        onClick={() => setSelectedTags([])}
                        className="text-[10px] font-bold text-primary hover:underline w-fit"
                      >
                        Clear Topics
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Text variant="label" className="text-[10px] text-muted-foreground shrink-0">Sort By</Text>
                    <Select value={sortBy} onValueChange={(val) => setSortBy(val as SearchSortOption)}>
                      <SelectTrigger className="h-10 w-full sm:w-[160px] bg-card/30 border-white/5 rounded-xl text-xs font-bold">
                        <SortAsc className="h-3.5 w-3.5 mr-2 text-primary" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="latest">Latest Discovery</SelectItem>
                        <SelectItem value="popular">Popularity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {availableTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all px-3 py-1 rounded-lg text-[10px] font-bold border-white/10",
                          selectedTags.includes(tag) 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                            : "bg-card/30 hover:bg-primary/10 hover:border-primary/30"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        <TagIcon className="h-2.5 w-2.5 mr-1.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <TabsContent value={activeTab} className="animate-in fade-in duration-500">
              {results.length > 0 && (
                <div className="mb-6 flex items-center justify-between px-2">
                  <Text variant="bodySmall" className="text-muted-foreground font-bold italic">
                    Discovery Engine: <span className="text-foreground">{filteredResults.length} intelligence nodes</span> localized
                    {(selectedAuthor !== 'all' || selectedCategory !== 'all') && (
                      <span className="text-primary ml-2"> (Filtered)</span>
                    )}
                  </Text>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="glass-card">
                      <div className="p-6 space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.map((result) => (
                    <Link key={result.id} href={result.route}>
                      <Card className="glass-card h-full transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/40 hover:shadow-2xl group">
                        <CardHeader className="p-6 pb-2">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              {getResultIcon(result.type)}
                              {getResultBadge(result.type)}
                            </div>
                            {result.category && (
                              <Text variant="label" className="text-[10px] text-muted-foreground opacity-50">
                                {result.category}
                              </Text>
                            )}
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                            {result.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-2">
                          <CardDescription className="text-sm line-clamp-2 leading-relaxed text-muted-foreground mb-6">
                            {result.snippet}
                          </CardDescription>
                          
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {result.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[9px] font-bold text-primary/60 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            {result.author ? (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <User className="h-3 w-3" /> {result.author}
                              </div>
                            ) : result.views ? (
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                                <TrendingUp className="h-3 w-3 text-emerald-500" /> {result.views.toLocaleString()} Views
                              </div>
                            ) : <div></div>}
                            
                            <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Explore <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (query.trim().length >= 2 || selectedAuthor !== 'all' || selectedCategory !== 'all') && results.length === 0 && !isLoading ? (
                <div className="py-32 text-center bg-card/10 rounded-[3rem] border-2 border-dashed border-white/5">
                  <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchX className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                  <Text variant="h3" className="mb-2">No matching intelligence found</Text>
                  <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto">
                    We couldn't find any nodes matching these criteria. Try broadening your parameters or browsing by category.
                  </Text>
                  <Button variant="link" className="mt-4 text-primary font-bold" onClick={handleResetFilters}>
                    Reset all parameters
                  </Button>
                </div>
              ) : !query && (
                <div className="py-32 text-center opacity-30">
                  <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Text variant="h4">Awaiting Discovery</Text>
                  <Text variant="bodySmall">Enter a query or apply a filter above to scan the Intelligence Index.</Text>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </main>
  );
}
