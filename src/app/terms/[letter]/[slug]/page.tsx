import BodyBlock from "@/components/ui/body-block";
import { getTermBySlug } from "@/lib/data/utils";
import { buildMetadata } from "@/lib/seo";
import { terms } from "@/lib/data/terms";
import TableOfContents from "./components/TableOfContents";

export async function generateStaticParams() {
  return terms.map((term) => {
    const firstChar = term.title.charAt(0).toLowerCase();
    const letter = /^[0-9]/.test(firstChar) ? "num" : firstChar;

    return {
      letter,
      slug: term.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string; slug: string }>;
}) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};
  return buildMetadata({
    title: term.title,
    description: term.description.slice(0, 160), // use first 160 chars of description for SEO
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ letter: string; slug: string }>;
}) {
  const { slug } = await params;
  const term = getTermBySlug(slug);

  if (!term) return <div>Not found</div>;

  // Extract headings for table of contents
  const headings = term.content.filter((block) => block.type === "heading");

  return (
    <div className="min-h-screen flex gap-8 mx-auto max-w-7xl p-4 mt-16">
      {/* Table of Contents - Left Side */}
      <TableOfContents headings={headings}  />

      {/* Article Content - Right Side */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-foreground text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-wide">
          {term.title}
        </h1>
        <div className="prose-none">
          {term.content.map((block, i) => (
            <BodyBlock key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
