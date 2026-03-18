import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <Section spacing="sm">
          <Text variant="h1">About Imperialpedia</Text>
          <Text variant="body" className="text-muted-foreground mt-4 max-w-2xl">
            Building the infrastructure for the future of financial knowledge. Imperialpedia combines expert human analysis with advanced AI synthesis.
          </Text>
          <div className="mt-12 aspect-video bg-card border rounded-3xl overflow-hidden flex items-center justify-center text-muted-foreground">
            Brand Story Visual
          </div>
        </Section>
      </Container>
    </main>
  );
}
