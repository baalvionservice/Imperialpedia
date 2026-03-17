
'use client';

import React, { useEffect, useState, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/design-system/typography/text';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Zap, 
  Globe, 
  Tag as TagIcon, 
  Loader2,
  Trash2
} from 'lucide-react';
import { adminKernel } from '@/lib/services/admin-service';
import { AdminArticle } from '@/types/admin-system';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<AdminArticle | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const found = adminKernel.getArticles().find(a => a.id === id);
    if (found) setArticle(found);
    else if (id !== 'new') router.push('/admin/content');
  }, [id]);

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    if (!article) return;
    setSaving(true);
    adminKernel.saveArticle({ ...article, status });
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast({ title: "Node Synchronized", description: `Article state set to ${status}.` });
    router.push('/admin/content');
  };

  if (!article && id !== 'new') return <div className="py-40 flex justify-center"><Loader2 className="animate-spin" /></div>;

  const currentArticle = article || { id: '', title: '', slug: '', content: '', summary: '', category: 'Economics', status: 'draft', tags: [] } as any;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" asChild>
            <Link href="/admin/content"><ArrowLeft className="h-6 w-6" /></Link>
          </Button>
          <div>
            <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Intelligence Architect</Text>
            <Text variant="h1" className="text-3xl font-bold tracking-tight">Refine Research Node</Text>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-white/10" onClick={() => handleSave('draft')}>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button className="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 shadow-xl" onClick={() => handleSave('published')}>
            <Send className="mr-2 h-4 w-4" /> Commit to Index
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Article Headline</Label>
                <Input 
                  value={currentArticle.title} 
                  onChange={e => setArticle({ ...currentArticle, title: e.target.value })}
                  className="h-14 text-xl font-bold bg-background/50 border-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Executive Summary</Label>
                <Textarea 
                  value={currentArticle.summary} 
                  onChange={e => setArticle({ ...currentArticle, summary: e.target.value })}
                  className="min-h-[100px] bg-background/50 border-white/5 italic"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Research Content (Full)</Label>
                <Textarea 
                  value={currentArticle.content} 
                  onChange={e => setArticle({ ...currentArticle, content: e.target.value })}
                  className="min-h-[400px] bg-background/50 border-white/5 font-body leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none bg-card/30">
            <CardHeader><CardTitle className="text-sm font-bold uppercase tracking-widest">Metadata Nodes</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold">Taxonomy Hub</Label>
                <Input value={currentArticle.category} onChange={e => setArticle({ ...currentArticle, category: e.target.value })} className="h-10 bg-background/50 border-white/5" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold">Search Slug</Label>
                <Input value={currentArticle.slug} onChange={e => setArticle({ ...currentArticle, slug: e.target.value })} className="h-10 bg-background/50 border-white/5 font-mono text-xs" />
              </div>
            </CardContent>
          </Card>

          <div className="p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/20 space-y-4">
            <div className="flex items-center gap-2 text-secondary font-bold text-[10px] uppercase tracking-widest">
              <Globe className="h-4 w-4" /> pSEO Integrity
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "Every research node must undergo a **Compliance Handshake** before being committed to the global 1M+ programmatic index."
            </Text>
          </div>
        </aside>
      </div>
    </div>
  );
}
