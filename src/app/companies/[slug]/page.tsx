import React from 'react';
import { Container } from '@/design-system/layout/container';
import { EntityHeader } from '@/components/knowledge/EntityHeader';
import { EntityOverview } from '@/components/knowledge/EntityOverview';
import { notFound } from 'next/navigation';
import companies from '@/data/companies.json';

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const company = companies.find(c => c.slug === params.slug);
  
  if (!company) notFound();

  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <EntityHeader name={company.name} type="Company" tags={company.tags} />
        <EntityOverview 
          description={company.description} 
          stats={[
            { label: "Market Cap", value: company.market_cap },
            { label: "Ticker", value: company.ticker },
            { label: "Industry", value: company.industry }
          ]} 
        />
      </Container>
    </main>
  );
}
