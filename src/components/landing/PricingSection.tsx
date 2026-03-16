/**
 * Landing Page Pricing Section.
 * Orchestrates tiered plans with dynamic rendering and conversion triggers.
 */

'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Zap } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';
import { logEvent } from '@/lib/utils/analytics';
import { PricingCard } from '@/components/common/PricingCard';
import { useTranslation } from 'react-i18next';

export const PricingSection = () => {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      description: "Foundational access for retail researchers and enthusiasts.",
      features: [
        "Basic Intelligence Index access",
        "Limited knowledge node traversal",
        "Standard search queries",
        "Community forum access"
      ],
      ctaText: "Get Started Free",
      recommended: false
    },
    {
      id: "pro",
      name: "Developer",
      price: "$49",
      description: "High-velocity suite for power users and data analysts.",
      features: [
        "Full 1M+ node index traversal",
        "Advanced financial calculators",
        "Full API Access",
        "Priority Support Node"
      ],
      ctaText: "Join Waitlist",
      recommended: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$499",
      description: "Institutional-grade research and data infrastructure.",
      features: [
        "Custom Data & Structured Reports",
        "Dedicated Account Manager",
        "Unlimited API Handshakes",
        "Early Phase 2 AI beta access"
      ],
      ctaText: "Contact Hub",
      recommended: false
    }
  ];

  const handleCtaClick = (planName: string) => {
    setSelectedPlan(planName);
    logEvent("Pricing Click", "Engagement", planName);
    setIsModalOpen(true);
  };

  return (
    <section 
      id="pricing" 
      role="region"
      aria-labelledby="pricing-heading"
      className="py-24 bg-background relative overflow-hidden scroll-mt-20"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none blur-[150px] opacity-[0.08] z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="mb-20 text-center max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Zap className="h-4 w-4" aria-hidden="true" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">{t('pricing.label')}</Text>
          </div>
          <Text variant="h2" id="pricing-heading" className="text-3xl lg:text-6xl font-bold tracking-tight">{t('pricing.title')}</Text>
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
        title={selectedPlan ? `Secure ${selectedPlan} Access` : "Join the Intelligence Network"} 
      />
    </section>
  );
};
