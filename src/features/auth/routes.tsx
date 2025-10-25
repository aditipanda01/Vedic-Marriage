import { Route } from 'react-router-dom';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from './components';
import { ROUTES } from '@/common/constants/routes';

export const authRoutes = (
  <Route element={<PublicLayout />}>
    <Route path={ROUTES.LOGIN} element={<LoginForm />} />
    <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordForm />} />
    <Route path="/reset-password" element={<ResetPasswordForm />} />
  </Route>
); 