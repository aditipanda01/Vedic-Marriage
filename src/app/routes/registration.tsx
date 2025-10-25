import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import SignUp from '@/pages/SignUp';
import SignUpVerify from '@/pages/SignUpVerify';
import SignUpProfile from '@/pages/SignUpProfile';
import Login from '../pages/auth/Login';
import Personality from '@/pages/Personality';
import { 
  AboutMe, 
  AboutMeHelper, 
  Diet, 
  MBTI, 
  PersonalValue, 
  Strength, 
  Weakness, 
  Hobby, 
  HobbyGonra, 
  SocialComfort, 
  VoiceIntro 
} from '@/screens/Personality';
import { 
  KYCType,
  KYCFront,
  KYCBack,
  KYCPreview,
  KYCUploadSuccess,
  KYCVerification
} from '@/screens/Verification/KYC';
import { SelfieVerification } from '@/screens/Verification/Selfie';
import { GalleryPhotoVerification } from '@/screens/Verification/GalleryPhoto';
import { PrivacySettings } from '@/screens/Privacy';
import { MakePaymentScreen } from '@/screens/Payment/MakePaymentScreen';
import { PaymentMethodScreen } from '@/screens/Payment/PaymentMethodScreen';
import { ProcessPaymentScreen } from '@/screens/Payment/ProcessPaymentScreen';
import { PaymentSuccessScreen } from '@/screens/Payment/PaymentSuccessScreen';
import { Paymentfailed } from '@/screens/Payment/Paymentfailed';
import Verification from '@/pages/Verification';
import Settings from '@/pages/Settings';
import Payment from '@/pages/Payment';
import ProfileCompletion from '@/pages/ProfileCompletion';
import ProfileFilling from '@/pages/ProfileFilling';

// Public routes (accessible without authentication)
export const publicRegistrationRoutes: RouteObject[] = [
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signup/verify',
    element: <SignUpVerify />,
  },
  {
    path: '/signup/profile',
    element: <SignUpProfile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

// Protected routes (require authentication)
export const protectedRegistrationRoutes: RouteObject[] = [
  {
    path: '/personality',
    element: <Personality />,
  },
  {
    path: '/personality/about-me',
    element: <AboutMe />,
  },
  {
    path: '/personality/about-me/helper',
    element: <AboutMeHelper />,
  },
  {
    path: '/personality/diet',
    element: <Diet />,
  },
  {
    path: '/personality/mbti',
    element: <MBTI />,
  },
  {
    path: '/personality/personal-value',
    element: <PersonalValue />,
  },
  {
    path: '/personality/strength',
    element: <Strength />,
  },
  {
    path: '/personality/weakness',
    element: <Weakness />,
  },
  {
    path: '/personality/hobby',
    element: <Hobby />,
  },
  {
    path: '/personality/hobby-gonra',
    element: <HobbyGonra />,
  },
  {
    path: '/personality/social-comfort',
    element: <SocialComfort />,
  },
  {
    path: '/personality/voice-intro',
    element: <VoiceIntro />,
  },
  {
    path: '/verification',
    element: <Verification />,
  },
  {
    path: '/verification/kyc/type',
    element: <KYCType />,
  },
  {
    path: '/verification/kyc/front',
    element: <KYCFront />,
  },
  {
    path: '/verification/kyc/back',
    element: <KYCBack />,
  },
  {
    path: '/verification/kyc/preview',
    element: <KYCPreview />,
  },
  {
    path: '/verification/kyc/success',
    element: <KYCUploadSuccess />,
  },
  {
    path: '/verification/kyc',
    element: <KYCVerification />,
  },
  {
    path: '/verification/selfie',
    element: <SelfieVerification />,
  },
  {
    path: '/verification/gallery-photo',
    element: <GalleryPhotoVerification />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/settings/privacy',
    element: <PrivacySettings />,
  },
  {
    path: '/payment',
    element: <Payment />,
  },
  {
    path: '/payment/make-payment',
    element: <MakePaymentScreen />,
  },
  {
    path: '/payment/method',
    element: <PaymentMethodScreen />,
  },
  {
    path: '/payment/process',
    element: <ProcessPaymentScreen />,
  },
  {
    path: '/payment/success',
    element: <PaymentSuccessScreen />,
  },
  {
    path: '/payment/failed',
    element: <Paymentfailed />,
  },
  // {
  //   path: '/profile-completion',
  //   element: <ProfileCompletion />,
  // },
  {
    path: '/profile-filling',
    element: <ProfileFilling />,
  },
];

// Legacy export for backward compatibility
export const registrationRoutes: RouteObject[] = [
  ...publicRegistrationRoutes,
  ...protectedRegistrationRoutes,
];