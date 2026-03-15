import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, PenTool, Database, PieChart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

/**
 * Main Home Page for Imperialpedia.
 * Consolidates content to resolve routing conflicts.
 */
export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight mb-6">
              Imperialpedia — <br />
              <span className="text-primary">Financial Knowledge Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl">
              The world's most scalable financial intelligence engine. Explore over 1,000,000 pages of deep financial insights, creator insights, and programmatic SEO driven knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 font-bold text-base h-14" asChild>
                <Link href="/outline">Start Creating <PenTool className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 font-bold text-base h-14" asChild>
                <Link href="/glossary">Explore Glossary <BookOpen className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-20 pointer-events-none">
          {heroImg && (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description}
              fill
              className="object-cover"
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 bg-card/20 border-y">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">Modular Ecosystem</h2>
            <p className="text-muted-foreground">Our platform is built on a scalable, modular architecture.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Content Engine', 
                desc: 'Robust publishing system for financial articles and insights.', 
                icon: BookOpen, 
                color: 'text-primary' 
              },
              { 
                title: 'pSEO Engine', 
                desc: 'Programmatic infrastructure for 1M+ knowledge pages.', 
                icon: Database, 
                color: 'text-secondary' 
              },
              { 
                title: 'Creator Economy', 
                desc: 'Tools for financial experts to build their audience and revenue.', 
                icon: PenTool, 
                color: 'text-primary' 
              },
              { 
                title: 'Financial Glossary', 
                desc: 'Deep dictionary of market terms and complex economic concepts.', 
                icon: ShieldCheck, 
                color: 'text-secondary' 
              },
              { 
                title: 'Calculators', 
                desc: 'Precision financial instruments for everyday planning.', 
                icon: PieChart, 
                color: 'text-primary' 
              },
              { 
                title: 'Analytics Hub', 
                desc: 'Real-time platform insights and performance tracking.', 
                icon: ArrowRight, 
                color: 'text-secondary' 
              }
            ].map((module, idx) => (
              <Card key={idx} className="glass-card transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-primary/10">
                <CardHeader>
                  <module.icon className={`h-10 w-10 mb-4 ${module.color}`} />
                  <CardTitle className="font-headline text-xl">{module.title}</CardTitle>
                  <CardDescription className="font-body">{module.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto text-secondary hover:text-secondary/80 font-bold group" asChild>
                    <Link href="#">
                      Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
