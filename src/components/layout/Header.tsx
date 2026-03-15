'use client';

import React from 'react';
import Link from 'next/link';
import { Search, UserCircle, Bell, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Container } from '@/design-system/layout/container';
import { useAppStore } from '@/lib/state/app-store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Text } from '@/design-system/typography/text';

/**
 * Global application header with logo, navigation, search, and user actions.
 * Integrated with AppStore for real-time user identity and notifications.
 */
const Header = () => {
  const { currentUser, notifications } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const dashboardRoute = currentUser?.role === 'admin' ? '/admin' : 
                        currentUser?.role === 'editor' ? '/editor' : 
                        currentUser?.role === 'writer' ? '/writer' : '/';

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

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary" asChild>
                <Link href="/writer/notifications">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                  )}
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-primary"
                    aria-label="User Profile"
                  >
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardRoute} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> 
                      <span>{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="default" className="hidden sm:flex font-bold px-6">
              Get Started
            </Button>
          )}
          
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
