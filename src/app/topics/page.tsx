import React from 'react';
import Link from 'next/link';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { Text } from '@/design-system/typography/text';
import { getTags } from '@/modules/content-engine/services/tag-service';
import { Badge } from '@/components/ui/badge';
import { Tag as TagIcon, ArrowRight, Grid as GridIcon } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata: Metadata = buildMetadata({
  title: 'Topic Index | Financial Intelligence Library',
  description: 'Explore our complete directory of financial topics, from macroeconomics and interest rates to personal wealth building strategies.',
});

/**
 * The Topics Index page.
 * Lists all available knowledge tags alphabetically with article counts.
 */
export default async function TopicsPage() {
  const response = await getTags();
  const tags = response.data.sort((a, b) => a.name.localeCompare(b.name));

  // Group tags by first letter for an organized directory feel
  const groupedTags = tags.reduce((acc, tag) => {
    const letter = tag.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(tag);
    return acc;
  }, {} as Record<string, typeof tags>);

  const letters = Object.keys(groupedTags).sort();

  return (
    <main className="min-h-screen bg-background pt-16">
      <Section spacing="md">
        <Container>
          <header className="mb-16 max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <GridIcon className="h-5 w-5" />
              <Text variant="label" className="font-bold tracking-widest">Knowledge Matrix</Text>
            </div>
            <Text variant="h1" className="mb-6">Financial Intelligence Index</Text>
            <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
              Browse our comprehensive directory of financial topics. Every specialized term is linked to deep-dive expert analysis, historical context, and real-time market insights.
            </Text>
          </header>

          <div className="grid gap-16">
            {letters.map((letter) => (
              <div key={letter} className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
                    <Text variant="h2" className="text-primary font-bold">{letter}</Text>
                  </div>
                  <div className="h-px bg-gradient-to-r from-border to-transparent flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedTags[letter].map((tag) => (
                    <Link key={tag.id} href={`/tags/${tag.slug}`} className="group">
                      <Card className="glass-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                        <CardHeader className="p-6 pb-2">
                          <div className="flex justify-between items-start mb-4">
                            <TagIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold">
                              {tag.articleCount} {tag.articleCount === 1 ? 'Insight' : 'Insights'}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                            {tag.name}
                          </CardTitle>
                          {tag.description && (
                            <CardDescription className="line-clamp-2 leading-relaxed">
                              {tag.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-4 mt-auto">
                          <div className="flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                            Explore Intelligence <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
