import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import api from "@/services/axios";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { LoadingSpinner } from "@/common/components/ui/loading-spinner";
import { useToast } from "@/common/components/ui/toast/ToastContainer";
import { AuthService } from "@/services/auth.service";
// @ts-ignore: No types for 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete';

// Extend Window interface for Google Maps API
declare global {
  interface Window {
    google: any;
  }
}
// Define the different steps in the signup process
type SignUpStep = 'phone' | 'otp' | 'email' | 'emailotp' | 'profile';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // State for current step
  const [currentStep, setCurrentStep] = useState<SignUpStep>('phone');
  
  // Phone number state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  
  // Email state
  const [email, setEmail] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  
  // Email OTP state
  const [emailOtp, setEmailOtp] = useState("");
  const [isLoadingEmailOtp, setIsLoadingEmailOtp] = useState(false);
  
  // Profile form state
  const [formData, setFormData] = useState({
    profileFor: "",
    fullName: "",
    email: "bichitra555555@gmail.com", // Static email for now
    password: "",
    location: "",
    locationData: null as any
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // API call to send OTP
  const sendOtp = async (phone: string) => {
    setIsLoadingPhone(true);
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SEND_OTP, {
        phoneNumber: phone,
      });
      
      if (response.status === 200) {
        showToast({
          type: 'success',
          title: 'OTP Sent Successfully',
          message: `Verification code has been sent to ${countryCode} ${phone}`,
          duration: 4000
        });
        setCurrentStep('otp');
      }
    } catch (error: any) {
      // Handle different error response formats
      let errorMessage = 'Please try again later';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.stack) {
        // Extract message from stack trace if it's in the format "Error: message"
        const stackMatch = error.response.data.stack.match(/Error: (.+?)(?:\n|$)/);
        if (stackMatch) {
          errorMessage = stackMatch[1];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Failed to Send OTP',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingPhone(false);
    }
  };

  // API call to verify OTP
  const verifyOtp = async (otpCode: string) => {
    setIsLoadingOtp(true);
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        phoneNumber: phoneNumber,
        otpCode: otpCode,
      });
      
      if (response.status === 200) {
        showToast({
          type: 'success',
          title: 'Phone Number Verified',
          message: 'Your phone number has been successfully verified',
          duration: 4000
        });
        setCurrentStep('email'); // Go to email step instead of profile
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      // Handle different error response formats
      let errorMessage = 'Please enter the correct verification code';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.stack) {
        // Extract message from stack trace if it's in the format "Error: message"
        const stackMatch = error.response.data.stack.match(/Error: (.+?)(?:\n|$)/);
        if (stackMatch) {
          errorMessage = stackMatch[1];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Invalid OTP',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingOtp(false);
    }
  };

  // API call to send email OTP
  const sendEmailOtp = async (emailAddress: string) => {
    setIsLoadingEmail(true);
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SEND_EMAIL_OTP, {
        email: emailAddress,
      });
      
      if (response.status === 200) {
        showToast({
          type: 'success',
          title: 'Email OTP Sent Successfully',
          message: `Verification code has been sent to ${emailAddress}`,
          duration: 4000
        });
        setCurrentStep('emailotp');
      }
    } catch (error: any) {
      console.error('Error sending email OTP:', error);
      // Handle different error response formats
      let errorMessage = 'Please try again later';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.stack) {
        // Extract message from stack trace if it's in the format "Error: message"
        const stackMatch = error.response.data.stack.match(/Error: (.+?)(?:\n|$)/);
        if (stackMatch) {
          errorMessage = stackMatch[1];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Failed to Send Email OTP',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  // API call to verify email OTP
  const verifyEmailOtp = async (otpCode: string) => {
    setIsLoadingEmailOtp(true);
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL_OTP, {
        email: email,
        otpCode: otpCode,
      });
      
      if (response.status === 200) {
        showToast({
          type: 'success',
          title: 'Email Verified',
          message: 'Your email has been successfully verified',
          duration: 4000
        });
        setCurrentStep('profile');
      }
    } catch (error: any) {
      console.error('Error verifying email OTP:', error);
      // Handle different error response formats
      let errorMessage = 'Please enter the correct verification code';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.stack) {
        // Extract message from stack trace if it's in the format "Error: message"
        const stackMatch = error.response.data.stack.match(/Error: (.+?)(?:\n|$)/);
        if (stackMatch) {
          errorMessage = stackMatch[1];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Invalid Email OTP',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingEmailOtp(false);
    }
  };

  // API call to submit profile
  const submitProfile = async (profileData: typeof formData) => {
    setIsLoadingProfile(true);
    try {
      // Split full name into first and last name
      const { fname, lname } = splitFullName(profileData.fullName);
      
      const response = await api.post(API_ENDPOINTS.AUTH.COMPLETE_PROFILE, {
        fname: fname,
        lname: lname,
        phoneNumber: phoneNumber,
        email: profileData.email,
        password: profileData.password,
        location: profileData.locationData || {
          type: "Point",
          coordinates: [0, 0],
          city: "Test City",
          state: "Test State",
          country: "Test Country"
        },
        profileFor: profileData.profileFor
      });
      // debugger
      if (response.status === 201) {
        // debugger
        // Save the token to localStorage
        if (response.data?.data?.token) {
          AuthService.saveToken(response.data.data.token);
          console.log('Token saved to localStorage:', response.data.data.token);
        }
        
        showToast({
          type: 'success',
          title: 'Profile Created Successfully',
          message: "",
          duration: 4000
        });
        // Navigate to next step or dashboard
        navigate('/my-profile');
      }
    } catch (error: any) {
      console.error('Error submitting profile:', error);
      // Handle different error response formats
      let errorMessage = 'Please try again later';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.stack) {
        // Extract message from stack trace if it's in the format "Error: message"
        const stackMatch = error.response.data.stack.match(/Error: (.+?)(?:\n|$)/);
        if (stackMatch) {
          errorMessage = stackMatch[1];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showToast({
        type: 'error',
        title: 'Failed to Create Profile',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = async (value: string, placeId: string) => {
    // Update the display text
    
    setFormData(prev => ({
      ...prev,
      location: value
    }));

    // Get detailed place information using Google Places API
    if (window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      service.getDetails(
        {
          placeId: placeId,
          fields: ['geometry', 'address_components', 'formatted_address']
        },
        (place: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            // Extract location data
            const locationData = {
              type: "Point",
              coordinates: [
                place.geometry?.location?.lng() || 0,
                place.geometry?.location?.lat() || 0
              ],
              city: "",
              state: "",
              country: ""
            };

            // Extract address components
            if (place.address_components) {
              place.address_components.forEach((component: any) => {
                const types = component.types;
                if (types.includes('locality')) {
                  locationData.city = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                  locationData.state = component.long_name;
                } else if (types.includes('country')) {
                  locationData.country = component.long_name;
                }
              });
            }

            // Update form data with detailed location information
            setFormData(prev => ({
              ...prev,
              locationData: locationData
            }));

            console.log('Location data captured:', locationData);
          }
        }
      );
    }
  };

  const handleSubmit = () => {
    if (formData.profileFor && formData.fullName && formData.location && formData.password) {
      submitProfile(formData);
    }
  };

  // Function to split full name into first and last name
  const splitFullName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return { fname: nameParts[0], lname: '' };
    } else {
      const lname = nameParts.pop() || '';
      const fname = nameParts.join(' ');
      return { fname, lname };
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      sendOtp(phoneNumber);
    }
  };

  const handleVerify = () => {
    if (otp.length ===4) {
      verifyOtp(otp);
    }
  };

  const handleBackToPhone = () => {
    setCurrentStep('phone');
    setOtp('');
  };

  return (
    <main className="relative w-full min-h-screen bg-white">
      <Header />
      
      {/* Phone Number Input */}
      {currentStep === 'phone' && (
        <div className="max-w-[390px] mx-auto w-full pt-40">
          <div className="w-full space-y-6 px-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Enter Your Mobile Number</h1>
              <p className="text-gray-600">We'll send you a verification code to verify your number.</p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <select 
                  className="w-20 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-2 font-medium text-gray-600 text-sm focus:outline-none"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input
                  type="tel"
                  className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm"
                  placeholder="Enter mobile number here"
                  inputMode="tel"
                  maxLength={15}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </div>
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
                onClick={handleContinue}
                disabled={phoneNumber.length < 10 || isLoadingPhone}
              >
                {isLoadingPhone ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Continue'
                )}
              </Button>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              <Button className="whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-12 flex items-center justify-center gap-2 bg-white rounded-[48px] border-none">
                <img className="w-6 h-6" alt="Google" src="/assets/images/img/googl.png" />
                <span className="font-semibold text-black text-sm">Sign up with Google</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Input */}
      {currentStep === 'otp' && (
        <div className="max-w-[390px] mx-auto w-full pt-40">
          <div className="w-full space-y-6 px-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Number</h1>
              <p className="text-gray-600">Enter the 4-digit code sent to your mobile number.</p>
              <p className="text-sm text-gray-500">+{countryCode} {phoneNumber}</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm text-center tracking-[0.5em]"
                placeholder="Enter 4-digit code"
                maxLength={4}
                value={otp}
                onChange={handleOtpChange}
              />
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
                onClick={handleVerify}
                disabled={otp.length !== 4 || isLoadingOtp}
              >
                {isLoadingOtp ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify'
                )}
              </Button>
              <div className="text-center">
                <button 
                  className="text-orange text-sm font-medium"
                  onClick={handleBackToPhone}
                >
                  Change Phone Number
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Email input */}
      {currentStep === 'email' && (
        <div className="max-w-[390px] mx-auto w-full pt-40">
          <div className="w-full space-y-6 px-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Enter Your Email</h1>
              <p className="text-gray-600">Please enter your email address to continue.</p>
            </div>
            <div className="space-y-4">
              <Input
                type="email"
                className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
                onClick={() => sendEmailOtp(email)}
                disabled={!email || !email.includes('@') || isLoadingEmail}
              >
                {isLoadingEmail ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email OTP Input */}
      {currentStep === 'emailotp' && (
        <div className="max-w-[390px] mx-auto w-full pt-40">
          <div className="w-full space-y-6 px-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-600">Enter the 4-digit code sent to your email address.</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm text-center tracking-[0.5em]"
                placeholder="Enter 4-digit code"
                maxLength={4}
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))}
              />
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
                onClick={() => verifyEmailOtp(emailOtp)}
                disabled={emailOtp.length !== 4 || isLoadingEmailOtp}
              >
                {isLoadingEmailOtp ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify'
                )}
              </Button>
              <div className="text-center">
                <button 
                  className="text-orange text-sm font-medium"
                  onClick={() => setCurrentStep('email')}
                >
                  Change Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Form */}
      {currentStep === 'profile' && (
        <div className="max-w-[390px] mx-auto w-full pt-40">
          {/* Image Placeholder */}
          <div className="w-full h-[234px] bg-[#d9d9d9] mb-6" />

          {/* Registration Form Section */}
          <Card className="flex flex-col w-full items-start gap-6 pt-0 pb-10 px-4 rounded-2xl overflow-hidden border-none">
            <CardContent className="p-0 w-full">
              <div className="flex h-14 items-center gap-2 px-0 py-2 relative self-stretch w-full">
                <div className="items-start gap-1 relative flex-1 grow flex flex-col">
                  <div className="relative self-stretch font-body-14pt text-black text-sm">
                    Registration
                  </div>
                </div>
              </div>

              <div className="items-start gap-6 px-6 py-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                {/* Profile For */}
                <div className="relative self-stretch w-full h-16">
                  <Select onValueChange={(value) => handleSelectChange("profileFor", value)}>
                    <SelectTrigger className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]">
                      <SelectValue placeholder="Select profile for" />
                      <ChevronDownIcon className="absolute w-4 h-4 top-[11px] right-[11px]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Myself">Self</SelectItem>
                      <SelectItem value="Son">Son</SelectItem>
                      <SelectItem value="Daughter">Daughter</SelectItem>
                      <SelectItem value="Brother">Brother</SelectItem>
                      <SelectItem value="Sister">Sister</SelectItem>
                      <SelectItem value="Relative">Relative</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                    Profile For
                  </div>
                </div>

                {/* Full Name */}
                <div className="relative self-stretch w-full h-16">
                  <Input
                    name="fullName"
                    type="text"
                    className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                    Full Name
                  </div>
                </div>

                {/* Password */}
                <div className="relative self-stretch w-full h-16">
                  <Input
                    name="password"
                    type="password"
                    className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                    Password
                  </div>
                </div>

                {/* Location */}
                <div className="relative self-stretch w-full h-16">
                  <PlacesAutocomplete
                    value={formData.location}
                    onChange={(value: string) => handleSelectChange("location", value)}
                    onSelect={(value: string, placeId: string) => handleLocationSelect(value, placeId)}
                    searchOptions={{ types: ['(cities)'] }}
                    googleCallbackName="initPlaces"
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }: {
                      getInputProps: any;
                      suggestions: any[];
                      getSuggestionItemProps: any;
                      loading: boolean;
                    }) => (
                      <div className="relative">
                        <Input
                          {...getInputProps({
                            placeholder: 'Enter your location',
                            className: 'absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]',
                          })}
                        />
                        <div
                          className="autocomplete-dropdown-container"
                          style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            background: '#fff',
                            border: '1px solid #dfe1e6',
                            zIndex: 1000,
                            position: 'absolute',
                            width: '100%',
                            top: '100%',
                            left: 0
                          }}
                        >
                          {loading && <div className="p-2">Loading...</div>}
                          {suggestions.map((suggestion: any) => (
                            <div
                              key={suggestion.placeId}
                              {...getSuggestionItemProps(suggestion, {
                                className: suggestion.active
                                  ? 'suggestion-item--active p-2 bg-gray-100 cursor-pointer'
                                  : 'suggestion-item p-2 cursor-pointer hover:bg-gray-50'
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                    Location
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finish Sign Up Button */}
          <div className="flex justify-center mt-8">
            <Button 
              className="flex w-[216px] h-10 items-center justify-center gap-2 px-[25px] py-2 bg-orange rounded-[48px] h-auto"
              onClick={handleSubmit}
              disabled={!formData.profileFor || !formData.fullName || !formData.location || !formData.password || isLoadingProfile}
            >
              {isLoadingProfile ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span className="relative w-fit font-caption-12pt text-white text-sm text-center">
                    Submitting...
                  </span>
                </div>
              ) : (
                <span className="relative w-fit font-caption-12pt text-white text-sm text-center">
                  Finish Sign Up
                </span>
              )}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
} 