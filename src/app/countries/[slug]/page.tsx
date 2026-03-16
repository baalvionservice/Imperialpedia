import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { EntityHeader } from '@/components/knowledge/EntityHeader';
import { EntityOverview } from '@/components/knowledge/EntityOverview';
import { DataTable } from '@/components/knowledge/DataTable';
import { RelatedEntities } from '@/components/knowledge/RelatedEntities';
import { env } from '@/config/env';
import { ApiResponse } from '@/types/api';
import { Country } from '@/types/country';
import { generateEntityMetadata } from '@/lib/seo/metadata';
import { structuredData } from '@/lib/seo/structuredData';
import { JsonLd } from '@/modules/seo-engine/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCountry(slug: string): Promise<Country | null> {
  const res = await fetch(`${env.siteUrl}/api/countries?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const response: ApiResponse<Country> = await res.json();
  return response.data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) return { title: 'Country Not Found' };
  return generateEntityMetadata(country, 'country');
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const country = await getCountry(slug);

  if (!country) {
    notFound();
  }

  const technicalData = [
    ['Capital Node', country.capital],
    ['Geo Region', country.region],
    ['Purchasing Power (GDP)', country.gdp],
    ['Currency Hub', country.currency],
    ['Identity Language', country.official_language]
  ];

  const schema = structuredData.entity(country, 'country');

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <JsonLd data={schema} />
      <Container>
        <EntityHeader name={country.name} type="Country" tags={country.tags} />
        
        <EntityOverview 
          description={country.description} 
          stats={[
            { label: 'Nominal GDP', value: country.gdp },
            { label: 'Global Region', value: country.region },
            { label: 'Population Index', value: country.population.toLocaleString() }
          ]} 
        />

        <DataTable title="Sovereign Vitals" headers={['Matrix Node', 'Value']} rows={technicalData} />

        <RelatedEntities 
          entities={[
            ...country.industries.map((i: string) => ({ name: i.charAt(0).toUpperCase() + i.slice(1), slug: i, type: 'industry' })),
            ...country.technologies.map((t: string) => ({ name: t.replace('-', ' '), slug: t, type: 'technology' }))
          ]} 
        />
      </Container>
    </main>
  );
}
