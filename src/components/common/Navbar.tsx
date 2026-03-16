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
  Sparkles, 
  Globe, 
  Building, 
  Factory, 
  Cpu,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { WaitlistModal } from '@/components/landing/WaitlistModal';
import { LanguageSelector } from '@/components/i18n/LanguageSelector';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

/**
 * Global Site Navigation Header.
 * Orchestrates platform-wide discovery and landing page triage.
 * Enhanced with sticky scroll behavior and active section tracking.
 */
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation('common');

  // Handle scroll telemetry for background effects and shrinking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['features', 'faq', 'pricing'];
    const observers = sections.map(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { rootMargin: '-50% 0px -50% 0%' }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [pathname]);

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

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
          : "bg-transparent border-transparent py-5"
      )}>
        <Container>
          <div className="flex items-center justify-between gap-8">
            {/* Logo Node */}
            <Link href="/" className="shrink-0 group">
              <Text variant="h3" className="font-bold tracking-tighter text-2xl group-hover:text-primary transition-colors">
                Imperial<span className="text-foreground/60 group-hover:text-foreground">pedia</span>
              </Text>
            </Link>

            {/* Desktop Navigation Cluster */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.id} 
                    href={link.href}
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest transition-all relative group/link",
                      activeSection === link.id && pathname === '/'
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      activeSection === link.id && pathname === '/' ? "w-full" : "w-0 group-hover/link:w-full"
                    )} />
                  </Link>
                ))}

                {/* Entities Discovery Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all outline-none">
                    {t('nav.discovery')} <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 glass-card border-white/10 p-2 animate-in slide-in-from-top-2 duration-300">
                    <div className="px-3 py-2 mb-1">
                      <Text variant="label" className="text-[9px] opacity-50 tracking-[0.2em]">Intelligence Hubs</Text>
                    </div>
                    {entityLinks.map((link) => (
                      <DropdownMenuItem key={link.label} asChild className="rounded-xl focus:bg-primary/10 group">
                        <Link href={link.href} className="flex items-center gap-3 p-3 cursor-pointer">
                          <div className={cn("p-2 rounded-lg bg-background/50 border border-white/5 transition-transform group-hover:scale-110", link.color)}>
                            <link.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground">{link.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* AI Search Placeholder Cluster */}
              <div className="flex-1 max-w-sm ml-auto">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search Imperialpedia..." 
                    disabled
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-background/40 border border-white/5 text-sm focus:outline-none opacity-60 cursor-not-allowed"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Badge variant="outline" className="text-[8px] font-bold border-primary/20 bg-primary/5 text-primary">AI</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              <Button 
                variant="ghost" 
                className="hidden sm:flex font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
              >
                Log In
              </Button>
              <Button 
                onClick={() => setIsWaitlistOpen(true)}
                className="rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all scale-105 active:scale-95"
              >
                {t('nav.waitlist')}
              </Button>

              {/* Mobile Trigger */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl bg-card/30 border border-white/5 text-muted-foreground hover:text-primary transition-all"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Navigation Mesh */}
        <div className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden transition-all duration-500",
          isOpen ? "max-height-[100vh] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-6 space-y-8 animate-in slide-in-from-top-4 duration-500">
            <div className="grid grid-cols-1 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl bg-card/30 border border-white/5 group",
                    activeSection === link.id && pathname === '/' ? "border-primary/40 bg-primary/5" : ""
                  )}
                >
                  <Text variant="body" weight="bold" className={cn(
                    "transition-colors",
                    activeSection === link.id && pathname === '/' ? "text-primary" : "group-hover:text-primary"
                  )}>{link.label}</Text>
                  <ArrowRight className={cn(
                    "h-4 w-4 transition-all",
                    activeSection === link.id && pathname === '/' ? "text-primary opacity-100" : "text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  )} />
                </Link>
              ))}
            </div>

            <div className="flex justify-center border-t border-white/5 pt-6">
              <LanguageSelector />
            </div>

            <div className="space-y-4">
              <Text variant="label" className="text-[10px] opacity-50 px-2 font-bold uppercase tracking-widest">Discovery Hubs</Text>
              <div className="grid grid-cols-2 gap-4">
                {entityLinks.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="p-4 rounded-2xl bg-card/30 border border-white/5 space-y-3 group"
                  >
                    <div className={cn("p-2 rounded-lg bg-background/50 border border-white/5 w-fit group-hover:scale-110 transition-transform", link.color)}>
                      <link.icon className="h-4 w-4" />
                    </div>
                    <Text variant="caption" weight="bold" className="block group-hover:text-primary transition-colors">{link.label}</Text>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <Button className="w-full h-14 rounded-2xl font-bold bg-primary" onClick={() => { setIsOpen(false); setIsWaitlistOpen(true); }}>
                {t('nav.waitlist')}
              </Button>
              <div className="flex items-center justify-center gap-3 py-2 text-emerald-500/50">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* TODO: AI-powered suggested sections based on user behavior */}
      {/* TODO: Dynamic sticky adjustments for entity pages */}
      {/* TODO: Track Navbar interactions for analytics */}

      <WaitlistModal isOpen={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </>
  );
};