import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import { Cabin } from "next/font/google";
import Footer from '@/components/layout/Footer';
import { GlobalStoreProvider } from '@/lib/state';
import { buildMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/design-system/themes/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';



export const metadata: Metadata = buildMetadata();
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["600"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${cabin.className} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <GlobalStoreProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Header />
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
