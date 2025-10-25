import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircleIcon, MapPinIcon, PhoneIcon, MailIcon,ChevronRightIcon } from 'lucide-react';
import { SignupHeader } from '@/app/pages/auth/signupHeader';
import { ProfileCompletionSection } from './sections/ProfileCompletionSection';
import { ProfileBuilderSection } from './sections/ProfileBuilderSection';
import { DashboardInfoSection } from './sections/DashboardInfoSection/DashboardInfoSection';
import { useNavigate } from 'react-router-dom';
interface UserProfileData {
  fullName: string;
  profileFor: string;
  location: string;
  mobileNumber: string;
  email?: string;
  profileComplete: boolean;
}

const MyProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, you would fetch profile data from the API
    // For now, we'll simulate it with the data from registration
    const fetchProfileData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app this would come from API
        setProfileData({
          fullName: user?.fname && user?.lname ? `${user.fname} ${user.lname}` : 'Not set',
          profileFor: 'Myself', // This would come from registration data
          location: 'Mumbai, India', // This would come from registration data
          mobileNumber: '+91 9876543210', // This would come from registration data
          email: user?.email,
          profileComplete: false,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <SignupHeader />
    <main
      className="flex flex-col w-full min-h-screen bg-background-color overflow-x-hidden"
      data-model-id="2:3"
    >
      
      <div className="w-full max-w-[390px] mx-auto px-4">
        <ProfileCompletionSection />
        <ProfileBuilderSection />
        <div className="flex justify-center">
          <DashboardInfoSection />
        </div>
      </div>

      <Card className="w-full max-w-[390px] mx-auto mt-auto rounded-t-[16px] shadow-[0px_7px_29px_#64646f33] border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between px-4 rounded-[84px]">
            <span className="font-bold text-[#ed6129] text-sm font-['Plus_Jakarta_Sans',Helvetica]">
              Let&apos;s Build Your Profile
            </span>

            <Button
              size="icon"
              className="p-2 rounded-[72px] bg-[#ed6129] hover:bg-[#ed6129]/90"
              onClick={() => navigate('/profile-filling')}
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
    </>
  );
};

export default MyProfile; 