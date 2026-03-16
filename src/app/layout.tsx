import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { GlobalStoreProvider } from '@/lib/state';
import { generateMetadata } from '@/lib/seo/metadata';
import { ThemeProvider } from '@/design-system/themes/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = generateMetadata({
  title: 'Imperialpedia — AI Knowledge Infrastructure',
  description: 'The world\'s most scalable financial intelligence engine. Explore over 1,000,000 pages of deep financial insights, creator insights, and programmatic SEO driven knowledge.',
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
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <GlobalStoreProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Navbar />
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
