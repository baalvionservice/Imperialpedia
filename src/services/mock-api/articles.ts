import { Article, PaginatedResponse, ApiResponse } from '@/types';
import { SubmittedArticle } from '@/modules/content-engine/types/article';

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
    updatedAt: new Date().toISOString(),
    status: 'published',
    readingTime: 8,
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
    updatedAt: new Date().toISOString(),
    status: 'published',
    readingTime: 5,
    meta: {
      readingTime: 5,
      viewCount: 3400,
      isFeatured: false,
    },
  },
  {
    id: 'art-sub-1',
    slug: 'future-of-central-banking',
    title: 'The Future of Central Banking in a Digital Age',
    description: 'How CBDCs and algorithmic policy are changing the role of the Fed.',
    excerpt: 'Central banks are at a crossroads as digital currencies gain traction...',
    content: 'As we move further into the 21st century, the foundational principles of central banking are being challenged by the rise of decentralized finance and digital currencies...',
    category: 'Economics',
    authorId: 'creator-1',
    tags: ['macro', 'crypto', 'banking'],
    featuredImage: 'https://picsum.photos/seed/banking/800/600',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'review',
    readingTime: 12,
  }
];

const mockSubmittedArticles: SubmittedArticle[] = [
  {
    ...mockArticles[2],
    comments: [
      { id: 'c1', userId: 'editor-1', message: 'Please clarify the section on liquidity injection.', createdAt: '2024-03-10T10:00:00Z' }
    ],
    submittedAt: '2024-03-09T15:00:00Z'
  }
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

export const getWriterDrafts = async (writerId: string): Promise<Article[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockArticles.filter((a) => a.authorId === writerId && a.status === 'draft');
};

export const getSubmittedArticles = async (): Promise<SubmittedArticle[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockSubmittedArticles;
};

export const getSubmittedArticleById = async (id: string): Promise<SubmittedArticle | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockSubmittedArticles.find(a => a.id === id) || null;
};
