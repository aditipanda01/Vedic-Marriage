export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/app/profile',
  MY_PROFILE: '/my-profile',
  BASIC_INFO: '/basic-info',
  MATCHES: '/app/matches',
  CHAT: '/app/chat',
  SETTINGS: '/app/settings',
  
  // Feature routes
  MATCH_DETAILS: (id: string) => `/app/matches/${id}`,
  CHAT_CONVERSATION: (id: string) => `/app/chat/${id}`,
  PROFILE_EDIT: '/app/profile/edit',
  DOWNLOAD_PROFILE: '/download-profile',
  
  // Payment routes
  MAKE_PAYMENT: '/payment/make-payment',
} as const; 