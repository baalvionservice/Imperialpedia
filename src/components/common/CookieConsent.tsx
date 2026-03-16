'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * GDPR-compliant Cookie Consent Banner.
 * Manages user privacy preferences and persists choices locally.
 */
export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for existing consent handshake
    const consent = localStorage.getItem('imperialpedia_cookie_consent');
    if (!consent) {
      // Show banner after short delay for visual impact
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('imperialpedia_cookie_consent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);
    
    trackEvent({
      category: 'Compliance',
      action: accepted ? 'Accept Cookies' : 'Decline Cookies',
      label: 'GDPR Banner'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 lg:p-6 animate-in slide-in-from-bottom-full duration-700">
      <Container isNarrow>
        <div className="glass-card bg-background/95 backdrop-blur-xl border-primary/20 shadow-2xl rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <Text variant="bodySmall" weight="bold" className="text-foreground">
                Privacy Handshake Required
              </Text>
              <Text variant="caption" className="text-muted-foreground leading-relaxed">
                We use cookies to audit platform performance and optimize your discovery trajectory. By continuing, you agree to our{' '}
                <Link href="#" className="text-primary hover:underline font-bold">Privacy Protocol</Link>.
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              variant="ghost" 
              className="flex-1 md:flex-none h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              onClick={() => handleChoice(false)}
            >
              Decline
            </Button>
            <Button 
              className="flex-1 md:flex-none h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
              onClick={() => handleChoice(true)}
            >
              Accept All
            </Button>
          </div>
        </div>
      </Container>
      
      {/* TODO: Add multi-region GDPR / CCPA compliance rules in Phase 2 */}
      {/* TODO: Integrate AI suggestions for personalized privacy notices */}
    </div>
  );
};
