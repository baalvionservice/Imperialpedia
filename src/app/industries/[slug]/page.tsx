import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { EntityHeader } from '@/components/knowledge/EntityHeader';
import { EntityOverview } from '@/components/knowledge/EntityOverview';
import { DataTable } from '@/components/knowledge/DataTable';
import { RelatedEntities } from '@/components/knowledge/RelatedEntities';
import { env } from '@/config/env';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getIndustry(slug: string) {
  const res = await fetch(`${env.siteUrl}/api/industries?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);

  if (!industry) {
    return { title: 'Industry Not Found' };
  }

  return {
    title: `${industry.name} | Industry Intelligence | Imperialpedia`,
    description: industry.description,
    keywords: industry.tags,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const technicalData = [
    ['Market Velocity (Growth)', industry.growth_rate],
    ['Global Scale', industry.global_market_size],
    ['Primary Taxonomies', industry.tags.join(', ')]
  ];

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container>
        <EntityHeader name={industry.name} type="Industry" tags={industry.tags} />
        
        <EntityOverview 
          description={industry.description} 
          stats={[
            { label: 'Global Size', value: industry.global_market_size },
            { label: 'CAGR Target', value: industry.growth_rate },
            { label: 'Active Hubs', value: industry.top_countries.length }
          ]} 
        />

        <DataTable title="Market Architecture" headers={['Strategic Node', 'Value']} rows={technicalData} />

        <RelatedEntities 
          entities={[
            ...industry.top_countries.map((c: string) => ({ name: c.replace('-', ' '), slug: c, type: 'country' })),
            ...industry.key_companies.map((k: string) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), slug: k, type: 'company' })),
            ...industry.related_technologies.map((t: string) => ({ name: t.replace('-', ' '), slug: t, type: 'technology' }))
          ]} 
        />
      </Container>
    </main>
  );
}
