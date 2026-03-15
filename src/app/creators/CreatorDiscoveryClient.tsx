'use client';

import React, { useState, useMemo } from 'react';
import { CreatorProfile } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  TrendingUp, 
  Grid as GridIcon, 
  ChevronLeft,
  ChevronRight,
  Globe,
  Tag as TagIcon
} from 'lucide-react';
import { CreatorCard } from '@/modules/creators/components/CreatorCard';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 8;

interface CreatorDiscoveryClientProps {
  initialCreators: CreatorProfile[];
}

/**
 * Intelligent discovery engine for the Creator Economy platform.
 * Supports multi-vector search, taxonomy filtering, and dynamic pagination.
 */
export function CreatorDiscoveryClient({ initialCreators }: CreatorDiscoveryClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Derive unique categories and regions for filters
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(initialCreators.map(c => c.category))).sort()], 
    [initialCreators]
  );
  
  const regions = useMemo(() => 
    ['all', ...Array.from(new Set(initialCreators.map(c => c.region))).sort()], 
    [initialCreators]
  );

  // Search & Filter Logic
  const filteredCreators = useMemo(() => {
    return initialCreators.filter(creator => {
      const matchesSearch = 
        creator.displayName.toLowerCase().includes(search.toLowerCase()) || 
        creator.bio.toLowerCase().includes(search.toLowerCase()) ||
        creator.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || creator.region === selectedRegion;
      const matchesVerified = !verifiedOnly || creator.verified;

      return matchesSearch && matchesCategory && matchesRegion && matchesVerified;
    });
  }, [initialCreators, search, selectedCategory, selectedRegion, verifiedOnly]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCreators.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredCreators.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setVerifiedOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-10">
      {/* Search & Filter Matrix */}
      <div className="bg-card/30 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search by expert name, specialty, or bio..." 
              className="pl-12 h-14 bg-background/50 border-white/10 rounded-2xl text-lg focus:ring-primary/40 focus:border-primary transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center space-x-2 bg-background/40 px-4 py-3 rounded-2xl border border-white/5">
              <Checkbox 
                id="verified" 
                checked={verifiedOnly} 
                onCheckedChange={(val) => {
                  setVerifiedOnly(val as boolean);
                  setCurrentPage(1);
                }}
              />
              <Label htmlFor="verified" className="text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> Verified Only
              </Label>
            </div>
            
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Text variant="label" className="text-[10px] ml-1">Finance Taxonomy</Text>
            <Select value={selectedCategory} onValueChange={(val) => { setSelectedCategory(val); setCurrentPage(1); }}>
              <SelectTrigger className="h-12 bg-background/50 border-white/5 rounded-xl">
                <div className="flex items-center gap-2">
                  <TagIcon className="h-3.5 w-3.5 text-primary" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Text variant="label" className="text-[10px] ml-1">Expert Location</Text>
            <Select value={selectedRegion} onValueChange={(val) => { setSelectedRegion(val); setCurrentPage(1); }}>
              <SelectTrigger className="h-12 bg-background/50 border-white/5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-secondary" />
                  <SelectValue placeholder="Region" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {regions.map(reg => (
                  <SelectItem key={reg} value={reg}>{reg.charAt(0).toUpperCase() + reg.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Feedback */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <Text variant="bodySmall" className="text-muted-foreground font-bold italic">
          Discovery Engine: <span className="text-foreground">{filteredCreators.length} experts</span> matching your criteria
        </Text>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8"><GridIcon className="h-4 w-4 text-primary" /></Button>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedResults.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-2 border-dashed rounded-[3rem] border-white/5 bg-card/10">
          <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <Text variant="h3" className="mb-2">No experts found</Text>
          <Text variant="bodySmall" className="text-muted-foreground max-w-sm mx-auto">
            Try adjusting your location, category, or search terms to expand your results.
          </Text>
          <Button variant="link" className="mt-4 text-primary font-bold" onClick={resetFilters}>
            Clear all active filters
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl px-4 h-10 gap-2 font-bold"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                className="w-10 h-10 rounded-xl font-bold"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl px-4 h-10 gap-2 font-bold"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
