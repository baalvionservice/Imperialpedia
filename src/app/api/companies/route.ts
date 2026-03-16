import { NextResponse } from 'next/server';
import companies from '@/data/companies.json';

/**
 * Mock Company API Route.
 * Supports fetching all companies or a single company by slug.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const company = companies.find((c) => c.slug === slug);
    return NextResponse.json(company || null);
  }

  return NextResponse.json(companies);
}
