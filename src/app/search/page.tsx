'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { SearchResultItem } from '@/components/search/SearchResultItem';
import { SearchBar } from '@/components/search/SearchBar';
import { Loader2, SearchX, SlidersHorizontal } from 'lucide-react';
import { SearchResult } from '@/types/search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialQ);
  }, [initialQ]);

  return (
    <div className="space-y-12">
      <header className="max-w-3xl space-y-6">
        <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Search Result Node</Text>
        <SearchBar 
          value={query} 
          onChange={(val) => {
            setQuery(val);
            performSearch(val);
          }}
          className="max-w-2xl"
        />
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <Text variant="label" className="text-muted-foreground">
              {loading ? 'Indexing findings...' : `Localized ${results.length} intelligence nodes`}
            </Text>
            <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 uppercase tracking-widest text-primary">
              <SlidersHorizontal size={14} /> Filter Results
            </Button>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <Text variant="caption" className="animate-pulse">Traversing Knowledge Matrix...</Text>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((item) => (
                <SearchResultItem key={item.id} {...item} className="bg-card/30" />
              ))}
            </div>
          ) : query && (
            <div className="py-24 text-center space-y-6 bg-muted/10 rounded-[3rem] border-2 border-dashed border-white/5">
              <SearchX className="w-16 h-16 text-muted-foreground mx-auto opacity-30" />
              <div className="space-y-2">
                <Text variant="h3" className="font-bold">No matches localized</Text>
                <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  We couldn't find any knowledge nodes matching your query in our current index sharding.
                </Text>
              </div>
              <Button variant="outline" className="rounded-xl font-bold border-primary/20 text-primary" onClick={() => setQuery('')}>
                Clear discovery parameters
              </Button>
            </div>
          )}
        </div>

        <aside className="lg:w-80 space-y-8">
          <Card className="glass-card p-6 border-none bg-primary/5">
            <Text variant="label" className="text-primary font-bold mb-4 block">Refine Taxonomy</Text>
            <div className="space-y-2">
              {['Countries', 'Companies', 'Industries', 'Technologies'].map(cat => (
                <div key={cat} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
                  <Text variant="caption" className="group-hover:text-primary transition-colors">{cat}</Text>
                  <Badge variant="outline" className="text-[8px] opacity-50">Auto</Badge>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container>
        <Suspense fallback={
          <div className="py-40 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        }>
          <SearchResultsContent />
        </Suspense>
      </Container>
    </main>
  );
}
