'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/utils/analytics';
import { useTranslation } from 'react-i18next';

/**
 * Waitlist email collection form (Inline Version).
 * Handles state transitions for institutional early access requests.
 * Connected to global toast notifications and event tracking.
 * Optimized for WCAG 2.1 accessibility.
 */
export const WaitlistForm = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Invalid email node detected.');
      return;
    }

    setStatus('loading');
    trackEvent({ category: 'Form', action: 'Submit', label: 'Inline Waitlist' });

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
        
        toast({
          title: "Identity Secured",
          description: data.message,
        });
      } else {
        setStatus('error');
        setMessage(data.message);
        
        toast({
          variant: "destructive",
          title: "Screener Failure",
          description: data.message,
        });
      }
    } catch (err) {
      setStatus('error');
      const errorMsg = 'Network handshake failed. Try again shortly.';
      setMessage(errorMsg);
      
      toast({
        variant: "destructive",
        title: "Connection Alert",
        description: errorMsg,
      });
    }
  };

  if (status === 'success') {
    return (
      <div 
        role="alert" 
        aria-live="assertive"
        className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in zoom-in-95 duration-500"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" aria-hidden="true" />
        </div>
        <Text variant="h4" className="font-bold text-foreground">Identity Secured</Text>
        <Text variant="bodySmall" className="text-muted-foreground">{message}</Text>
      </div>
    );
  }

  return (
    <div id="waitlist-inline" className="w-full max-w-md mx-auto scroll-mt-32">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="inline-email" className="sr-only">Institutional Email</Label>
          <div className="relative group">
            <Input
              id="inline-email"
              type="email"
              placeholder={t('waitlist.input_placeholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'loading'}
              className="h-14 pl-6 pr-32 bg-card/50 border-white/10 rounded-2xl focus:ring-primary/20 transition-all text-base"
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? "inline-email-error" : undefined}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="h-10 px-6 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 focus-visible:ring-offset-0"
              >
                {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : t('waitlist.submit_button')}
              </Button>
            </div>
          </div>
        </div>
        
        <div aria-live="polite" id="inline-email-error">
          {status === 'error' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="h-3 w-3" aria-hidden="true" /> {message}
            </div>
          )}
        </div>
        
        <Text variant="caption" className="text-muted-foreground text-center block px-4 leading-relaxed">
          {t('waitlist.caption')}
        </Text>
      </form>
    </div>
  );
};