'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';
import { Text } from '@/design-system/typography/text';

const navLinks = [
  { label: 'News', href: routes.public.news },
  { label: 'Stocks', href: routes.public.stocks },
  { label: 'Community', href: routes.public.community },
  { label: 'AI Tools', href: routes.public.aiTools },
  { label: 'Experts', href: routes.public.creators },
];

/**
 * Primary horizontal navigation links for desktop view.
 * Updated for full platform integration.
 */
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'transition-colors hover:text-primary relative py-1',
              isActive ? 'text-primary font-bold' : 'text-muted-foreground'
            )}
          >
            <Text variant="label" as="span" className="text-[10px] tracking-widest">
              {link.label}
            </Text>
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300 shadow-[0_0_8px_rgba(130,114,242,0.5)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
