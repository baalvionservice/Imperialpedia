'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { CookieConsent } from '@/components/common/CookieConsent';
import { GlobalStoreProvider } from '@/lib/state';
import { ThemeProvider } from '@/design-system/themes/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { trackPageView } from '@/lib/utils/analytics';
import { I18nProvider } from '@/components/i18n/I18nProvider';

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
        
        {/* GA4 Handshake - Phase 1 Foundation */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-IMP-INDEX-42"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-IMP-INDEX-42', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <I18nProvider>
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
        </I18nProvider>
      </body>
    </html>
  );
}
