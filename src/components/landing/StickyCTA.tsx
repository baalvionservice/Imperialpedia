'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * Sticky CTA Banner for high-conversion user acquisition.
 * Features persistent dismissal and integration with the Waitlist logic.
 * Enhanced with global toast feedback and event tracking.
 */
export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const { toast } = useToast();

  // TODO: AI-powered CTA text and placement optimization in Phase 2
  // TODO: Personalized CTA based on traversal history
  // TODO: Dynamic conversion tracking for premium tier targeting

  useEffect(() => {
    const dismissedStatus = localStorage.getItem('imperialpedia_cta_dismissed');
    if (!dismissedStatus) {
      setIsDismissed(false);
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('imperialpedia_cta_dismissed', 'true');
    trackEvent({ category: 'CTA', action: 'Dismiss', label: 'Sticky Banner' });
    setTimeout(() => setIsDismissed(true), 500);
  };

  const handleSignUpClick = () => {
    setIsModalOpen(true);
    trackEvent({ category: 'CTA', action: 'Click', label: 'Sticky Banner Signup' });
    
    toast({
      title: "Establishing Handshake",
      description: "Opening secure waitlist portal...",
    });
  };

  if (isDismissed) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl transition-all duration-700 ease-out transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        <div className="glass-card bg-primary/10 border-primary/30 shadow-2xl shadow-primary/20 rounded-[2rem] p-4 pr-12 relative group">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/20 text-primary shadow-inner">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <Text variant="bodySmall" weight="bold" className="text-foreground">
                  Join the Imperialpedia Waitlist Today
                </Text>
                <Text variant="caption" className="text-muted-foreground hidden sm:block">
                  Secure early access to 1M+ structured intelligence nodes.
                </Text>
              </div>
            </div>

            <Button 
              onClick={handleSignUpClick}
              className="h-11 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all scale-105 active:scale-95 group/btn"
            >
              Secure My Spot <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>

          <button 
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <WaitlistModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
