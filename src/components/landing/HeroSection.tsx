'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';
import { WaitlistModal } from './WaitlistModal';
import { useTranslation } from 'react-i18next';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * Enhanced Landing Page Hero Section.
 * Features animated typography, high-fidelity CTAs, and optimized visual intelligence.
 * priority={true} is set on the hero image to optimize LCP.
 * // TODO: AI-driven predictive pre-loading for above-the-fold content
 */
export const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Placeholder for future data node async loading
  const { t } = useTranslation('common');
  
  // Retrieve hero image from institutional placeholder registry
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  const handleCtaClick = (type: 'Primary' | 'Secondary') => {
    trackEvent({
      category: 'CTA',
      action: 'Click',
      label: `Hero ${type} - ${type === 'Primary' ? 'Waitlist' : 'Early Access'}`
    });
    setIsModalOpen(true);
  };

  return (
    <section 
      role="banner"
      aria-label="Imperialpedia Hero"
      className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden"
    >
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
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          {/* Animated Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both">
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('hero.badge')}</Text>
          </div>

          {/* Precision Headlines with Entrance Animations */}
          <div className="space-y-6">
            <Text 
              variant="display" 
              as="h1"
              className="text-5xl lg:text-8xl font-bold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
            >
              {t('hero.title')}
            </Text>
            <Text 
              variant="body" 
              className="text-muted-foreground text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both"
            >
              {t('hero.subtitle')}
            </Text>
          </div>

          {/* Interactive CTA Hub */}
          <div className="flex flex-col items-center gap-8 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button 
                size="lg" 
                onClick={() => handleCtaClick('Primary')}
                className="h-16 px-10 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all scale-105 active:scale-95 group relative overflow-hidden focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-2"
                aria-label={`${t('hero.cta')} - Opens waitlist portal`}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => handleCtaClick('Secondary')}
                className="h-16 px-10 rounded-2xl font-bold text-lg border-white/10 bg-card/30 hover:bg-white/5 hover:border-primary/30 transition-all focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-2"
                aria-label={`${t('hero.secondary_cta')} - Learn more about early access`}
              >
                {t('hero.secondary_cta')}
              </Button>
            </div>

            {/* Email Acquisition Handshake */}
            <div id="waitlist" className="w-full">
              <WaitlistForm />
            </div>
          </div>

          {/* Responsive Visual Intelligence Layer - priority={true} for LCP optimization */}
          <div className="pt-16 lg:pt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 fill-mode-both">
            <div className="relative aspect-[21/9] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 bg-card/30 group">
              <Image 
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1200/600"}
                alt={heroImage?.description || "Imperialpedia Intelligence Index Interface"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={true}
                data-ai-hint={heroImage?.imageHint || "financial data"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" aria-hidden="true" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem]" aria-hidden="true" />
            </div>
          </div>

          {/* Institutional Telemetry Grid */}
          <div 
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 animate-in fade-in duration-1000 delay-1000 fill-mode-both"
            role="group"
            aria-label="Platform Statistics"
          >
            {[
              { icon: Globe, label: "Sovereign Nodes", value: "200+" },
              { icon: ShieldCheck, label: "Expert Analysts", value: "156" },
              { icon: Zap, label: "Real-time Wires", value: "Live" },
              { icon: Activity, label: "Search Index", value: "1.2M+" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 group cursor-default">
                <stat.icon className="h-5 w-5 mb-2 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-xl font-bold text-foreground">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <WaitlistModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};