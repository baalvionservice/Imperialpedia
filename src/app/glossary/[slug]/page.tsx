import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { glossaryEngineService } from '@/modules/seo/services/glossary-service';
import { seoService } from '@/modules/seo-engine/services/seo-service';
import { JsonLd } from '@/modules/seo-engine/components/JsonLd';
import { AlphabetNav } from '@/modules/seo/components/AlphabetNav';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Breadcrumbs } from '@/modules/seo-engine/components/Breadcrumbs';
import { breadcrumbService } from '@/modules/seo-engine/services/breadcrumb-service';
import { canonicalService } from '@/modules/seo/services/canonical-service';
import { linkService } from '@/modules/seo/services/link-service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Intelligent pSEO Route: Handles both specific Terms and Alphabetical Browsing.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug.length === 1) {
    const letter = slug.toUpperCase();
    return seoService.generateMetadata({
      title: `Financial Terms Starting with ${letter} — Glossary Index`,
      description: `Browse all financial terms and investment definitions starting with the letter ${letter}. Part of the Imperialpedia Intelligence Index.`,
      slug: slug,
      type: 'glossary',
      keywords: [`Financial Terms ${letter}`, `Investment Glossary ${letter}`, 'pSEO'],
    }, '/glossary');
  }

  const response = await glossaryEngineService.getTermBySlug(slug);
  const term = response.data;

  if (!term) {
    return { title: 'Term Not Found' };
  }

  const canonical = canonicalService.getCanonicalTag(term.slug, 'glossary');

  return seoService.generateMetadata({
    title: `${term.term} Definition & Financial Meaning`,
    description: term.definition,
    slug: term.slug,
    type: 'glossary',
    keywords: [term.term, term.category, 'Financial Glossary', 'Investment Terms'],
  }, '/glossary');
}

export default async function GlossaryRouterPage({ params }: PageProps) {
  const { slug } = await params;

  // Handle Alphabetical Browse
  if (slug.length === 1) {
    return <AlphabetArchive letter={slug} />;
  }

  // Handle Specific Term
  const response = await glossaryEngineService.getTermBySlug(slug);
  const term = response.data;

  if (!term) {
    notFound();
  }

  // Fetch related content via Link Service
  const [relatedTerms, relatedCategories] = await Promise.all([
    linkService.getRelatedGlossaryTerms(slug),
    linkService.getRelatedCategories(term.category.toLowerCase())
  ]);

  const jsonLd = seoService.generateStructuredData({
    title: term.term,
    description: term.definition,
    slug: term.slug,
  }, 'article');

  const breadcrumbs = breadcrumbService.generateBreadcrumbForGlossary(term);

  return (
    <main className="min-h-screen bg-background pt-20">
      <JsonLd data={jsonLd} />
      <Container isNarrow>
        <Breadcrumbs breadcrumb={breadcrumbs} />

        <header className="mb-12">
          <Text variant="label" className="text-primary mb-4">{term.category}</Text>
          <Text variant="h1" className="mb-6">{term.term}</Text>
          <div className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-sm shadow-primary/20" />
        </header>

        <section className="prose prose-invert max-w-none">
          <Text variant="h3" className="mb-6 text-foreground/90">Professional Definition</Text>
          <Text variant="body" className="text-xl leading-relaxed mb-10 text-muted-foreground">
            {term.definition}
          </Text>

          {term.examples && term.examples.length > 0 && (
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <Text variant="h4" className="mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">?</span>
                Real-World Examples & Context
              </Text>
              <ul className="space-y-4">
                {term.examples.map((example, i) => (
                  <li key={i} className="flex gap-4 group">
                    <span className="text-primary font-bold shrink-0 mt-1">•</span>
                    <Text variant="bodySmall" className="group-hover:text-foreground transition-colors leading-relaxed">
                      {example}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <footer className="mt-20 pt-10 border-t space-y-12">
          <AlphabetNav activeLetter={term.term.charAt(0)} />
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <Text variant="h4">Related Intelligence</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTerms.map((related) => (
                <Link key={related.slug} href={`/glossary/${related.slug}`}>
                  <Card className="glass-card hover:border-primary/50 transition-all p-6 group">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <Text variant="label" className="text-[10px] opacity-50 uppercase tracking-widest">Term</Text>
                        <Text variant="body" className="font-bold group-hover:text-primary transition-colors">{related.term}</Text>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-secondary">
              <Layers className="h-5 w-5" />
              <Text variant="h4">Explore Categories</Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCategories.map((cat) => (
                <Link key={cat.slug} href={`/categories/${cat.slug}`}>
                  <Card className="glass-card hover:border-secondary/50 transition-all p-4 text-center group">
                    <Text variant="bodySmall" className="font-bold group-hover:text-secondary transition-colors">{cat.name}</Text>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </Container>
    </main>
  );
}

/**
 * Archive Component for single-letter browse pages.
 */
async function AlphabetArchive({ letter }: { letter: string }) {
  const response = await glossaryEngineService.getTermsByLetter(letter);
  const terms = response.data;
  const breadcrumbs = breadcrumbService.generateBreadcrumbForGlossaryLetter(letter);

  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <Breadcrumbs breadcrumb={breadcrumbs} />
        
        <header className="mb-12 max-w-3xl">
          <Text variant="label" className="text-primary mb-4">A–Z Browse</Text>
          <Text variant="h1" className="mb-6">Terms starting with "{letter.toUpperCase()}"</Text>
          <Text variant="body" className="text-muted-foreground text-lg">
            Master the terminology of the global economy. Explore all expert definitions categorized under the letter "{letter.toUpperCase()}".
          </Text>
        </header>

        <AlphabetNav activeLetter={letter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {terms.length > 0 ? (
            terms.map((term) => (
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
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-muted/20 rounded-3xl border border-dashed">
              <Text variant="h3" className="mb-4">No terms found</Text>
              <Text variant="body" className="text-muted-foreground">
                We are currently indexing definitions for this section. Check back soon.
              </Text>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
