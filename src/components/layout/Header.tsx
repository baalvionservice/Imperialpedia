import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import { routes } from '@/config/routes';
import { platformConfig } from '@/config/platform';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={routes.public.home} className="flex items-center space-x-2">
          <span className="text-2xl font-headline font-bold text-primary tracking-tight">
            Imperial<span className="text-foreground">pedia</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href={routes.public.glossary} className="hover:text-primary transition-colors">Glossary</Link>
          <Link href={routes.public.outline} className="hover:text-primary transition-colors">AI Outline</Link>
          <Link href={routes.public.creators} className="hover:text-primary transition-colors">Creators</Link>
          <Link href={routes.public.calculators} className="hover:text-primary transition-colors">Calculators</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="default" className="hidden sm:flex font-bold">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
