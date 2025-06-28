import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import LanguagesPage from "../pages/LanguagesPage";
import NotFound from "../pages/NotFound";
import OnboardingPage from "../pages/OnboardingPage";
import NativeLanguageSelection from "../pages/NativeLanguageSelection";
import LanguageToLearn from "../pages/LanguageToLearn";
import Dashboard from "../pages/Dashboard";
import { useAuth } from '@/contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const hasSelectedLanguages = localStorage.getItem('hasSelectedLanguages') === 'true';

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Allow access to language selection pages without checking hasSelectedLanguages
  if (location.pathname === '/native-language' || location.pathname === '/language-to-learn') {
    return <>{children}</>;
  }

  if (!hasSelectedLanguages) {
    return <Navigate to="/native-language" />;
  }

  return <>{children}</>;
};

// Create router with protected routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/languages",
    element: <LanguagesPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/native-language",
    element: (
      <ProtectedRoute>
        <NativeLanguageSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/language-to-learn",
    element: (
      <ProtectedRoute>
        <LanguageToLearn />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
} 