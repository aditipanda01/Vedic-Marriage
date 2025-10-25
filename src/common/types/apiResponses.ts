export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiSuccess {
  success: boolean;
  message: string;
  data?: unknown;
} 