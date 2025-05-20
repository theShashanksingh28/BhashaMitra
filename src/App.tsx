import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import StageLevels from './pages/languages/StageLevels';
import LevelTemplate from './components/LevelTemplate';

// Lazy load components
const LoginForm = lazy(() => import('@/components/auth/LoginForm'));
const SignupForm = lazy(() => import('@/components/auth/SignupForm'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Certificates = lazy(() => import('@/pages/Certificates'));
const Badges = lazy(() => import('@/pages/Badges'));
const LanguageToLearn = lazy(() => import('@/pages/LanguageToLearn'));
const NativeLanguageSelection = lazy(() => import('@/pages/NativeLanguageSelection'));
const LanguageStages = lazy(() => import('./pages/languages/LanguageStages'));
const LanguageLevel = lazy(() => import('./pages/languages/LanguageLevel'));
const HomePage = lazy(() => import('@/pages/HomePage'));

// Lazy load Hindi levels
const LevelOne = lazy(() => import('./pages/languages/Hindi/Foundation/Level1'));
const LevelTwo = lazy(() => import('./pages/languages/Hindi/Foundation/Level2'));
const LevelThree = lazy(() => import('./pages/languages/Hindi/Foundation/Level3'));
const LevelFour = lazy(() => import('./pages/languages/Hindi/Foundation/Level4'));
const LevelFive = lazy(() => import('./pages/languages/Hindi/Foundation/Level5'));
const LevelSix = lazy(() => import('./pages/languages/Hindi/Foundation/Level6'));
const LevelSeven = lazy(() => import('./pages/languages/Hindi/Foundation/Level7'));
const LevelEight = lazy(() => import('./pages/languages/Hindi/Foundation/Level8'));
const LevelNine = lazy(() => import('./pages/languages/Hindi/Foundation/Level9'));
const LevelTen = lazy(() => import('./pages/languages/Hindi/Foundation/Level10'));

// Memoize the loading spinner
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
));

// Memoize route components
const PublicRoute = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
));

const PrivateRoute = memo(({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return currentUser ? (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
});

// Memoize the main App component
const App = memo(() => (
  <LanguageProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignupForm /></PublicRoute>} />
            <Route path="/features" element={<PublicRoute><HomePage /></PublicRoute>} />
            <Route path="/benefits" element={<PublicRoute><HomePage /></PublicRoute>} />
            <Route path="/about" element={<PublicRoute><HomePage /></PublicRoute>} />

            {/* Private Routes */}
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
              path="/languages/Hindi/Foundation/level1"
              element={
                <PrivateRoute>
                  <LevelOne />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level2"
              element={
                <PrivateRoute>
                  <LevelTwo />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level3"
              element={
                <PrivateRoute>
                  <LevelThree />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level4"
              element={
                <PrivateRoute>
                  <LevelFour />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level5"
              element={
                <PrivateRoute>
                  <LevelFive />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level6"
              element={
                <PrivateRoute>
                  <LevelSix />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level7"
              element={
                <PrivateRoute>
                  <LevelSeven />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level8"
              element={
                <PrivateRoute>
                  <LevelEight />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level9"
              element={
                <PrivateRoute>
                  <LevelNine />
                </PrivateRoute>
              }
            />
            <Route
              path="/languages/Hindi/Foundation/level10"
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
          <Toaster />
          <Sonner />
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  </LanguageProvider>
));

export default App;