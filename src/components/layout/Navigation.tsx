'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';
import { Text } from '@/design-system/typography/text';

const navLinks = [
  { label: 'Home', href: routes.public.home },
  { label: 'Glossary', href: routes.public.glossary },
  { label: 'AI Outline', href: routes.public.outline },
  { label: 'Calculators', href: routes.public.calculators },
  { label: 'Creators', href: routes.public.creators },
];

/**
 * Primary horizontal navigation links for desktop view.
 */
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'transition-colors hover:text-primary relative py-1',
              isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
            )}
          >
            <Text variant="bodySmall" as="span">
              {link.label}
            </Text>
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
