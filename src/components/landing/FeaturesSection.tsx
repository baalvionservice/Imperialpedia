'use client';

import React from 'react';
import { Text } from '@/design-system/typography/text';
import { Brain, Database, Sparkles, Code } from 'lucide-react';
import { FeatureCard } from '@/components/common/FeatureCard';
import { useTranslation } from 'react-i18next';

/**
 * Landing Page Features Section.
 * Highlights the core value propositions with animated discovery nodes.
 */
export const FeaturesSection = () => {
  const { t } = useTranslation('common');

  // TODO: AI-generated feature highlights based on user interest in Phase 2
  // TODO: Dynamic feature ordering based on analytics
  // TODO: Translation suggestions for AI-generated knowledge pages

  const features = [
    {
      title: t('features.ai_engine'),
      description: t('features.ai_engine_desc'),
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: t('features.datasets'),
      description: t('features.datasets_desc'),
      icon: Database,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: t('features.assistant'),
      description: t('features.assistant_desc'),
      icon: Sparkles,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: t('features.api'),
      description: t('features.api_desc'),
      icon: Code,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 px-2 space-y-4">
          <Text variant="label" className="text-primary font-bold uppercase tracking-[0.2em]">{t('features.label')}</Text>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight">{t('features.title')}</Text>
          <Text variant="body" className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
            {t('features.subtitle')}
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
      </div>
    </section>
  );
};