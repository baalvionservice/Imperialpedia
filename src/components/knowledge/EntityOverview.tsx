import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';

interface EntityOverviewProps {
  description: string;
  stats?: { label: string; value: string }[];
}

export const EntityOverview = ({ description, stats }: EntityOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Text variant="body" className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </Text>
      </div>
      <div className="space-y-4">
        {stats?.map((stat) => (
          <Card key={stat.label} className="glass-card border-none bg-primary/5">
            <CardContent className="p-4">
              <Text variant="label" className="text-[10px] opacity-50 block mb-1">{stat.label}</Text>
              <Text variant="h4" weight="bold">{stat.value}</Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
