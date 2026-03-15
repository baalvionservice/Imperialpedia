"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AppState {
  appLoading: boolean;
  currentUser: User | null;
  platformReady: boolean;
  environment: string;
}

interface AppContextType extends AppState {
  setAppLoading: (loading: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  setPlatformReady: (ready: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initialize with a mock admin for CMS prototyping
const DEFAULT_MOCK_USER: User = {
  id: 'u-1',
  name: 'Eleanor Vance',
  email: 'eleanor@imperialpedia.com',
  role: 'admin'
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    appLoading: false,
    currentUser: DEFAULT_MOCK_USER,
    platformReady: true,
    environment: process.env.NODE_ENV || 'development',
  });

  const setAppLoading = (appLoading: boolean) => setState(prev => ({ ...prev, appLoading }));
  const setCurrentUser = (currentUser: User | null) => setState(prev => ({ ...prev, currentUser }));
  const setPlatformReady = (platformReady: boolean) => setState(prev => ({ ...prev, platformReady }));

  return (
    <AppContext.Provider value={{ ...state, setAppLoading, setCurrentUser, setPlatformReady }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
