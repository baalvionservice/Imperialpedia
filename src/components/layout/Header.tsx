'use client';

import React from 'react';
import Link from 'next/link';
import { Search, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Container } from '@/design-system/layout/container';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container className="h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-headline font-bold text-primary tracking-tight">
            Imperial<span className="text-foreground">pedia</span>
          </Link>
          
          {/* Center: Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          
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
