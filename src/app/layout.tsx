"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Playfair_Display, PT_Sans, Cabin } from "next/font/google";
import "./globals.css";

// UI & Common Components
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import ToastProvider from "@/components/common/ToastManager";

// Providers & Utils
import { GlobalStoreProvider } from "@/lib/state";
import { ThemeProvider } from "@/design-system/themes/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trackPageView } from "@/lib/utils/analytics";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ui",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Root Layout for Imperialpedia.
 * Optimized for institutional performance and accessibility.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  // Conditionally hide public navigation for administrative nodes
  const isAdminPath = pathname?.startsWith("/admin");

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(playfair.variable, ptSans.variable, cabin.variable)}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1C1822" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-IMP-INDEX-42"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
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

      <body className="font-ui bg-background text-foreground antialiased min-h-screen flex flex-col">
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
                  {!isAdminPath && <Navbar />}
                  <CookieConsent />
                  <main
                    id="main-content"
                    className="flex-grow mt-16 outline-none"
                    tabIndex={-1}
                  >
                    {children}
                  </main>
                  {!isAdminPath && <Footer />}
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
