import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import Link from 'next/link';
import { ChevronRight, Layers } from 'lucide-react';
import { Section } from '@/components/ui/Section';

interface RelatedEntitiesProps {
  entities: { name: string; slug: string; type: string }[];
}

/**
 * Grid of related intelligence nodes.
 */
export const RelatedEntities = ({ entities }: RelatedEntitiesProps) => {
  if (!entities || entities.length === 0) return null;

  return (
    <Section title="Related Discovery Nodes" className="animate-in fade-in duration-1000 delay-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity) => (
          <Link key={entity.slug} href={`/${entity.type}s/${entity.slug}`} className="group">
            <Card className="glass-card border-none hover:bg-white/5 transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-background/50 border border-white/5 text-muted-foreground group-hover:text-primary transition-colors">
                    <Layers size={20} />
                  </div>
                  <div className="space-y-1">
                    <Text variant="bodySmall" className="font-bold group-hover:text-primary transition-colors">
                      {entity.name}
                    </Text>
                    <Text variant="caption" className="uppercase text-[8px] font-bold tracking-widest opacity-50">
                      {entity.type} Node
                    </Text>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
};
