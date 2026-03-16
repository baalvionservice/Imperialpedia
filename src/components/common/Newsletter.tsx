'use client';

import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/components/common/ToastManager';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * Institutional Newsletter Subscription Node.
 * Features validation, real-time feedback, and strategic placeholders for Phase 2.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { addToast } = useToast();
  
  const errorId = useId();
  const successId = useId();

  // TODO: AI-driven newsletter content personalization  
  // TODO: Suggest topics based on user behavior  
  // TODO: Analytics tracking for impressions and conversions

  const validateEmail = (email: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Email node is required.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Invalid email identity node detected.');
      return;
    }

    setStatus('loading');
    
    // Broadcast conversion to the analytics cluster
    trackEvent({ 
      category: 'Conversion', 
      action: 'Newsletter Signup', 
      label: email 
    });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage("Thank you for signing up! You are now synchronized with the wire.");
        setEmail('');
        
        addToast({
          message: "Handshake Successful: Subscription active.",
          type: "success",
        });
      } else {
        throw new Error(data.message || 'Verification failure');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Network handshake failed.');
      
      addToast({
        message: "Handshake Failed: Unable to synchronize newsletter node.",
        type: "error",
      });
    }
  };

  if (status === 'success') {
    return (
      <div 
        id={successId}
        role="alert" 
        className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in zoom-in-95 duration-500"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <Text variant="h4" className="font-bold text-foreground">Handshake Complete</Text>
        <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
          {message}
        </Text>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row gap-3" 
        noValidate 
        aria-label="Newsletter subscription form"
      >
        <div className="relative flex-1 group">
          <Input
            type="email"
            placeholder="analyst@institution.com"
            aria-label="Institutional email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            disabled={status === 'loading'}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? errorId : undefined}
            className={cn(
              "h-14 bg-card/30 border-white/10 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-lg pl-6",
              status === 'error' && "border-destructive/50"
            )}
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className="h-14 px-10 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all scale-100 active:scale-[0.98] group/btn"
        >
          {status === 'loading' ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Send className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          )}
          {status === 'loading' ? 'Transmitting...' : 'Subscribe'}
        </Button>
      </form>
      
      <div aria-live="polite">
        {status === 'error' && (
          <div id={errorId} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-3 w-3" /> {message}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-6 pt-2 opacity-40">
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3" /> Weekly Market Audits
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3" /> pSEO Taxonomy Alerts
        </div>
      </div>
    </div>
  );
}
