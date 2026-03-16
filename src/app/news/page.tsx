import { NewsArticle, newsArticles, NewsCategory } from "@/lib/data.news";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/services/format-date";
import Image from "next/image";
import Link from "next/link";

export const metadata = buildMetadata({
    title: "Financial News and Analysis",
    description:
        "Stay informed with the latest financial news, market insights, and expert analysis. Our news section covers global markets, economic trends, and investment strategies to help you make informed decisions.",
});



const CATEGORY_COLORS: Record<NewsCategory, string> = {
    Markets: "bg-blue-100 text-blue-700",
    Economy: "bg-green-100 text-green-700",
    Stocks: "bg-violet-100 text-violet-700",
    Crypto: "bg-orange-100 text-orange-700",
    "Personal Finance": "bg-teal-100 text-teal-700",
    "Real Estate": "bg-rose-100 text-rose-700",
    ETFs: "bg-indigo-100 text-indigo-700",
    Bonds: "bg-yellow-100 text-yellow-700",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: NewsCategory }) {
    return (
        <span
            className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${CATEGORY_COLORS[category]}`}
        >
            {category}
        </span>
    );
}

/** Large hero card — the featured article */
function FeaturedArticleCard({ article }: { article: NewsArticle }) {
    return (
        <Link href={`/news/${article.slug}`} className="group block">
            <div className="relative w-full md:mt-6 overflow-hidden rounded-xl aspect-[16/9] lg:aspect-[21/9]">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 75vw"
                    priority
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* text */}
                <div className="absolute bottom-0 left-0 p-5 md:p-8 space-y-3">
                    <CategoryBadge category={article.category} />
                    <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-2xl group-hover:underline underline-offset-4">
                        {article.title}
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-xl">
                        {article.excerpt}
                    </p>
                    <p className="text-gray-400 text-xs">
                        By {article.author.name} · {formatDate(article.publishedAt)} ·{" "}
                        {article.readTimeMinutes} min read
                    </p>
                </div>
            </div>
        </Link>
    );
}

/** Horizontal card (image left, text right) — for the sidebar list */
function HorizontalArticleCard({ article }: { article: NewsArticle }) {
    return (
        <Link
            href={`/news/${article.slug}`}
            className="group flex gap-3 items-center py-4 border-b border-gray-100 last:border-none"
        >
            <div className="relative flex-shrink-0 w-24 h-full rounded-lg overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                    sizes="96px"
                />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
                <CategoryBadge category={article.category} />
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h3>
                <p className="text-xs text-gray-500">
                    {formatDate(article.publishedAt)} · {article.readTimeMinutes} min
                </p>
            </div>
        </Link>
    );
}

/** Standard vertical card — image top, text bottom */
function ArticleCard({ article }: { article: NewsArticle }) {
    return (
        <Link href={`/news/${article.slug}`} className="group flex flex-col">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl mb-3">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="flex flex-col flex-1 space-y-2">
                <CategoryBadge category={article.category} />
                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 flex-1">{article.excerpt}</p>
                <p className="text-xs text-gray-400">
                    By {article.author.name} · {formatDate(article.publishedAt)}
                </p>
            </div>
        </Link>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NewsPage() {
    const featured = newsArticles.find((a) => a.featured)!;
    const sidebarArticles = newsArticles.filter((a) => !a.featured).slice(0, 3);
    const gridArticles = newsArticles.filter((a) => !a.featured).slice(3);

    return (
        <div className="bg-white min-h-screen">
            {/* ── Hero header ── */}
            <div className=" py-14 lg:py-20 text-center px-4">
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                    Latest Financial News
                </h1>
                <p className="mt-3 text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
                    Follow the latest market-moving news and the companies making it happen.
                </p>
            </div>

            {/* ── Main content ── */}
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

                {/* ── Top section: featured + sidebar ── */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar latest */}
                    <aside className="flex flex-col">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-2">
                            Latest News
                        </h2>
                        {sidebarArticles.map((article) => (
                            <HorizontalArticleCard key={article.id} article={article} />
                        ))}
                    </aside>
                    {/* Featured (takes 2/3 width) */}
                    <div className="lg:col-span-2">
                        <FeaturedArticleCard article={featured} />
                    </div>


                </section>

                {/* ── Divider ── */}
                <hr className="border-gray-200" />

                {/* ── Article grid ── */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-2">
                        More News
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}