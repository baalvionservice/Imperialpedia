import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <Section spacing="sm" className="text-center">
          <Text variant="h1">Intelligence Access</Text>
          <Text variant="body" className="text-muted-foreground mt-4">
            Select your tier to unlock the full depth of the Imperialpedia Index.
          </Text>
        </Section>
      </Container>
    </main>
  );
}
