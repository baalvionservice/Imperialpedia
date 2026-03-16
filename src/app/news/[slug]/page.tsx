import { NewsArticle, newsArticles, NewsBodyBlock, NewsCategory } from "@/lib/data.news";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/services/format-date";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────



const CATEGORY_COLORS: Record<NewsCategory, string> = {
  Markets: "bg-blue-100 text-blue-700 border-blue-200",
  Economy: "bg-green-100 text-green-700 border-green-200",
  Stocks: "bg-violet-100 text-violet-700 border-violet-200",
  Crypto: "bg-orange-100 text-orange-700 border-orange-200",
  "Personal Finance": "bg-teal-100 text-teal-700 border-teal-200",
  "Real Estate": "bg-rose-100 text-rose-700 border-rose-200",
  ETFs: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Bonds: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const CATEGORY_ACCENT: Record<NewsCategory, string> = {
  Markets: "border-blue-500",
  Economy: "border-green-500",
  Stocks: "border-violet-500",
  Crypto: "border-orange-500",
  "Personal Finance": "border-teal-500",
  "Real Estate": "border-rose-500",
  ETFs: "border-indigo-500",
  Bonds: "border-yellow-500",
};

// ─── Body block renderer ──────────────────────────────────────────────────────

function BodyBlock({ block }: { block: NewsBodyBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-gray-700 text-[1.0625rem] leading-[1.85] mb-5">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="text-gray-900 text-2xl font-bold mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="text-gray-900 text-lg font-semibold mt-7 mb-3 leading-snug">
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-gray-900">
          <p className="text-gray-900 text-xl font-medium leading-relaxed italic mb-2">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="text-sm text-gray-500 not-italic font-medium">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-7 rounded-xl bg-gray-50 border border-gray-200 px-6 py-5">
          <p className="text-gray-800 text-[0.9375rem] leading-relaxed font-medium">
            {block.text}
          </p>
        </div>
      );

    case "list":
      return (
        <ul className="my-5 space-y-2 pl-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-700 text-[1.0625rem] leading-relaxed">
              <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400" />
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
            <figcaption className="mt-2 text-xs text-gray-500 text-center leading-relaxed">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

// ─── Related article card ─────────────────────────────────────────────────────

function RelatedCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex gap-4 items-start">
      <div className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
          {article.category}
        </p>
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = newsArticles
    .filter((a) => a.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const accentBorder = CATEGORY_ACCENT[article.category];

  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-gray-800 transition-colors">News</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[240px]">{article.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-16">

          {/* ══ LEFT: Article ══════════════════════════════════════════════ */}
          <article>

            {/* Category + title */}
            <div className="mb-6">
              <span
                className={`inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${CATEGORY_COLORS[article.category]} mb-4`}
              >
                {article.category}
              </span>
              <h1 className="text-gray-900 text-3xl md:text-4xl font-extrabold leading-[1.2] tracking-tight">
                {article.title}
              </h1>
            </div>

            {/* Excerpt / deck */}
            <p className="text-gray-500 text-lg leading-relaxed border-l-4 pl-4 mb-6 italic border-gray-200">
              {article.excerpt}
            </p>

            {/* Byline */}
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 py-4 border-y border-gray-100 mb-8 text-sm text-gray-500`}>
              <div className="flex items-center gap-2">
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">{article.author.name}</span>
                  {article.author.title && (
                    <span className="text-gray-400"> · {article.author.title}</span>
                  )}
                </div>
              </div>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <span>{formatDate(article.publishedAt)}</span>
              {article.updatedAt && (
                <>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <span>Updated {formatDate(article.updatedAt)}</span>
                </>
              )}
              <span className="text-gray-300 hidden sm:inline">|</span>
              <span>{article.readTimeMinutes} min read</span>
            </div>

            {/* Hero image */}
            <figure className="mb-8">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
              {article.imageCaption && (
                <figcaption className="mt-2 text-xs text-gray-400 text-center">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>

          

            {/* Article body */}
            <div className="prose-none">
              {article.body.map((block, i) => (
                <BodyBlock key={i} block={block} />
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author bio box */}
            <div className="mt-10 rounded-xl bg-gray-50 border border-gray-100 p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-base font-bold text-gray-600 flex-shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{article.author.name}</p>
                {article.author.title && (
                  <p className="text-xs text-gray-500 mb-1">{article.author.title}</p>
                )}
                <p className="text-xs text-gray-500 leading-relaxed">
                  {article.author.name} covers financial markets and economic policy. Their work has been
                  cited by major financial institutions and news organizations worldwide.
                </p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <svg
                  className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>
          </article>

          {/* ══ RIGHT: Sidebar ════════════════════════════════════════════ */}
          <aside className="space-y-8">

            {/* Related articles */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-4">
                Related Articles
              </h2>
              <div className="space-y-5">
                {related.map((a) => (
                  <RelatedCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Article info card */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Article Details
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Category</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${CATEGORY_COLORS[article.category]}`}
                  >
                    {article.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Author</span>
                  <span>{article.author.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Published</span>
                  <span>{formatDate(article.publishedAt, { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                {article.updatedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Updated</span>
                    <span>{formatDate(article.updatedAt, { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Read time</span>
                  <span>{article.readTimeMinutes} min</span>
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="rounded-xl bg-gray-900 text-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Stay Informed
              </p>
              <h3 className="text-lg font-bold leading-snug mb-2">
                Get the latest market news in your inbox.
              </h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Daily briefings, market analysis, and expert commentary — free.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 mb-2"
              />
              <button className="w-full rounded-lg bg-white text-gray-900 text-sm font-bold py-2 hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}