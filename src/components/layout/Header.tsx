'use client';

import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Container } from '@/design-system/layout/container';

/**
 * Standard Header component with search, navigation, and auth actions.
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container className="h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-8 shrink-0">
          <Link href="/" className="text-2xl font-headline font-bold text-primary tracking-tight">
            Imperial<span className="text-foreground">pedia</span>
          </Link>
          
          {/* Center: Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>
        </div>

        {/* Center/Right: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" className="font-bold">
              Login
            </Button>
            <Button className="font-bold px-6 shadow-lg shadow-primary/20">
              Join Waitlist
            </Button>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
