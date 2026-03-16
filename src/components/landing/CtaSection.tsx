'use client';

import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Sparkles, Zap, Activity } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { useTranslation } from 'react-i18next';

/**
 * High-fidelity Final CTA Section.
 * Orchestrates the primary conversion handshake at the end of the discovery cycle.
 */
export const CtaSection = () => {
  const { t } = useTranslation('common');

  // TODO: AI-powered CTA text and placement optimization in Phase 2
  // TODO: Personalized CTA for logged-in vs guest users
  // TODO: Dynamic analytics tracking for CTA conversions

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      <Container isNarrow className="relative z-10 text-center">
        <div className="space-y-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-2xl group hover:scale-110 transition-transform duration-500">
            <Sparkles className="h-12 w-12 text-primary group-hover:rotate-12 transition-transform" />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
              <Zap className="h-4 w-4" />
              <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">{t('cta.label')}</Text>
            </div>
            
            <Text variant="h2" className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              {t('cta.title')}
            </Text>
            
            <Text variant="body" className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
              {t('cta.subtitle')}
            </Text>
          </div>

          <div className="pt-8">
            <WaitlistForm />
          </div>

          <div className="pt-12 flex flex-col items-center gap-4 opacity-40">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <Activity className="h-4 w-4" /> Indexing Engine: Live
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="h-4 w-4" /> AI Analyst Kernel v4.2
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};