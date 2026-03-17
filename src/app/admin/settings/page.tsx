'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Settings as SettingsIcon, ShieldCheck, Key, Globe, 
  Languages, Zap, Lock, Save, Loader2, RefreshCw, 
  Activity, Terminal, ChevronRight, Database, DollarSign
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function PlatformGovernanceSettings() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    toast({ title: "Rules Synchronized", description: "Global platform logic has been committed to all clusters." });
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
  };

  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Lock className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">System Orchestration</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Platform Settings</Text>
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
          
          {/* GENERAL CONFIG */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex items-center justify-between">
              <div>
                <CardTitle>Core Registry</CardTitle>
                <CardDescription>Manage your platform's semantic descriptors and identity.</CardDescription>
              </div>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold h-7">v4.2.0-STABLE</Badge>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Platform Label</Label>
                  <Input defaultValue="Imperialpedia" className="bg-background/50 h-12 border-white/5 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Support Dispatch Node</Label>
                  <Input defaultValue="governance@imperialpedia.com" className="bg-background/50 h-12 border-white/5 font-mono text-xs" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <div className="space-y-1">
                  <Text variant="bodySmall" weight="bold" className="text-destructive">Platform Maintenance Lock</Text>
                  <Text variant="caption" className="text-muted-foreground">Restrict index discovery during cluster re-sharding.</Text>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* INTERNATIONALIZATION */}
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8">
              <CardTitle>Regional & Dialect Matrix</CardTitle>
              <CardDescription>Configure localized discovery hubs and multi-currency settlement.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primary Dialect</Label>
                  <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Languages className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">English (US)</span>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-bold">DEFAULT</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Settlement Currency</Label>
                  <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-bold">USD ($)</span>
                    </div>
                    <Badge variant="outline" className="border-white/10 text-[8px] font-bold">FX ACTIVE</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl bg-card/30">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Gateway Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'pSEO Indexing', status: true },
                { label: 'Monetization Engine', status: false },
                { label: 'Real-time Wires', status: true },
                { label: 'Expert Vetting', status: true }
              ].map((gate) => (
                <div key={gate.label} className="flex items-center justify-between py-2">
                  <Text variant="caption" className="font-bold text-foreground/80">{gate.label}</Text>
                  <Switch defaultChecked={gate.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-none bg-primary/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Database className="h-16 w-16 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <ShieldCheck className="h-4 w-4" /> Integrity Note
            </div>
            <Text variant="caption" className="text-muted-foreground leading-relaxed italic block">
              "Configuration shifts trigger a background re-validation of all **1.2M+ intelligence nodes** to ensure metadata parity across discovery clusters."
            </Text>
          </Card>

          <div className="p-8 rounded-[3rem] bg-background/30 border border-white/5 text-center space-y-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-muted/20 flex items-center justify-center mx-auto text-muted-foreground">
              <Key className="h-8 w-8" />
            </div>
            <Text variant="bodySmall" weight="bold">API Handshake Keys</Text>
            <Text variant="caption" className="text-muted-foreground leading-relaxed block">
              Manage cryptographic tokens for institutional API access and external data ingestion.
            </Text>
            <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 font-bold text-xs">
              Open Key Registry
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
