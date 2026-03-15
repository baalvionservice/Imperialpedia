'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/design-system/layout/container';
import { Article } from '../types';
import { getArticleBySlug } from '../services/content-service';
import { ArticleHeader } from './ArticleHeader';
import { ArticleBody } from './ArticleBody';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ArticlePageProps {
  slug: string;
}

/**
 * Main article page component.
 * Handles data fetching, loading states, and orchestrates header/body rendering.
 */
export const ArticlePage = ({ slug }: ArticlePageProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const response = await getArticleBySlug(slug);
        
        if (response.data) {
          setArticle(response.data);
        } else {
          setError(response.message || 'Article not found');
        }
      } catch (err) {
        setError('An unexpected error occurred while loading the article.');
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Retrieving financial intelligence...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <Container className="py-20">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Knowledge Unavailable</AlertTitle>
          <AlertDescription>
            {error || "We couldn't find the requested financial article."}
            <div className="mt-6">
              <Button asChild variant="outline" className="border-destructive/30 hover:bg-destructive/10">
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Return Home</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <article className="py-12 lg:py-20">
      <Container isNarrow>
        <ArticleHeader article={article} />
        {/* In a real scenario, sections would be populated. 
            For this prototype, we'll assume Article type might eventually include sections 
            or we'd fetch them separately. Here we pass an empty array to satisfy the prop. */}
        <ArticleBody sections={[]} />
        
        <div className="mt-20 pt-8 border-t text-center">
          <Button variant="outline" asChild>
            <Link href="/glossary">Explore Related Terms</Link>
          </Button>
        </div>
      </Container>
    </article>
  );
};
