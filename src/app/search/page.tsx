'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { SearchResultItem } from '@/components/search/SearchResultItem';
import { Loader2, SearchX } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!q) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [q]);

  return (
    <div className="space-y-8">
      <header>
        <Text variant="h1" className="text-3xl font-bold">Search Results</Text>
        <Text variant="body" className="text-muted-foreground mt-2">
          {q ? `Showing findings for "${q}"` : 'Enter a query to explore the index.'}
        </Text>
      </header>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item: any) => (
            <SearchResultItem key={item.id} {...item} />
          ))}
        </div>
      ) : q && (
        <div className="py-20 text-center space-y-4 bg-muted/20 rounded-[3rem] border-2 border-dashed">
          <SearchX className="w-12 h-12 text-muted-foreground mx-auto" />
          <Text variant="h3">No matches localized</Text>
          <Text variant="bodySmall" className="text-muted-foreground">
            We couldn't find any knowledge nodes matching your query.
          </Text>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-20">
      <Container>
        <Suspense fallback={<div>Loading Search...</div>}>
          <SearchResultsContent />
        </Suspense>
      </Container>
    </main>
  );
}
