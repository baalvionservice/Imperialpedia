import React from 'react';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/modules/content-engine/components';
import { Container } from '@/design-system/layout/container';
import { articlesService } from '@/services/data';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';

interface ArticleRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic SEO metadata for the article page.
 * Fetches article data on the server to populate OpenGraph and meta tags.
 */
export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await articlesService.getArticleBySlug(slug);
  const article = response.data;

  if (!article) {
    return buildMetadata({
      title: 'Article Not Found',
      description: 'The requested financial article could not be found.',
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.description || article.excerpt,
    keywords: article.tags,
    ogImage: article.featuredImage,
    ogType: 'article',
  });
}

/**
 * Supports static generation for a subset of articles.
 * For a platform targeting 1M+ pages, this would typically be used for 
 * top-tier or trending content while others are generated on-demand.
 */
export async function generateStaticParams() {
  const response = await articlesService.getArticles(1, 20);
  return response.data.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Dynamic Article Route Page Component.
 * Orchestrates the rendering of an article based on the URL slug.
 */
export default async function Page({ params }: ArticleRouteProps) {
  const { slug } = await params;

  // Initial server-side check to trigger Next.js 404 if article doesn't exist
  const response = await articlesService.getArticleBySlug(slug);
  if (!response.data) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Container className="py-8">
        {/* The ArticlePage component handles its own client-side data fetching/loading states */}
        <ArticlePage slug={slug} />
      </Container>
    </div>
  );
}
