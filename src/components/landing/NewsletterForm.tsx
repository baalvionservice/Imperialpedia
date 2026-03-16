'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * Institutional newsletter subscription form.
 * Handles state transitions for capturing interest in intelligence updates.
 * Optimized for Prompt 59 requirements.
 */
export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  // TODO: AI-powered newsletter content recommendations based on traversal history
  // TODO: Personalized suggestions based on user research behavior
  // TODO: Backend integration with marketing automation clusters

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
      setMessage('Invalid email node detected.');
      return;
    }

    setStatus('loading');
    trackEvent({ 
      category: 'Form', 
      action: 'Submit', 
      label: 'Landing Page Newsletter' 
    });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
        setName('');
        
        toast({
          title: "Subscription Active",
          description: data.message,
        });

        // Trigger analytics event for successful signup
        trackEvent({ 
          category: 'Conversion', 
          action: 'newsletter_signup', 
          label: 'Landing Page' 
        });
      } else {
        throw new Error(data.message || 'Verification failure');
      }
    } catch (err: any) {
      setStatus('error');
      const errorMsg = err.message || 'Network handshake failed.';
      setMessage(errorMsg);
      
      toast({
        variant: "destructive",
        title: "Handshake Failed",
        description: errorMsg,
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="space-y-2">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Analyst Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="h-11 pl-10 bg-background/50 border-white/10 rounded-xl focus:ring-primary/20 transition-all text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <Input
                type="email"
                placeholder="Email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading' || status === 'success'}
                className={cn(
                  "h-11 bg-background/50 border-white/10 rounded-xl focus:ring-primary/20 transition-all text-sm",
                  status === 'error' && "border-destructive/50"
                )}
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className={cn(
                "h-11 px-6 rounded-xl font-bold transition-all shadow-lg",
                status === 'success' ? "bg-emerald-600 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90 shadow-primary/20"
              )}
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </form>
      
      <div aria-live="polite">
        {status === 'success' && (
          <Text variant="caption" className="text-emerald-500 font-bold animate-in fade-in slide-in-from-top-1 px-1">
            {message}
          </Text>
        )}
        
        {status === 'error' && (
          <Text variant="caption" className="text-destructive font-bold animate-in fade-in slide-in-from-top-1 flex items-center gap-1 px-1">
            <AlertCircle className="h-3 w-3" /> {message}
          </Text>
        )}
      </div>
    </div>
  );
};
