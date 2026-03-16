import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/HeroSection';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { LandingFooter } from '@/components/landing/Footer';
import { StickyCTA } from '@/components/landing/StickyCTA';
import { Text } from '@/design-system/typography/text';
import { Container } from '@/design-system/layout/container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Database, PenTool, ShieldCheck, Activity, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/landingSEO';

// Skeleton fallbacks for lazy loading
import { 
  FeaturesSectionSkeleton, 
  TestimonialsSectionSkeleton, 
  FAQSectionSkeleton, 
  PricingSectionSkeleton 
} from '@/components/landing/SectionSkeletons';

// Dynamic imports for performance optimization (Phase 1)
const FeaturesSection = dynamic(() => import('@/components/landing/FeaturesSection').then(mod => mod.FeaturesSection), {
  loading: () => <FeaturesSectionSkeleton />,
});

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection').then(mod => mod.TestimonialsSection), {
  loading: () => <TestimonialsSectionSkeleton />,
});

const FAQSection = dynamic(() => import('@/components/landing/FAQSection').then(mod => mod.FAQSection), {
  loading: () => <FAQSectionSkeleton />,
});

const PricingSection = dynamic(() => import('@/components/landing/PricingSection').then(mod => mod.PricingSection), {
  loading: () => <PricingSectionSkeleton />,
});

/**
 * Landing Page Metadata.
 * Optimized for institutional-grade SEO and social sharing.
 * Aligned with Prompt 39 specific values.
 */
export const metadata = generateLandingMetadata();

/**
 * The main Home page for Imperialpedia.
 * Orchestrates the full landing page experience with performance-optimized lazy loading.
 */
export default function Home() {
  // TODO: AI-powered prefetching for predicted user interactions in Phase 2
  // TODO: Lazy-load AI-generated entity cards only when scrolled into view
  // TODO: Optimize third-party scripts dynamically based on engagement signals

  return (
    <div className="flex flex-col w-full">
      {/* Hero is loaded statically as it contains LCP elements */}
      <HeroSection />

      {/* Heavy sections are lazy-loaded to improve initial load performance */}
      <FeaturesSection />

      <TestimonialsSection />

      {/* Discovery Matrix Section */}
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
                      Explore Module <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <PricingSection />

      {/* Final Conversion Node */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
        <Container isNarrow className="relative z-10 text-center">
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-4">
              <Text variant="h2" className="text-4xl lg:text-6xl font-bold tracking-tight">Ready to Audit the Global Economy?</Text>
              <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
                Join our network of institutional analysts and expert researchers. Secure your node in the Imperialpedia Index today.
              </Text>
            </div>
            <div className="pt-8">
              <WaitlistForm />
            </div>
          </div>
        </Container>
      </section>

      <LandingFooter />

      <StickyCTA />
    </div>
  );
}
