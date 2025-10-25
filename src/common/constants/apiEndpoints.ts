export const API_BASE_URL ='http://localhost:7129/api';
export const PHOTO_URL ='http://localhost:7129/uploads/';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/signin/regular`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/Auth/signout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    SEND_OTP: `${API_BASE_URL}/Auth/registration/verify-phone/request-otp`,
    VERIFY_OTP: `${API_BASE_URL}/Auth/registration/verify-phone/verify-otp`,
    FINISH_SIGNUP: `${API_BASE_URL}/auth/finish-signup`,
    COMPLETE_PROFILE: `${API_BASE_URL}/Auth/registration/signup/regular`,
    SEND_EMAIL_OTP: `${API_BASE_URL}/Auth/registration/verify-email/request-otp`,
    VERIFY_EMAIL_OTP: `${API_BASE_URL}/Auth/registration/verify-email/verify-otp`,
    GET_CURRENT_USER: `${API_BASE_URL}/Auth/me`,
  },

  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
    UPLOAD_PHOTO: `${API_BASE_URL}/user/photo`,
    BASIC_INFO: `${API_BASE_URL}/profile/basic-info`,
    ASTRO_INFO: `${API_BASE_URL}/profile/astro-info`,
    FAMILY_INFO: `${API_BASE_URL}/profile/family-info`,
    CAREER_INFO: `${API_BASE_URL}/profile/career-education`,
    SPIRITUAL_INFO: `${API_BASE_URL}/profile/spiritual-info`,
    PREFERENCES: `${API_BASE_URL}/profile/preferences`,
    KYC_UPLOAD: `${API_BASE_URL}/profile/photos/kyc`,
    KYC_DOCUMENTS: `${API_BASE_URL}/profile/photos/kyc-documents`,
    KYC_STATUS: `${API_BASE_URL}/profile/kyc/status`,
    SELFIE_UPLOAD: `${API_BASE_URL}/profile/photos/selfie`,
    GALLERY_UPLOAD: `${API_BASE_URL}/profile/photos/gallery`,
    PRIVACY_UPDATE: `${API_BASE_URL}/profile/privacy`,
    UPDATE_EMAIL: `${API_BASE_URL}/profile/update-email`,
    UPDATE_PHONE: `${API_BASE_URL}/profile/update-phone`,
    CHANGE_PASSWORD: `${API_BASE_URL}/profile/change-password`,
  },

  // Payment endpoints
  PAYMENT: {
    BASE: `${API_BASE_URL}/payment`,
    CREATE: `${API_BASE_URL}/payment/payments`,
    STATUS: `${API_BASE_URL}/payment`,
    WEBHOOK: `${API_BASE_URL}/payment`,
    REFUND: `${API_BASE_URL}/payment`,
    SUBSCRIPTION_PLANS: {
      ALL: `${API_BASE_URL}/payment/subscription-plans`,
      ACTIVE: `${API_BASE_URL}/payment/subscription-plans/active`,
      BY_ID: (id: string) => `${API_BASE_URL}/payment/subscription-plans/${id}`,
      BY_NAME: (name: string) => `${API_BASE_URL}/payment/subscription-plans/name/${name}`,
    },
    USER_SUBSCRIPTION: (userId: string) => `${API_BASE_URL}/payment/subscriptions/user/${userId}`,
  },

  // Match endpoints
  MATCH: {
    LIST: `${API_BASE_URL}/matches`,
    DETAILS: (id: string) => `${API_BASE_URL}/matches/${id}`,
    LIKE: (id: string) => `${API_BASE_URL}/matches/${id}/like`,
    SKIP: (id: string) => `${API_BASE_URL}/matches/${id}/skip`,
  },

  // Chat endpoints
  CHAT: {
    CONVERSATIONS: `${API_BASE_URL}/chat/conversations`,
    MESSAGES: (id: string) => `${API_BASE_URL}/chat/conversations/${id}/messages`,
    SEND_MESSAGE: (id: string) => `${API_BASE_URL}/chat/conversations/${id}/messages`,
  },

  // Support endpoints
  SUPPORT: {
    TICKETS: `${API_BASE_URL}/support/tickets`,
    TICKET_BY_ID: (id: string) => `${API_BASE_URL}/support/tickets/${id}`,
    TICKET_MESSAGES: (id: string) => `${API_BASE_URL}/support/tickets/${id}/messages`,
  },

  // Personality endpoints
  PERSONALITY: {
    ABOUT_ME: `${API_BASE_URL}/profile/personality/about-me`,
    DIET: `${API_BASE_URL}/profile/personality/diet`,
    VOICE_INTRO: `${API_BASE_URL}/profile/personality/voice-intro`,
    MBTI_TRAITS: `${API_BASE_URL}/profile/personality/mbti-traits`,
    CORE_VALUES: `${API_BASE_URL}/profile/personality/core-values`,
    ACTIVITIES_GENRES: `${API_BASE_URL}/profile/personality/activities-genres`,
    STRENGTHS_WEAKNESSES: `${API_BASE_URL}/profile/personality/strengths-weaknesses`,
    SOCIAL_COMFORT: `${API_BASE_URL}/profile/personality/social-comfort`,
    SUMMARY: `${API_BASE_URL}/profile/personality/summary`,
  },
} as const; 