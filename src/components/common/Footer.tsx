'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Globe, 
  ShieldCheck, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Zap, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { WaitlistModal } from '@/components/landing/WaitlistModal';
import { cn } from '@/lib/utils';

/**
 * Global Platform Footer.
 * Central hub for navigation, institutional trust signals, and legal compliance.
 * Optimized for WCAG 2.1 accessibility.
 */
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const navLinks = {
    intelligence: [
      { label: 'Discovery Index', href: '/explore' },
      { label: 'Market Sentiment', href: '/community/sentiment' },
      { label: 'Knowledge Map', href: '/knowledge-map' },
      { label: 'Financial Tools', href: '/financial-tools' },
    ],
    governance: [
      { label: 'Transparency Hub', href: '/transparency' },
      { label: 'Trust Framework', href: '/creators/trust' },
      { label: 'Verified Experts', href: '/creators' },
      { label: 'Leaderboards', href: '/community/rankings' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security Audit', href: '#' },
    ]
  };

  return (
    <footer className="bg-card/30 border-t border-white/5 pt-20 pb-12 relative overflow-hidden" role="contentinfo">
      {/* Visual Background Element */}
      <div className="absolute -bottom-24 -left-24 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <Globe size={480} />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          {/* Brand & Descriptive Node */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tighter inline-block group focus-visible:ring-2 focus-visible:ring-primary rounded-lg outline-none" aria-label="Imperialpedia home">
              Imperial<span className="text-foreground transition-colors group-hover:text-primary">pedia</span>
            </Link>
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed max-w-sm">
              The world's most scalable AI-powered financial intelligence engine. Providing deep-dive research across 1,000,000+ programmatic knowledge nodes.
            </Text>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all focus-visible:ring-offset-2" aria-label="Follow us on Twitter">
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all focus-visible:ring-offset-2" aria-label="Connect on LinkedIn">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all focus-visible:ring-offset-2" aria-label="View our GitHub repositories">
                <Github className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Nav Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <nav className="space-y-6" aria-label="Platform directory">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Intelligence</Text>
              <ul className="space-y-4">
                {navLinks.intelligence.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group outline-none focus-visible:text-primary">
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="space-y-6" aria-label="Governance links">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Trust Node</Text>
              <ul className="space-y-4">
                {navLinks.governance.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors outline-none focus-visible:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => setIsWaitlistOpen(true)}
                    className="text-sm text-primary font-bold hover:underline underline-offset-4 outline-none focus-visible:underline"
                    aria-label="Join the waiting list for early access"
                  >
                    Join the Waitlist
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter Acquisition */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Stay Synchronized</Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed block">
                Subscribe to the Intelligence Wire for real-time market audits and pSEO alerts.
              </Text>
            </div>
            
            <form onSubmit={handleSubscribe} className="space-y-3" aria-label="Newsletter subscription">
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="analyst@institution.com"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  className="h-12 bg-background/50 border-white/10 rounded-xl focus:ring-primary/20 transition-all text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  size="icon"
                  aria-label="Subscribe"
                  disabled={status === 'loading' || status === 'success'}
                  className={cn(
                    "absolute right-1.5 top-1.5 h-9 w-9 rounded-lg transition-all focus-visible:ring-offset-0",
                    status === 'success' ? "bg-emerald-600 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                   status === 'success' ? <CheckCircle2 className="h-4 w-4" /> : 
                   <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
              <div aria-live="polite">
                {status === 'success' && (
                  <Text variant="caption" className="text-emerald-500 font-bold animate-in fade-in slide-in-from-top-1 px-1">
                    Handshake successful. You are subscribed.
                  </Text>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Text variant="caption" className="text-muted-foreground font-medium">
              © {new Date().getFullYear()} Imperialpedia. AI Knowledge Infrastructure.
            </Text>
            <div className="hidden md:flex items-center gap-2 text-emerald-500/40 text-[9px] font-bold uppercase tracking-[0.2em]">
              <ShieldCheck className="h-3.5 w-3.5" /> Data Traversal Encrypted
            </div>
          </div>
          
          <nav className="flex items-center gap-8" aria-label="Legal navigation">
            {navLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      {/* TODO: AI-powered dynamic footer links based on user behavior */}
      {/* TODO: Footer localization for multi-language support */}

      <WaitlistModal isOpen={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </footer>
  );
};
