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
import HomePage from '@/pages/HomePage';
import LevelOne from './pages/languages/Hindi/Foundation/Level1';
import LevelTwo from './pages/languages/Hindi/Foundation/Level2';
import LevelThree from './pages/languages/Hindi/Foundation/Level3';
import LevelFour from './pages/languages/Hindi/Foundation/Level4';
import LevelFive from './pages/languages/Hindi/Foundation/Level5';
import LevelSix from './pages/languages/Hindi/Foundation/Level6';
import LevelSeven from './pages/languages/Hindi/Foundation/Level7';
import LevelEight from './pages/languages/Hindi/Foundation/Level8';
import LevelNine from './pages/languages/Hindi/Foundation/Level9';
import LevelTen from './pages/languages/Hindi/Foundation/Level10';


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
            <Route path="/" element={<HomePage />} />
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
              path="/languages/Hindi/foundation/level2"
              element={
                <PrivateRoute>
                  <LevelTwo />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level3"
              element={
                <PrivateRoute>
                  <LevelThree />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level4"
              element={
                <PrivateRoute>
                  <LevelFour />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level5"
              element={
                <PrivateRoute>
                  <LevelFive />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level6"
              element={
                <PrivateRoute>
                  <LevelSix />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level7"
              element={
                <PrivateRoute>
                  <LevelSeven />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level8"
              element={
                <PrivateRoute>
                  <LevelEight />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level9"
              element={
                <PrivateRoute>
                  <LevelNine />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/foundation/level10"
              element={
                <PrivateRoute>
                  <LevelTen />
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
          </Routes>
        </Router>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;