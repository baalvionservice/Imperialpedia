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

async function getTechnology(slug: string) {
  const res = await fetch(`${env.siteUrl}/api/technologies?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = await getTechnology(slug);

  if (!tech) {
    return { title: 'Technology Not Found' };
  }

  return {
    title: `${tech.name} | Technology Analysis | Imperialpedia`,
    description: tech.description,
    keywords: tech.tags,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tech = await getTechnology(slug);

  if (!tech) {
    notFound();
  }

  const technicalData = [
    ['Inception Node', tech.invented_year],
    ['Primary Domain', tech.industry],
    ['Core Applications', tech.applications.join(', ')]
  ];

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <Container>
        <EntityHeader name={tech.name} type="Technology" tags={tech.tags} />
        
        <EntityOverview 
          description={tech.description} 
          stats={[
            { label: 'Innovation Node', value: tech.invented_year },
            { label: 'Application Scale', value: tech.applications.length },
            { label: 'Industry Vertical', value: tech.industry.charAt(0).toUpperCase() + tech.industry.slice(1) }
          ]} 
        />

        <DataTable title="Instructional Layer" headers={['Technical Node', 'Value']} rows={technicalData} />

        <RelatedEntities 
          entities={[
            ...tech.key_companies.map((k: string) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), slug: k, type: 'company' })),
            ...tech.related_technologies.map((t: string) => ({ name: t.replace('-', ' '), slug: t, type: 'technology' }))
          ]} 
        />
      </Container>
    </main>
  );
}
