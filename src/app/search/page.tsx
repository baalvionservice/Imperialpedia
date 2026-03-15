'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  Star,
  BarChart3
} from 'lucide-react';
import { SearchResult, SearchResultType, SearchSuggestion, AdvancedSearchFilters, SearchSortOption, TopicRecommendation } from '@/types';
import { searchService } from '@/services/data/search-service';
import { paginateResults } from '@/services/mock-api/search';
import { Pagination } from '@/components/ui/pagination';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
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
  const [currentPage, setCurrentPage] = useState(1);
  
  // Advanced Filter & Sort States
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SearchSortOption>('relevance');

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync state with URL params
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
      handlePerformSearch(initialQuery);
    }
  }, [initialQuery]);

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
        const response = await searchService.getSearchSuggestions(query);
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
  const handlePerformSearch = async (forcedQuery?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const activeQuery = forcedQuery !== undefined ? forcedQuery : query;
    
    if (activeQuery.trim().length < 2 && selectedAuthor === 'all' && selectedCategory === 'all') return;

    // Update URL
    if (activeQuery !== searchParams.get('q')) {
      const params = new URLSearchParams(searchParams);
      if (activeQuery) params.set('q', activeQuery);
      else params.delete('q');
      router.push(`/search?${params.toString()}`);
    }

    setIsLoading(true);
    setShowSuggestions(false);
    setSelectedTags([]); 
    setCurrentPage(1); 
    
    const filters: AdvancedSearchFilters = {
      author: selectedAuthor,
      category: selectedCategory,
      sortBy: sortBy
    };

    try {
      const response = await searchService.performSearch(activeQuery, filters);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique tags from current results
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    results.forEach(r => r.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [results]);

  const toggleTag = (tag: string) => {
    if (!tag) {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => 
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    }
    setCurrentPage(1);
  };

  const filteredResults = useMemo(() => {
    let filtered = results;
    
    if (activeTab !== 'all') {
      if (activeTab === 'topic') {
        filtered = filtered.filter(r => r.type === 'topic' || r.type === 'glossary');
      } else {
        filtered = filtered.filter(r => r.type === activeTab);
      }
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(r => 
        selectedTags.every(tag => r.tags?.includes(tag))
      );
    }

    return filtered;
  }, [results, activeTab, selectedTags]);

  const paginatedResults = useMemo(() => {
    return paginateResults(filteredResults, currentPage, ITEMS_PER_PAGE);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

  const getResultIcon = (type: SearchResultType | string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4 text-primary" />;
      case 'author': return <User className="h-4 w-4 text-secondary" />;
      case 'calculator': return <CalcIcon className="h-4 w-4 text-primary" />;
      case 'glossary': return <Database className="h-4 w-4 text-secondary" />;
      case 'topic': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'BarChart3': return <BarChart3 className="h-4 w-4 text-primary" />;
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
    setCurrentPage(1);
    router.push('/search');
  };

  return (
    <Container>
      <header className="mb-12 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
          <Sparkles className="h-4 w-4" />
          <Text variant="label" className="text-[10px] font-bold">Discovery Matrix</Text>
        </div>
        <Text variant="h1" className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Global Knowledge Search</Text>
        <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
          Traverse the Imperialpedia Index. Instantly find expert research, interactive tools, and financial taxonomies.
        </Text>
      </header>

      <div className="max-w-2xl mx-auto mb-12 space-y-4" ref={searchContainerRef}>
        <div className="relative">
          <form onSubmit={(e) => handlePerformSearch(undefined, e)} className="relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search by topic, expert, or tool..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              className="h-14 pl-12 pr-12 text-lg rounded-2xl border-primary/20 bg-card/50 backdrop-blur-sm focus:ring-primary/40 focus:border-primary transition-all shadow-xl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {query && (
                <button 
                  type="button" 
                  onClick={() => { setQuery(''); setSuggestions([]); setResults([]); router.push('/search'); }}
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

          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 glass-card border-primary/20 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <CardContent className="p-2">
                <div className="space-y-1">
                  <div className="px-3 py-2">
                    <Text variant="label" className="text-[9px] text-primary/60">Instant Matches</Text>
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
                    <Text variant="caption" className="font-bold text-primary">Explore all results for "{query}"</Text>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
                    <Text variant="label" className="text-[10px] opacity-50 ml-1">Verified Expert</Text>
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
                    <Text variant="label" className="text-[10px] opacity-50 ml-1">Taxonomy Hub</Text>
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
                        <SelectItem value="Crypto">Crypto & Web3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={() => handlePerformSearch()} className="flex-1 rounded-xl h-11 font-bold shadow-lg shadow-primary/20">
                    Apply Advanced Filters
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleResetFilters} className="h-11 w-11 rounded-xl border-white/10">
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
                          <CardDescription className="text-xs line-clamp-2 text-muted-foreground">
                            {item.snippet}
                          </CardDescription>
                          <div className="mt-4 flex items-center text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
                            View Node <ArrowRight className="ml-1 h-3 w-3" />
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

          <div>
            <div className="flex items-center gap-2 mb-6 px-2">
              <Star className="h-5 w-5 text-primary" />
              <Text variant="h4" className="font-bold">Recommended Topics</Text>
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

      {results.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-xl overflow-x-auto no-scrollbar justify-start sm:justify-center w-full sm:w-auto">
              <TabsTrigger value="all" className="px-6 rounded-lg font-bold text-xs">All Findings</TabsTrigger>
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

          <div className="max-w-4xl mx-auto mb-12 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="h-3.5 w-3.5" />
                  <Text variant="label" className="text-[10px]">Filter by Node</Text>
                </div>
                {selectedTags.length > 0 && (
                  <button onClick={() => toggleTag('')} className="text-[10px] font-bold text-primary hover:underline w-fit">
                    Clear Nodes
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Text variant="label" className="text-[10px] text-muted-foreground shrink-0">Sort Strategy</Text>
                <Select value={sortBy} onValueChange={(val) => { setSortBy(val as SearchSortOption); setCurrentPage(1); }}>
                  <SelectTrigger className="h-10 w-full sm:w-[160px] bg-card/30 border-white/5 rounded-xl text-xs font-bold">
                    <SortAsc className="h-3.5 w-3.5 mr-2 text-primary" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="latest">Latest Updates</SelectItem>
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
                      selectedTags.includes(tag) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" : "bg-card/30 hover:bg-primary/10"
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

          <TabsContent value={activeTab} className="animate-in fade-in duration-500">
            <div className="mb-6 flex items-center justify-between px-2">
              <Text variant="bodySmall" className="text-muted-foreground font-bold italic">
                Scanning Index: <span className="text-foreground">{filteredResults.length} nodes</span> localized
              </Text>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="glass-card h-40">
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : paginatedResults.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedResults.map((result) => (
                    <Link key={result.id} href={result.route}>
                      <Card className="glass-card h-full transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/40 group">
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
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            {result.author ? (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <User className="h-3 w-3" /> {result.author}
                              </div>
                            ) : result.views ? (
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                                <TrendingUp className="h-3 w-3 text-emerald-500" /> {result.views.toLocaleString()} Views
                              </div>
                            ) : <div />}
                            
                            <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              Investigate <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              <div className="py-32 text-center bg-card/10 rounded-[3rem] border-2 border-dashed border-white/5">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchX className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <Text variant="h3" className="mb-2">No intelligence nodes found</Text>
                <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto">
                  Broaden your discovery parameters or reset all filters to resume traversal.
                </Text>
                <Button variant="link" className="mt-4 text-primary font-bold" onClick={handleResetFilters}>
                  Reset All Discovery Parameters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </Container>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Section spacing="md">
        <Suspense fallback={
          <div className="py-40 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <Text variant="bodySmall" className="animate-pulse">Initializing Discovery Engine...</Text>
          </div>
        }>
          <SearchContent />
        </Suspense>
      </Section>
    </main>
  );
}
