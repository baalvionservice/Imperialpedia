import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/design-system/layout/section';
import { ArticleList, CategoryHeader } from '@/modules/content-engine/components';
import { getCategoryBySlug, getArticlesByCategory } from '@/modules/content-engine/services/category-service';
import { buildMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/modules/seo-engine/components/Breadcrumbs';
import { breadcrumbService } from '@/modules/seo-engine/services/breadcrumb-service';

interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic SEO metadata for the category archive page.
 */
export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getCategoryBySlug(slug);
  const category = response.data;

  if (!category) {
    return buildMetadata({
      title: 'Category Not Found',
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${category.name} Intelligence`,
    description: category.description,
  });
}

/**
 * Category Archive Page Component.
 */
export default async function CategoryPage({ params }: CategoryRouteProps) {
  const { slug } = await params;

  const [categoryResponse, articlesResponse] = await Promise.all([
    getCategoryBySlug(slug),
    getArticlesByCategory(slug),
  ]);

  const category = categoryResponse.data;
  const articles = articlesResponse.data;

  if (!category) {
    notFound();
  }

  const breadcrumbs = breadcrumbService.generateBreadcrumbForCategory(category);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs breadcrumb={breadcrumbs} />
          <CategoryHeader category={category} />
          
          <div className="mt-12">
            <ArticleList articles={articles} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
