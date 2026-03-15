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
  PlusSquare,
  FileEdit,
  Send,
  UserCircle,
  FileSearch,
  CheckCircle,
  MessageSquare,
  Calendar,
  Image as ImageIcon
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
    { icon: Calendar, label: 'Publisher Scheduler', href: '/admin/scheduler' },
    { icon: ImageIcon, label: 'Media Library', href: '/admin/media' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: BookOpen, label: 'Glossary Index', href: '/admin/glossary' },
    { icon: Database, label: 'pSEO Health', href: '/admin/seo-audit' },
  ];

  const editorItems = [
    { icon: LayoutDashboard, label: 'Editor Home', href: '/editor' },
    { icon: FileSearch, label: 'Pending Reviews', href: '/editor/pending' },
    { icon: CheckCircle, label: 'Approved Index', href: '/editor/approved' },
    { icon: MessageSquare, label: 'Editorial Chat', href: '/editor/messages' },
  ];

  const writerItems = [
    { icon: LayoutDashboard, label: 'Writer Home', href: '/writer' },
    { icon: PlusSquare, label: 'New Article', href: '/writer/new' },
    { icon: FileEdit, label: 'My Drafts', href: '/writer/drafts' },
    { icon: Send, label: 'Submissions', href: '/writer/submissions' },
    { icon: UserCircle, label: 'Creator Profile', href: '/creators/profile' },
  ];

  const publishingItems = [
    { icon: PenTool, label: 'Content Engine', href: '/articles' },
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
        {/* Admin Section */}
        {pathname.startsWith('/admin') && (
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
        )}

        {/* Editor Section */}
        {pathname.startsWith('/editor') && (
          <div>
            <Text variant="label" className="px-4 mb-3 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
              Editorial Intelligence
            </Text>
            <div className="space-y-1">
              {editorItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        )}

        {/* Writer Section */}
        {(pathname.startsWith('/writer') || pathname === '/writer') && (
          <div>
            <Text variant="label" className="px-4 mb-3 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
              Creator Studio
            </Text>
            <div className="space-y-1">
              {writerItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        )}

        {/* General Publishing Links */}
        {!pathname.startsWith('/admin') && !pathname.startsWith('/writer') && !pathname.startsWith('/editor') && (
          <div>
            <Text variant="label" className="px-4 mb-3 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
              Knowledge Hub
            </Text>
            <div className="space-y-1">
              {publishingItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        )}
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
