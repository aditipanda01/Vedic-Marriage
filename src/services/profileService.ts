import api from './axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface BasicInfoData {
  gender: string;
  marital_status: string;
  mother_tongue: string;
  languages_known: string[];
  height: string;
  weight: number;
  health_disease_disability: string;
  religion: string;
  ethnicity: string;
}

export interface AstroInfoData {
  date_of_birth: string;
  time_of_birth: string;
  birth_place: string;
  latitude: string;
  longitude: string;
  timeZone: number;
  rashi: string;
  nakshatra: string;
  manglik: string;
  community: string;
  caste: string;
  gotra: string;
}

export interface FamilyInfoData {
  father_name: string;
  mother_name: string;
  father_occupation: string;
  mother_occupation: string;
  family_culture: string;
  family_location: string;
  family_status: string;
  brother_count: number;
  sister_count: number;
}

export interface CareerInfoData {
  employed: boolean;
  company_type: string;
  company_name: string;
  occupation: string;
  income: string;
  job_location: string;
  working_period: number;
  total_working_period: number;
  ed_qualification: string;
  ed_institution: string;
  ed_other_qualification: string;
}

export interface SpiritualInfoData {
  affiliated_with_spiritual_organization: string;
  other_organization_details: {
    other_organization_name: string;
    affiliated_duration: number;
    sadhana_time: number;
  };
  iskcon_affiliation_details: {
    practicing_time_period: number;
    chanting_rounds: string;
    temple_visit: string;
    spirituality_role: string;
    initiated: string;
    initiation_details: {
      initiation_name: string;
      spiritual_master: string;
    };
    four_regulative_principles: string;
    ekadashi_fasting: string;
    parents_practice_krishna: string;
    book_read: string[];
    iskcon_associated: string;
    temple_attended_associated_type: string;
    seminar: string;
    specific_spiritual_goals: string;
    spiritual_mentor: string;
    temple_services: string;
    department_name: string;
    designation_name: string;
    roles_and_experiences: string;
  };
}

export interface PreferenceData {
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
}

export interface UpdateEmailData {
  newEmail: string;
  currentPassword: string;
}

