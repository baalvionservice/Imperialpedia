import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { ArrowRight } from 'lucide-react';

interface SearchResultItemProps {
  name: string;
  type: string;
  slug: string;
  onClick?: () => void;
}

/**
 * Individual result item for search suggestions and full lists.
 */
export const SearchResultItem = ({ name, type, slug, onClick }: SearchResultItemProps) => {
  const getPath = () => {
    switch (type.toLowerCase()) {
      case 'country': return `/countries/${slug}`;
      case 'company': return `/companies/${slug}`;
      case 'industry': return `/industries/${slug}`;
      case 'technology': return `/technologies/${slug}`;
      default: return '#';
    }
  };

  return (
    <Link 
      href={getPath()} 
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Text variant="bodySmall" weight="bold">{name.charAt(0)}</Text>
        </div>
        <div className="space-y-1">
          <Text variant="bodySmall" weight="bold" className="group-hover:text-primary transition-colors">
            {name}
          </Text>
          <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-tighter h-5 px-1.5 border-none">
            {type}
          </Badge>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
};
