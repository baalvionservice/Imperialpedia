'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Globe, 
  Building, 
  Factory, 
  Cpu
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LanguageSelector } from '@/components/i18n/LanguageSelector';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { logEvent } from '@/lib/utils/analytics';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '/', id: 'home' },
    { label: t('nav.features'), href: '/#features', id: 'features' },
    { label: t('nav.faq'), href: '/#faq', id: 'faq' },
    { label: t('nav.pricing'), href: '/#pricing', id: 'pricing' },
  ];

  const entityLinks = [
    { label: 'Countries', href: '/countries', icon: Globe, color: 'text-primary' },
    { label: 'Companies', href: '/companies', icon: Building, color: 'text-secondary' },
    { label: 'Industries', href: '/industries', icon: Factory, color: 'text-emerald-500' },
    { label: 'Technologies', href: '/technologies', icon: Cpu, color: 'text-amber-500' },
  ];

  const handleNavClick = (label: string) => {
    logEvent("Navigation Click", "Discovery", label);
    setIsOpen(false);
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Main Platform Navigation"
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="shrink-0 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-lg outline-none" aria-label="Imperialpedia Home">
            <Text variant="h3" className="font-bold tracking-tighter text-2xl group-hover:text-primary transition-colors">
              Imperial<span className="text-foreground/60 group-hover:text-foreground">pedia</span>
            </Text>
          </Link>

          <div className="hidden lg:flex items-center gap-8 flex-1">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-all relative group/link outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                    activeSection === link.id && pathname === '/' ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                    activeSection === link.id && pathname === '/' ? "w-full" : "w-0 group-hover/link:w-full"
                  )} />
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm group">
                  {t('nav.discovery')} <ChevronDown className="h-3 w-3 group-data-[state=open]:rotate-180 transition-transform" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 glass-card border-white/10 p-2">
                  <div className="px-3 py-2 mb-1">
                    <Text variant="label" className="text-[9px] opacity-50 tracking-[0.2em]">Intelligence Hubs</Text>
                  </div>
                  {entityLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild className="rounded-xl focus:bg-primary/10 group focus:text-primary outline-none">
                      <Link href={link.href} onClick={() => handleNavClick(`Hub: ${link.label}`)} className="flex items-center gap-3 p-3 cursor-pointer">
                        <div className={cn("p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110", link.color)}>
                          <link.icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground">{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 max-w-sm ml-auto">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search Imperialpedia..." 
                  disabled
                  aria-label="Global search index"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-background/40 border border-white/5 text-sm focus:outline-none opacity-60 cursor-not-allowed"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Badge variant="outline" className="text-[8px] font-bold border-primary/20 bg-primary/5 text-primary">AI</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-card/30 border border-white/5 text-muted-foreground hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
