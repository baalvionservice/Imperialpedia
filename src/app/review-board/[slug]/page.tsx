import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { reviewBoardProfiles } from "../components/data.reviewboards";
import { NewsBodyBlock } from "@/lib/data.news";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = reviewBoardProfiles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
  });
}

// ─── Body block renderer ──────────────────────────────────────────────────────

function BodyBlock({ block }: { block: NewsBodyBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-foreground text-[1.0625rem] leading-[1.85] mb-5">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="text-foreground text-3xl font-bold mb-2 leading-snug">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="text-foreground text-lg font-semibold mt-7 mb-3 leading-snug">
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-foreground">
          <p className="text-foreground text-xl font-medium leading-relaxed italic mb-2">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="text-sm text-muted-foreground not-italic font-medium">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-7 rounded-xl bg-muted border border-border px-6 py-5">
          <p className="text-foreground text-[0.9375rem] leading-relaxed font-medium">
            {block.text}
          </p>
        </div>
      );

    case "list":
      return (
        <ul className="my-5 space-y-2 pl-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-foreground text-[1.0625rem] leading-relaxed"
            >
              <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={block.url}
              alt={block.caption ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-xs text-muted-foreground text-center leading-relaxed">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article = reviewBoardProfiles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <div className="bg-background min-h-screen mt-16">
      <div className="max-w-5xl flex flex-col md:flex-row mx-auto px-4 py-10">
        <div className="h-64 aspect-square w-full md:w-80 overflow-hidden rounded-lg mb-6 md:mb-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-lg mb-6 md:mb-0"
          />
        </div>
        <div className="md:ml-10 flex-1 flex flex-col justify-center">
          {/* Article body */}
          <div className="prose-none">
            {article.body.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
