'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import './globals.css';

// UI & Common Components
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { CookieConsent } from '@/components/common/CookieConsent';
import ToastProvider from '@/components/common/ToastManager';

// Providers & Utils
import { GlobalStoreProvider } from '@/lib/state';
import { ThemeProvider } from '@/design-system/themes/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { trackPageView } from '@/lib/utils/analytics';
import { I18nProvider } from '@/components/i18n/I18nProvider';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* GA4 Handshake */}
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl transition-all"
        >
          Skip to main content
        </a>

        <I18nProvider>
          <GlobalStoreProvider>
            <ThemeProvider>
              <ToastProvider>
                <TooltipProvider>
                  <Navbar />
                  <CookieConsent />
                  <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
                    {children}
                  </main>
                  <Footer />
                  <Toaster />
                </TooltipProvider>
              </ToastProvider>
            </ThemeProvider>
          </GlobalStoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
