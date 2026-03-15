import Link from 'next/link';
import { routes } from '@/config/routes';
import { platformConfig } from '@/config/platform';

const Footer = () => {
  return (
    <footer className="border-t bg-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href={routes.public.home} className="text-2xl font-headline font-bold text-primary tracking-tight">
              Imperial<span className="text-foreground">pedia</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {platformConfig.description}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={routes.public.glossary} className="hover:text-primary">Glossary</Link></li>
              <li><Link href="#" className="hover:text-primary">Market Data</Link></li>
              <li><Link href={routes.public.calculators} className="hover:text-primary">Calculators</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Creators</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={routes.public.creators} className="hover:text-primary">Join as Expert</Link></li>
              <li><Link href="#" className="hover:text-primary">Publishing Tools</Link></li>
              <li><Link href="#" className="hover:text-primary">Monetization</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Financial Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {platformConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
