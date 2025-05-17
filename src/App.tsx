import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Certificates from '@/pages/Certificates';
import Badges from '@/pages/Badges';
import LanguageToLearn from '@/pages/LanguageToLearn';
import NativeLanguageSelection from '@/pages/NativeLanguageSelection';
import LanguageStages from './pages/languages/LanguageStages';
import LanguageLevel from './pages/languages/LanguageLevel';
import LevelTemplate from './components/LevelTemplate';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import StageLevels from './pages/languages/StageLevels';
import LevelOne from './pages/languages/Hindi/Foundation/Level1';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

const App = () => (
  <LanguageProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/native-language"
              element={
                <PrivateRoute>
                  <NativeLanguageSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/language-selection"
              element={
                <PrivateRoute>
                  <LanguageToLearn />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/:language"
              element={
                <PrivateRoute>
                  <LanguageStages />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/:language/:stage/levels"
              element={
                <PrivateRoute>
                  <StageLevels />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level1"
              element={
                <PrivateRoute>
                  <LevelOne />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/:language/:stage/level:levelNumber"
              element={
                <PrivateRoute>
                  <LanguageLevel />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/certificates"
              element={
                <PrivateRoute>
                  <Certificates />
                </PrivateRoute>
              }
            />
            <Route
              path="/badges"
              element={
                <PrivateRoute>
                  <Badges />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;