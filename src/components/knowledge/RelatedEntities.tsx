import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface RelatedEntitiesProps {
  entities: { name: string; slug: string; type: string }[];
}

export const RelatedEntities = ({ entities }: RelatedEntitiesProps) => {
  return (
    <div className="space-y-4">
      <Text variant="h4" weight="bold">Related Nodes</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entities.map((entity) => (
          <Link key={entity.slug} href={`/${entity.type}s/${entity.slug}`}>
            <Card className="glass-card border-none hover:bg-white/5 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <Text variant="bodySmall" weight="bold">{entity.name}</Text>
                <ChevronRight className="h-4 w-4 text-primary" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
