'use client';

import React, { useState, useMemo } from 'react';
import { CreatorProfile } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ShieldCheck, TrendingUp, Grid as GridIcon, List as ListIcon } from 'lucide-react';
import { CreatorCard } from '@/modules/creators/components/CreatorCard';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';

interface CreatorDiscoveryClientProps {
  initialCreators: CreatorProfile[];
}

export function CreatorDiscoveryClient({ initialCreators }: CreatorDiscoveryClientProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'top'>('all');
  const [category, setCategory] = useState<string | null>(null);

  const filteredCreators = useMemo(() => {
    return initialCreators.filter(creator => {
      const matchesSearch = creator.displayName.toLowerCase().includes(search.toLowerCase()) || 
                           creator.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesFilter = filter === 'all' || 
                           (filter === 'verified' && creator.verified) ||
                           (filter === 'top' && creator.stats.followersCount > 10000);
      
      const matchesCategory = !category || creator.specialties.includes(category);

      return matchesSearch && matchesFilter && matchesCategory;
    });
  }, [initialCreators, search, filter, category]);

  const categories = useMemo(() => {
    const all = initialCreators.flatMap(c => c.specialties);
    return Array.from(new Set(all)).sort();
  }, [initialCreators]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center bg-card/30 p-6 rounded-3xl border border-white/5 shadow-xl backdrop-blur-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by expert name or specialty..." 
            className="pl-12 h-14 bg-background/50 border-white/10 rounded-2xl text-lg focus:ring-primary/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
            className="rounded-xl h-12 font-bold"
          >
            All Experts
          </Button>
          <Button 
            variant={filter === 'verified' ? 'default' : 'outline'} 
            onClick={() => setFilter('verified')}
            className="rounded-xl h-12 font-bold"
          >
            <ShieldCheck className="mr-2 h-4 w-4" /> Verified
          </Button>
          <Button 
            variant={filter === 'top' ? 'default' : 'outline'} 
            onClick={() => setFilter('top')}
            className="rounded-xl h-12 font-bold"
          >
            <TrendingUp className="mr-2 h-4 w-4" /> Top Tier
          </Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <Text variant="bodySmall" className="text-muted-foreground mr-2 font-bold uppercase tracking-widest text-[10px]">Specialties:</Text>
        <Badge 
          variant={category === null ? 'default' : 'outline'} 
          className="cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold"
          onClick={() => setCategory(null)}
        >
          Any
        </Badge>
        {categories.map(cat => (
          <Badge 
            key={cat}
            variant={category === cat ? 'default' : 'outline'} 
            className="cursor-pointer px-4 py-1.5 rounded-full text-xs font-bold hover:bg-primary/10 transition-colors"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Results Grid */}
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-2 border-dashed rounded-[3rem] border-white/5">
          <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <Text variant="h3" className="mb-2">No experts found</Text>
          <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto">
            Try adjusting your filters or search terms to find the intelligence expert you're looking for.
          </Text>
          <Button variant="link" className="mt-4 text-primary" onClick={() => { setSearch(''); setFilter('all'); setCategory(null); }}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
