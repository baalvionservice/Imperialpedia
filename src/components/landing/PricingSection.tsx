'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Zap } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';
import { trackEvent } from '@/lib/utils/analytics';
import { PricingCard } from '@/components/common/PricingCard';
import { useTranslation } from 'react-i18next';

/**
 * Landing Page Pricing Section.
 * Refined with animated PricingCard components and Phase 2 placeholders.
 */
export const PricingSection = () => {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  // TODO: AI-powered dynamic pricing based on user behavior
  // TODO: Personalized plan suggestions
  // TODO: Multi-currency support and localization

  const plans = [
    {
      id: "free",
      name: "Standard",
      price: "$0",
      description: "Foundational access for retail researchers.",
      features: [
        "Basic Intelligence Index access",
        "Limited knowledge node traversal",
        "Standard search queries",
        "Community forum access"
      ],
      cta: "Start Discovery",
      popular: false
    },
    {
      id: "pro",
      name: "Professional",
      price: "$49",
      description: "Unrestricted index access for serious analysts.",
      features: [
        "Full 1M+ node index traversal",
        "Unlimited AI research summaries",
        "Advanced financial calculators",
        "Priority pSEO discoverability"
      ],
      cta: "Join Waitlist",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$499",
      description: "Institutional-grade data infrastructure.",
      features: [
        "Unlimited API handshakes",
        "Custom structured datasets",
        "24/7 dedicated support node",
        "Early Phase 2 AI beta access"
      ],
      cta: "Early Access",
      popular: false
    }
  ];

  const handleCtaClick = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
    trackEvent({ category: 'CTA', action: 'Select Plan', label: planName });
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none blur-[150px] opacity-[0.08] z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="mb-20 text-center max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Zap className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">{t('pricing.label')}</Text>
          </div>
          <Text variant="h2" className="text-3xl lg:text-6xl font-bold tracking-tight">{t('pricing.title')}</Text>
          <Text variant="body" className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
            {t('pricing.subtitle')}
          </Text>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.id}
              {...plan}
              onCtaClick={handleCtaClick}
            />
          ))}
        </div>

        <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
          <Text variant="caption" className="text-muted-foreground italic leading-relaxed max-w-xl mx-auto block">
            "{t('pricing.disclaimer')}"
          </Text>
        </div>
      </div>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        title={selectedPlan ? `Secure ${selectedPlan} Access` : undefined} 
      />
    </section>
  );
};