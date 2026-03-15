'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { FinancialCalculator } from '@/types/financial-tools';
import { 
  TrendingUp, 
  CreditCard, 
  PieChart, 
  Sunrise, 
  Layers, 
  ArrowUpRight,
  Calculator as CalcIcon,
  ArrowRight
} from 'lucide-react';

interface CalculatorCardProps {
  tool: FinancialCalculator;
}

const iconMap = {
  compound: TrendingUp,
  loan: CreditCard,
  investment: PieChart,
  retirement: Sunrise,
  portfolio: Layers,
  inflation: ArrowUpRight,
};

/**
 * A sophisticated card for promoting individual financial tools.
 */
export const CalculatorCard = ({ tool }: CalculatorCardProps) => {
  const Icon = iconMap[tool.type] || CalcIcon;

  return (
    <Card className="glass-card group hover:border-primary/40 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
            {tool.category}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="text-sm leading-relaxed mb-6">
          {tool.description}
        </CardDescription>
        <div className="mt-auto pt-4">
          <Button variant="ghost" size="sm" className="p-0 h-auto font-bold text-primary hover:bg-transparent group/btn" asChild>
            <Link href={`/financial-tools/${tool.slug}`}>
              Open Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
