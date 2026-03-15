import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { glossaryService } from '@/services/data';
import { seoService } from '@/modules/seo-engine/services/seo-service';
import { JsonLd } from '@/modules/seo-engine/components/JsonLd';

interface GlossaryTermPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Programmatic SEO page for Glossary Terms.
 * Supports automated metadata and structured data generation.
 */
export async function generateMetadata({ params }: GlossaryTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await glossaryService.getTermBySlug(slug);
  const term = response.data;

  if (!term) {
    return { title: 'Term Not Found' };
  }

  return seoService.generateMetadata({
    title: `${term.term} Definition & Meaning`,
    description: term.definition,
    slug: term.slug,
    type: 'glossary',
    keywords: [term.term, term.category, 'Financial Glossary', 'Investment Terms'],
  }, '/glossary');
}

export default async function Page({ params }: GlossaryTermPageProps) {
  const { slug } = await params;
  const response = await glossaryService.getTermBySlug(slug);
  const term = response.data;

  if (!term) {
    notFound();
  }

  const jsonLd = seoService.generateStructuredData({
    title: term.term,
    description: term.definition,
    slug: term.slug,
  }, 'article'); // Using article schema for now as a fallback

  return (
    <main className="min-h-screen bg-background pt-20">
      <JsonLd data={jsonLd} />
      <Container isNarrow>
        <header className="mb-12">
          <Text variant="label" className="text-primary mb-4">{term.category}</Text>
          <Text variant="h1" className="mb-6">{term.term}</Text>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
        </header>

        <section className="prose prose-invert max-w-none">
          <Text variant="h3" className="mb-4">Definition</Text>
          <Text variant="body" className="text-lg leading-relaxed mb-8">
            {term.definition}
          </Text>

          {term.examples && term.examples.length > 0 && (
            <div className="bg-muted/30 p-8 rounded-2xl border border-white/5 mb-8">
              <Text variant="h4" className="mb-4">Examples & Context</Text>
              <ul className="space-y-4">
                {term.examples.map((example, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <Text variant="bodySmall">{example}</Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <footer className="mt-16 pt-8 border-t">
          <Text variant="label" className="mb-4">Related Intelligence</Text>
          <div className="flex flex-wrap gap-3">
            {term.relatedTerms.map((related) => (
              <a 
                key={related.slug} 
                href={`/glossary/${related.slug}`}
                className="px-4 py-2 rounded-full bg-card border hover:border-primary transition-colors text-sm"
              >
                {related.term}
              </a>
            ))}
          </div>
        </footer>
      </Container>
    </main>
  );
}
