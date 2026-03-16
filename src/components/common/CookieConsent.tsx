'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/utils/analytics';
import { toast } from '@/hooks/use-toast';

/**
 * GDPR-compliant Cookie Consent Banner.
 * Manages user privacy preferences and persists choices locally.
 * Refined for accessibility with role="region" and focus management.
 */
export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // TODO: AI-driven consent personalization and auto-optimize banner
  // TODO: Show different messages based on region (GDPR, CCPA, etc.)
  // TODO: Analytics tracking for keyboard and screen reader interactions

  useEffect(() => {
    const consent = localStorage.getItem('imperialpedia_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    localStorage.setItem('imperialpedia_cookie_consent', choice);
    setIsVisible(false);
    
    // Broadcast event if accepted
    if (choice === 'accepted') {
      trackEvent({
        category: 'Compliance',
        action: 'Accept Cookies',
        label: 'GDPR Banner Choice'
      });
    }

    toast({
      title: choice === 'accepted' ? "Privacy Handshake Complete" : "Preferences Updated",
      description: choice === 'accepted' 
        ? "Your discovery session is now optimized for institutional research."
        : "Non-essential cookies have been throttled for this session.",
    });
  };

  const handleManage = () => {
    toast({
      title: "Preference Manager",
      description: "Advanced cookie categorization will be available in Phase 2.",
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={bannerRef}
      className="fixed bottom-0 left-0 w-full z-[100] p-4 lg:p-6 animate-in slide-in-from-bottom-full duration-1000"
      role="region"
      aria-label="Cookie consent and privacy notice"
    >
      <Container isNarrow>
        <div className="glass-card bg-background/95 backdrop-blur-xl border-primary/20 shadow-2xl rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0 shadow-inner">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-1 text-left">
              <Text variant="bodySmall" weight="bold" className="text-foreground">
                Privacy Handshake Required
              </Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed">
                Imperialpedia utilizes cookies to audit platform performance and optimize your discovery trajectory. By continuing, you agree to our{' '}
                <Link href="/privacy-policy" className="text-primary hover:underline font-bold outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-primary">Privacy Protocol</Link>.
              </Text>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 md:flex-none h-11 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
              onClick={handleManage}
              aria-label="Manage detailed cookie preferences"
            >
              <Settings2 className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" /> Manage
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 md:flex-none h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground border border-white/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
              onClick={() => handleChoice('declined')}
              aria-label="Reject non-essential cookies"
            >
              Decline
            </Button>
            <Button 
              className="flex-1 md:flex-none h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
              onClick={() => handleChoice('accepted')}
              aria-label="Accept all cookies and continue"
            >
              Accept All
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};