import api from './axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

// API Response Types
export interface ApiSubscriptionPlan {
  id: string
  name: string
  price: number
  durationInDays: number
  facilities: {
    contactsView: number
    connections: number
    messages: number
    systemRecommendation: boolean
    searchAndFilter: boolean
    advancedSort: boolean
    advanceAnalytics: boolean
    customMatching: boolean
    personalizedRecommendation: number
  }
  isActive: boolean
  isDeleted: boolean
  createdBy?: string
  updatedBy?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  count?: number
  message?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  color: string
  bgColor: string
  borderColor: string
  connectionsPerMonth: number
  personalMessages: number
  contactDetails: number
  matchmakerRecommendations: boolean
  advancedAnalytics: boolean
  customMatching: boolean
  validityMonths: number
  defaultOpen?: boolean
}

export interface ServiceResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export class SubscriptionPlanService {
  /**
   * Get all active subscription plans
   */
  static async getActiveSubscriptionPlans(): Promise<ServiceResponse<PricingPlan[]>> {
    try {
      const response = await api.get(API_ENDPOINTS.PAYMENT.SUBSCRIPTION_PLANS.ACTIVE);
      
      if (response.data.success && response.data.data) {
        console.log('API response data:', response.data.data);
        const mappedPlans = response.data.data.map((apiPlan: ApiSubscriptionPlan) => {
          console.log('Mapping plan:', apiPlan);
          return this.mapApiPlanToPricingPlan(apiPlan);
        });
        
        return {
          status: 'success',
          message: 'Active subscription plans retrieved successfully',
          data: mappedPlans
        };
      } else {
        return {
          status: 'error',
          message: 'Failed to fetch subscription plans',
          error: 'Invalid response format'
        };
      }
    } catch (error: any) {
      console.error('Error fetching active subscription plans:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch active subscription plans',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Convert API plan to frontend plan format
   */
  private static mapApiPlanToPricingPlan(apiPlan: ApiSubscriptionPlan): PricingPlan {
    const colors = SubscriptionPlanService.getPlanColors(apiPlan.name);
    const validityMonths = Math.round(apiPlan.durationInDays / 30);
    
    return {
      id: apiPlan.id,
      name: apiPlan.name,
      price: apiPlan.price.toString(),
      color: colors.color,
      bgColor: colors.bgColor,
      borderColor: colors.borderColor,
      connectionsPerMonth: apiPlan.facilities.connections,
      personalMessages: apiPlan.facilities.messages,
      contactDetails: apiPlan.facilities.contactsView,
      matchmakerRecommendations: apiPlan.facilities.systemRecommendation,
      advancedAnalytics: apiPlan.facilities.advanceAnalytics,
      customMatching: apiPlan.facilities.customMatching,
      validityMonths: validityMonths,
      defaultOpen: apiPlan.name.toLowerCase().includes('premium plus') // Set default open for Premium Plus
    };
  }

  /**
   * Get color mapping for different plan types
   */
  private static getPlanColors(planName: string) {
    const name = planName.toLowerCase();
    if (name.includes('basic') || name.includes('free')) {
      return {
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200"
      };
    } else if (name.includes('premium')) {
      return {
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      };
    } else if (name.includes('plus')) {
      return {
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      };
    } else if (name.includes('vedic')) {
      return {
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      };
    }
    // Default colors
    return {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    };
  }

  /**
   * Get fallback plans in case API fails
   */
  static getFallbackPlans(): PricingPlan[] {
    return [
      {
        id: "free",
        name: "Free Plan",
        price: "0",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        connectionsPerMonth: 3,
        personalMessages: 3,
        contactDetails: 3,
        matchmakerRecommendations: false,
        advancedAnalytics: false,
        customMatching: false,
        validityMonths: 1,
      },
      {
        id: "premium",
        name: "Premium",
        price: "999",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        connectionsPerMonth: 20,
        personalMessages: 20,
        contactDetails: 20,
        matchmakerRecommendations: false,
        advancedAnalytics: false,
        customMatching: false,
        validityMonths: 3,
      }
    ];
  }
} 