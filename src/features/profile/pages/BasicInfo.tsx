import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';
import { ArrowLeftIcon, UserIcon, CalendarIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { SignupHeader } from '@/app/pages/auth/signupHeader';
import { MainContentSection } from './Basicseactions/MainContentSection';
import { BasicDetailsSection } from './Basicseactions/BasicDetailsSection/BasicDetailsSection';
import { FormWrapperSection } from './Basicseactions/FormWrapperSection';

interface BasicInfoData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  mobileNumber: string;
  email: string;
  profileFor: string;
}

const BasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BasicInfoData>({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    mobileNumber: '',
    email: '',
    profileFor: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof BasicInfoData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement API call to save basic info
      console.log('Saving basic info:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to my-profile or next step
      navigate('/my-profile');
    } catch (error) {
      console.error('Error saving basic info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/my-profile');
  };

  return (
    <>
      <SignupHeader />
      <div
      className="flex flex-col w-full max-w-[390px] mx-auto bg-white overflow-hidden"
      data-model-id="247:4503"
    >
      
      <MainContentSection />
      <BasicDetailsSection />
      <FormWrapperSection />
    </div>
    </>
  );
};

export default BasicInfo; 