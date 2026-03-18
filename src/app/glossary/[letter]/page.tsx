import React from 'react';

import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

import { getTermsByLetter } from "@/lib/data/utils";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = await params;
  const term = getTermsByLetter(letter);
  if (!term) return {};
  return buildMetadata({
    title: `Financial Terms Starting with "${letter.toUpperCase()}" | Imperial Finance Glossary`,
    description: `Explore our comprehensive glossary of financial terms starting with "${letter.toUpperCase()}". From A to Z, find clear definitions and expert insights on investment, economics, and market terminology to enhance your financial literacy.`,
  });
}




/**
 * The main Glossary Index page.
 * Provides a jumping-off point for alphabetical browsing and featured terms.
 */

export default function Page({ params }: { params: { letter: string } }) {
  const terms = getTermsByLetter(params.letter);

  return (
    <div className='min-h-48 mx-auto max-w-4xl p-4 mt-16'>
      <h1 className='my-8 text-2xl md:text-4xl'>Terms starting with "{params.letter.toUpperCase()}"</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {terms.map((term) => (
          <div key={term.slug}>
            <Link href={`/terms/${term.slug}`}>
              <h2 className='mb-2'>{term.title}</h2>
            </Link>
            {/* <p>{term.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}