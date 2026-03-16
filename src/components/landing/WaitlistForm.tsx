'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Waitlist email collection form.
 * Handles state transitions for institutional early access requests.
 */
export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network handshake failed. Try again shortly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <Text variant="h4" className="font-bold text-foreground">Identity Secured</Text>
        <Text variant="bodySmall" className="text-muted-foreground">{message}</Text>
      </div>
    );
  }

  return (
    <div id="waitlist" className="w-full max-w-md mx-auto scroll-mt-32">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <Input
            type="email"
            placeholder="Enter institutional email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            disabled={status === 'loading'}
            className="h-14 pl-6 pr-32 bg-card/50 border-white/10 rounded-2xl focus:ring-primary/20 transition-all text-base"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="h-10 px-6 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join Matrix'}
            </Button>
          </div>
        </div>
        
        {status === 'error' && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-3 w-3" /> {message}
          </div>
        )}
        
        <Text variant="caption" className="text-muted-foreground text-center block px-4 leading-relaxed">
          Join 142,000+ analysts receiving high-fidelity intelligence nodes.
        </Text>
      </form>
    </div>
  );
};
