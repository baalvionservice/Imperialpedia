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
  Users as UsersIcon,
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
  Image as ImageIcon,
  Layers,
  Tags,
  ShieldAlert,
  GitPullRequest,
  Bell,
  ShieldCheck,
  History
} from 'lucide-react';
import { Text } from '@/design-system/typography/text';
import { useAppStore } from '@/lib/state/app-store';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, badge }: SidebarItemProps) => (
  <Link
    href={href}
    className={cn(
      'flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group',
      isActive 
        ? 'bg-primary text-primary-foreground shadow-md' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    <div className="flex items-center space-x-3">
      <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'group-hover:text-primary')} />
      <Text variant="bodySmall" weight={isActive ? 'bold' : 'medium'}>
        {label}
      </Text>
    </div>
    {badge !== undefined && badge > 0 && (
      <span className={cn(
        "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
        isActive ? "bg-white text-primary" : "bg-primary/20 text-primary"
      )}>
        {badge}
      </span>
    )}
  </Link>
);

/**
 * Scalable Sidebar component for platform dashboards and specialized sections.
 * Optimized with Role-Based Access Control logic.
 */
const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { currentUser, notifications } = useAppStore();
  const role = currentUser?.role || 'guest';

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const isAdmin = role === 'admin';
  const isEditor = role === 'editor' || role === 'admin';
  const isWriter = role === 'writer' || role === 'admin';

  const adminItems = [
    { icon: LayoutDashboard, label: 'Admin Home', href: '/admin' },
    { icon: UsersIcon, label: 'User Management', href: '/admin/users' },
    { icon: Calendar, label: 'Publisher Scheduler', href: '/admin/scheduler' },
    { icon: ImageIcon, label: 'Media Library', href: '/admin/media' },
    { icon: Layers, label: 'Categories', href: '/admin/categories' },
    { icon: Tags, label: 'Topics & Tags', href: '/admin/tags' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: ShieldCheck, label: 'Audit Trail', href: '/admin/audit' },
    { icon: ShieldAlert, label: 'pSEO Health', href: '/admin/seo-audit' },
  ];

  const editorItems = [
    { icon: LayoutDashboard, label: 'Editor Home', href: '/editor' },
    { icon: GitPullRequest, label: 'Editorial Workflow', href: '/editor/workflow' },
    { icon: FileSearch, label: 'Pending Reviews', href: '/editor/pending' },
    { icon: History, label: 'Review History', href: '/editor/history' },
    { icon: CheckCircle, label: 'Approved Index', href: '/editor/approved' },
    { icon: MessageSquare, label: 'Editorial Chat', href: '/editor/messages' },
  ];

  const writerItems = [
    { icon: LayoutDashboard, label: 'Writer Home', href: '/writer' },
    { icon: PlusSquare, label: 'New Article', href: '/writer/new' },
    { icon: FileEdit, label: 'My Drafts', href: '/writer/drafts' },
    { icon: Bell, label: 'Notifications', href: '/writer/notifications', badge: unreadNotifications },
    { icon: Send, label: 'Submissions', href: '/writer/submissions' },
    { icon: UserCircle, label: 'Creator Profile', href: '/creators/profile' },
  ];

  const publishingItems = [
    { icon: PenTool, label: 'Content Engine', href: '/articles' },
    { icon: Search, label: 'Internal Search', href: '/search' },
    { icon: UsersIcon, label: 'Creator Network', href: '/creators' },
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
        {isAdmin && (pathname.startsWith('/admin') || pathname === '/admin') && (
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
        {isEditor && (pathname.startsWith('/editor') || pathname === '/editor') && (
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
        {isWriter && (pathname.startsWith('/writer') || pathname === '/writer') && (
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

        {/* General Knowledge Context */}
        {(!pathname.startsWith('/admin') && !pathname.startsWith('/writer') && !pathname.startsWith('/editor')) && (
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
        <div className="px-4 py-3 mb-2 bg-primary/5 rounded-xl border border-primary/10">
          <Text variant="caption" className="text-primary font-bold block">Logged in as:</Text>
          <Text variant="bodySmall" className="truncate">{currentUser?.name}</Text>
          <span className="inline-block px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase mt-1">
            {role}
          </span>
        </div>
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
