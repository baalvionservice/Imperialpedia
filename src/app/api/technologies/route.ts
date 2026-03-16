import { NextResponse } from 'next/server';
import technologies from '@/data/technologies.json';

export async function GET() {
  return NextResponse.json(technologies);
}
