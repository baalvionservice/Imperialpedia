"use client";

import React, { ReactNode } from 'react';
import { AppProvider } from './app-store';
import { UIProvider } from './ui-store';

export function GlobalStoreProvider({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </AppProvider>
  );
}
