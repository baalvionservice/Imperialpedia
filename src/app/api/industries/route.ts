import { NextResponse } from 'next/server';
import industries from '@/data/industries.json';

/**
 * Industry API Route.
 * Supports:
 * - Listing all industries (with pagination)
 * - Fetching a single industry by slug
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  // FUTURE: Replace this mock logic with a database query

  if (slug) {
    const industry = industries.find((i) => i.slug === slug);
    if (!industry) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }
    return NextResponse.json({ data: industry, status: 200 });
  }

  const totalItems = industries.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = industries.slice(start, end);

  return NextResponse.json({
    data,
    status: 200,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize: limit,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  });
}
