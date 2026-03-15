'use client';

import React from 'react';
import Link from 'next/link';
import { Search, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Container } from '@/design-system/layout/container';

/**
 * Global application header with logo, navigation, search, and user actions.
 * Refined for accessibility with proper labels and focus states.
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link 
            href={routes.public.home} 
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition-all"
            aria-label="Imperialpedia Home"
          >
            <span className="text-2xl font-headline font-bold text-primary tracking-tight">
              Imperial<span className="text-foreground">pedia</span>
            </span>
          </Link>
          
          <Navigation />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden lg:flex items-center relative group">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="search" 
              placeholder="Search platform..."
              aria-label="Search platform knowledge"
              className="bg-muted/50 border-none rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all duration-300 focus:w-80"
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex text-muted-foreground hover:text-primary"
            aria-label="User Profile"
          >
            <UserCircle className="h-6 w-6" />
          </Button>

          <Button variant="default" className="hidden sm:flex font-bold px-6">
            Get Started
          </Button>
          
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
