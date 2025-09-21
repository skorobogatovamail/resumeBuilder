// src/layouts/MainLayout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import Header from '@/components/shared/Header';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Основной макет приложения
 * Включает в себя шапку и обертку для контента
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </>
  );
};

export default MainLayout;
