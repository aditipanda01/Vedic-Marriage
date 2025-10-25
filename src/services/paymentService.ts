import api from '@/services/axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

// Payment data interfaces
export interface PaymentData {
  amount: number;
  // userId is extracted from JWT token by backend auth middleware
  paymentMethod: string;
  paymentType?: 'ONE_TIME' | 'SUBSCRIPTION';
  currency?: string;
  subscriptionPlanId?: string;
  redirectUrl?: string;
  callbackUrl?: string;
  cancelUrl?: string;
  // email, mobileNumber, name will be fetched from database using userId
  metadata?: Record<string, any>;
  planName?: string;
  planPeriod?: string;
}

export interface PaymentResponse {
  id: string;
  status: string;
  transactionId?: string;
  paymentUrl?: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export class PaymentService {
  /**
   * Create a new payment
   */
  static async createPayment(data: PaymentData): Promise<ApiResponse<PaymentResponse>> {
    try {
      // Validate required fields
      const validationErrors = this.validatePaymentData(data);
      if (validationErrors.length > 0) {
        return {
          status: 'error',
          message: 'Validation failed',
          error: validationErrors.join(', ')
        };
      }

      const response = await api.post(API_ENDPOINTS.PAYMENT.CREATE, data);
      
      return {
        status: 'success',
        message: 'Payment created successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error creating payment:', error);
      
      return {
        status: 'error',
        message: 'Failed to create payment',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Validate payment data
   */
  private static validatePaymentData(data: PaymentData): string[] {
    const errors: string[] = [];

    // Required fields validation
    if (!data.amount || data.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }
    // userId is validated by backend auth middleware
    if (!data.paymentMethod) {
      errors.push('Payment method is required');
    }

    // Payment method validation
    const validPaymentMethods = ['phonepe', 'razorpay', 'instamojo'];
    if (!validPaymentMethods.includes(data.paymentMethod.toLowerCase())) {
      errors.push('Invalid payment method');
    }

    // Payment type validation
    if (data.paymentType && !['ONE_TIME', 'SUBSCRIPTION'].includes(data.paymentType)) {
      errors.push('Invalid payment type');
    }

    // Currency validation
    if (data.currency && !['INR', 'USD'].includes(data.currency)) {
      errors.push('Invalid currency');
    }

    // Amount validation (reasonable range)
    if (data.amount > 100000) {
      errors.push('Amount cannot exceed 100,000');
    }

    return errors;
  }

  /**
   * Check payment status (using the basic STATUS endpoint)
   */
  static async checkPaymentStatus(method: string, transactionId: string): Promise<ApiResponse<any>> {
    try {
      if (!method || !transactionId) {
        return {
          status: 'error',
          message: 'Method and transaction ID are required',
          error: 'Missing required parameters'
        };
      }

      // Using the basic STATUS endpoint with query parameters
      const response = await api.get(`${API_ENDPOINTS.PAYMENT.STATUS}?method=${method}&transactionId=${transactionId}`);
      
      return {
        status: 'success',
        message: 'Payment status retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error checking payment status:', error);
      
      return {
        status: 'error',
        message: 'Failed to check payment status',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }

  /**
   * Get payment by ID (using the basic BASE endpoint)
   */
  static async getPaymentById(id: string): Promise<ApiResponse<PaymentResponse>> {
    try {
      if (!id) {
        return {
          status: 'error',
          message: 'Payment ID is required',
          error: 'Missing payment ID'
        };
      }

      const response = await api.get(`${API_ENDPOINTS.PAYMENT.BASE}/${id}`);
      
      return {
        status: 'success',
        message: 'Payment retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error fetching payment:', error);
      
      return {
        status: 'error',
        message: 'Failed to fetch payment',
        error: error.response?.data?.message || error.message || 'Unknown error'
      };
    }
  }
} 