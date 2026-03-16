import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/HeroSection';
import FooterSection from '@/components/common/FooterSection';
import { StickyCTA } from '@/components/landing/StickyCTA';
import { CtaSection } from '@/components/landing/CtaSection';
import SocialProofSection from '@/components/common/SocialProofSection';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Database, PenTool, ShieldCheck, Activity, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/landingSEO';
import { JsonLd } from '@/modules/seo-engine/components/JsonLd';
import FaqSection from '@/components/common/FaqSection';

// Skeleton fallbacks for lazy loading
import { 
  FeaturesSectionSkeleton, 
  TestimonialsSectionSkeleton, 
  PricingSectionSkeleton 
} from '@/components/landing/SectionSkeletons';

// Dynamic imports for performance optimization
const FeaturesSection = dynamic(() => import('@/components/landing/FeaturesSection').then(mod => mod.FeaturesSection), {
  loading: () => <FeaturesSectionSkeleton />,
});

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection').then(mod => mod.TestimonialsSection), {
  loading: () => <TestimonialsSectionSkeleton />,
});

const PricingSection = dynamic(() => import('@/components/landing/PricingSection').then(mod => mod.PricingSection), {
  loading: () => <PricingSectionSkeleton />,
});

/**
 * Landing Page Metadata.
 */
export const metadata = generateLandingMetadata();

/**
 * The main Home page for Imperialpedia.
 * Orchestrates the full landing page experience with performance-optimized lazy loading.
 */
export default function Home() {
  const faqs = [
    {
      question: "What is Imperialpedia?",
      answer: "Imperialpedia is an AI-powered knowledge engine providing structured global data for institutional-grade research and analysis."
    },
    {
      question: "How do I join the early access waitlist?",
      answer: "Use the 'Join Waitlist' button in the Hero or CTA section to submit your email and secure your spot in our discovery matrix."
    },
    {
      question: "Is the platform free to use?",
      answer: "Yes, foundational research access is free. Premium plans are available for advanced API throughput, custom datasets, and AI-synthesized deep dives."
    },
    {
      question: "When will the full AI suite be active?",
      answer: "Phase 2 of the Imperialpedia rollout will introduce real-time research synthesis, automated fiscal audits, and predictive catalyst scanning."
    }
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Imperialpedia",
    "url": "https://imperialpedia.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://imperialpedia.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex flex-col w-full">
      <JsonLd data={websiteSchema} />

      <HeroSection />

      <SocialProofSection />

      <FeaturesSection />

      <TestimonialsSection />

      <section className="py-24 bg-card/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <header className="mb-16 max-w-2xl px-2">
            <Text variant="label" className="text-primary mb-4 uppercase tracking-widest">Structured Ecosystem</Text>
            <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Discovery Hubs</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              Audit the world's most scalable intelligence infrastructure. Explore our specialized modules designed for professional-tier research.
            </Text>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Content Engine', desc: 'Robust publishing system for financial articles and expert insights.', icon: BookOpen, color: 'text-primary', href: '/articles' },
              { title: 'pSEO Engine', desc: 'Programmatic infrastructure for 1M+ indexable knowledge nodes.', icon: Database, color: 'text-secondary', href: '/explore' },
              { title: 'Creator Economy', desc: 'Tools for experts to build audience and intelligence revenue.', icon: PenTool, color: 'text-primary', href: '/creators' },
              { title: 'Financial Glossary', desc: 'Deep dictionary of 5,000+ market terms and economic definitions.', icon: ShieldCheck, color: 'text-secondary', href: '/glossary' },
              { title: 'Calculators', desc: 'Precision instruments for everyday planning and wealth modeling.', icon: Zap, color: 'text-primary', href: '/financial-tools' },
              { title: 'Analytics Hub', desc: 'Real-time platform insights and market trajectory telemetry.', icon: Activity, color: 'text-secondary', href: '/admin/analytics' }
            ].map((module, idx) => (
              <Card key={idx} className="glass-card p-4 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <module.icon size={80} />
                </div>
                <CardHeader>
                  <div className={cn("p-3 rounded-2xl bg-background/50 border border-white/5 w-fit mb-4 group-hover:scale-110 transition-transform", module.color)}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{module.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">{module.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold group/link" asChild>
                    <Link href={module.href}>
                      Explore Module <ArrowRight className="ml-1 h-4 w-4 transition-all group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      <PricingSection />

      <CtaSection />

      <FooterSection />

      <StickyCTA />
    </div>
  );
}
