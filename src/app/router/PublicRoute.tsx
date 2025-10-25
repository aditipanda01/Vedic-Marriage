import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/common/constants/routes';
import PublicLayout from '../layouts/PublicLayout';

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Only redirect authenticated users if they're on auth-specific pages (login, register, etc.)
  const isAuthPage = location.pathname === ROUTES.LOGIN || 
                     location.pathname === ROUTES.REGISTER || 
                     location.pathname === ROUTES.FORGOT_PASSWORD ||
                     location.pathname.includes('/reset-password');

  if (isAuthenticated && isAuthPage) {
    // Check if there's a specific redirect path in the location state or search params
    const searchParams = new URLSearchParams(location.search);
    const redirectFromSearch = searchParams.get('redirect');
    const redirectFromState = location.state?.from?.pathname || location.state?.redirect;
    const redirectPath = redirectFromSearch || redirectFromState || ROUTES.DASHBOARD;
    
    return <Navigate to={redirectPath} replace />;
  }

  return <PublicLayout />;
} 