import React from 'react';
import { notFound } from 'next/navigation';
import { getSubmittedArticleById } from '@/services/mock-api/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Text } from '@/design-system/typography/text';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  MessageSquare,
  User,
  Clock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Specialized review interface for editors to validate submissions.
 * Includes content preview, metadata check, and feedback system.
 */
export default async function ArticleReviewPage({ params }: ReviewPageProps) {
  const { id } = await params;
  const article = await getSubmittedArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/editor"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <Text variant="h1" className="text-3xl font-bold">Review Submission</Text>
            <Text variant="bodySmall" className="text-muted-foreground">validating expert analysis for platform integrity.</Text>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-primary/30 hover:bg-primary/5">
            <AlertCircle className="mr-2 h-4 w-4" /> Request Changes
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve & Publish
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="border-b pb-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3 w-3" /> {article.authorId}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {article.readingTime}m
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl lg:text-4xl leading-tight">{article.title}</CardTitle>
              <CardDescription className="text-lg italic mt-4">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="prose prose-invert max-w-none">
                <Text variant="body" className="text-lg leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Comment System */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Editorial Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-xl bg-muted/30 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-primary">{comment.userId} (Editor)</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(comment.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <Text variant="bodySmall">{comment.message}</Text>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <Textarea placeholder="Add a comment for the writer..." className="min-h-[100px] bg-card/50" />
                <Button size="sm">Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Metadata & Tools */}
        <div className="space-y-6">
          <Card className="glass-card bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Publishing Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Text variant="label" className="text-[10px] opacity-50">Slug</Text>
                <Text variant="bodySmall" className="font-mono bg-black/20 p-2 rounded block truncate">
                  {article.slug}
                </Text>
              </div>
              <div className="space-y-1">
                <Text variant="label" className="text-[10px] opacity-50">Tags</Text>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold">#{tag}</span>
                  ))}
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto text-xs text-secondary" asChild>
                <Link href={`/articles/${article.slug}`} target="_blank">
                  Preview on Live Site <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Editorial Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Factual Accuracy Verified',
                  'Tone & Style Alignment',
                  'SEO Metadata Quality',
                  'Internal Linking Depth',
                  'Financial Disclaimers Included'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="w-4 h-4 rounded border border-primary/30 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-sm bg-primary/20" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
