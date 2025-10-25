import { Fragment } from 'react';
import { Outlet, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { tokenStorage } from '@/lib/token';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/slices/authSlice';
import { DashboardFooter } from './DashboardFooter';
import { DashboardHeader } from './DashboardHeader';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Matches', href: '/dashboard/matches', current: false },
  { name: 'Messages', href: '/dashboard/messages', current: false },
  { name: 'Profile', href: '/dashboard/profile', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Check if user is authenticated
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      // Clear authentication state immediately
      // tokenStorage.removeToken();
     // dispatch(clearUser());
      
      // Navigate to login immediately
    
      
      // Then try to call the logout API (but don't wait for it)
      logout().catch(error => {
        console.error('Logout API error:', error);
      });
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      tokenStorage.removeToken();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="profile-page bg-white relative w-[390px] mx-auto" style={{
      minHeight: '100vh',
      paddingBottom: '100px', // Add space for mobile navigation
      marginTop:"10%"
    }}>
      
      <Outlet />
      
      
    </div>
  );
}