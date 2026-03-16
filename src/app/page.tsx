import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, PenTool, Database, PieChart, ShieldCheck, Activity } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeroSection } from '@/components/landing/HeroSection';

/**
 * The main Home page for Imperialpedia.
 * This file is the authoritative entry point for the root route.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Institutional Hero Section */}
      <HeroSection />

      {/* Discovery Matrix Section */}
      <section className="py-24 bg-card/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <header className="mb-16 max-w-2xl">
            <Text variant="label" className="text-primary mb-4">Modular Ecosystem</Text>
            <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Structured Intelligence</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              Our platform is built on a scalable, modular architecture designed for institutional-grade research.
            </Text>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Content Engine', desc: 'Robust publishing system for financial articles and expert insights.', icon: BookOpen, color: 'text-primary', href: '/articles' },
              { title: 'pSEO Engine', desc: 'Programmatic infrastructure for 1M+ indexable knowledge nodes.', icon: Database, color: 'text-secondary', href: '/explore' },
              { title: 'Creator Economy', desc: 'Tools for experts to build audience and intelligence revenue.', icon: PenTool, color: 'text-primary', href: '/creators' },
              { title: 'Financial Glossary', desc: 'Deep dictionary of 5,000+ market terms and economic definitions.', icon: ShieldCheck, color: 'text-secondary', href: '/glossary' },
              { title: 'Calculators', desc: 'Precision instruments for everyday planning and wealth modeling.', icon: PieChart, color: 'text-primary', href: '/financial-tools' },
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
    </div>
  );
}

import { Text } from '@/design-system/typography/text';
import { cn } from '@/lib/utils';
