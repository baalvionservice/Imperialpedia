'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Brain, Database, Sparkles, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "AI Knowledge Engine",
    description: "Instant structured insights synthesized from millions of global data points in real-time.",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Global Datasets",
    description: "Unrestricted access to high-fidelity entities across countries, companies, industries, and technologies.",
    icon: Database,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Research Assistant",
    description: "Generate comprehensive reports, summaries, and tactical analysis at the push of a button.",
    icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    title: "Enterprise API",
    description: "Integrate our structured knowledge graph directly into your own institutional applications.",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

/**
 * Landing Page Features Section.
 * Highlights the core value propositions of the platform.
 */
export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 px-2">
          <Text variant="label" className="text-primary mb-4">Core Capabilities</Text>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Why Imperialpedia?</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            We provide the architectural foundation for the future of financial intelligence, merging human expertise with machine-scale data processing.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="glass-card border-none hover:border-primary/20 transition-all duration-500 group shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className={cn(
                  "p-4 rounded-2xl w-fit transition-transform group-hover:scale-110 duration-300", 
                  feature.bgColor, 
                  feature.color
                )}>
                  <feature.icon size={28} />
                </div>
                <div className="space-y-3">
                  <Text variant="h3" className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </Text>
                  <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </Text>
                </div>
                {/* TODO: Add real-time AI examples in Phase 2 */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
