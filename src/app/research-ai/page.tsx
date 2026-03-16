'use client';

import React, { useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';
import { ResearchInput } from '@/components/ai/ResearchInput';
import { ResearchResult } from '@/components/ai/ResearchResult';
import { generateSummary } from '@/lib/ai/generateSummary';

export default function ResearchAIPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const summary = await generateSummary(query);
      setResult(summary);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <Section spacing="md" className="text-center max-w-3xl mx-auto">
          <Text variant="h1">Research AI</Text>
          <Text variant="body" className="text-muted-foreground mt-4 mb-12">
            Ask complex questions and receive synthesized financial intelligence.
          </Text>
          <ResearchInput onSearch={handleSearch} loading={loading} />
        </Section>

        {result && (
          <Section spacing="sm">
            <ResearchResult summary={result} />
          </Section>
        )}
      </Container>
    </main>
  );
}
