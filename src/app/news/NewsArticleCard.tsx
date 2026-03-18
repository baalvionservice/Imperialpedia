"use client";

import Image from "next/image";
import Link from "next/link";

import type { NewsArticle, NewsCategory } from "@/lib/data.news";
import { formatDate } from "@/services/format-date";

const CATEGORY_COLORS: Record<NewsCategory, string> = {
  Markets: "bg-blue-100 text-blue-700",
  Economy: "bg-green-100 text-green-700",
  Stocks: "bg-violet-100 text-violet-700",
  Crypto: "bg-orange-100 text-orange-700",
  "Personal Finance": "bg-teal-100 text-teal-700",
  "Real Estate": "bg-rose-100 text-rose-700",
  ETFs: "bg-indigo-100 text-indigo-700",
  Bonds: "bg-yellow-100 text-yellow-700",
  Guides: "bg-gray-100 text-gray-700",
  Editorial: "bg-purple-100 text-purple-700",
};

function CategoryBadge({ category }: { category: NewsCategory }) {
  return (
    <span
      className={`inline-block  w-fit  text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}

export function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/${article.slug}`} className="group flex flex-col">
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
        <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <p className="text-xs text-gray-400">
          By {article.author.name} · {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
