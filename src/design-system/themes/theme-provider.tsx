'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, ThemeType } from './light-theme';
import { darkTheme } from './dark-theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', themeMode);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      const effectiveTheme = themeMode === 'system' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : themeMode;
        
      root.classList.add(effectiveTheme);
    }
  }, [themeMode, mounted]);

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
