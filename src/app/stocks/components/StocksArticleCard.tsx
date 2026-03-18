"use client";

import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/services/format-date";
import { StocksArticle } from "@/lib/data/data.stocks";
import { StocksCategory } from "./stocks-tab";

const CATEGORY_COLORS: Record<StocksCategory, string> = {
    "Growth Stocks": "bg-green-100 text-green-700",
    "Trending Stocks": "bg-blue-100 text-blue-700",
    "Value Stocks": "bg-yellow-100 text-yellow-700",
    "Tech Stocks": "bg-purple-100 text-purple-700",
    "Top Stocks": "bg-gray-100 text-gray-700",
    "Dividend Stocks": "bg-pink-100 text-pink-700",

};

function CategoryBadge({ category }: { category: StocksArticle["category"] }) {
  return (
    <span
      className={`inline-block  w-fit  text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}

export function StocksArticleCard({ article }: { article: StocksArticle }) {
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

