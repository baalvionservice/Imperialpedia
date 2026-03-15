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
  Layers
} from 'lucide-react';
import { SearchResult, SearchResultType, SearchSuggestion } from '@/types';
import { searchService } from '@/services/data/search-service';
import Link from 'next/link';

/**
 * Global search page for the Imperialpedia platform.
 * Supports cross-entity discovery with real-time auto-suggestions and category filtering.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
    if (query.trim().length < 2) return;

    setIsLoading(true);
    setShowSuggestions(false);
    try {
      const response = await searchService.performSearch(query);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return results;
    // Map tab values to entity types
    if (activeTab === 'topic') {
      return results.filter(r => r.type === 'topic' || r.type === 'glossary');
    }
    return results.filter(r => r.type === activeTab);
  }, [results, activeTab]);

  const getResultIcon = (type: SearchResultType) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4 text-primary" />;
      case 'author': return <User className="h-4 w-4 text-secondary" />;
      case 'calculator': return <CalcIcon className="h-4 w-4 text-primary" />;
      case 'glossary': return <Database className="h-4 w-4 text-secondary" />;
      case 'topic': return <TrendingUp className="h-4 w-4 text-primary" />;
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

          <div className="max-w-2xl mx-auto mb-12 relative" ref={searchContainerRef}>
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
                    onClick={() => { setQuery(''); setSuggestions([]); setResults([]); }}
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

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Text variant="caption" className="text-muted-foreground mr-2 font-bold uppercase tracking-tighter">Popular Queries:</Text>
              {['Yield Curve', 'Compound Interest', 'Maven', 'Recession'].map(term => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); }}
                  className="text-xs font-bold text-primary/70 hover:text-primary transition-colors hover:underline"
                >
                  #{term}
                </button>
              ))}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
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

            <TabsContent value={activeTab} className="animate-in fade-in duration-500">
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
                          
                          <div className="flex items-center justify-between mt-auto">
                            {result.author ? (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <User className="h-3 w-3" /> {result.author}
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
              ) : query.trim().length >= 2 && results.length === 0 && !isLoading ? (
                <div className="py-32 text-center bg-card/10 rounded-[3rem] border-2 border-dashed border-white/5">
                  <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchX className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                  <Text variant="h3" className="mb-2">No matching intelligence found</Text>
                  <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto">
                    We couldn't find any nodes matching "{query}". Try broadening your search terms or browsing by category.
                  </Text>
                  <Button variant="link" className="mt-4 text-primary font-bold" onClick={() => { setQuery(''); setSuggestions([]); }}>
                    Clear search query
                  </Button>
                </div>
              ) : (
                <div className="py-32 text-center opacity-30">
                  <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Text variant="h4">Awaiting Discovery</Text>
                  <Text variant="bodySmall">Enter a query above to scan the Intelligence Index.</Text>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </main>
  );
}
