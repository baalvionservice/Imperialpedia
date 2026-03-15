'use client';

import React, { useState } from 'react';
import { SubscriptionTier, PremiumState } from '@/types/premium';
import { Container } from '@/design-system/layout/container';
import { Text } from '@/design-system/typography/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  CreditCard,
  Loader2,
  Lock,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PremiumClientProps {
  data: PremiumState;
}

/**
 * Interactive Premium Subscription Hub.
 * Features tier comparison, monthly/yearly toggles, and a mock checkout flow.
 */
export function PremiumClient({ data }: PremiumClientProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTierSelect = (tier: SubscriptionTier) => {
    if (tier.id === data.activeTier) return;
    setSelectedTier(tier);
    setIsCheckoutOpen(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway handshake
    await new Promise(r => setTimeout(r, 2000));
    
    setIsProcessing(false);
    setIsCheckoutOpen(false);
    
    toast({
      title: "Subscription Activated",
      description: `Welcome to the ${selectedTier?.name} intelligence tier!`,
    });
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Header & Toggle */}
      <header className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
          <Zap className="h-4 w-4" />
          <Text variant="label" className="text-[10px] font-bold uppercase tracking-widest">Premium Intelligence</Text>
        </div>
        <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Unlock the Full Index</Text>
        <Text variant="body" className="text-muted-foreground text-lg leading-relaxed">
          Scale your research with advanced AI tools, real-time portfolio oversight, and exclusive expert intelligence nodes.
        </Text>

        <div className="flex items-center justify-center gap-4 pt-8">
          <Label className={cn("text-sm font-bold", billingCycle === 'monthly' ? "text-foreground" : "text-muted-foreground")}>Monthly</Label>
          <Switch 
            checked={billingCycle === 'yearly'} 
            onCheckedChange={(val) => setBillingCycle(val ? 'yearly' : 'monthly')} 
            className="scale-125"
          />
          <div className="flex items-center gap-2">
            <Label className={cn("text-sm font-bold", billingCycle === 'yearly' ? "text-foreground" : "text-muted-foreground")}>Yearly</Label>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-bold text-[10px]">SAVE 20%</Badge>
          </div>
        </div>
      </header>

      {/* Pricing Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {data.tiers.map((tier) => {
          const isActive = tier.id === data.activeTier;
          const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly;

          return (
            <Card 
              key={tier.id} 
              className={cn(
                "glass-card flex flex-col h-full border-none relative overflow-hidden transition-all duration-500",
                tier.isPopular ? "ring-2 ring-primary/40 shadow-2xl md:scale-105 z-10" : "opacity-90 hover:opacity-100"
              )}
            >
              {tier.isPopular && (
                <div className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest text-center py-1 absolute top-0 left-0 w-full">
                  Recommended Choice
                </div>
              )}
              
              <CardHeader className={cn("p-8", tier.isPopular ? "pt-10" : "")}>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-sm mt-2">{tier.description}</CardDescription>
                <div className="pt-6">
                  <span className="text-5xl font-bold tracking-tighter">{price}</span>
                  <span className="text-muted-foreground ml-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-0 flex-grow">
                <div className="space-y-4">
                  <Text variant="label" className="text-[10px] text-muted-foreground font-bold">What's included:</Text>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex gap-3 items-start group">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <Text variant="caption" className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button 
                  disabled={isActive}
                  onClick={() => handleTierSelect(tier)}
                  className={cn(
                    "w-full h-12 rounded-xl font-bold transition-all",
                    isActive ? "bg-muted text-muted-foreground" : 
                    tier.isPopular ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" : "variant-outline"
                  )}
                >
                  {isActive ? 'Current Active Node' : `Go ${tier.name}`}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Trial Context */}
      {data.trialInfo.available && (
        <Card className="max-w-2xl mx-auto glass-card border-none bg-primary/5 p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 p-6 opacity-5">
            <Sparkles className="h-24 w-24 text-primary" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Zap className="h-8 w-8" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <Text variant="h4" className="font-bold">Risk-Free Intelligence Trial</Text>
              <Text variant="bodySmall" className="text-muted-foreground leading-relaxed">
                Experience Pro level access for **{data.trialInfo.durationDays} days** at zero cost. No strings, no automatic commitment.
              </Text>
            </div>
            <Button variant="ghost" className="text-primary font-bold ml-auto" asChild>
              <button onClick={() => handleTierSelect(data.tiers.find(t => t.id === 'tier-pro')!)}>
                Start Trial <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Button>
          </div>
        </Card>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-center">
        {[
          { icon: <Lock className="h-6 w-6 text-primary mx-auto" />, title: "Secure Handshake", desc: "Enterprise-grade 256-bit encryption for all transactions." },
          { icon: <ShieldCheck className="h-6 w-6 text-secondary mx-auto" />, title: "Verified Vetting", desc: "Subscribing supports our verified expert audit cycles." },
          { icon: <Globe className="h-6 w-6 text-emerald-500 mx-auto" />, title: "Global Settlement", desc: "Supporting 135+ currencies across 50 regional nodes." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-3 p-6 rounded-3xl bg-card/30 border border-white/5">
            {item.icon}
            <Text variant="bodySmall" weight="bold" className="block">{item.title}</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed">{item.desc}</Text>
          </div>
        ))}
      </div>

      {/* Mock Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-lg bg-card border-white/10 p-0 overflow-hidden">
          <form onSubmit={handleCheckout}>
            <DialogHeader className="p-8 bg-primary/5 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest px-3">
                  Checkout Node
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span className="text-[9px] font-bold uppercase">SSL Secured</span>
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-primary" /> 
                {selectedTier?.name} Access
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Commit to high-fidelity financial intelligence.
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-background/50 border border-white/5">
                <div className="space-y-1">
                  <Text variant="bodySmall" weight="bold">{selectedTier?.name} Plan ({billingCycle})</Text>
                  <Text variant="caption" className="text-muted-foreground">Renews on {format(new Date(), 'MMM d, yyyy')}</Text>
                </div>
                <div className="text-xl font-bold text-primary">
                  {billingCycle === 'monthly' ? selectedTier?.priceMonthly : selectedTier?.priceYearly}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cardholder Node</Label>
                  <Input placeholder="Enter full name" className="bg-background/50 h-12" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Card Detail Matrix</Label>
                  <div className="relative">
                    <Input placeholder="•••• •••• •••• ••••" className="bg-background/50 h-12 pl-12 font-mono" required />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expiry</Label>
                    <Input placeholder="MM / YY" className="bg-background/50 h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CVC</Label>
                    <Input placeholder="•••" className="bg-background/50 h-12" required />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/20">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <Text variant="caption" className="text-muted-foreground leading-relaxed">
                  This is a non-functional mock. No real transaction will occur. Your data is not stored.
                </Text>
              </div>
            </div>

            <DialogFooter className="p-8 bg-muted/20 border-t border-white/5">
              <Button type="button" variant="ghost" onClick={() => setIsCheckoutOpen(false)} className="h-12 px-6 rounded-xl font-bold">Cancel</Button>
              <Button type="submit" disabled={isProcessing} className="h-12 flex-1 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : 'Authenticate & Subscribe'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
