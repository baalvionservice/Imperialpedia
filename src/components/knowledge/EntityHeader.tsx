import React from 'react';
import { Text } from '@/design-system/typography/text';
import { Badge } from '@/components/ui/badge';

interface EntityHeaderProps {
  name: string;
  type: string;
  tags?: string[];
}

export const EntityHeader = ({ name, type, tags }: EntityHeaderProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="uppercase font-bold text-[10px] tracking-widest">
          {type}
        </Badge>
      </div>
      <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">
        {name}
      </Text>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] border-white/10">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
