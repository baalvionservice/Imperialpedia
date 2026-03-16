import { NextResponse } from 'next/server';
import technologies from '@/data/technologies.json';

/**
 * Mock Technology API Route.
 * Supports fetching all technologies or a single technology by slug.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const tech = technologies.find((t) => t.slug === slug);
    return NextResponse.json(tech || null);
  }

  return NextResponse.json(technologies);
}
