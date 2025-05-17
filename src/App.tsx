import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AppRouter from './routes';

const App = () => (
  <LanguageProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AppRouter />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;