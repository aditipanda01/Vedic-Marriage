import { User } from './user';

export interface Match extends User {
  matchScore: number;
  compatibility: {
    overall: number;
    personality: number;
    values: number;
    interests: number;
    vedic: number;
  };
  lastInteraction?: {
    type: 'like' | 'skip' | 'message';
    timestamp: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
}

export interface MatchPreferences {
  ageRange: [number, number];
  distance: number;
  gender: string[];
  education?: string[];
  occupation?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  horoscope?: {
    zodiacSign?: string[];
    moonSign?: string[];
    ascendant?: string[];
  };
}

export interface MatchFilters extends MatchPreferences {
  sortBy: 'matchScore' | 'recent' | 'distance';
  order: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface MatchResponse {
  matches: Match[];
  total: number;
  page: number;
  hasMore: boolean;
} 