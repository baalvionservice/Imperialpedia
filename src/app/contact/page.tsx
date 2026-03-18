import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Section } from '@/design-system/layout/section';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Mail, Globe, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = buildMetadata({
  title: 'Contact the Hub | Imperialpedia Support',
  description: 'Get in touch with the Imperialpedia governance team. Support for institutional accounts, expert onboarding, and data nodes.',
});

/**
 * Contact Placeholder Page.
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <Container isNarrow>
        <header className="mb-16 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Mail className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Communication Terminal</Text>
          </div>
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Connect with the Hub</Text>
          <Text variant="body" className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our governance team is ready to assist with institutional onboarding, technical API handshakes, or expert verification queries.
          </Text>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card bg-primary/5 border-primary/20 p-8 hover:border-primary/40 transition-all group">
            <CardContent className="p-0 space-y-6">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <Text variant="h3" className="text-2xl font-bold">Institutional Support</Text>
                <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                  Dedicated help nodes for enterprise partners and private wealth management firms.
                </Text>
              </div>
              <Text variant="body" className="font-mono text-primary font-bold">support@imperialpedia.com</Text>
            </CardContent>
          </Card>

          <Card className="glass-card bg-secondary/5 border-secondary/20 p-8 hover:border-secondary/40 transition-all group">
            <CardContent className="p-0 space-y-6">
              <div className="p-4 rounded-2xl bg-secondary/10 text-secondary w-fit group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <Text variant="h3" className="text-2xl font-bold">Expert Onboarding</Text>
                <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                  Inquiries regarding the verification matrix and creator economy opportunities.
                </Text>
              </div>
              <Text variant="body" className="font-mono text-secondary font-bold">experts@imperialpedia.com</Text>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card p-10 border-white/5 bg-card/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-[2rem] bg-background/50 border border-white/5">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-1">
                <Text variant="h4" className="font-bold">Real-time Handshake</Text>
                <Text variant="caption" className="text-muted-foreground">Typical response velocity: Under 4.2 hours.</Text>
              </div>
            </div>
            <Button size="lg" className="h-14 px-10 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              Open Support Ticket
            </Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}
