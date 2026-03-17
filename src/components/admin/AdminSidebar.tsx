'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, FileText, Brain, BookOpen, Layers, 
  Users, UserCheck, BarChart3, Search, DollarSign, 
  ShieldAlert, Globe, Zap, Megaphone, Settings, ChevronRight
} from 'lucide-react';
import { Text } from '@/design-system/typography/text';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Content Empire', href: '/admin/content', icon: FileText },
  { label: 'AI Content Lab', href: '/admin/ai', icon: Brain },
  { label: 'Glossary Manager', href: '/admin/glossary', icon: BookOpen },
  { label: 'Knowledge Graph', href: '/admin/topics', icon: Layers },
  { label: 'Community', href: '/admin/users', icon: Users },
  { label: 'Expert Profiles', href: '/admin/authors', icon: UserCheck },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'SEO Intelligence', href: '/admin/seo', icon: Search },
  { label: 'Monetization', href: '/admin/monetization', icon: DollarSign },
  { label: 'Compliance', href: '/admin/compliance', icon: ShieldAlert },
  { label: 'Global Engine', href: '/admin/global', icon: Globe },
  { label: 'Breaking News AI', href: '/admin/news-ai', icon: Zap },
  { label: 'Ads & Partners', href: '/admin/ads', icon: Megaphone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card/30 border-r border-white/5 h-screen sticky top-0 flex flex-col backdrop-blur-xl">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Text variant="h4" className="text-white font-bold">I</Text>
          </div>
          <Text variant="h4" className="font-bold tracking-tight">Admin Hub</Text>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={cn(isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="animate-in slide-in-from-left-1 duration-300" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <Text variant="caption" className="text-primary font-bold block uppercase tracking-widest mb-1">Authenticated</Text>
          <Text variant="bodySmall" weight="bold" className="truncate">Eleanor Vance</Text>
          <Text variant="caption" className="text-muted-foreground block text-[9px] mt-1">Super Admin • Cluster Alpha</Text>
        </div>
      </div>
    </aside>
  );
}