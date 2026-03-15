import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Container } from '@/design-system/layout/container';

/**
 * Specialized layout for the Admin Dashboard.
 * Includes a persistent sidebar and restricted header.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Fixed Sidebar for Admin Navigation */}
      <Sidebar className="hidden lg:flex sticky top-0 h-screen" />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Specific Header can be injected here if different from Public */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Container className="max-w-7xl">
            {children}
          </Container>
        </div>
      </div>
    </div>
  );
}
