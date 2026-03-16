'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { CookieConsent } from '@/components/common/CookieConsent';
import { GlobalStoreProvider } from '@/lib/state';
import { ThemeProvider } from '@/design-system/themes/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { trackPageView } from '@/lib/utils/analytics';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <GlobalStoreProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Navbar />
              <CookieConsent />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
