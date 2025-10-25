export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fname?: string;
  lname?: string;
  name?: string;
  profileComplete?: boolean;
  dateOfBirth?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  profileImage?: string;
  about?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  occupation?: {
    title: string;
    company: string;
    industry: string;
  };
  education?: {
    degree: string;
    field: string;
    institution: string;
    year: number;
  }[];
  location?: {
    city: string;
    state: string;
    country: string;
  } | string;
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
