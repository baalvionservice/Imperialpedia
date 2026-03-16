'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/design-system/typography/text';
import { Loader2, CheckCircle2, AlertCircle, Send, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/utils/analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

/**
 * Waitlist & Early Access Modal.
 * High-fidelity form for capturing institutional early access requests.
 * Integrated with the global toast and analytics system.
 */
export const WaitlistModal = ({ isOpen, onOpenChange, title = "Join the Imperialpedia Waitlist" }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Email identity node is required.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Invalid email format detected.');
      return;
    }

    setStatus('loading');
    trackEvent({ category: 'Form', action: 'Submit Start', label: 'Waitlist Modal' });

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
        trackEvent({ category: 'Form', action: 'Submit Success', label: 'Waitlist Modal' });
        
        toast({
          title: "Identity Secured",
          description: data.message,
        });
      } else {
        setStatus('error');
        setMessage(data.message);
        trackEvent({ category: 'Form', action: 'Submit Error', label: 'Waitlist Modal' });
        
        toast({
          variant: "destructive",
          title: "Synchronization Error",
          description: data.message,
        });
      }
    } catch (err) {
      setStatus('error');
      const errorMsg = 'Network handshake failed. Try again shortly.';
      setMessage(errorMsg);
      trackEvent({ category: 'Form', action: 'Connection Error', label: 'Waitlist Modal' });
      
      toast({
        variant: "destructive",
        title: "System Exception",
        description: errorMsg,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-white/10 p-0 overflow-hidden shadow-2xl">
        {status === 'success' ? (
          <div className="p-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <Text variant="h3" className="text-2xl font-bold">Access Secured</Text>
              <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                Thank you for joining the waitlist! You are now part of the 142,000+ analysts receiving high-fidelity intelligence nodes.
              </Text>
            </div>
            <Button onClick={() => onOpenChange(false)} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold h-12">
              Return to Discovery
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-8 bg-primary/5 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Early Access</Text>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase">Identity Verified</span>
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold tracking-tight">{title}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Secure your node in the world's most scalable financial intelligence engine.
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="modal-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Institutional Email</Label>
                <Input 
                  id="modal-email"
                  type="email"
                  placeholder="analyst@institution.com" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={cn(
                    "bg-background/50 border-white/5 h-14 rounded-xl text-lg transition-all",
                    status === 'error' && "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={status === 'loading'}
                  required
                />
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-destructive text-[10px] font-bold uppercase tracking-tighter mt-1 px-1">
                    <AlertCircle className="h-3 w-3" /> {message}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/20 border border-white/5">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <Text variant="caption" className="text-muted-foreground leading-relaxed italic">
                  "Your data traversal is cryptographically signed. We respect institutional privacy by default."
                </Text>
              </div>
            </div>

            <DialogFooter className="p-8 bg-muted/20 border-t border-white/5">
              <Button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full h-14 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all scale-[1.02] active:scale-100"
              >
                {status === 'loading' ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Secure My Spot</>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
