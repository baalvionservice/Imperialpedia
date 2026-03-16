'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WaitlistModal } from './WaitlistModal';

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Foundational access for retail researchers.",
    features: [
      "Basic Intelligence Index access",
      "Limited knowledge node traversal",
      "Standard search queries",
      "Community forum access"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    id: "developer",
    name: "Developer",
    price: "$49",
    description: "Unrestricted index access for analysts.",
    features: [
      "Full 1M+ node index traversal",
      "Moderate API rate limits",
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

/**
 * Landing Page Pricing Section.
 * Showcases upcoming subscription tiers and strategic features.
 */
export const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleCtaClick = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none blur-[150px] opacity-10 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Zap className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Pricing Matrix</Text>
          </div>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight">Plans & Pricing</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Select the intelligence tier that fits your research requirements. Scale your discovery from retail concepts to institutional audits.
          </Text>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={cn(
                "glass-card flex flex-col h-full border-none relative overflow-hidden transition-all duration-500",
                plan.popular ? "ring-2 ring-primary/40 shadow-2xl md:scale-105 z-10" : "opacity-90 hover:opacity-100"
              )}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest text-center py-1 absolute top-0 left-0 w-full">
                  Most Popular Discovery Path
                </div>
              )}
              
              <CardHeader className={cn("p-8", plan.popular ? "pt-10" : "")}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2 text-sm">{plan.description}</CardDescription>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-muted-foreground">/mo</span>}
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-0 flex-grow">
                <div className="space-y-4">
                  <Text variant="label" className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Included Capabilities</Text>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-3 items-start group">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <Text variant="caption" className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {feature}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button 
                  onClick={() => handleCtaClick(plan.name)}
                  className={cn(
                    "w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                    plan.popular ? "bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20" : "variant-outline border-white/10"
                  )}
                >
                  {plan.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Text variant="caption" className="text-muted-foreground italic">
            "Institutional nodes requiring custom SLA handshakes should contact the Enterprise support cluster."
          </Text>
        </div>
      </div>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        title={selectedPlan ? `Join ${selectedPlan} Waitlist` : undefined} 
      />
    </section>
  );
};