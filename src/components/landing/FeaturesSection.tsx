'use client';

import React from 'react';
import { Text } from '@/design-system/typography/text';
import { Brain, Database, Sparkles, Code } from 'lucide-react';
import { FeatureCard } from '@/components/common/FeatureCard';

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
    description: "Access millions of entities across countries, companies, industries, and technologies.",
    icon: Database,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Research Assistant",
    description: "AI-powered reports and summaries at your fingertips. High-fidelity research at scale.",
    icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    title: "Enterprise API",
    description: "Connect our structured knowledge graph directly to your institutional applications.",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

/**
 * Landing Page Features Section.
 * Highlights the core value propositions with animated discovery nodes.
 */
export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 px-2 space-y-4">
          <Text variant="label" className="text-primary font-bold uppercase tracking-[0.2em]">Core Capabilities</Text>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight">Why Imperialpedia?</Text>
          <Text variant="body" className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
            We provide the architectural foundation for the future of financial intelligence, merging human expertise with machine-scale data processing.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              index={idx}
              {...feature}
            />
          ))}
        </div>

        {/* TODO: AI-generated feature highlights based on user interest in Phase 2 */}
        {/* TODO: Dynamic feature ordering based on engagement analytics */}
        {/* TODO: Multi-language translation for feature cards has been integrated into i18n engine */}
      </div>
    </section>
  );
};
