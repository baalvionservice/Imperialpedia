import React from 'react';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/modules/content-engine/components';
import { Container } from '@/design-system/layout/container';
import { articlesService } from '@/services/data';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/modules/seo-engine/components/Breadcrumbs';
import { breadcrumbService } from '@/modules/seo-engine/services/breadcrumb-service';
import { Article } from '@/modules/content-engine/types';

interface ArticleRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic SEO metadata for the article page.
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
 */
export async function generateStaticParams() {
  const response = await articlesService.getArticles(1, 20);
  return response.data.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Dynamic Article Route Page Component.
 */
export default async function Page({ params }: ArticleRouteProps) {
  const { slug } = await params;

  const response = await articlesService.getArticleBySlug(slug);
  const article = response.data as unknown as Article;

  if (!article) {
    notFound();
  }

  const breadcrumbs = breadcrumbService.generateBreadcrumbForArticle(article);

  return (
    <div className="bg-background min-h-screen">
      <Container className="py-8">
        <Breadcrumbs breadcrumb={breadcrumbs} />
        <ArticlePage slug={slug} />
      </Container>
    </div>
  );
}
