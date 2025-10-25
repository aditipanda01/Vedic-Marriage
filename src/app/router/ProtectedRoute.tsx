import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { checkGuard, GuardConfig } from './routeGuards';

interface ProtectedRouteProps {
  guard?: GuardConfig;
}

export function ProtectedRoute({ guard }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check authentication using both Redux and localStorage
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (guard && !checkGuard(user, guard)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
} 