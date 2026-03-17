
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/design-system/typography/text';
import { 
  Settings, ShieldCheck, Zap, Palette, Bell, Save, Loader2, RefreshCw, Lock, Globe, Info, Layout
} from 'lucide-react';
import { adminKernel } from '@/lib/services/admin-service';
import { SystemConfig } from '@/types/admin-system';
import { toast } from '@/hooks/use-toast';

export default function PlatformSettingsHub() {
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setConfig(adminKernel.getConfig());
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    adminKernel.updateConfig(config);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    toast({ title: "Rules Synchronized", description: "Global kernel logic has been committed to all clusters." });
  };

  if (!config) return null;

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Settings className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Kernel Logic</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">System Configuration</Text>
        </div>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Commit Global State
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          {/* PLATFORM IDENTITY */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><Layout size={20} /></div>
              <div>
                <CardTitle>Platform Identity</CardTitle>
                <CardDescription>Manage core semantic markers and branding tokens.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Platform Label</Label>
                  <Input 
                    value={config.siteName} 
                    onChange={e => setConfig({ ...config, siteName: e.target.value })}
                    className="bg-background/50 h-12 border-white/5 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Support Dispatch Node</Label>
                  <Input 
                    value={config.contactEmail} 
                    onChange={e => setConfig({ ...config, contactEmail: e.target.value })}
                    className="bg-background/50 h-12 border-white/5 font-mono text-xs" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* VISUAL TOKENS */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-secondary/5 border-b border-white/5 p-8 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary"><Palette size={20} /></div>
              <div>
                <CardTitle>Branding Studio</CardTitle>
                <CardDescription>Configure primary color and institutional assets.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Accent Color</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={config.branding.primaryColor} onChange={e => setConfig({ ...config, branding: { ...config.branding, primaryColor: e.target.value }})} className="w-12 h-12 p-1 bg-transparent border-none" />
                    <Input value={config.branding.primaryColor} className="flex-1 bg-background/50 h-12 border-white/5 font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Logo Vector URL</Label>
                  <Input value={config.branding.logoUrl} className="bg-background/50 h-12 border-white/5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FEATURE GATEWAYS SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <Zap className="h-4 w-4" /> Feature Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'AI Drafting Assistant', key: 'aiDrafting' },
                { label: 'pSEO Auto-Linking', key: 'autoLinking' },
                { label: 'Real-time Market Data', key: 'realTimeMarket' },
              ].map(gate => (
                <div key={gate.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <Text variant="caption" className="font-bold text-foreground/80">{gate.label}</Text>
                  <Switch 
                    checked={(config.features as any)[gate.key]} 
                    onCheckedChange={val => setConfig({ ...config, features: { ...config.features, [gate.key]: val }})}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/20 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Lock className="h-16 w-16 text-primary rotate-12" />
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Governance Note
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "Commiting global state changes will trigger a background re-validation of all **1.2M+ intelligence nodes** across the delivery network."
            </Text>
          </div>
        </aside>
      </div>
    </div>
  );
}
