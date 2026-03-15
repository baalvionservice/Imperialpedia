import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { Text } from '@/design-system/typography/text';
import { getCalculatorList } from '@/services/mock-api/calculators';
import { CalculatorCard } from '@/modules/calculators/components/CalculatorCard';
import { PieChart, Calculator as CalcIcon } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Financial Calculators & Tools | Imperialpedia',
  description: 'Precision instruments for wealth planning. Explore our suite of compound interest, loan, and investment calculators.',
});

/**
 * Main dashboard for the Financial Tools Platform.
 */
export default async function FinancialToolsDashboard() {
  const response = await getCalculatorList();
  const tools = response.data;

  // Group tools by category for structured display
  const categories = Array.from(new Set(tools.map(t => t.category)));

  return (
    <main className="min-h-screen bg-background pt-16">
      <Section spacing="md">
        <Container>
          <header className="mb-16 max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <PieChart className="h-5 w-5" />
              <Text variant="label" className="font-bold tracking-widest">Financial Intelligence</Text>
            </div>
            <Text variant="h1" className="mb-6">Interactive Planning Hub</Text>
            <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
              Master your financial future with our suite of precision calculators. From retirement planning to debt management, our tools provide the clarity you need to make informed fiscal decisions.
            </Text>
          </header>

          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CalcIcon className="h-5 w-5 text-primary" />
                  </div>
                  <Text variant="h3" className="font-bold">{category}</Text>
                  <div className="flex-grow h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tools
                    .filter(t => t.category === category)
                    .map((tool) => (
                      <CalculatorCard key={tool.id} tool={tool} />
                    ))
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-primary/5 border border-primary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <Text variant="h3" className="mb-4">Need a Specialized Tool?</Text>
            <Text variant="body" className="text-muted-foreground max-w-xl mx-auto mb-8">
              We are constantly expanding our intelligence index. Suggest a new financial calculator or tool to our engineering team.
            </Text>
            <button className="px-10 h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
              Request a Calculator
            </button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
