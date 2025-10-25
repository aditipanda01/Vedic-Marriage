import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/common/components/ui/loading-spinner';
import { useToast } from '@/common/components/ui/toast/ToastContainer';
import api from '@/services/axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { AuthService } from '@/services/auth.service';
import { setUser } from '@/store/slices/authSlice';
import { setProfile } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { User } from '@/types/auth';
import { tokenStorage } from '@/lib/token';

// Helper function to check if user data has been updated recently
const checkForRecentUpdates = (user: User): boolean => {
  
  // Check if user needs recalculation (indicates recent updates)
  if (user.needsRecalculation) {
    return true;
  }

  // Check if profile status is approved (indicates profile is complete and approved)
  if (user.profileCompletionDetails?.profileCompletionStatus === 'completed' || 
      user.profileCompletionDetails?.profileCompletionStatus === 'approved') {
    return true;
  }

  // Check if profile completion percentage is high (indicates profile is well-maintained)
  if (user.profileCompletionDetails?.completionPercentage && user.profileCompletionDetails.completionPercentage >= 70) {
    return true;
  }

  // Check if user has recent activity (last login within 7 days)
  if (user.lastLoginAt) {
    const lastLoginDate = new Date(user.lastLoginAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    if (lastLoginDate > sevenDaysAgo) {
      return true;
    }
  }

  // Check if user has recent updates (updatedAt within 7 days)
  if (user.updatedAt) {
    const updatedDate = new Date(user.updatedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    if (updatedDate > sevenDaysAgo) {
      return true;
    }
  }

  // Check if user has completed profile sections (indicates active profile)
  if (user.profileCompletionDetails?.completedSections && user.profileCompletionDetails.completedSections.length >= 3) {
    return true;
  }

  // Check if user has basic profile information filled (indicates profile has been started)
  if (user.basic_info || user.astro || user.family || user.career_education || user.spiritual_info) {
    return true;
  }

  // Check if user has preferences set (indicates active user)
  if (user.preferences && Object.keys(user.preferences).length > 0) {
    return true;
  }

  return false;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Determine if input is email or phone number
      const isEmail = formData.emailOrPhone.includes('@');
      
      const loginData = {
        ...(isEmail ? { email: formData.emailOrPhone } : { phoneNumber: formData.emailOrPhone }),
        password: formData.password,
        deviceId: "device-123",
        deviceName: "iPhone 14",
        deviceType: "mobile",
        platform: "iOS"
      };

      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
      
      if (response.status === 200) {
        const { token, user } = response.data.data;
        tokenStorage.setToken(token);
        // Store user data in Redux (this will also save token to localStorage)
        if (user) {
          dispatch(setUser({ user, token }));
          dispatch(setProfile(user));
          console.log('User data stored in Redux:', user);
        }
        
        showToast({
          type: 'success',
          title: 'Login Successful',
          message: 'Welcome back!',
          duration: 4000
        });
        
        // Check if user was trying to access a specific page before login
        const from = (location.state as any)?.from?.pathname || null;
        
        // Determine redirect path based on user data status
        let redirectPath = '/my-profile'; // Default path
        
        // If user was trying to access a specific page, redirect there
        if (from && from !== '/login') {
          redirectPath = from;
        } else if (user) {
          // Check profile completion percentage
          const profileCompletionPercentage = user.profileCompletionDetails?.completionPercentage || 0;
          
          if (profileCompletionPercentage > 40) {
            // If profile completion is more than 40%, redirect to dashboard
            redirectPath = '/dashboard';
          } else {
            // If profile completion is 40% or less, redirect to profile page
            redirectPath = '/my-profile';
          }
        }
        
        // Navigate to the determined path
        navigate(redirectPath, { 
          replace: true,
          state: { redirect: redirectPath }
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle different error response formats
      let errorMessage = 'Invalid email/phone or password';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[390px] mx-auto w-full pt-40">
        <div className="w-full space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="emailOrPhone"
                className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm"
                placeholder="Enter your email or mobile number"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-orange text-sm font-medium hover:text-orange/90"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
              disabled={!formData.emailOrPhone || !formData.password || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            
            <Button 
              type="button"
              className="whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-12 flex items-center justify-center gap-2 bg-white rounded-[48px] border-none"
            >
              <img className="w-6 h-6" alt="Google" src="/assets/images/img/googl.png" />
              <span className="font-semibold text-black text-sm">Sign in with Google</span>
            </Button>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-orange hover:text-orange/90"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 