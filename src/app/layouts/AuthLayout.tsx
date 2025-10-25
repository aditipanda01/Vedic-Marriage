import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // Check if there's a specific redirect path in the location state or search params
    const searchParams = new URLSearchParams(location.search);
    const redirectFromSearch = searchParams.get('redirect');
    const redirectFromState = location.state?.from?.pathname || location.state?.redirect;
    
    // Determine default redirect based on profile completion percentage
    let defaultRedirect = '/my-profile';
    if (user?.profileCompletionDetails?.completionPercentage) {
      const profileCompletionPercentage = user.profileCompletionDetails.completionPercentage;
      if (profileCompletionPercentage > 40) {
        defaultRedirect = '/dashboard';
      }
    }
    
    const redirectPath = redirectFromSearch || redirectFromState || defaultRedirect;
    
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Outlet />
  );
} 