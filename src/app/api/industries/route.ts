import { NextResponse } from 'next/server';
import industries from '@/data/industries.json';

/**
 * Mock Industry API Route.
 * Supports fetching all industries or a single industry by slug.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const industry = industries.find((i) => i.slug === slug);
    return NextResponse.json(industry || null);
  }

  return NextResponse.json(industries);
}
