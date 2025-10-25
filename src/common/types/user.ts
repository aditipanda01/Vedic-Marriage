export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name?: string;
  profileComplete?: boolean;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  location?: {
    city: string;
    state: string;
    country: string;
  };
  bio?: string;
  interests?: string[];
  photos?: string[];
  preferences?: {
    ageRange?: [number, number];
    distance?: number;
    gender?: string[];
  };
  createdAt: string;
  updatedAt: string;
  roles?: string[];
}

export interface UserProfile extends User {
  education?: {
    degree: string;
    field: string;
    institution: string;
    year: number;
  }[];
  occupation?: {
    title: string;
    company: string;
    industry: string;
  };
  family?: {
    type: string;
    members: number;
    description?: string;
  };
  horoscope?: {
    birthTime?: string;
    birthPlace?: string;
    zodiacSign?: string;
    moonSign?: string;
    ascendant?: string;
  };
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'matches' | 'private';
    showOnlineStatus: boolean;
    showLastSeen: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
} 