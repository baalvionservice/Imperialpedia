"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle, generateMockNews } from "@/data/mockNews";

export function LatestNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newsData = generateMockNews(1, 20);
      setArticles(newsData);
      setLoading(false);
    };
    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} MIN AGO`;
    if (diffInHours < 24) return `${diffInHours} HOUR${diffInHours > 1 ? "S" : ""} AGO`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white mt-12">
        <div className="max-w-3xl mx-auto px-4 py-6 animate-pulse space-y-4">
          <div className="h-7 bg-gray-200 rounded w-48 mx-auto" />
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div className="aspect-video bg-gray-200 rounded" />
            <div className="bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-36 bg-gray-100 rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  const heroStory    = articles[0];
  const rightStory   = articles[1];
  const midCards     = articles.slice(2, 5);   // image + cat + title + author
  const imageTextRow = articles.slice(5, 8);   // image + cat + title + time
  const textOnlyRow  = articles.slice(8, 11);  // no image, cat + title + time
  const trendingItems = articles.slice(0, 5);  // 5-column trending

  return (
    <div className="min-h-screen bg-white mt-12">

        {/* ── Header ── */}

       <div className="text-center pt-4 mb-4 border-b-[3px] border-yellow-400">
          <h1 className="text-lg font-bold tracking-[2px] uppercase text-[#0a2756] pb-2">
            Latest News
          </h1>
        </div>
      <div className="max-w-3xl mx-auto px-4 pb-12">

       

        {/* ── Top: hero 2/3 | right story 1/3 ── */}
        <div className="grid grid-cols-[2fr_1fr] gap-3 mb-4">

          {heroStory && (
            <div>
              <Link href={heroStory.url} className="group block">
                <div className="aspect-video relative overflow-hidden w-full">
                  <Image
                    src={heroStory.image}
                    alt={heroStory.title}
                    fill
                    className="object-cover"
                    sizes="500px"
                  />
                </div>
                <h2 className="text-[17px] font-bold leading-snug text-black group-hover:text-[#1565c0] mt-2 mb-1.5">
                  {heroStory.title}
                </h2>
              </Link>
              <span className="text-[11px] font-bold text-[#0a6bb5] mr-1.5">{heroStory.source}</span>
              <span className="text-[11px] text-gray-500 uppercase">{formatDate(heroStory.publishedAt)}</span>
            </div>
          )}

          {rightStory && (
            <div className="border-l border-gray-200 pl-3">
              <Link href={rightStory.url} className="group block">
                <div className="aspect-video relative overflow-hidden w-full mb-2">
                  <Image
                    src={rightStory.image}
                    alt={rightStory.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="flex items-start gap-1.5 flex-wrap">
                  <span className="bg-[#004a99] text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wide shrink-0 mt-0.5">
                    PRO
                  </span>
                  <span className="text-[14px] font-bold leading-snug text-black group-hover:text-[#1565c0]">
                    {rightStory.title}
                  </span>
                </div>
              </Link>
              <div className="mt-1.5">
                <span className="text-[11px] font-bold text-[#0a6bb5] mr-1.5">{rightStory.source}</span>
                <span className="text-[11px] text-gray-500 uppercase">{formatDate(rightStory.publishedAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Mid row: 3 image cards with author ── */}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4">
          {midCards.map((article) => (
            <div key={article.id}>
              <Link href={article.url} className="group block">
                <div className="aspect-video relative overflow-hidden w-full mb-1.5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <span className="text-[9px] font-bold text-[#0a6bb5] uppercase tracking-[0.5px] mb-1 block">
                  {article.category}
                </span>
                <h3 className="text-[13px] font-bold leading-snug text-black group-hover:text-[#1565c0] mb-1">
                  {article.title}
                </h3>
              </Link>
              <span className="text-[10px] font-bold text-[#0a6bb5] mr-1">{article.source}</span>
              <span className="text-[10px] text-gray-500 uppercase">{formatDate(article.publishedAt)}</span>
            </div>
          ))}
        </div>

        {/* ── Second image row: image + category + title + time ── */}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4 mt-4">
          {imageTextRow.map((article) => (
            <div key={article.id}>
              <Link href={article.url} className="group block">
                <div className="aspect-video relative overflow-hidden w-full mb-1.5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <span className="text-[9px] font-bold text-[#0a6bb5] uppercase tracking-[0.5px] mb-1 block">
                  {article.category}
                </span>
                <h3 className="text-[13px] font-bold leading-snug text-black group-hover:text-[#1565c0] mb-1">
                  {article.title}
                </h3>
              </Link>
              <span className="text-[10px] text-gray-500 uppercase">{formatDate(article.publishedAt)}</span>
            </div>
          ))}
        </div>

        {/* ── Text-only row: category + title + time, no image ── */}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4 mt-4">
          {textOnlyRow.map((article) => (
            <div key={article.id}>
              <Link href={article.url} className="group block">
                <span className="text-[9px] font-bold text-[#0a6bb5] uppercase tracking-[0.5px] mb-1 block">
                  {article.category}
                </span>
                <h3 className="text-[13px] font-bold leading-snug text-black group-hover:text-[#1565c0] mb-1">
                  {article.title}
                </h3>
              </Link>
              <span className="text-[10px] text-gray-500 uppercase">{formatDate(article.publishedAt)}</span>
            </div>
          ))}
        </div>

        {/* ── Trending Now ── */}
        <div className="mt-6 pt-4 border-t-[3px] border-yellow-400">
          <h2 className="text-[15px] font-bold tracking-[1px] uppercase text-[#0a2756] mb-4">
            Trending Now
          </h2>
          <div className="grid grid-cols-5">
            {trendingItems.map((article, i) => (
              <Link
                key={article.id}
                href={article.url}
                className="group block pl-2 pr-3 border-r-4 border-gray-200 last:border-r-0 last:pr-0"
              >
                <div className="text-[28px] font-bold text-gray-300 leading-none mb-2">
                  {i + 1}
                </div>
                <p className="text-[12px] font-bold leading-snug text-black group-hover:text-[#1565c0]">
                  {article.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* More in latest news */}
        <div className="mt-6 pt-4 border-t-[3px] border-yellow-400">
          <h2 className="text-[15px] font-bold tracking-[1px] uppercase text-[#0a2756] mb-4">
            More in Latest News
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {articles.slice(11).map((article) => (
              <div key={article.id}>
                <Link href={article.url} className="group block">
                  <div className="aspect-video relative overflow-hidden w-full mb-1.5">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#0a6bb5] uppercase tracking-[0.5px] mb-1 block">
                    {article.category}
                  </span>
                  <h3 className="text-[13px] font-bold leading-snug text-black group-hover:text-[#1565c0] mb-1">
                    {article.title}
                  </h3>
                </Link>
                <span className="text-[10px] text-gray-500 uppercase">{formatDate(article.publishedAt)}</span>
              </div>
            ))}
          </div>

      </div>
    </div>
    </div>
  );
}