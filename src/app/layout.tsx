import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { seoConfig } from '@/config/seo';
import { GlobalStoreProvider } from '@/lib/state';

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  openGraph: {
    type: 'website',
    locale: seoConfig.openGraph.locale,
    url: seoConfig.openGraph.url,
    siteName: seoConfig.openGraph.siteName,
    images: seoConfig.openGraph.images,
  },
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.twitter.site,
    creator: seoConfig.twitter.handle,
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <GlobalStoreProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
