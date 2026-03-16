'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils/analytics';

/**
 * Institutional newsletter subscription form.
 * Handles state transitions for capturing interest in intelligence updates.
 */
export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Invalid email node detected.');
      return;
    }

    setStatus('loading');
    trackEvent({ category: 'Form', action: 'Submit', label: 'Newsletter Footer' });

    try {
      const res = await fetch('/api/newsletter', {
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
          title: "Subscription Active",
          description: data.message,
        });
      } else {
        setStatus('error');
        setMessage(data.message);
        
        toast({
          variant: "destructive",
          title: "Handshake Failed",
          description: data.message,
        });
      }
    } catch (err) {
      setStatus('error');
      const errorMsg = 'Network handshake failed.';
      setMessage(errorMsg);
      
      toast({
        variant: "destructive",
        title: "System Exception",
        description: errorMsg,
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1 group">
          <Input
            type="email"
            placeholder="Analyst email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            disabled={status === 'loading' || status === 'success'}
            className="h-11 bg-background/50 border-white/10 rounded-xl focus:ring-primary/20 transition-all text-sm"
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            "h-11 px-6 rounded-xl font-bold transition-all",
            status === 'success' ? "bg-emerald-600 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
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
      </form>
      
      {status === 'success' && (
        <Text variant="caption" className="text-emerald-500 font-bold animate-in fade-in slide-in-from-top-1">
          {message}
        </Text>
      )}
      
      {status === 'error' && (
        <Text variant="caption" className="text-destructive font-bold animate-in fade-in slide-in-from-top-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {message}
        </Text>
      )}
    </div>
  );
};
