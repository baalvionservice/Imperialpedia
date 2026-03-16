'use client';

import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { TestimonialCard } from '@/components/common/TestimonialCard';
import { Quote, Star, ShieldCheck, Globe, Building } from 'lucide-react';

const testimonials = [
  {
    name: "Marcus Thorne",
    role: "Senior Economist",
    company: "Thorne Global",
    quote: "The structured data nodes are a game changer for our macro research. Imperialpedia provides the clarity needed for complex fiscal audits.",
    avatar: "https://picsum.photos/seed/marcus/100/100",
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Researcher",
    company: "University of Finance",
    quote: "Imperialpedia is the first platform that actually handles institutional-scale intelligence. The pSEO engine is remarkably accurate.",
    avatar: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    name: "James Wilson",
    role: "Portfolio Strategist",
    company: "Alpha Peak Assets",
    quote: "The AI analyst suite has drastically reduced our discovery time for technical benchmarks. It's an indispensable part of our daily workflow.",
    avatar: "https://picsum.photos/seed/james/100/100",
  },
  {
    name: "Elena Rodriguez",
    role: "Venture Partner",
    company: "Nexus Capital",
    quote: "The depth of the industry taxonomy allows us to perform competitive analysis across technical clusters with zero friction.",
    avatar: "https://picsum.photos/seed/elena/100/100",
  },
  {
    name: "Thomas Chen",
    role: "Data Scientist",
    company: "Quant Logic",
    quote: "Having access to 1M+ structured nodes via API has transformed how we train our proprietary financial models.",
    avatar: "https://picsum.photos/seed/thomas/100/100",
  }
];

const partners = [
  { name: "Tech University", icon: Globe },
  { name: "Global Assets Inc", icon: Building },
  { name: "Research Lab Alpha", icon: ShieldCheck },
  { name: "Institutional Wires", icon: Quote },
];

/**
 * Landing Page Testimonials Section.
 * Showcases expert feedback via an interactive, responsive carousel.
 */
export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <Container>
        <div className="max-w-3xl mb-16 px-2">
          <Text variant="label" className="text-secondary mb-4 uppercase tracking-widest">Early User Handshake</Text>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Voice of the Network</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Imperialpedia is built for the global intelligence community. Here is what our pilot testers and institutional researchers are experiencing.
          </Text>
        </div>

        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full py-4">
                    <TestimonialCard {...t} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 border-white/10 bg-card/30 hover:bg-primary hover:text-white transition-all shadow-xl" />
            <CarouselNext className="hidden md:flex -right-6 border-white/10 bg-card/30 hover:bg-primary hover:text-white transition-all shadow-xl" />
          </Carousel>
        </div>

        {/* TODO: AI-powered testimonial suggestions based on user engagement */}
        {/* TODO: Multi-language translation for quotes */}
        {/* TODO: Dynamic ordering based on credibility scores */}

        {/* Logo Bar */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <Text variant="label" className="text-center text-muted-foreground/50 mb-10 uppercase tracking-[0.3em] text-[10px]">
            Trusted by Global Institutions
          </Text>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <p.icon className="h-6 w-6 text-foreground" />
                <span className="text-sm font-bold uppercase tracking-widest">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
