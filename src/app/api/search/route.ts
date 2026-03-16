import { NextResponse } from 'next/server';
import countries from '@/data/countries.json';
import companies from '@/data/companies.json';
import industries from '@/data/industries.json';
import technologies from '@/data/technologies.json';

/**
 * Mock Search API Route.
 * Searches across static JSON data nodes.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) return NextResponse.json([]);

  const allData = [
    ...countries.map(i => ({ ...i, type: 'country' })),
    ...companies.map(i => ({ ...i, type: 'company' })),
    ...industries.map(i => ({ ...i, type: 'industry' })),
    ...technologies.map(i => ({ ...i, type: 'technology' })),
  ];

  const results = allData.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.tags?.some(t => t.toLowerCase().includes(q))
  ).slice(0, 10);

  return NextResponse.json(results);
}
