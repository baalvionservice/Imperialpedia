'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  Settings, 
  BarChart3, 
  Users 
} from 'lucide-react';
import { Text } from '@/design-system/typography/text';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => (
  <Link
    href={href}
    className={cn(
      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
      isActive 
        ? 'bg-primary text-primary-foreground shadow-md' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'group-hover:text-primary')} />
    <Text variant="bodySmall" weight={isActive ? 'bold' : 'medium'}>
      {label}
    </Text>
  </Link>
);

/**
 * Scalable Sidebar component for platform dashboards and specialized sections.
 */
const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const primaryItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Glossary Management', href: '/admin/glossary' },
    { icon: PenTool, label: 'Content Engine', href: '/creator/publishing' },
    { icon: BarChart3, label: 'Platform Analytics', href: '/admin/analytics' },
    { icon: Users, label: 'Creator Network', href: '/creators' },
  ];

  return (
    <aside className={cn('w-64 border-r h-full bg-card/30 flex flex-col p-4', className)}>
      <div className="space-y-1 flex-grow">
        <Text variant="label" className="px-4 mb-4 text-muted-foreground/50">
          General
        </Text>
        {primaryItems.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </div>

      <div className="pt-4 border-t space-y-1">
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="/settings"
          isActive={pathname === '/settings'}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
