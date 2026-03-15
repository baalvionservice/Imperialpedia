'use client';

import React, { useState, useMemo } from 'react';
import { CreatorProfile, CreatorContentItem } from '@/types';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Calendar, 
  ArrowLeft,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const ITEMS_PER_PAGE = 6;

interface CreatorContentClientProps {
  creator: CreatorProfile;
  initialContent: CreatorContentItem[];
}

/**
 * Interactive content archive for an individual creator.
 * Supports pagination, real-time filtering, and status visualization.
 */
export function CreatorContentClient({ creator, initialContent }: CreatorContentClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredContent = useMemo(() => {
    return initialContent.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.snippet?.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialContent, search]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredContent.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold text-[10px] uppercase">Published</Badge>;
      case 'scheduled': return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold text-[10px] uppercase">Scheduled</Badge>;
      default: return <Badge variant="secondary" className="opacity-70 font-bold text-[10px] uppercase">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header & Back Action */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" asChild>
            <Link href={`/creator/${creator.id}`}><ArrowLeft className="h-6 w-6" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <BookOpen className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Intelligence Archive</Text>
            </div>
            <Text variant="h1" className="text-3xl font-bold">{creator.displayName}</Text>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search archive..." 
              className="pl-10 bg-card/30 border-white/10 h-11" 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0"><Filter className="h-4 w-4" /></Button>
        </div>
      </header>

      {/* Content Grid */}
      {paginatedResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedResults.map((item) => (
            <Card key={item.id} className="glass-card flex flex-col group overflow-hidden transition-all hover:translate-y-[-4px] hover:border-primary/40 h-full">
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="text-[10px] font-bold border-primary/20 bg-primary/5 text-primary">
                    {item.category}
                  </Badge>
                  {getStatusBadge(item.status)}
                </div>
                <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 pt-2 flex-grow">
                <Text variant="bodySmall" className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                  {item.snippet || "Access high-impact financial intelligence and expert research nodes within the Imperialpedia Index."}
                </Text>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">#{tag}</span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <Text variant="caption">{(item.views / 1000).toFixed(1)}k</Text>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <Text variant="caption">{format(new Date(item.createdAt), 'MMM d, yyyy')}</Text>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="h-8 px-2 text-primary font-bold text-xs" asChild>
                  <Link href={item.status === 'published' ? `/articles/${item.slug}` : '#'}>
                    {item.status === 'published' ? 'Read Full' : 'Resume'} <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-card/10 rounded-[3rem] border-2 border-dashed border-white/5">
          <Text variant="h3" className="mb-2">No intelligence found</Text>
          <Text variant="bodySmall" className="text-muted-foreground">Try adjusting your search terms or filter criteria.</Text>
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
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
