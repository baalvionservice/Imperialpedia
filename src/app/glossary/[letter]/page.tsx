import React from "react";

import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

import { getTermsByLetter, getTermUrl } from "@/lib/data/utils";
import { Term } from "@/lib/data/terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = await params;
  const terms: Term[] = getTermsByLetter(letter);
  if (!terms || terms.length === 0) return {};
  return buildMetadata({
    title: `Financial Terms Starting with "${letter.toUpperCase()}" | Imperial Finance Glossary`,
    description: `Explore our comprehensive glossary of financial terms starting with "${letter.toUpperCase()}". From A to Z, find clear definitions and expert insights on investment, economics, and market terminology to enhance your financial literacy.`,
  });
}

/**
 * The main Glossary Index page.
 * Provides a jumping-off point for alphabetical browsing and featured terms.
 */

export default async function Page({ params }: { params: Promise<{ letter: string }> }) {
  const letter = (await params).letter;
  const terms = getTermsByLetter(letter);

  return (
    <div className="min-h-48 mx-auto max-w-4xl p-4 mt-16">
      <h1 className="my-8 text-2xl md:text-4xl">
        Terms starting with "{letter.toUpperCase()}"
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {terms.map((term) => (
          <div key={term.slug}>
            <Link href={getTermUrl(term.slug)}>
              <h2 className="mb-2 uppercase">{term.seoTitle}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
