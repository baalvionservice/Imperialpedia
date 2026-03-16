'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/design-system/typography/text';
import { Sparkles, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * AI Insight Placeholder component.
 * Prepares the structural UI for Phase 2 Generative Research features.
 */
export const AIInsight = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial telemetry calibration
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="glass-card border-primary/20 bg-primary/5 overflow-hidden animate-in fade-in duration-700">
      <CardHeader className="bg-primary/10 border-b border-primary/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">
            AI Research Assistant
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center gap-3 py-4">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <Text variant="caption" className="animate-pulse font-bold uppercase tracking-tighter">Preparing AI insights...</Text>
          </div>
        ) : (
          <div className="space-y-4">
            <Text variant="bodySmall" className="text-muted-foreground leading-relaxed italic">
              "Establish a secure handshake to generate customized intelligence reports, predictive models, and cross-taxonomy correlations for this node."
            </Text>
            <div className="pt-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold text-[10px] uppercase rounded-lg shadow-lg shadow-primary/20">
                <Zap className="h-3 w-3 mr-1.5" /> Initialize Synthesis
              </Button>
            </div>
          </div>
        )}
        {/* Future: Connect to AI research API. Example: /api/ai-insights?entity=slug */}
      </CardContent>
    </Card>
  );
};
