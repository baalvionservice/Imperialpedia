
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Text } from '@/design-system/typography/text';

/**
 * Administrative entry point.
 * Redirects to the integrated mission control summary on the client.
 */
export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <Text variant="bodySmall" className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground">
        Initializing Governance Handshake...
      </Text>
    </div>
  );
}
