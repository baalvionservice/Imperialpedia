import { getTermBySlug } from "@/lib/data/utils";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};
  return buildMetadata({
    title: term.title,
    description: term.description.slice(0, 160), // use first 160 chars of description for SEO
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const term = getTermBySlug(params.slug);

  if (!term) return <div>Not found</div>;

  return (
    <div className="min-h-48 mx-auto max-w-4xl p-4 mt-16">
      <h1 className="text-foreground text-3xl md:text-5xl font-extrabold mb-6 leading-4 tracking-wider">
        {term.title}
      </h1>
      <p>{term.content}</p>
    </div>
  );
}