export interface UpdatePhoneData {
  newPhone: string;
  currentPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export class ProfileService {
  /**
   * Update basic information
   */
  static async updateBasicInfo(data: BasicInfoData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateBasicInfo(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.BASIC_INFO, data);
      
      return {
        status: 'success',
        message: 'Basic information updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating basic info:', error);
      
      return {
        status: 'error',
        message: 'Failed to update basic information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate basic info data
   */
  private static validateBasicInfo(data: BasicInfoData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.gender) errors.push('Gender is required');
    if (!data.marital_status) errors.push('Marital status is required');
    if (!data.mother_tongue) errors.push('Mother tongue is required');
    if (!data.height) errors.push('Height is required');
    if (!data.religion) errors.push('Religion is required');
    if (!data.ethnicity) errors.push('Ethnicity is required');

    // Languages known validation
    if (!data.languages_known || data.languages_known.length === 0) {
      errors.push('At least one language must be selected');
    }

    // Weight validation
    if (data.weight && (data.weight < 30 || data.weight > 200)) {
      errors.push('Weight must be between 30kg and 200kg');
    }

    // Height validation (basic format check)
    if (data.height && !data.height.endsWith('cm')) {
      errors.push('Height must be in centimeters (e.g., 175cm)');
    }

    return errors;
  }

  /**
   * Get basic info for current user
   */
  static async getBasicInfo(): Promise<ApiResponse<BasicInfoData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.BASIC_INFO);
      
      return {
        status: 'success',
        message: 'Basic information retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching basic info:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch basic information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update astrological information
   */
  static async updateAstroInfo(data: AstroInfoData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateAstroInfo(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.ASTRO_INFO, data);
      
      return {
        status: 'success',
        message: 'Astrological information updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating astro info:', error);
      
      return {
        status: 'error',
        message: 'Failed to update astrological information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate astro info data
   */
  private static validateAstroInfo(data: AstroInfoData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.date_of_birth) errors.push('Date of birth is required');
    if (!data.time_of_birth) errors.push('Time of birth is required');
    if (!data.birth_place) errors.push('Place of birth is required');
    if (!data.rashi) errors.push('Rashi is required');
    if (!data.nakshatra) errors.push('Nakshatra is required');
    if (!data.manglik) errors.push('Manglik status is required');
    if (!data.community) errors.push('Community is required');

    // Date validation
    if (data.date_of_birth) {
      const birthDate = new Date(data.date_of_birth);
      const today = new Date();
      if (birthDate > today) {
        errors.push('Date of birth cannot be in the future');
      }
    }

    // Time validation
    if (data.time_of_birth && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time_of_birth)) {
      errors.push('Time of birth must be in HH:MM format');
    }

    return errors;
  }

  /**
   * Get astro info for current user
   */
  static async getAstroInfo(): Promise<ApiResponse<AstroInfoData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.ASTRO_INFO);
      
      return {
        status: 'success',
        message: 'Astrological information retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching astro info:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch astrological information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update family information
   */
  static async updateFamilyInfo(data: FamilyInfoData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateFamilyInfo(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.FAMILY_INFO, data);
      
      return {
        status: 'success',
        message: 'Family information updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating family info:', error);
      
      return {
        status: 'error',
        message: 'Failed to update family information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate family info data
   */
  private static validateFamilyInfo(data: FamilyInfoData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.father_name) errors.push('Father\'s name is required');
    if (!data.mother_name) errors.push('Mother\'s name is required');
    if (!data.father_occupation) errors.push('Father\'s occupation is required');
    if (!data.mother_occupation) errors.push('Mother\'s occupation is required');
    if (!data.family_culture) errors.push('Family culture is required');
    if (!data.family_location) errors.push('Family location is required');
    if (!data.family_status) errors.push('Family status is required');

    // Count validation
    if (data.brother_count < 0) errors.push('Brother count cannot be negative');
    if (data.sister_count < 0) errors.push('Sister count cannot be negative');

    return errors;
  }

  /**
   * Get family info for current user
   */
  static async getFamilyInfo(): Promise<ApiResponse<FamilyInfoData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.FAMILY_INFO);
      
      return {
        status: 'success',
        message: 'Family information retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching family info:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch family information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update career information
   */
  static async updateCareerInfo(data: CareerInfoData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateCareerInfo(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.CAREER_INFO, data);
      
      return {
        status: 'success',
        message: 'Career information updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating career info:', error);
      
      return {
        status: 'error',
        message: 'Failed to update career information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate career info data
   */
  private static validateCareerInfo(data: CareerInfoData): string[] {
    const errors: string[] = [];

    // Education fields are always required
    if (!data.ed_qualification) errors.push('Educational qualification is required');
    if (!data.ed_institution) errors.push('Educational institution is required');

    // Employment fields are required only if employed
    if (data.employed) {
      if (!data.company_type) errors.push('Company type is required');
      if (!data.company_name) errors.push('Company name is required');
      if (!data.occupation) errors.push('Occupation is required');
      if (!data.income) errors.push('Income is required');
      if (!data.job_location) errors.push('Job location is required');
    }

    return errors;
  }

  /**
   * Get career info for current user
   */
  static async getCareerInfo(): Promise<ApiResponse<CareerInfoData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.CAREER_INFO);
      
      return {
        status: 'success',
        message: 'Career information retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching career info:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch career information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update spiritual information
   */
  static async updateSpiritualInfo(data: SpiritualInfoData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateSpiritualInfo(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.SPIRITUAL_INFO, data);
      
      return {
        status: 'success',
        message: 'Spiritual information updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating spiritual info:', error);
      
      return {
        status: 'error',
        message: 'Failed to update spiritual information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate spiritual info data
   */
  private static validateSpiritualInfo(data: SpiritualInfoData): string[] {
    const errors: string[] = [];

    // Spiritual affiliation is required
    if (!data.affiliated_with_spiritual_organization) {
      errors.push('Spiritual organization affiliation is required');
    }

    // If affiliated with other organization (not ISKCON), other org details are required
    if (data.affiliated_with_spiritual_organization && 
        data.affiliated_with_spiritual_organization !== "No" &&
        !data.affiliated_with_spiritual_organization.includes("ISKCON")) {
      
      if (!data.other_organization_details.other_organization_name) {
        errors.push('Other organization name is required');
      }
    }

    // If affiliated with ISKCON, ISKCON details are required
    if (data.affiliated_with_spiritual_organization && 
        (data.affiliated_with_spiritual_organization.includes("ISKCON") || 
         data.affiliated_with_spiritual_organization === "Gaudiya Vaishnava")) {
      
      if (!data.iskcon_affiliation_details.chanting_rounds) {
        errors.push('Chanting rounds are required');
      }
      if (!data.iskcon_affiliation_details.temple_visit) {
        errors.push('Temple visit frequency is required');
      }
      if (!data.iskcon_affiliation_details.spirituality_role) {
        errors.push('Spirituality role is required');
      }
      if (!data.iskcon_affiliation_details.initiated) {
        errors.push('Initiation status is required');
      }
      if (!data.iskcon_affiliation_details.four_regulative_principles) {
        errors.push('Four regulative principles adherence is required');
      }
      if (!data.iskcon_affiliation_details.ekadashi_fasting) {
        errors.push('Ekadashi fasting observance is required');
      }
      if (!data.iskcon_affiliation_details.parents_practice_krishna) {
        errors.push('Parents\' Krishna consciousness practice is required');
      }
      if (!data.iskcon_affiliation_details.temple_attended_associated_type) {
        errors.push('Temple association type is required');
      }
      if (!data.iskcon_affiliation_details.seminar) {
        errors.push('Seminar attendance is required');
      }

      // If initiated is "Yes", initiation details are required
      if (data.iskcon_affiliation_details.initiated === "Yes") {
        if (!data.iskcon_affiliation_details.initiation_details.initiation_name) {
          errors.push('Initiation name is required');
        }
        if (!data.iskcon_affiliation_details.initiation_details.spiritual_master) {
          errors.push('Spiritual master is required');
        }
      }
    }

    return errors;
  }

  /**
   * Get spiritual info for current user
   */
  static async getSpiritualInfo(): Promise<ApiResponse<SpiritualInfoData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.SPIRITUAL_INFO);
      
      return {
        status: 'success',
        message: 'Spiritual information retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching spiritual info:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch spiritual information',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update preferences
   */
  static async updatePreferences(data: PreferenceData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validatePreferences(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.PREFERENCES, data);
      
      return {
        status: 'success',
        message: 'Preferences updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      
      return {
        status: 'error',
        message: 'Failed to update preferences',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate preferences data
   */
  private static validatePreferences(data: PreferenceData): string[] {
    const errors: string[] = [];

    // Age validation
    if (data.preferred_age_start !== undefined) {
      if (data.preferred_age_start < 18 || data.preferred_age_start > 100) {
        errors.push('Preferred age start must be between 18 and 100');
      }
    }

    if (data.preferred_age_end !== undefined) {
      if (data.preferred_age_end < 18 || data.preferred_age_end > 100) {
        errors.push('Preferred age end must be between 18 and 100');
      }
      
      if (data.preferred_age_start && data.preferred_age_end < data.preferred_age_start) {
        errors.push('Preferred age end must be greater than or equal to preferred age start');
      }
    }

    // Height validation
    if (data.preferred_height_start && data.preferred_height_end) {
      const startValue = parseFloat(data.preferred_height_start);
      const endValue = parseFloat(data.preferred_height_end);
      if (!isNaN(startValue) && !isNaN(endValue) && endValue < startValue) {
        errors.push('Preferred height end must be greater than or equal to preferred height start');
      }
    }

    // Caste validation
    if (data.preferred_caste && data.preferred_caste.length > 50) {
      errors.push('Preferred caste cannot exceed 50 characters');
    }

    // Language validation
    if (data.preferred_language && data.preferred_language.length > 0) {
      const uniqueLanguages = new Set(data.preferred_language);
      if (uniqueLanguages.size !== data.preferred_language.length) {
        errors.push('Duplicate preferred languages are not allowed');
      }
    }

    // City location validation
    if (data.preferred_city_location && data.preferred_city_location.length > 100) {
      errors.push('Preferred city location cannot exceed 100 characters');
    }

    // Food validation
    if (data.preferred_food && data.preferred_food.length > 0) {
      const uniqueFoods = new Set(data.preferred_food);
      if (uniqueFoods.size !== data.preferred_food.length) {
        errors.push('Duplicate preferred food selections are not allowed');
      }
    }

    // Affiliation validation
    if (data.preferred_affiliation && data.preferred_affiliation.length > 0) {
      const uniqueAffiliations = new Set(data.preferred_affiliation);
      if (uniqueAffiliations.size !== data.preferred_affiliation.length) {
        errors.push('Duplicate preferred affiliations are not allowed');
      }
    }

    // Number of children validation
    if (data.preferred_no_of_children) {
      const pattern = /^[0-9]+$|^[0-9]+-[0-9]+$|^None$/;
      if (!pattern.test(data.preferred_no_of_children)) {
        errors.push('Preferred number of children must be a number, range, or \'None\'');
      }
      
      if (data.preferred_no_of_children.length > 20) {
        errors.push('Preferred number of children value is too long');
      }
    }

    // Partner expectations validation
    if (data.preferred_partner_expectations && data.preferred_partner_expectations.length > 500) {
      errors.push('Partner expectations cannot exceed 500 characters');
    }

    return errors;
  }

  /**
   * Get preferences for current user
   */
  static async getPreferences(): Promise<ApiResponse<PreferenceData>> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.PREFERENCES);
      
      return {
        status: 'success',
        message: 'Preferences retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch preferences',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Upload KYC document
   */
  static async uploadKYC(file: File): Promise<ApiResponse> {
    try {
      // Validate file
      if (!file) {
        return {
          status: 'error',
          message: 'No file provided',
          error: 'File is required'
        };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          status: 'error',
          message: 'Invalid file type',
          error: 'Only image files are allowed'
        };
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return {
          status: 'error',
          message: 'File too large',
          error: 'File size must be less than 5MB'
        };
      }

      // Create FormData
      const formData = new FormData();
      formData.append('kyc', file);

      const response = await api.post(API_ENDPOINTS.USER.KYC_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        status: 'success',
        message: 'KYC document uploaded successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error uploading KYC:', error);
      
      return {
        status: 'error',
        message: 'Failed to upload KYC document',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Upload KYC documents (front and back)
   */
  static async uploadKYCDocuments(frontFile: File, backFile: File): Promise<ApiResponse> {
    try {
      // Validate files
      if (!frontFile || !backFile) {
        return {
          status: 'error',
          message: 'Both front and back files are required',
          error: 'Two files are required'
        };
      }

      // Validate file types
      if (!frontFile.type.startsWith('image/') || !backFile.type.startsWith('image/')) {
        return {
          status: 'error',
          message: 'Invalid file type',
          error: 'Only image files are allowed'
        };
      }

      // Validate file sizes (5MB limit each)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (frontFile.size > maxSize || backFile.size > maxSize) {
        return {
          status: 'error',
          message: 'File too large',
          error: 'Each file size must be less than 5MB'
        };
      }

      // Create FormData
      const formData = new FormData();
      formData.append('kyc-documents', frontFile);
      formData.append('kyc-documents', backFile);

      const response = await api.post(API_ENDPOINTS.USER.KYC_DOCUMENTS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        status: 'success',
        message: 'KYC documents uploaded successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error uploading KYC documents:', error);
      
      return {
        status: 'error',
        message: 'Failed to upload KYC documents',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Get KYC status
   */
  static async getKYCStatus(): Promise<ApiResponse> {
    try {
      const response = await api.get(API_ENDPOINTS.USER.KYC_STATUS);
      
      return {
        status: 'success',
        message: 'KYC status retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching KYC status:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch KYC status',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Upload selfie
   */
  static async uploadSelfie(file: File): Promise<ApiResponse> {
    try {
      // Validate file
      if (!file) {
        return {
          status: 'error',
          message: 'No file provided',
          error: 'File is required'
        };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          status: 'error',
          message: 'Invalid file type',
          error: 'Only image files are allowed'
        };
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return {
          status: 'error',
          message: 'File too large',
          error: 'File size must be less than 5MB'
        };
      }

      // Create FormData
      const formData = new FormData();
      formData.append('selfie', file);

      const response = await api.post(API_ENDPOINTS.USER.SELFIE_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        status: 'success',
        message: 'Selfie uploaded successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error uploading selfie:', error);
      
      return {
        status: 'error',
        message: 'Failed to upload selfie',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Upload gallery photos
   */
  static async uploadGalleryPhotos(files: File[]): Promise<ApiResponse> {
    try {
      // Validate files
      if (!files || files.length === 0) {
        return {
          status: 'error',
          message: 'No files provided',
          error: 'At least one photo is required'
        };
      }

      // Validate number of files (max 10)
      if (files.length > 10) {
        return {
          status: 'error',
          message: 'Too many files',
          error: 'Maximum 10 photos allowed'
        };
      }

      // Validate each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          return {
            status: 'error',
            message: 'Invalid file type',
            error: `File ${i + 1} is not an image`
          };
        }

        // Validate file size (5MB limit per file)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          return {
            status: 'error',
            message: 'File too large',
            error: `File ${i + 1} is larger than 5MB`
          };
        }
      }

      // Create FormData
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('photos', file);
      });

      const response = await api.post(API_ENDPOINTS.USER.GALLERY_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        status: 'success',
        message: 'Gallery photos uploaded successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error uploading gallery photos:', error);
      
      return {
        status: 'error',
        message: 'Failed to upload gallery photos',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update privacy settings
   */
  static async updatePrivacySettings(privacyData: {
    basic_privacy?: string;
    family_privacy?: string;
    astro_privacy?: string;
    career_privacy?: string;
    spiritual_privacy?: string;
    personality_privacy?: string;
    photo_privacy?: string;
    contact_privacy?: string;
    activity_status?: string;
  }): Promise<ApiResponse> {
    try {
      // Validate privacy data
      if (!privacyData) {
        return {
          status: 'error',
          message: 'No privacy data provided',
          error: 'Privacy data is required'
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.PRIVACY_UPDATE, privacyData);
      
      return {
        status: 'success',
        message: 'Privacy settings updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating privacy settings:', error);
      
      return {
        status: 'error',
        message: 'Failed to update privacy settings',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Update user email
   */
  static async updateEmail(data: UpdateEmailData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateUpdateEmail(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.UPDATE_EMAIL, data);
      
      return {
        status: 'success',
        message: 'Email updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating email:', error);
      
      return {
        status: 'error',
        message: 'Failed to update email',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate update email data
   */
  private static validateUpdateEmail(data: UpdateEmailData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.newEmail) errors.push('New email is required');
    if (!data.currentPassword) errors.push('Current password is required');

    // Email format validation
    if (data.newEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.newEmail)) {
        errors.push('Invalid email format');
      }
    }

    // Password validation
    if (data.currentPassword && data.currentPassword.length < 6) {
      errors.push('Current password must be at least 6 characters');
    }

    return errors;
  }

  /**
   * Update user phone number
   */
  static async updatePhone(data: UpdatePhoneData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateUpdatePhone(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.UPDATE_PHONE, data);
      
      return {
        status: 'success',
        message: 'Phone number updated successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating phone:', error);
      
      return {
        status: 'error',
        message: 'Failed to update phone number',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate update phone data
   */
  private static validateUpdatePhone(data: UpdatePhoneData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.newPhone) errors.push('New phone number is required');
    if (!data.currentPassword) errors.push('Current password is required');

    // Phone format validation
    if (data.newPhone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(data.newPhone.replace(/\s/g, ''))) {
        errors.push('Invalid phone number format');
      }
    }

    // Password validation
    if (data.currentPassword && data.currentPassword.length < 6) {
      errors.push('Current password must be at least 6 characters');
    }

    return errors;
  }

  /**
   * Change user password
   */
  static async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    try {
      // Validate required fields
      const validationErrors = this.validateChangePassword(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.put(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
      
      return {
        status: 'success',
        message: 'Password changed successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error changing password:', error);
      
      return {
        status: 'error',
        message: 'Failed to change password',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate change password data
   */
  private static validateChangePassword(data: ChangePasswordData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.currentPassword) errors.push('Current password is required');
    if (!data.newPassword) errors.push('New password is required');
    if (!data.confirmPassword) errors.push('Confirm password is required');

    // Password length validation
    if (data.newPassword && data.newPassword.length < 8) {
      errors.push('New password must be at least 8 characters');
    }

    // Password confirmation validation
    if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
      errors.push('New password and confirm password do not match');
    }

    // Current password validation
    if (data.currentPassword && data.currentPassword.length < 6) {
      errors.push('Current password must be at least 6 characters');
    }

    // Password strength validation
    if (data.newPassword) {
      const hasUpperCase = /[A-Z]/.test(data.newPassword);
      const hasLowerCase = /[a-z]/.test(data.newPassword);
      const hasNumbers = /\d/.test(data.newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);

      if (!hasUpperCase) errors.push('New password must contain at least one uppercase letter');
      if (!hasLowerCase) errors.push('New password must contain at least one lowercase letter');
      if (!hasNumbers) errors.push('New password must contain at least one number');
      if (!hasSpecialChar) errors.push('New password must contain at least one special character');
    }

    return errors;
  }
} 