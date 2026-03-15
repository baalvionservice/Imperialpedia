import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { Text } from '@/design-system/typography/text';
import { AlphabetNav } from '@/modules/seo/components/AlphabetNav';
import { glossaryService } from '@/services/data';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Financial Glossary Index (A–Z)',
  description: 'Master the language of finance. Browse thousands of expert-vetted definitions for investment, economic, and market terminology.',
});

/**
 * The main Glossary Index page.
 * Provides a jumping-off point for alphabetical browsing and featured terms.
 */
export default async function GlossaryIndexPage() {
  const response = await glossaryService.getTerms(1, 50);
  const terms = response.data;

  return (
    <main className="min-h-screen bg-background pt-16">
      <Section spacing="md">
        <Container>
          <header className="mb-12 max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="h-5 w-5" />
              <Text variant="label" className="font-bold tracking-widest">Intelligence Directory</Text>
            </div>
            <Text variant="h1" className="mb-6">Financial Glossary</Text>
            <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
              From complex derivatives to basic accounting, our glossary provides clear, expert-vetted definitions to help you navigate the global financial landscape.
            </Text>
          </header>

          <AlphabetNav />

          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <Text variant="h3">Featured Definitions</Text>
              <Text variant="bodySmall" className="text-muted-foreground">Showing {terms.length} terms</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {terms.map((term) => (
                <Link key={term.id} href={`/glossary/${term.slug}`} className="group">
                  <Card className="glass-card hover:border-primary/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <Text variant="label" className="text-primary mb-2">{term.category}</Text>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {term.term}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {term.definition}
                      </CardDescription>
                      <div className="pt-4 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Definition <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
