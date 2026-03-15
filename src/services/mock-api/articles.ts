import { Article, PaginatedResponse, ApiResponse } from '@/types';

/**
 * @fileOverview Mock service for managing article data.
 */

const mockArticles: Article[] = [
  {
    id: 'art-1',
    slug: 'understanding-yield-curve-inversion',
    title: 'Understanding Yield Curve Inversion',
    description: 'A deep dive into what the yield curve tells us about future recessions.',
    excerpt: 'When short-term interest rates exceed long-term rates, the market is sending a signal.',
    content: 'The yield curve is a graphical representation of interest rates on debt for a range of maturities. It is often used as a benchmark for other debt in the market, such as mortgage rates or bank lending rates...',
    category: 'Economics',
    authorId: 'creator-1',
    tags: ['macro', 'interest-rates', 'recession'],
    featuredImage: 'https://picsum.photos/seed/yield/800/600',
    publishedAt: new Date().toISOString(),
    meta: {
      readingTime: 8,
      viewCount: 1250,
      isFeatured: true,
    },
  },
  {
    id: 'art-2',
    slug: 'the-power-of-compound-interest',
    title: 'The Power of Compound Interest',
    description: 'Why starting early is the most important factor in wealth building.',
    excerpt: 'Compound interest is the eighth wonder of the world. He who understands it, earns it.',
    content: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods...',
    category: 'Investing',
    authorId: 'creator-2',
    tags: ['wealth-building', 'basics', 'savings'],
    featuredImage: 'https://picsum.photos/seed/compound/800/600',
    publishedAt: new Date().toISOString(),
    meta: {
      readingTime: 5,
      viewCount: 3400,
      isFeatured: false,
    },
  },
];

export const getArticles = async (page = 1, limit = 10): Promise<PaginatedResponse<Article>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    data: mockArticles,
    status: 200,
    pagination: {
      currentPage: page,
      totalPages: 1,
      pageSize: limit,
      totalItems: mockArticles.length,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
};

export const getArticleBySlug = async (slug: string): Promise<ApiResponse<Article | null>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const article = mockArticles.find((a) => a.slug === slug) || null;
  return {
    data: article,
    status: article ? 200 : 404,
    message: article ? undefined : 'Article not found',
  };
};

export const getFeaturedArticles = async (): Promise<ApiResponse<Article[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const featured = mockArticles.filter((a) => a.meta?.isFeatured);
  return {
    data: featured,
    status: 200,
  };
};
