import React from 'react';
import { Container } from '@/design-system/layout/container';
import { EntityHeader } from '@/components/knowledge/EntityHeader';
import { EntityOverview } from '@/components/knowledge/EntityOverview';
import { notFound } from 'next/navigation';
import countries from '@/data/countries.json';

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = countries.find(c => c.slug === params.slug);
  
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-background pt-20">
      <Container>
        <EntityHeader name={country.name} type="Country" tags={country.tags} />
        <EntityOverview 
          description={country.description} 
          stats={[
            { label: "Nominal GDP", value: country.gdp },
            { label: "Region", value: country.region }
          ]} 
        />
      </Container>
    </main>
  );
}
