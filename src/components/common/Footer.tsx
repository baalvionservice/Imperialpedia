'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Twitter, 
  Linkedin, 
  Github, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { WaitlistModal } from '@/components/landing/WaitlistModal';
import Newsletter from '@/components/common/Newsletter';
import { logEvent } from '@/lib/utils/analytics';

/**
 * Global Platform Footer.
 * Central hub for navigation, institutional trust signals, and legal compliance.
 */
export default function Footer() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleSocialClick = (platform: string) => {
    logEvent("Social Click", "Engagement", platform);
  };

  const navLinks = {
    platform: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: '/contact' },
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
    ]
  };

  return (
    <footer className="bg-card/30 border-t border-white/5 pt-20 pb-12 relative overflow-hidden" role="contentinfo">
      <div className="absolute -bottom-24 -left-24 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <Globe size={480} />
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          <div className="lg:col-span-4 space-y-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary tracking-tighter inline-block group outline-none">
                Imperial<span className="text-foreground transition-colors group-hover:text-primary">pedia</span>
              </Link>
              <Text variant="bodySmall" className="text-muted-foreground mt-4 leading-relaxed max-w-sm">
                The world's most scalable AI-powered financial intelligence engine. Providing deep-dive research across 1,000,000+ programmatic knowledge nodes.
              </Text>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => handleSocialClick('Twitter')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button onClick={() => handleSocialClick('LinkedIn')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button onClick={() => handleSocialClick('GitHub')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <nav className="space-y-6">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Quick Links</Text>
              <ul className="space-y-4">
                {navLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="space-y-6">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Governance</Text>
              <ul className="space-y-4">
                {navLinks.governance.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-6" id="newsletter">
            <div className="space-y-2">
              <Text variant="label" className="text-[10px] font-bold text-foreground/60 tracking-[0.2em] uppercase">Stay Synchronized</Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed block max-w-sm">
                Subscribe to the Intelligence Wire for real-time market audits and pSEO alerts.
              </Text>
            </div>
            <Newsletter />
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <Text variant="caption" className="text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Imperialpedia. AI Knowledge Infrastructure.
          </Text>
          <div className="flex items-center gap-8">
            {navLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <WaitlistModal isOpen={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </footer>
  );
}
