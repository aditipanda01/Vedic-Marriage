import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { HomeIcon, MoreVerticalIcon, SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProfileService } from "@/services/profileService"
import { useToast } from "@/common/components/ui/toast/ToastContainer"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"

export function PrivacySettings() {
  const navigate = useNavigate()
  const { profile: userProfile } = useAppSelector((state) => state.user)
  
  // State for privacy settings
  const [isSaving, setIsSaving] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState({
    basic_privacy: "Only Me",
    family_privacy: "Only Me",
    astro_privacy: "Only Me",
    career_privacy: "Only Me",
    spiritual_privacy: "Only Me",
    personality_privacy: "Only Me",
  })
  const [extendedPrivacy, setExtendedPrivacy] = useState({
    photo_privacy: "Only Me",
    contact_privacy: "Only Me",
    activity_status: "Only Me",
  })

  // Prepopulate data from Redux when component mounts or user profile changes
  useEffect(() => {
    console.log('userProfile:', userProfile)
    console.log('privacy_setups:', userProfile?.privacy_setups)
    
    if (userProfile?.privacy_setups) {
      const privacy = userProfile.privacy_setups
      console.log('Setting privacy data:', privacy)
      
      setProfileVisibility({
        basic_privacy: privacy.basic_privacy || "Only Me",
        family_privacy: privacy.family_privacy || "Only Me",
        astro_privacy: privacy.astro_privacy || "Only Me",
        career_privacy: privacy.career_privacy || "Only Me",
        spiritual_privacy: privacy.spiritual_privacy || "Only Me",
        personality_privacy: privacy.personality_privacy || "Only Me",
      })
      
      setExtendedPrivacy({
        photo_privacy: privacy.photo_privacy || "Only Me",
        contact_privacy: privacy.contact_privacy || "Only Me",
        activity_status: privacy.activity_status || "Only Me",
      })
    }
  }, [userProfile])

  // Data for the header sections
  const statusBarData = {
    time: "12:30",
    icons: [
      { src: "/img/wifi.png", alt: "Wifi", className: "w-4 h-3" },
      { src: "/img/reception.png", alt: "Reception", className: "w-3 h-3" },
      { src: "/img/battery.png", alt: "Battery", className: "w-2 h-[13px]" },
    ],
  }

  const navBarData = {
    url: {
      domain: "vedicmarriage.ai",
      path: "/my-profile",
    },
    notificationCount: 1,
  }

  // Data for the tabs
  const tabItems = [
    { id: "selfie", label: "Selfie Verification", active: false },
    { id: "govt", label: "Govt ID Verification", active: false },
    { id: "privacy", label: "Privacy", active: true },
  ]

  // Handle profile visibility change
  const handleProfileVisibilityChange = (field: string, value: string) => {
    setProfileVisibility(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle extended privacy change
  const handleExtendedPrivacyChange = (field: string, value: string) => {
    setExtendedPrivacy(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle save privacy settings
  const handleSavePrivacySettings = async () => {
    setIsSaving(true)

    try {
      // Flatten the data to match backend expectations
      const privacyData = {
        ...profileVisibility,
        ...extendedPrivacy
      }

      const result = await ProfileService.updatePrivacySettings(privacyData)
      if (result.status === 'error') {
        throw new Error(result.error || 'Save failed')
      }

      // Show success message
      showToast({
        type: 'success',
        title: 'Privacy settings saved successfully!',
        message: 'Your privacy settings have been updated.',
      })
      
    } catch (error: any) {
      console.error('Privacy settings save error:', error)
      showToast({
        type: 'error',
        title: 'Save failed',
        message: error.message,
      })
    } finally {
      setIsSaving(false)
      //navigate("/payment")
      navigate("/verification/gallery-photo")
    }
  }

  // Profile visibility settings data
  const profileSettingsData = [
    { key: 'basic_privacy', title: 'Basic Details' },
    { key: 'family_privacy', title: 'Family Details' },
    { key: 'astro_privacy', title: 'Astro Details' },
    { key: 'career_privacy', title: 'Career Details' },
    { key: 'spiritual_privacy', title: 'Spiritual Details' },
    { key: 'personality_privacy', title: 'Personality Questions' },
  ]

  // Extended privacy settings data
  const extendedSettingsData = [
    { key: 'photo_privacy', title: 'Photo Privacy', description: 'Who can see my Picture?' },
    { key: 'contact_privacy', title: 'Contact Privacy', description: 'Who can see my contact details?' },
    { key: 'activity_status', title: 'Activity Status', description: 'Who can see my Online?' },
  ]

  const { showToast } = useToast()

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      {/* Status Bar */}
      <Header/>      

      {/* Profile Visibility Tabs */}
      <div className="w-full bg-white">
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`h-full ${
                  tab.active
                    ? "!text-[#2bcc8d] font-semibold border-b-2 border-orange"
                    : "font-bold"
                } [font-family:'Montserrat',Helvetica] text-xs tracking-[0]`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          {/* Privacy Options Header */}
          <Card className="w-full py-2">
            <CardContent className="flex items-center p-0">
              <div className="flex w-14 h-14 items-center justify-center p-3">
                <img className="w-6 h-6" alt="Privacy" src="/assets/images/img/privacy.png" />
              </div>

              <div className="flex flex-col">
                <span className="font-['Raleway',Helvetica] font-bold text-grey text-xs leading-4">
                  Privacy
                </span>
                <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-e-84420 text-base leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
                  Setup Your Privacy
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings Section */}
          <section className="flex flex-col w-full max-w-md items-center gap-2">
            <div className="flex flex-col w-full items-start gap-[9px]">
              <header className="w-full h-10">
                <h2 className="pt-[15px] px-4 font-bold text-grey text-[11px] leading-4">
                  Profile Details Visibility Preferences
                </h2>
              </header>

              {/* Profile visibility settings */}
              {profileSettingsData.map((item) => (
                <div key={item.key} className="flex justify-between w-full h-10">
                  <div className="flex-1">
                    <h3 className="pt-[15px] px-4 font-bold text-black text-xs leading-4">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-36 flex items-center justify-end">
                    <Select
                      value={profileVisibility[item.key as keyof typeof profileVisibility]}
                      onValueChange={(val) => handleProfileVisibilityChange(item.key, val)}
                    >
                      <SelectTrigger className="w-full h-8 border-none bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Only Me">Only Me</SelectItem>
                        <SelectItem value="Connections">Connections</SelectItem>
                        <SelectItem value="Everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extended Privacy Settings */}
          <section className="flex flex-col w-full max-w-md items-center gap-2">
            <div className="flex flex-col w-full items-start gap-[9px]">
              <header className="w-full h-10">
                <h2 className="pt-[15px] px-4 font-bold text-grey text-[11px] leading-4">
                  Extended Privacy Settings
                </h2>
              </header>

              {/* Extended privacy settings */}
              {extendedSettingsData.map((item) => (
                <div key={item.key} className="flex flex-col w-full gap-2 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-xs leading-4 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-36 flex items-center justify-end">
                      <Select
                        value={extendedPrivacy[item.key as keyof typeof extendedPrivacy]}
                        onValueChange={(val) => handleExtendedPrivacyChange(item.key, val)}
                      >
                        <SelectTrigger className="w-full h-8 border-none bg-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Only Me">Only Me</SelectItem>
                          <SelectItem value="Connections">Connections</SelectItem>
                          <SelectItem value="Everyone">Everyone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: () => navigate(-1),
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: isSaving ? 'Saving...' : 'Save',
          onClick: handleSavePrivacySettings,
          disabled: isSaving,
          loading: isSaving,
          loadingText: 'Saving...',
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 