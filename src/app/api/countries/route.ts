import { NextResponse } from 'next/server';
import countries from '@/data/countries.json';

/**
 * Mock Country API Route.
 * Supports fetching all countries or a single country by slug.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const country = countries.find((c) => c.slug === slug);
    return NextResponse.json(country || null);
  }

  return NextResponse.json(countries);
}
