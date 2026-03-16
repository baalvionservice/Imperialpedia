import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Protocol | Imperialpedia Governance',
  description: 'Our commitment to data integrity and institutional privacy. Learn how Imperialpedia handles user data traversal across the intelligence index.',
});

/**
 * Privacy Policy Placeholder Page.
 */
export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <Container isNarrow>
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" />
            <Text variant="label" className="text-xs font-bold tracking-widest uppercase">Data Governance</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Privacy Protocol</Text>
          <Text variant="body" className="text-muted-foreground text-lg italic">
            "Institutional integrity begins with individual privacy. Our protocols are designed to ensure zero-leakage of your research trajectories."
          </Text>
        </header>

        <Section spacing="sm" className="prose prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <Text variant="h3" className="text-2xl font-bold">1. Data Ingestion & Usage</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              We collect minimal identify nodes required to synchronize your experience across our 1M+ indexable pages. This includes email authentication markers and preferences for specific financial taxonomies.
            </Text>
          </div>

          <div className="space-y-4">
            <Text variant="h3" className="text-2xl font-bold">2. Research Encryption</Text>
            <Text variant="body" className="text-muted-foreground leading-relaxed">
              All interactions with the AI Analyst suite are cryptographically signed. We do not sell your search queries or research interests to third-party data aggregators.
            </Text>
          </div>

          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex items-start gap-6">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <Text variant="bodySmall" weight="bold">GDPR & CCPA Compliance</Text>
              <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
                Imperialpedia is built on a global infrastructure compliant with international privacy standards. You maintain full ownership of your data nodes.
              </Text>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
