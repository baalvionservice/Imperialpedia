'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star, ShieldCheck, Globe, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

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
 * Showcases early user feedback and partner credibility.
 */
export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 px-2">
          <Text variant="label" className="text-secondary mb-4 uppercase tracking-widest">Early User Handshake</Text>
          <Text variant="h2" className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Voice of the Network</Text>
          <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
            Imperialpedia is built for the global intelligence community. Here is what our pilot testers and institutional researchers are experiencing.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="glass-card border-none hover:border-secondary/20 transition-all duration-500 group shadow-xl bg-secondary/5">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} className="fill-secondary text-secondary" />
                  ))}
                </div>
                
                <Text variant="bodySmall" className="text-foreground/90 italic leading-relaxed text-base">
                  "{t.quote}"
                </Text>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <Avatar className="h-12 w-12 rounded-xl border-2 border-background ring-1 ring-white/10">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Text variant="bodySmall" weight="bold" className="block text-foreground">
                      {t.name}
                    </Text>
                    <Text variant="caption" className="text-muted-foreground font-medium uppercase tracking-tighter text-[9px]">
                      {t.role} • {t.company}
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
      </div>
    </section>
  );
};
