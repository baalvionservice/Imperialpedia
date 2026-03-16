import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <Section spacing="sm">
          <Text variant="h1">Knowledge Explorer</Text>
          <Text variant="body" className="text-muted-foreground mt-4">
            Discover and navigate the Imperialpedia global index.
          </Text>
        </Section>
      </Container>
    </main>
  );
}
