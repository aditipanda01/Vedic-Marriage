
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Progress } from "../../../../../components/ui/progress";
import ProfileProgressBar from "@/common/components/ui/ProfileProgressBar";
import BasicInfoIcon from "@/assets/images/img/image.png";
import SpiritualDetailsIcon from "@/assets/images/img/3.png";
import AstroDetailsIcon from "@/assets/images/img/3x.png";
import PartnerPreferencesIcon from "@/assets/images/img/5.png";
import FamilyDetailsIcon from "@/assets/images/img/1.png";
import PersonalityQuestionsIcon from "@/assets/images/img/4.png";
import CareerDetailsIcon from "@/assets/images/img/2.png";
import PhotoIcon from "@/assets/images/img/photos.png";
import SelfieVerificationIcon from "@/assets/images/img/recommendations.png";
import EmailVerificationIcon from "@/assets/images/img/mail.png";
import MobileNumberVerificationIcon from "@/assets/images/img/phone.png";
import GovtIdVerificationIcon from "@/assets/images/img/secrity.png";
import PrivacySettingsIcon from "@/assets/images/img/privacy.png";
import CompletedIcon from "@/assets/images/img/completed-10.png";
import IncompleteIcon from "@/assets/images/img/completed-13.png";
export const ProfileCompletionSection = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Debug logging
  console.log('ProfileCompletionSection - User data:', {
    user: user ? 'exists' : 'null',
    profileCompletionDetails: user?.profileCompletionDetails,
    completedSections: user?.profileCompletionDetails?.completedSections,
    incompleteSections: user?.profileCompletionDetails?.incompleteSections,
    verification: user?.verification
  });

  // Define section mappings with icons and titles
  const sectionMappings = {
    'basic_info': { title: "Basic Info", icon: BasicInfoIcon },
    'spiritual_info': { title: "Spiritual Details", icon: SpiritualDetailsIcon },
    'astro': { title: "Astro Details", icon: AstroDetailsIcon },
    'preferences': { title: "Partner Preferences", icon: PartnerPreferencesIcon },
    'family': { title: "Family Details", icon: FamilyDetailsIcon },
    'lifestyle_personality': { title: "Personality Questions", icon: PersonalityQuestionsIcon },
    'career_education': { title: "Career Details", icon: CareerDetailsIcon },
    'about_me': { title: "About Me", icon: PrivacySettingsIcon },
  };

  // Define the section interface
  interface ProfileSection {
    title: string;
    icon: any;
    completed: boolean;
    key?: string;
    completionPercentage?: number;
    status?: string;
    hasInfo?: boolean; // Added for verification sections
  }

  // Create dynamic profile sections based on user data
  const getProfileSections = (): ProfileSection[] => {
    const sections: ProfileSection[] = [];
    const completedSections = user?.profileCompletionDetails?.completedSections || [];
    const incompleteSections = user?.profileCompletionDetails?.incompleteSections || [];
    const sectionDetails = user?.profileCompletionDetails?.sectionDetails || {};

    // Add all sections that exist in the user's profile
    const allSections = [...completedSections, ...incompleteSections];
    
    // If no sections found, use default sections
    if (allSections.length === 0) {
      return Object.entries(sectionMappings).map(([key, section]) => ({
        title: section.title,
        icon: section.icon,
        completed: false,
        key
      }));
    }

    // Create sections based on user data
    allSections.forEach(sectionKey => {
      const sectionMapping = sectionMappings[sectionKey as keyof typeof sectionMappings];
      if (sectionMapping) {
        const isCompleted = completedSections.includes(sectionKey);
        const sectionDetail = sectionDetails[sectionKey];
        
        sections.push({
          title: sectionMapping.title,
          icon: sectionMapping.icon,
          completed: isCompleted,
          key: sectionKey,
          completionPercentage: sectionDetail?.completionPercentage || 0,
          status: sectionDetail?.status || 'incomplete'
        });
      }
    });

    return sections;
  };

  // Get dynamic profile sections
  const profileSections = getProfileSections();

  // Create dynamic photo sections based on user data
  const getPhotoSections = (): ProfileSection[] => {
    const sections: ProfileSection[] = [];
    const verification = user?.verification;
    const galleryPhotos = verification?.verifiedGalleryPhoto || [];
    const selfieStatus = (verification as any)?.selfie?.status || 'pending';

    // Upload Photos section
    sections.push({
      title: "Upload Photos",
      icon: PhotoIcon,
      completed: galleryPhotos.length > 0,
      key: 'gallery_photos',
      completionPercentage: galleryPhotos.length > 0 ? 100 : 0,
      status: galleryPhotos.length > 0 ? 'complete' : 'incomplete'
    });

    // Selfie Verification section
    sections.push({
      title: "Selfie Verification",
      icon: SelfieVerificationIcon,
      completed: selfieStatus === 'verified' || selfieStatus === 'approved',
      key: 'selfie_verification',
      completionPercentage: (selfieStatus === 'verified' || selfieStatus === 'approved') ? 100 : 0,
      status: (selfieStatus === 'verified' || selfieStatus === 'approved') ? 'complete' : 'incomplete'
    });

    return sections;
  };

  // Create dynamic verification sections based on user data
  const getVerificationSections = (): ProfileSection[] => {
    const sections: ProfileSection[] = [];
    const verification = user?.verification;

    // Email Verification
    const emailVerified = (verification as any)?.emailVerification?.isVerified || false;
    sections.push({
      title: "Email Verification",
      icon: EmailVerificationIcon,
      completed: true,
      key: 'email_verification',
      completionPercentage: 100 ,
      status: 'complete' 
    });

    // Mobile Number Verification
    const mobileVerified = (verification as any)?.mobileVerification?.isVerified || false;
    sections.push({
      title: "Mobile Number Verification",
      icon: MobileNumberVerificationIcon,
      completed: true,
      key: 'mobile_verification',
      completionPercentage: 100,
      status:'complete'
    });

    // Govt. ID Verification
    const govtIdStatus = (verification as any)?.govtId?.front?.status || 'pending';
    const govtIdVerified = govtIdStatus === 'verified' || govtIdStatus === 'approved';
    sections.push({
      title: "Govt. ID Verification",
      icon: GovtIdVerificationIcon,
      completed: govtIdVerified,
      key: 'govt_id_verification',
      completionPercentage: govtIdVerified ? 100 : 0,
      status: govtIdVerified ? 'complete' : 'incomplete',
      hasInfo: true
    });

    // Privacy Settings
    const privacySettings = user?.privacy_setups;
    const privacyCompleted = privacySettings && Object.keys(privacySettings).length > 0;
    sections.push({
      title: "Setup Your Privacy Settings",
      icon: PrivacySettingsIcon,
      completed: !!privacyCompleted,
      key: 'privacy_settings',
      completionPercentage: privacyCompleted ? 100 : 0,
      status: privacyCompleted ? 'complete' : 'incomplete'
    });

    return sections;
  };

  // Get dynamic sections
  const photoSections = getPhotoSections();
  const verificationSections = getVerificationSections();

  return (
    <div className="w-full mt-40 flex flex-col items-center">
      <Accordion type="single" collapsible className="w-full max-w-[390px]">
        <AccordionItem value="profile-completion" className="border-0">
          <Card className="rounded-[0px_0px_16px_16px] shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xs font-bold [font-family:'Plus_Jakarta_Sans',Helvetica] mb-6">
                    Profile Completed
                  </CardTitle>
                  <ProfileProgressBar variant="normal" />
                </div>
                <AccordionTrigger className="p-3 h-12 w-12 flex items-center justify-center">
                  {/* <ChevronDownIcon className="h-6 w-6" /> */}
                </AccordionTrigger>
              </div>
            </CardContent>
          </Card>

          <AccordionContent>
            <Card className="mt-4 rounded-2xl opacity-70 w-full max-w-[335px] mx-auto">
              <CardContent className="p-0">
                {profileSections.map((section, index) => (
                  <div
                    key={section.key || index}
                    className="relative w-full h-12 flex items-center"
                  >
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className="w-[52px] h-[23px] object-cover"
                        alt={section.title}
                        src={section.icon}
                        onError={(e) => {
                          console.error('Failed to load image:', section.icon);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 h-5 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-xs leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                    </div>
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className={`w-6 h-6 ${section.completed ? '' : 'opacity-40'}`}
                        alt="Completed"
                        src={section.completed ? CompletedIcon : IncompleteIcon}
                        onError={(e) => {
                          console.error('Failed to load completed image');
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4 rounded-2xl opacity-70 w-full max-w-[344px] mx-auto">
              <CardHeader className="px-4 py-2">
                <CardTitle className="text-xs font-bold [font-family:'Plus_Jakarta_Sans',Helvetica]">
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {photoSections.map((section, index) => (
                  <div
                    key={section.key || index}
                    className="relative w-full h-12 flex items-center"
                  >
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className="w-6 h-6"
                        alt={section.title}
                        src={section.icon}
                        onError={(e) => {
                          console.error('Failed to load image:', section.icon);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 h-5 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-xs leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                    </div>
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className={`w-6 h-6 ${section.completed ? '' : 'opacity-40'}`}
                        alt="Completed"
                        src={section.completed ? CompletedIcon : IncompleteIcon}
                        onError={(e) => {
                          console.error('Failed to load completed image');
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4 rounded-2xl opacity-70 w-full max-w-[344px] mx-auto">
              <CardHeader className="px-4 py-2">
                <CardTitle className="text-xs font-bold [font-family:'Plus_Jakarta_Sans',Helvetica]">
                  Verification&nbsp;&nbsp;&amp; Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {verificationSections.map((section, index) => (
                  <div
                    key={section.key || index}
                    className="relative w-full h-12 flex items-center"
                  >
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className="w-6 h-6"
                        alt={section.title}
                        src={section.icon}
                        onError={(e) => {
                          console.error('Failed to load image:', section.icon);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 h-5 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-xs leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                      {section.hasInfo && (
                        <div className="absolute right-[70px] top-0 w-14 h-12">
                          <img
                            className="absolute w-4 h-4 top-4 left-4"
                            alt="Info"
                            src={section.completed ? CompletedIcon : IncompleteIcon}
                            onError={(e) => {
                              console.error('Failed to load completed image');
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-14 h-12 flex items-center justify-center">
                      <img
                        className={`w-6 h-6 ${section.completed ? '' : 'opacity-40'}`}
                        alt="Completed"
                        src={section.completed ? CompletedIcon : IncompleteIcon}
                        onError={(e) => {
                          console.error('Failed to load completed image');
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
