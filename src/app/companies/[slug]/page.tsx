import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/design-system/layout/container';
import { EntityHeader } from '@/components/knowledge/EntityHeader';
import { EntityOverview } from '@/components/knowledge/EntityOverview';
import { DataTable } from '@/components/knowledge/DataTable';
import { RelatedEntities } from '@/components/knowledge/RelatedEntities';
import { Section } from '@/components/ui/Section';
import { Sparkles, Activity } from 'lucide-react';
import { Text } from '@/design-system/typography/text';
import { env } from '@/config/env';
import { ApiResponse } from '@/types/api';
import { Company } from '@/types/company';
import { generateEntityMetadata } from '@/lib/seo/metadata';
import { structuredData } from '@/lib/seo/structuredData';
import { JsonLd } from '@/modules/seo-engine/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCompany(slug: string): Promise<Company | null> {
  const res = await fetch(`${env.siteUrl}/api/companies?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const response: ApiResponse<Company> = await res.json();
  return response.data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) return { title: 'Company Not Found' };
  return generateEntityMetadata(company, 'company');
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) {
    notFound();
  }

  const technicalData = [
    ['Founded', company.founded_year],
    ['Headquarters', company.headquarters],
    ['Industry', <span className="capitalize">{company.industry}</span>],
    ['Employees', company.employees.toLocaleString()],
    ['Website', <a href={company.website} target="_blank" className="text-primary hover:underline">{company.website.replace('https://', '')}</a>]
  ];

  const schema = structuredData.entity(company, 'company');

  return (
    <main className="min-h-screen bg-background pt-20 pb-32">
      <JsonLd data={schema} />
      <Container>
        <EntityHeader name={company.name} type="Company" tags={company.tags} />
        
        <EntityOverview 
          description={company.description} 
          stats={[
            { label: 'Market Cap', value: company.market_cap || 'Institutional' },
            { label: 'Industry Hub', value: company.industry.charAt(0).toUpperCase() + company.industry.slice(1) },
            { label: 'Headquarters', value: company.headquarters }
          ]} 
        />

        <DataTable title="Institutional Handshake" headers={['Attribute', 'Value']} rows={technicalData} />

        <RelatedEntities 
          entities={company.technologies.map((t: string) => ({ name: t.replace('-', ' '), slug: t, type: 'technology' }))} 
        />

        <Section title="AI Intelligence Synthesis">
          <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Sparkles size={120} className="text-primary" />
            </div>
            <div className="flex items-start gap-6 relative z-10">
              <div className="p-4 rounded-3xl bg-primary/10 text-primary shrink-0 shadow-lg">
                <Activity size={32} />
              </div>
              <div className="space-y-4">
                <Text variant="h3" className="text-2xl font-bold">Analyst Forecast</Text>
                <Text variant="body" className="text-muted-foreground italic leading-relaxed max-w-2xl">
                  "Our generative engine is currently indexing real-time sentiment and longitudinal market data for {company.name}. Full strategic audit nodes will be available following the next re-sharding cycle."
                </Text>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
