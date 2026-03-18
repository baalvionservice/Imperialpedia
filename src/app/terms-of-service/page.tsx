import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Scale, FileText } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Traversal | Imperialpedia Agreement',
  description: 'Legal framework for utilizing the Imperialpedia Intelligence Index. Guidelines for data usage, creator rights, and institutional access.',
});

/**
 * Terms of Service Placeholder Page.
 */
export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <Container isNarrow>
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-2 text-secondary">
            <Scale className="h-5 w-5" />
            <Text variant="label" className="text-xs font-bold tracking-widest uppercase">Traversal Framework</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Terms of Service</Text>
          <Text variant="body" className="text-muted-foreground text-lg italic">
            "Establishing the rules of engagement for the world's most scalable knowledge index."
          </Text>
        </header>

        <Section spacing="sm" className="prose prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <Text variant="h3" className="text-2xl font-bold">1. Index Traversal</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              By accessing the Imperialpedia Index, you agree to utilize the intelligence provided for research and educational purposes. Automated scraping of our 1M+ nodes is strictly regulated via our API Gateway.
            </Text>
          </div>

          <div className="space-y-4">
            <Text variant="h3" className="text-2xl font-bold">2. Creator Rights</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              All expert analysis published via the Creator Studio remains the intellectual property of the author, licensed to Imperialpedia for global indexing and discovery.
            </Text>
          </div>

          <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/20 flex items-start gap-6">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <Text variant="bodySmall" weight="bold">Institutional SLA</Text>
              <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
                Enterprise and Pro-tier users are subject to additional Service Level Agreements regarding data uptime and API throughput.
              </Text>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
