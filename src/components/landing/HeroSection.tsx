'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { WaitlistModal } from './WaitlistModal';
import { useTranslation } from 'react-i18next';

/**
 * Landing page hero section.
 * Professional, high-fidelity entry point for Imperialpedia.
 */
export const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Radiant Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none blur-[120px] opacity-20 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('hero.badge')}</Text>
          </div>

          {/* Headlines */}
          <div className="space-y-6">
            <Text variant="display" className="text-5xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              {t('hero.title')}
            </Text>
            <Text variant="body" className="text-muted-foreground text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </Text>
          </div>

          {/* CTA Area */}
          <div className="flex flex-col items-center gap-8 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button 
                size="lg" 
                onClick={() => setIsModalOpen(true)}
                className="h-16 px-10 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all scale-105 active:scale-95 group"
              >
                {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsModalOpen(true)}
                className="h-16 px-10 rounded-2xl font-bold text-lg border-white/10 bg-card/30 hover:bg-white/5 transition-all"
              >
                {t('hero.secondary_cta')}
              </Button>
            </div>

            {/* Email Form (Inline Fallback) */}
            <div id="waitlist" className="w-full">
              <WaitlistForm />
            </div>
          </div>

          {/* Social Proof / Metrics */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {[
              { icon: Globe, label: "Sovereign Nodes", value: "200+" },
              { icon: ShieldCheck, label: "Expert Analysts", value: "156" },
              { icon: Zap, label: "Real-time Wires", value: "Live" },
              { icon: Activity, label: "Search Index", value: "1.2M+" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 group cursor-default">
                <stat.icon className="h-5 w-5 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-foreground">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Waitlist & Early Access Modal */}
      <WaitlistModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};
