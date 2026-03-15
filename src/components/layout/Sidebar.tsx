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
  Users,
  Database,
  Search,
  PlusSquare
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
      'flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group',
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

  const adminItems = [
    { icon: LayoutDashboard, label: 'Admin Home', href: '/admin' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: BookOpen, label: 'Glossary Management', href: '/admin/glossary' },
    { icon: Database, label: 'pSEO Health', href: '/admin/seo-audit' },
  ];

  const contentItems = [
    { icon: PlusSquare, label: 'Create New', href: '/outline' },
    { icon: PenTool, label: 'Content Engine', href: '/creator/publishing' },
    { icon: Search, label: 'Internal Search', href: '/search' },
    { icon: Users, label: 'Creator Network', href: '/creators' },
  ];

  return (
    <aside className={cn('w-64 border-r h-full bg-card/30 flex flex-col p-4', className)}>
      <div className="mb-8 px-4">
        <Link href="/" className="text-xl font-headline font-bold text-primary tracking-tight">
          Imperial<span className="text-foreground">pedia</span>
        </Link>
      </div>

      <div className="space-y-6 flex-grow overflow-y-auto">
        <div>
          <Text variant="label" className="px-4 mb-3 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
            Administration
          </Text>
          <div className="space-y-1">
            {adminItems.map((item) => (
              <SidebarItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>

        <div>
          <Text variant="label" className="px-4 mb-3 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
            Publishing
          </Text>
          <div className="space-y-1">
            {contentItems.map((item) => (
              <SidebarItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>
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
