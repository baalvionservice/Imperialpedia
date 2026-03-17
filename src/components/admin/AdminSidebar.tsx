
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Brain, 
  Search, 
  BookOpen, 
  Terminal, 
  DollarSign, 
  BarChart3, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { Text } from '@/design-system/typography/text';

const navItems = [
  { label: 'Master Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Content Empire', href: '/admin/content', icon: FileText },
  { label: 'User & RBAC', href: '/admin/users', icon: Users },
  { label: 'AI Content Lab', href: '/admin/ai', icon: Brain },
  { label: 'SEO & Linking', href: '/admin/seo', icon: Search },
  { label: 'Glossary Hub', href: '/admin/glossary', icon: BookOpen },
  { label: 'API Integration', href: '/admin/api-hub', icon: Terminal },
  { label: 'Monetization', href: '/admin/monetization', icon: DollarSign },
  { label: 'Analytics Hub', href: '/admin/analytics', icon: BarChart3 },
  { label: 'System Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card/30 border-r border-white/5 h-screen sticky top-0 flex flex-col backdrop-blur-xl shrink-0">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Text variant="h4" className="text-white font-bold">I</Text>
          </div>
          <div className="flex flex-col">
            <Text variant="h4" className="font-bold tracking-tight text-sm leading-none">Super Admin</Text>
            <Text variant="caption" className="text-[8px] uppercase tracking-widest text-muted-foreground mt-1">Control Center</Text>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
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
          <div className="flex items-center gap-2 text-primary font-bold text-[9px] uppercase tracking-widest mb-2">
            <ShieldCheck size={12} /> Root Handshake Active
          </div>
          <Text variant="bodySmall" weight="bold" className="truncate text-xs">Eleanor Vance</Text>
          <Text variant="caption" className="text-muted-foreground block text-[9px] mt-1">Status: Operational</Text>
        </div>
      </div>
    </aside>
  );
}
