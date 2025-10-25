import api from './axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface AboutMeData {
  about_me: string;
}

export interface DietData {
  diet: string;
  food_preferences?: string[];
  restrictions?: string[];
}

export interface VoiceIntroData {
  voice_intro: string;
  audio_url?: string;
}

export interface MBTITraitsData {
  mbti_type: string;
  traits: string[];
  description?: string;
}

export interface CoreValuesData {
  core_values: string[];
  motivations: string[];
  principles?: string[];
}

export interface ActivitiesGenresData {
  free_time_activities: string[];
  preferred_genres: string[];
  interests?: string[];
}

export interface StrengthsWeaknessesData {
  strengths: string[];
  weaknesses: string[];
  areas_of_improvement?: string[];
}

export interface SocialComfortData {
  social_gathering_comfort: string;
  social_preferences: string[];
  comfort_level?: string;
}

export interface PersonalityData {
  about_me?: string;
  diet?: string;
  voice_intro?: string;
  mbti_traits?: string;
  core_values?: string[];
  activities_genres?: string[];
  strengths_weaknesses?: string[];
  social_comfort?: string;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export class PersonalityService {
  /**
   * Save about me data
   */
  static async saveAboutMe(data: AboutMeData): Promise<ApiResponse> {
    try {
      debugger
      // Validate required fields
      const validationErrors = this.validateAboutMe(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.ABOUT_ME, data);
      
      return {
        status: 'success',
        message: 'About me data saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving about me data:', error);
      
      return {
        status: 'error',
        message: 'Failed to save about me data',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate about me data
   */
  private static validateAboutMe(data: AboutMeData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.about_me || data.about_me.trim().length === 0) {
      errors.push('About me text is required');
    }

    // Length validation
    if (data.about_me && data.about_me.length > 1000) {
      errors.push('About me text cannot exceed 1000 characters');
    }

    // Minimum length validation
    if (data.about_me && data.about_me.trim().length < 10) {
      errors.push('About me text must be at least 10 characters long');
    }

    return errors;
  }

  /**
   * Get about me data for current user
   */
  static async getAboutMe(): Promise<ApiResponse<AboutMeData>> {
    try {
      const response = await api.get(API_ENDPOINTS.PERSONALITY.ABOUT_ME);
      
      return {
        status: 'success',
        message: 'About me data retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching about me data:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch about me data',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Save diet data
   */
  static async saveDiet(data: DietData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateDiet(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.DIET, data);
      
      return {
        status: 'success',
        message: 'Diet data saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving diet data:', error);
      
      return {
        status: 'error',
        message: 'Failed to save diet data',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate diet data
   */
  private static validateDiet(data: DietData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.diet) {
      errors.push('Diet preference is required');
    }

    // Food preferences validation
    if (data.food_preferences && data.food_preferences.length > 10) {
      errors.push('Food preferences cannot exceed 10 items');
    }

    // Restrictions validation
    if (data.restrictions && data.restrictions.length > 10) {
      errors.push('Dietary restrictions cannot exceed 10 items');
    }

    return errors;
  }

  /**
   * Get diet data for current user
   */
  static async getDiet(): Promise<ApiResponse<DietData>> {
    try {
      const response = await api.get(API_ENDPOINTS.PERSONALITY.DIET);
      
      return {
        status: 'success',
        message: 'Diet data retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching diet data:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch diet data',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Save voice introduction
   */
  static async saveVoiceIntro(data: VoiceIntroData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateVoiceIntro(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.VOICE_INTRO, data);
      
      return {
        status: 'success',
        message: 'Voice introduction saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving voice intro:', error);
      
      return {
        status: 'error',
        message: 'Failed to save voice introduction',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate voice intro data
   */
  private static validateVoiceIntro(data: VoiceIntroData): string[] {
    const errors: string[] = [];

    if (!data.voice_intro || data.voice_intro.trim().length === 0) {
      errors.push('Voice introduction text is required');
    }

    if (data.voice_intro && data.voice_intro.length > 500) {
      errors.push('Voice introduction cannot exceed 500 characters');
    }

    return errors;
  }

  /**
   * Save MBTI traits
   */
  static async saveMBTITraits(data: MBTITraitsData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateMBTITraits(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.MBTI_TRAITS, data);
      
      return {
        status: 'success',
        message: 'MBTI traits saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving MBTI traits:', error);
      
      return {
        status: 'error',
        message: 'Failed to save MBTI traits',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate MBTI traits data
   */
  private static validateMBTITraits(data: MBTITraitsData): string[] {
    const errors: string[] = [];

    if (!data.mbti_type) {
      errors.push('MBTI type is required');
    }

    if (!data.traits || data.traits.length === 0) {
      errors.push('At least one trait must be selected');
    }

    return errors;
  }

  /**
   * Save core values
   */
  static async saveCoreValues(data: CoreValuesData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateCoreValues(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.CORE_VALUES, data);
      
      return {
        status: 'success',
        message: 'Core values saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving core values:', error);
      
      return {
        status: 'error',
        message: 'Failed to save core values',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate core values data
   */
  private static validateCoreValues(data: CoreValuesData): string[] {
    const errors: string[] = [];

    if (!data.core_values || data.core_values.length === 0) {
      errors.push('At least one core value must be selected');
    }

    if (!data.motivations || data.motivations.length === 0) {
      errors.push('At least one motivation must be selected');
    }

    return errors;
  }

  /**
   * Save activities and genres
   */
  static async saveActivitiesGenres(data: ActivitiesGenresData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateActivitiesGenres(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.ACTIVITIES_GENRES, data);
      
      return {
        status: 'success',
        message: 'Activities and genres saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving activities and genres:', error);
      
      return {
        status: 'error',
        message: 'Failed to save activities and genres',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate activities and genres data
   */
  private static validateActivitiesGenres(data: ActivitiesGenresData): string[] {
    const errors: string[] = [];

    if (!data.free_time_activities || data.free_time_activities.length === 0) {
      errors.push('At least one free time activity must be selected');
    }

    if (!data.preferred_genres || data.preferred_genres.length === 0) {
      errors.push('At least one preferred genre must be selected');
    }

    return errors;
  }

  /**
   * Save strengths and weaknesses
   */
  static async saveStrengthsWeaknesses(data: StrengthsWeaknessesData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateStrengthsWeaknesses(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.STRENGTHS_WEAKNESSES, data);
      
      return {
        status: 'success',
        message: 'Strengths and weaknesses saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving strengths and weaknesses:', error);
      
      return {
        status: 'error',
        message: 'Failed to save strengths and weaknesses',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate strengths and weaknesses data
   */
  private static validateStrengthsWeaknesses(data: StrengthsWeaknessesData): string[] {
    const errors: string[] = [];

    if (!data.strengths || data.strengths.length === 0) {
      errors.push('At least one strength must be selected');
    }

    if (!data.weaknesses || data.weaknesses.length === 0) {
      errors.push('At least one weakness must be selected');
    }

    return errors;
  }

  /**
   * Save social comfort
   */
  static async saveSocialComfort(data: SocialComfortData): Promise<ApiResponse> {
    try {
      const validationErrors = this.validateSocialComfort(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.PERSONALITY.SOCIAL_COMFORT, data);
      
      return {
        status: 'success',
        message: 'Social comfort preferences saved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error saving social comfort:', error);
      
      return {
        status: 'error',
        message: 'Failed to save social comfort preferences',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate social comfort data
   */
  private static validateSocialComfort(data: SocialComfortData): string[] {
    const errors: string[] = [];

    if (!data.social_gathering_comfort) {
      errors.push('Social gathering comfort level is required');
    }

    if (!data.social_preferences || data.social_preferences.length === 0) {
      errors.push('At least one social preference must be selected');
    }

    return errors;
  }

  /**
   * Get personality summary for current user
   */
  static async getPersonalitySummary(): Promise<ApiResponse<PersonalityData>> {
    try {
      const response = await api.get(API_ENDPOINTS.PERSONALITY.SUMMARY);
      
      return {
        status: 'success',
        message: 'Personality summary retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching personality summary:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch personality summary',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }
} 