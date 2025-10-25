import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { ProtectedRoute } from './router/ProtectedRoute';
import Home from '@/features/home';
import Login from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import Dashboard from '../features/dashboard/pages/Dashboard';
import {AccountSettings} from '../features/dashboard/pages/AccountSettings';
import { SubscriptionScreen } from '../features/dashboard/pages/SubscriptionScreen';
import { ProfileDetails } from '../features/dashboard/pages/ProfileDetails';
import SupportPage from "../features/support/SupportPage";
import SupportTicketPage from "../features/support/SupportTicketPage";
import SupportTicketsList from "../features/support/SupportTicketsList";
import SupportTicketDetail from "../features/support/SupportTicketDetail";
import SupportTicketSuccess from "../features/support/SupportTicketSuccess";
import NotificationsPage from "../features/notification/NotificationsPage"
import MessagesPage from "../features/messages/MessagesPage"
import MsgById from '@/features/messages/MsgById';
import BlockedUsersPage from '@/features/matches/pages/BlockedUserPage';
import MyProfile from '@/features/profile/pages/MyProfile';
import BasicInfo from '@/features/profile/pages/BasicInfo';
import { Toaster } from 'sonner';

import { homeRoutes } from './routes/home';
import { publicRegistrationRoutes, protectedRegistrationRoutes } from './routes/registration';
import { ToastProvider } from '@/common/components/ui/toast/ToastContainer';
import Matches from '@/features/matches/pages/Matches';
// @ts-ignore
import DownloadProfile from '@/features/dashboard/pages/DownloadProfile';
//import { SwiperCard } from '@/common/components/animations/SwiperCard/SwiperCard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {/* Auth Routes (Public) */}
            <Route element={<AuthLayout />}>
              {publicRegistrationRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Registration routes that require authentication */}
              {protectedRegistrationRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {/* Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account-setting" element={<AccountSettings />} />
              <Route path="/subscription" element={<SubscriptionScreen />} />
              <Route path="/profile-details" element={<ProfileDetails />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/basic-info" element={<BasicInfo />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/create-ticket" element={<SupportTicketPage />} />
              <Route path="/tickets" element={<SupportTicketsList />} />
              <Route path="/ticket/:id" element={<SupportTicketDetail />} />
              <Route path="/ticket-success" element={<SupportTicketSuccess />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:id" element={<MsgById />} />
              <Route path="/blocked-users" element={<BlockedUsersPage />} />
              <Route path="/matches" element={<Matches />} />
              
              {/*<Route path="/messages/empty" element={<EmptyMessagesPage />} />*/}
             {/* <Route path="/matches" element={<MatchesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:id" element={<ProfileDetailPage />} />
               */}
            </Route>

            {/* Protected Routes without Layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="/download-profile" element={<DownloadProfile />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Router>
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App; 