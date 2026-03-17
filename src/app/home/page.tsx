import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { HeroSearch } from '@/components/home/HeroSearch';
import { MarketOverview } from '@/components/home/MarketOverview';
import { NewsGrid } from '@/components/home/NewsGrid';
import { LearningHub } from '@/components/home/LearningHub';
import { GlossarySpotlight } from '@/components/home/GlossarySpotlight';
import { TrendingTopics } from '@/components/home/TrendingTopics';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Financial Intelligence Hub | Market News & Education',
  description: 'Real-time market insights, expert financial analysis, and comprehensive educational nodes. Audit the global economy with Imperialpedia.',
});

/**
 * Secondary Content Homepage.
 * Engineered for high-scale discovery, SEO authority, and AdSense compliance.
 */
export default function SecondaryHomePage() {
  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-1000">
      {/* 1. HERO SECTION */}
      <HeroSearch />

      <Container className="space-y-20 pb-32">
        {/* 2. MARKET OVERVIEW (Indices & Movers) */}
        <MarketOverview />

        {/* 3. TRENDING TOPICS */}
        <TrendingTopics />

        {/* 4. BREAKING NEWS SECTION */}
        <NewsGrid />

        {/* 5. GLOSSARY SPOTLIGHT (Term of the Day) */}
        <GlossarySpotlight />

        {/* 6. FEATURED LEARNING HUB */}
        <LearningHub />

        {/* 7. FEATURED ARTICLES GRID */}
        <FeaturedGrid />
      </Container>
    </main>
  );
}
