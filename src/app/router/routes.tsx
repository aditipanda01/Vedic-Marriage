import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/common/constants/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Direct imports for now
import Home from '@/features/home/pages/Home';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import ResetPassword from '@/features/auth/pages/ResetPassword';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Profile from '@/features/profile/pages/Profile';
import MyProfile from '@/features/profile/pages/MyProfile';
import Matches from '@/features/matches/pages/Matches';
import Chat from '@/features/chat/pages/Chat';
import Settings from '@/features/settings/pages/Settings';
// @ts-ignore
import DownloadProfile from '@/features/dashboard/pages/DownloadProfile';

export const AppRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/my-profile',
    element: <MyProfile />,
  },
  {
    path: '/matches',
    element: <Matches />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];

export function AppRoutesComponent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path={ROUTES.MY_PROFILE} element={<MyProfile />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.DOWNLOAD_PROFILE} element={<DownloadProfile />} />
          <Route path={ROUTES.MATCHES} element={<Matches />} />
          <Route path={ROUTES.CHAT} element={<Chat />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Suspense>
  );
} 