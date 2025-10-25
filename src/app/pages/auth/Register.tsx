import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { SignupHeader } from './signupHeader';
import { ChevronDownIcon } from 'lucide-react';
import google from '@/assets/images/img/googl.png';
import { validateMobileNumber, ValidationResult } from '@/common/validations/validation';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '../../../components/ui/select';
import axios from 'axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { profileForList } from '@/common/constants/webconst';
import { ROUTES } from '@/common/constants/routes';
// @ts-ignore: No types for 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete';

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const formFields = [
    {
      id: 'profileFor',
      label: 'Profile For',
      type: 'select',
      hasIcon: true,
    },
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'input',
      hasIcon: false,
    },
    {
      id: 'location',
      label: 'Location',
      type: 'select',
      hasIcon: true,
    },
  ];
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [validation, setValidation] = useState<ValidationResult>({ isValid: false, error: '' });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState('');
  const [showRegistrationSection, setShowRegistrationSection] = useState(false);
  const [profileFor, setProfileFor] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [profileForError, setProfileForError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setValidation(validateMobileNumber(value));
  };

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showOtpSection && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResendOtp(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showOtpSection, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    const result = validateMobileNumber(mobileNumber);
    if (result.isValid) {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post(API_ENDPOINTS.AUTH.SEND_OTP, { mobile: mobileNumber });
        if (response.status === 200) {
          setShowOtpSection(true);
          setCountdown(60);
          setCanResendOtp(false);
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'Failed to send OTP. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setValidation(result);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.VERIFY_OTP , {
        mobile: mobileNumber,
        otp,
      });
      if (response.status === 200) {
        setShowOtpSection(false);
        setShowRegistrationSection(true);
        setCountdown(60);
        setCanResendOtp(false);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.SEND_OTP, { mobile: mobileNumber });
      if (response.status === 200) {
        setCountdown(60);
        setCanResendOtp(false);
        setError('');
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateRegistrationFields = () => {
    let valid = true;
    setProfileForError('');
    setFullNameError('');
    setLocationError('');
    if (!profileFor) {
      setProfileForError('Profile For is required');
      valid = false;
    }
    if (!fullName) {
      setFullNameError('Full Name is required');
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(fullName)) {
      setFullNameError('Full Name should contain only letters and spaces');
      valid = false;
    }
    if (!location) {
      setLocationError('Location is required');
      valid = false;
    }
    return valid;
  };

  const handleFinishSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistrationFields()) {
      setIsLoading(true);
      setError('');
      
      try {
        const registrationData = {
          mobileNumber,
          profileFor,
          fullName,
          location,
          mobile_otp:otp,
        };

        const response = await axios.post(API_ENDPOINTS.AUTH.FINISH_SIGNUP, registrationData);
        
        if (response.status === 200 || response.status === 201) {
          // Registration successful, redirect to my-profile page
          navigate(ROUTES.MY_PROFILE);
        } else {
          setError('Registration failed. Please try again.');
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'Registration failed. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <SignupHeader />
      <div
        className="w-[390px] min-h-screen bg-[#ffffff] overflow-x-hidden overflow-y-auto relative"
        data-model-id="247:18852"
      >
        {/* Mobile number input section */}
        {!showOtpSection && !showRegistrationSection && (
          <div>
            <Button
              className="w-80 h-10 absolute top-[443px] left-[35px] bg-orange hover:bg-orange/90 rounded-[48px] font-caption-12pt text-[#ffffff] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleContinue}
              disabled={!validation.isValid || isLoading}
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </Button>
            <div className="absolute w-80 top-[342px] left-[35px]">
              <div className="w-80 h-4 font-['Montserrat',Helvetica] font-semibold text-dark-grey text-sm tracking-[0] leading-[23.1px] whitespace-nowrap mb-2">
                Enter Your Mobile Number
              </div>
              <div className="relative">
                <Input
                  className={`w-80 h-12 bg-white rounded-lg border ${validation.error ? 'border-red-500' : 'border-[#d3d3d3]'} px-4 py-[17px] font-['Montserrat',Helvetica] font-medium text-variable-collection-1light-grey text-sm`}
                  placeholder="Enter mobile number here"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  maxLength={10}
                />
                {validation.error && (
                  <div className="absolute text-red-500 text-xs mt-1 font-['Montserrat',Helvetica]">
                    {validation.error}
                  </div>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-xs mt-2 font-['Montserrat',Helvetica]">
                  {error}
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="flex w-80 items-center justify-center gap-2 px-16 py-0 absolute top-[558px] left-[35px] bg-[#ffffff] rounded-[48px] border border-[#d3d3d3] hover:border-orange h-auto"
            >
              <div className="flex w-12 h-12 items-center justify-center gap-2 p-3 relative">
                <img className="relative w-6 h-6" alt="Google" src={google} />
              </div>
              <div className="relative flex-1 font-['Montserrat',Helvetica] font-semibold text-black text-xs tracking-[0] leading-[normal]">
                Signup with Google
              </div>
            </Button>
            <div className="flex flex-col w-12 h-12 items-center justify-center gap-2 py-[17px] absolute top-[496px] left-[171px]">
              <div className="relative w-11 mt-[-1.50px] font-caption-12pt font-[number:var(--caption-12pt-font-weight)] text-grey text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)] [font-style:var(--caption-12pt-font-style)]">
                OR
              </div>
            </div>
          </div>
        )}
        {/* otp input section */}
        {showOtpSection && (
          <div>
            <div className="absolute w-80 h-20 top-[300px] left-[35px]">
              <div className="absolute w-80 h-4 top-0 left-0 [font-family:'Montserrat',Helvetica] font-semibold text-dark-grey text-sm tracking-[0] leading-[23.1px] whitespace-nowrap">
                Enter OTP
              </div>
              <div className="absolute w-[178px] h-4 top-[96px] left-0 [font-family:'Montserrat',Helvetica] font-semibold text-grey text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                OTP sent to +91-{mobileNumber}
              </div>
              <div
                className="absolute h-[18px] top-[96px] left-[233px] [font-family:'Montserrat',Helvetica] font-semibold text-orange text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap cursor-pointer"
                onClick={() => setShowOtpSection(false)}
              >
                Edit Number?
              </div>
              <Input
                className="absolute w-80 h-12 top-8 left-0 bg-white rounded-lg border border-solid border-[#d3d3d3]"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter OTP"
              />
              {error && (
                <div className="absolute text-red-500 text-xs mt-1 left-0 font-['Montserrat',Helvetica]">
                  {error}
                </div>
              )}
            </div>
            <div className="absolute w-80 h-[85px] top-[456px] left-[35px]">
              <Button
                className="w-80 h-10 absolute top-0 left-0 bg-orange rounded-[48px] text-white font-caption-12pt"
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <div className="flex flex-col w-[165px] h-12 items-center justify-center gap-2 px-0.5 py-[17px] absolute top-[40px] left-[77px]">
                {canResendOtp ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="relative w-fit mt-[-1.50px] font-caption-12pt text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)] text-orange cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <div className="relative w-fit mt-[-1.50px] font-caption-12pt text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)]">
                    <span className="text-[#959595]">Resent OTP in </span>
                    <span className="text-[#e65e28]">{countdown}s</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Registration finish Section */}
        {showRegistrationSection && (
          <div>
            <Card className="flex flex-col w-[360px] h-[369px] items-start gap-6 pt-0 pb-10  absolute top-[250px] left-[10px] rounded-2xl overflow-hidden border-none">
              <CardContent className="p-0 w-full">
                <form onSubmit={handleFinishSignUp}>
                  <div className="flex h-14 items-center gap-2 px-0 py-2 relative self-stretch w-full">
                    <div className="items-start gap-1 relative flex-1 grow flex flex-col">
                      <div className="relative self-stretch mt-[-1.00px] font-body-14pt font-[number:var(--body-14pt-font-weight)] text-black text-[length:var(--body-14pt-font-size)] tracking-[var(--body-14pt-letter-spacing)] leading-[var(--body-14pt-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-style:var(--body-14pt-font-style)]">
                        Registration
                      </div>
                    </div>
                  </div>
                  <div className="items-start gap-6 px-10 py-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
                    {/* Profile For */}
                    <div className="relative self-stretch w-full" style={{ minHeight: 25 }}>
                      <Select value={profileFor} onValueChange={setProfileFor}>
                        <SelectTrigger className="w-full rounded border border-solid border-[#dfe1e6]">
                          <SelectValue placeholder="Select Profile For" />
                         
                        </SelectTrigger>
                        <SelectContent>
                          {profileForList.map((item) => (
                            <SelectItem value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                        Profile For
                      </div>
                      {profileForError && (
                        <div className="text-red-500 text-xs mt-1 left-0 font-['Montserrat',Helvetica]">
                          {profileForError}
                        </div>
                      )}
                    </div>
                    {/* Full Name */}
                    <div className="relative self-stretch w-full h-16">
                      <Input
                        className="absolute w-[280px] h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Enter Full Name"
                      />
                      <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                        Full Name
                      </div>
                      {fullNameError && (
                        <div className="text-red-500 text-xs mt-1 left-0 font-['Montserrat',Helvetica]">
                          {fullNameError}
                        </div>
                      )}
                    </div>
                    {/* Location */}
                    <div className="relative self-stretch w-full" style={{ minHeight: 60 }}>
                      <PlacesAutocomplete
                        value={location}
                        onChange={setLocation}
                        onSelect={setLocation}
                        searchOptions={{ types: ['(cities)'] }}
                        googleCallbackName="initPlaces"
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }: {
                          getInputProps: any;
                          suggestions: any[];
                          getSuggestionItemProps: any;
                          loading: boolean;
                        }) => (
                          <div>
                            <Input
                              {...getInputProps({
                                placeholder: 'Enter Location',
                                className: 'w-full rounded border border-solid border-[#dfe1e6]'
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
                                width: '100%'
                              }}
                            >
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion: any) => (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className: suggestion.active
                                      ? 'suggestion-item--active'
                                      : 'suggestion-item'
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                    <Button 
                      type="submit" 
                      className="flex w-[216px] h-10 items-center justify-center gap-2 px-[25px] py-2 absolute top-[250px] left-[62px] bg-orange rounded-[48px] h-auto"
                      disabled={isLoading}
                    >
                      <span className="relative w-fit font-caption-12pt font-[number:var(--caption-12pt-font-weight)] text-[#ffffff] text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)] [font-style:var(--caption-12pt-font-style)]">
                        {isLoading ? 'Signing Up...' : 'Finish Sign Up'}
                      </span>
                    </Button>
                    {error && (
                      <div className="text-red-500 text-xs mt-2 text-center font-['Montserrat',Helvetica]">
                        {error}
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gray placeholder area */}
        <Card className="absolute w-[387px] h-[234px] left-px bg-[#d9d9d9] border-none rounded-none">
          <CardContent className="p-0 h-full"></CardContent>
        </Card>
      </div>
    </>
  );
};
