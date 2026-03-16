import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  results: Array<{ name: string; type: string; slug: string }>;
  loading?: boolean;
  onItemClick?: () => void;
  query?: string;
}

/**
 * Dropdown panel for search suggestions.
 */
export const SearchResults = ({ results, loading, onItemClick, query }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Text variant="bodySmall">No results found for "{query}"</Text>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto">
      {results.map((result, idx) => (
        <SearchResultItem 
          key={`${result.slug}-${idx}`} 
          {...result} 
          onClick={onItemClick} 
        />
      ))}
    </div>
  );
};
