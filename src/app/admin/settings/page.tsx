'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/design-system/typography/text';
import { 
  Settings, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Info, 
  Database, 
  Zap, 
  Lock,
  Mail,
  Scale
} from 'lucide-react';
import { systemService } from '@/services/data/system-service';
import { SystemSettings } from '@/types/system';
import { toast } from '@/hooks/use-toast';

const settingsSchema = z.object({
  platform: z.object({
    siteName: z.string().min(2),
    contactEmail: z.string().email(),
    maintenanceMode: z.boolean(),
    defaultCurrency: z.string(),
  }),
  seo: z.object({
    defaultTitleTemplate: z.string(),
    metaDescriptionTemplate: z.string(),
    indexProgrammablePages: z.boolean(),
    autoGenerateSitemaps: z.boolean(),
  }),
  notifications: z.object({
    enableEmailAlerts: z.boolean(),
    adminDailyDigest: z.boolean(),
    systemAlertsWebhook: z.string(),
  }),
  governance: z.object({
    requireVettingForMonetization: z.boolean(),
    defaultRevenueShare: z.number().min(0).max(100),
    allowSelfOnboarding: z.boolean(),
    autoModerateComments: z.boolean(),
  }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

/**
 * Admin System Configuration Panel.
 * Manages global variables, SEO logic, and expert governance rules.
 */
export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    async function loadSettings() {
      const response = await systemService.getSettings();
      if (response.data) {
        form.reset(response.data);
      }
      setLoading(false);
    }
    loadSettings();
  }, [form]);

  async function onSubmit(values: SettingsFormValues) {
    setSaving(true);
    const response = await systemService.updateSettings(values);
    setSaving(false);
    
    if (response.status === 200) {
      toast({
        title: "Platform Rules Updated",
        description: "Global system configuration has been synchronized.",
      });
    }
  }

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse">Retrieving System Rules...</Text>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Settings className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Global Control</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">System Configuration</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Manage global parameters and publishing logic for the Intelligence Index.
          </Text>
        </div>
        <Button 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={saving}
          className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Synchronize Settings
        </Button>
      </header>

      <Form {...form}>
        <form className="space-y-8">
          <Tabs defaultValue="platform" className="w-full space-y-8">
            <TabsList className="bg-card/30 border border-white/5 p-1 h-12 rounded-xl w-full lg:w-auto justify-start">
              <TabsTrigger value="platform" className="px-6 rounded-lg font-bold text-xs gap-2"><Settings className="h-3.5 w-3.5" /> General</TabsTrigger>
              <TabsTrigger value="seo" className="px-6 rounded-lg font-bold text-xs gap-2"><Globe className="h-3.5 w-3.5" /> SEO Engine</TabsTrigger>
              <TabsTrigger value="notifications" className="px-6 rounded-lg font-bold text-xs gap-2"><Bell className="h-3.5 w-3.5" /> Alerts</TabsTrigger>
              <TabsTrigger value="governance" className="px-6 rounded-lg font-bold text-xs gap-2"><Scale className="h-3.5 w-3.5" /> Governance</TabsTrigger>
            </TabsList>

            {/* PLATFORM SECTION */}
            <TabsContent value="platform" className="mt-0">
              <Card className="glass-card border-none shadow-2xl">
                <CardHeader className="bg-card/30 border-b border-white/5">
                  <CardTitle>Platform Infrastructure</CardTitle>
                  <CardDescription>Configure core system identity and operational states.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="platform.siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Public Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 h-11 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="platform.contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Node (Email)</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 h-11 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-center justify-between">
                    <div className="space-y-1">
                      <Text variant="bodySmall" weight="bold" className="text-destructive">System-Wide Maintenance Mode</Text>
                      <Text variant="caption" className="text-muted-foreground block">Restrict access to the platform for scheduled maintenance.</Text>
                    </div>
                    <FormField
                      control={form.control}
                      name="platform.maintenanceMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO SECTION */}
            <TabsContent value="seo" className="mt-0">
              <Card className="glass-card border-none shadow-2xl">
                <CardHeader className="bg-primary/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> pSEO Logic Engine
                  </CardTitle>
                  <CardDescription>Orchestrate how search engines discover and index programmatic pages.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="seo.defaultTitleTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title Meta Template</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 h-11 border-white/10 font-mono text-xs" />
                          </FormControl>
                          <FormDescription>Supports %title% and %topic% placeholders.</FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seo.metaDescriptionTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description Logic</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 h-11 border-white/10 font-mono text-xs" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-background/30">
                      <div className="space-y-1">
                        <Text variant="bodySmall" weight="bold">Index Programmatic Nodes</Text>
                        <Text variant="caption" className="text-muted-foreground block">Allow search engines to crawl all 1M+ dynamic pages.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="seo.indexProgrammablePages"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-background/30">
                      <div className="space-y-1">
                        <Text variant="bodySmall" weight="bold">Auto-Generate XML Sitemaps</Text>
                        <Text variant="caption" className="text-muted-foreground block">Synchronize sitemaps with the Intelligence Database.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="seo.autoGenerateSitemaps"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NOTIFICATIONS SECTION */}
            <TabsContent value="notifications" className="mt-0">
              <Card className="glass-card border-none shadow-2xl">
                <CardHeader className="bg-secondary/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-secondary" /> Administrative Logistics
                  </CardTitle>
                  <CardDescription>Configure communication protocols for platform staff.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-xl border border-transparent hover:border-white/5">
                      <div className="space-y-1">
                        <Text variant="body" weight="bold">Critical System Alerts</Text>
                        <Text variant="caption" className="text-muted-foreground block">Email notifications for infrastructure or security anomalies.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="notifications.enableEmailAlerts"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-xl border border-transparent hover:border-white/5">
                      <div className="space-y-1">
                        <Text variant="body" weight="bold">Administrator Daily Digest</Text>
                        <Text variant="caption" className="text-muted-foreground block">Summary of publishing velocity and moderation queue.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="notifications.adminDailyDigest"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="notifications.systemAlertsWebhook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Zap className="h-3.5 w-3.5" /> Monitoring Webhook (Slack/Discord)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://hooks.example.com/..." className="bg-background/50 h-11 border-white/10 font-mono text-xs" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* GOVERNANCE SECTION */}
            <TabsContent value="governance" className="mt-0">
              <Card className="glass-card border-none shadow-2xl">
                <CardHeader className="bg-primary/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" /> Expert Governance Rules
                  </CardTitle>
                  <CardDescription>Define the operational parameters for the Creator Economy.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="governance.defaultRevenueShare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Creator Revenue Share (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))} 
                              className="bg-background/50 h-11 border-white/10" 
                            />
                          </FormControl>
                          <FormDescription>Percentage of platform-wide intelligence revenue assigned to experts.</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-background/30 h-full">
                        <div className="space-y-1">
                          <Text variant="bodySmall" weight="bold">Vetting Barrier</Text>
                          <Text variant="caption" className="text-muted-foreground block">Require manual validation before monetization active.</Text>
                        </div>
                        <FormField
                          control={form.control}
                          name="governance.requireVettingForMonetization"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-background/30">
                      <div className="space-y-1">
                        <Text variant="bodySmall" weight="bold">Self-Service Onboarding</Text>
                        <Text variant="caption" className="text-muted-foreground block">Allow anyone to register as a contributor candidate.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="governance.allowSelfOnboarding"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-background/30">
                      <div className="space-y-1">
                        <Text variant="bodySmall" weight="bold">AI Auto-Moderation</Text>
                        <Text variant="caption" className="text-muted-foreground block">Enable algorithmic sentiment analysis for community nodes.</Text>
                      </div>
                      <FormField
                        control={form.control}
                        name="governance.autoModerateComments"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>

      {/* Global Context Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4">
          <Lock className="h-8 w-8 text-primary" />
          <div>
            <Text variant="bodySmall" weight="bold">Permission Integrity</Text>
            <Text variant="caption" className="text-muted-foreground mt-1">Access to this configuration hub is restricted to Super-Administrators. All changes are logged in the cryptographic audit chain.</Text>
          </div>
        </Card>
        
        <Card className="glass-card border-secondary/20 p-6 flex flex-col gap-4">
          <Database className="h-8 w-8 text-secondary" />
          <div>
            <Text variant="bodySmall" weight="bold">pSEO Cache Logic</Text>
            <Text variant="caption" className="text-muted-foreground mt-1">Updating SEO defaults triggers a background re-validation of the platform's 1M+ programmatic canonical entries.</Text>
          </div>
        </Card>

        <Card className="glass-card border-emerald-500/20 p-6 flex flex-col gap-4">
          <Zap className="h-8 w-8 text-emerald-500" />
          <div>
            <Text variant="bodySmall" weight="bold">Real-time Deployment</Text>
            <Text variant="caption" className="text-muted-foreground mt-1">Changes made here are propagated across the Intelligence Engine clusters within 180 seconds.</Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
