export interface User {
  _id: string;
  phoneNumber: string;
  email: string;
  fname: string;
  lname: string;
  username: string;
  profilePicture: string;
  signUpMethod: string;
  Role: string;
  location?: {
    type: string;
    coordinates: number[];
    city: string;
    state: string;
    country: string;
  };
  profileFor?: string;
  basic_info?: {
    gender?: string;
    marital_status?: string;
    mother_tongue?: string;
    languages_known?: string[];
    height?: string;
    weight?: number;
    health_disease_disability?: string;
    religion?: string;
    ethnicity?: string;
  };
  astro?: {
    date_of_birth?: string;
    time_of_birth?: string;
    birth_place?: string;
    latitude?: string;
    longitude?: string;
    timeZone?: number;
    rashi?: string;
    nakshatra?: string;
    manglik?: string;
    community?: string;
    caste?: string;
    gotra?: string;
  };
  family?: {
    father_name?: string;
    mother_name?: string;
    father_occupation?: string;
    mother_occupation?: string;
    family_culture?: string;
    family_location?: string;
    family_status?: string;
    brother_count?: number;
    sister_count?: number;
  };
  career_education?: {
    employed?: boolean;
    company_type?: string;
    company_name?: string;
    occupation?: string;
    income?: string;
    job_location?: string;
    working_period?: number;
    total_working_period?: number;
    ed_qualification?: string;
    ed_institution?: string;
    ed_other_qualification?: string;
  };
  spiritual_info?: {
    other_organization_details?: {
      other_organization_name?: string;
      affiliated_duration?: number;
      sadhana_time?: number;
    };
    iskcon_affiliation_details?: {
      initiation_details?: {
        initiation_name?: string;
        spiritual_master?: string;
      };
      practicing_time_period?: number;
      chanting_rounds?: string;
      temple_visit?: string;
      spirituality_role?: string;
      initiated?: string;
      four_regulative_principles?: string;
      ekadashi_fasting?: string;
      parents_practice_krishna?: string;
      book_read?: string[];
      iskcon_associated?: string;
      temple_attended_associated_type?: string;
      seminar?: string;
      specific_spiritual_goals?: string;
      spiritual_mentor?: string;
      temple_services?: string;
      department_name?: string;
      designation_name?: string;
      roles_and_experiences?: string;
    };
    affiliated_with_spiritual_organization?: string;
  };
  lifestyle_personality?: {
    voiceInterviewRecord?: {
      status?: string;
      uploadedAt?: string;
    };
    inferredPersonalityFromAudio?: {
      traits?: string[];
      lastUpdated?: string;
    };
    inferredPersonalityFromPhotos?: {
      traits?: string[];
      lastUpdated?: string;
    };
    inferredPersonalityFromText?: {
      traits?: string[];
      lastUpdated?: string;
    };
    core_values_or_motivates_inspires?: string[];
    free_time_activities?: string[];
    preferred_genres?: string[];
    strengths?: string[];
    weaknesses?: string[];
    about_me?: string;
    diet?: string;
    social_gathering_comfort?: string;
    characterize_your_personality?: {
      attention_focus?: string;
      information_processing?: string;
      decision_making?: string;
      situation_approach?: string;
    };
  };
  preferences?: {
    preferred_marital_status?: string[];
    preferred_age_start?: number;
    preferred_age_end?: number;
    preferred_height_start?: string;
    preferred_height_end?: string;
    preferred_religion?: string;
    preferred_caste?: string;
    preferred_community?: string;
    preferred_language?: string[];
    preferred_city_location?: string;
    preferred_qualification?: string;
    preferred_occupation?: string;
    preferred_income?: string;
    preferred_food?: string[];
    preferred_manglik_status?: string;
    preferred_cultural_values?: string;
    preferred_initiation_status?: string;
    preferred_affiliation?: string[];
    preferred_no_of_children?: string;
    preferred_partner_expectations?: string;
  };
  privacy_setups?: {
    basic_privacy?: string;
    family_privacy?: string;
    astro_privacy?: string;
    career_privacy?: string;
    spiritual_privacy?: string;
    personality_privacy?: string;
    photo_privacy?: string;
    contact_privacy?: string;
    activity_status?: string;
    two_factor_authentication?: boolean;
  };
  verification?: {
    verificationId?: string;
    verifiedGalleryPhoto?: Array<{
      photoId?: string;
      uploadedAt?: string;
      _id?: string;
    }>;
    firstTimeVerificationCompletionStatus?: boolean;
  };
  profileCompletionDetails?: {
    completedSections?: string[];
    incompleteSections?: string[];
    sectionDetails?: Record<string, any>;
    completedCount?: number;
    completionPercentage?: number;
    profileCompletionStatus?: string;
  };
  needsRecalculation?: boolean;
  connections?: {
    confirmedConnections?: string[];
    pendingConnectionsCount?: number;
  };
  subscription?: {
    isActive?: boolean;
    subscriptionId?: string;
    subscribedAt?: string;
  };
  ratings?: {
    cumulativeRating?: number;
    community?: any[];
    matchmaker?: any[];
  };
  recommendations?: any[];
  createdAt?: string;
  updatedAt?: string;
  fullName?: string;
  id?: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface RegisterData {
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
  password: string;
  location?: {
    coordinates: number[];
    city: string;
    state: string;
    country: string;
  };
  profileFor?: string;
} 