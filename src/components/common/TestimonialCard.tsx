'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  image: string;
  name: string;
  designation: string;
  company: string;
  quote: string;
  className?: string;
}

/**
 * A sophisticated card representing an expert endorsement.
 * Features institutional styling, trust indicators, and responsive layout.
 */
export function TestimonialCard({ image, name, designation, company, quote, className }: TestimonialCardProps) {
  return (
    <Card className={cn(
      "glass-card border-none shadow-xl bg-secondary/5 h-full transition-all duration-300 hover:border-secondary/30 group",
      className
    )}>
      <CardContent className="p-8 space-y-6 flex flex-col h-full">
        {/* Rating Nodes - Visual Trust Signals */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={14} className="fill-secondary text-secondary" />
          ))}
        </div>
        
        {/* Quote Body */}
        <Text variant="bodySmall" className="text-foreground/90 italic leading-relaxed text-base flex-grow">
          "{quote}"
        </Text>

        {/* Identity Handshake */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <Avatar className="h-12 w-12 rounded-xl border-2 border-background ring-1 ring-white/10 shadow-xl group-hover:scale-105 transition-transform">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-left">
            <Text variant="bodySmall" weight="bold" className="block text-foreground truncate">
              {name}
            </Text>
            <Text variant="caption" className="text-muted-foreground font-medium uppercase tracking-tighter text-[9px] block truncate">
              {designation} • {company}
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
