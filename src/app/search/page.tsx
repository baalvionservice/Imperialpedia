'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { Text } from '@/design-system/typography/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { Article } from '@/modules/content-engine/types';
import { getArticles, searchArticles } from '@/modules/content-engine/services';
import { SearchResults } from '@/modules/content-engine/components';

/**
 * Global search page for the Imperialpedia platform.
 * Allows users to query the entire financial intelligence index.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial dataset for in-memory searching
  useEffect(() => {
    async function loadDataset() {
      try {
        setIsLoading(true);
        const response = await getArticles(1, 100);
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to load search index', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDataset();
  }, []);

  // Real-time search handling
  useEffect(() => {
    if (query.length >= 2) {
      const filtered = searchArticles(articles, query);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, articles]);

  return (
    <main className="min-h-screen bg-background pt-20">
      <Section spacing="md">
        <Container>
          <header className="mb-12 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold">Knowledge Discovery</Text>
            </div>
            <Text variant="h1" className="mb-6">Financial Intelligence Search</Text>
            <Text variant="body" className="text-muted-foreground text-lg">
              Explore over 1,000,000 pages of deep financial insights, creator analyses, and market definitions.
            </Text>
          </header>

          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search by topic, term, or category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg rounded-2xl border-primary/20 bg-card/50 backdrop-blur-sm focus:ring-primary/40 focus:border-primary transition-all shadow-lg"
                autoFocus
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Text variant="caption" className="text-muted-foreground mr-2">Popular:</Text>
              {['Recession', 'Yield Curve', 'Compound Interest', 'Bull Market'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs font-bold text-primary/70 hover:text-primary transition-colors"
                >
                  #{term}
                </button>
              ))}
            </div>
          </div>

          <SearchResults results={results} query={query} />
        </Container>
      </Section>
    </main>
  );
}
