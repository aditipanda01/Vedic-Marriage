"use client"

import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useNavigation, Section } from "@/lib/context/NavigationContext"
import { BasicInfoSection } from "../BasicInfoSection/BasicInfoSection"
import { AstroSection } from "../AstroSection/AstroSection"
import { FamilyBackgroundSection } from "../FamilyBackgroundSection/FamilyBackgroundSection"
import { CareerSection } from "../CareerSection/CareerSection"
import { SpiritualSection } from "../SpiritualSection/SpiritualSection"
import { PreferenceSection } from "../PreferenceSection/PreferenceSection"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileService } from "@/services/profileService"
import { useToast } from "@/common/components/ui/toast/ToastContainer"
import { useNavigate } from "react-router-dom"
interface FormData {
  basic: any
  astro: any
  family: any
  career: any
  spiritual: any
  preference: any
}

const sections: Section[] = ["basic", "astro", "family", "career", "spiritual", "preference"]

const sectionIcons: Record<Section, string> = {
  basic: "/img/icon-input-field-7.png",
  astro: "/img/icon-input-field-7.png",
  family: "/img/icon-input-field-7.png",
  career: "/img/icon-input-field-7.png",
  spiritual: "/img/icon-input-field-7.png",
  preference: "/img/icon-input-field-7.png",
}

const sectionTitles: Record<Section, string> = {
  basic: "Basic",
  astro: "Astro",
  family: "Family",
  career: "Career",
  spiritual: "Spiritual",
  preference: "Preference",
}

export function ProfileSection() {
  const navigate = useNavigate()
  const { currentSection, setCurrentSection, completedSections, markSectionComplete } = useNavigation()
  const { showToast } = useToast()
  const tabsListRef = useRef<HTMLDivElement>(null)
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [formData, setFormData] = useState<FormData>({
    basic: {},
    astro: {},
    family: {},
    career: {},
    spiritual: {},
    preference: {},
  })
  const [sectionValidation, setSectionValidation] = useState<Record<Section, { isValid: boolean; errors: string[] }>>({
    basic: { isValid: false, errors: [] },
    astro: { isValid: false, errors: [] },
    family: { isValid: false, errors: [] },
    career: { isValid: false, errors: [] },
    spiritual: { isValid: false, errors: [] },
    preference: { isValid: false, errors: [] },
  })
  const [validationTriggers, setValidationTriggers] = useState<Record<Section, (() => void) | null>>({
    basic: null,
    astro: null,
    family: null,
    career: null,
    spiritual: null,
    preference: null,
  })
  const [dataGetters, setDataGetters] = useState<Record<Section, (() => any) | null>>({
    basic: null,
    astro: null,
    family: null,
    career: null,
    spiritual: null,
    preference: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user) {
      const prePopulatedData: FormData = {
        basic: user.basic_info || {},
        astro: user.astro || {},
        family: user.family || {},
        career: user.career_education || {},
        spiritual: user.spiritual_info || {},
        preference: user.preferences || {},
      }
      
      console.log('ProfileSection - Pre-populating data from Redux:', prePopulatedData)
      
      setFormData(prePopulatedData)
      
      // Mark sections as complete if they have data
      Object.entries(prePopulatedData).forEach(([section, data]) => {
        if (data && Object.keys(data).length > 0) {
          markSectionComplete(section as Section)
        }
      })
    }
  }, [user, markSectionComplete])

  useEffect(() => {
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector('[data-state="active"]')
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentSection])

  const handleNext = async () => {
    setIsLoading(true)
    
    try {
      // Get current section data first
      const getData = dataGetters[currentSection]
      let currentData = {}
      if (getData) {
        currentData = getData()
      }

      // Trigger validation for current section
      const triggerValidation = validationTriggers[currentSection]
      if (triggerValidation) {
        triggerValidation()
      }

      // Check if current section is valid (only for sections that have validation)
      if (currentSection === "basic" || currentSection === "astro" || currentSection === "family" || currentSection === "career" || currentSection === "spiritual" || currentSection === "preference") {
        const currentValidation = sectionValidation[currentSection]
        if (!currentValidation.isValid) {
          // Block navigation - show error toast and stay on current section
          showToast({
            type: 'error',
            title: 'Validation Failed',
            message: currentSection === "preference" ? 'Please fix the validation errors before proceeding.' : 'Please fill all required fields before proceeding.',
            duration: 4000
          })
          setIsLoading(false)
          return
        }
      }

      // Get current section data and save it only if validation passes
      if (currentSection === "basic") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const basicData = getData()
            if (Object.keys(basicData).some(key => basicData[key] !== "" && basicData[key] !== 0 && (Array.isArray(basicData[key]) ? basicData[key].length > 0 : true))) {
              try {
                const response = await ProfileService.updateBasicInfo(basicData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Basic information saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, basic: basicData }))
                  markSectionComplete(currentSection)
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save basic information",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving basic info:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save basic information",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            }
          }
        }
      }

      if (currentSection === "astro") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const astroData = getData()
            if (Object.keys(astroData).some(key => astroData[key] !== "" && astroData[key] !== 0 && (Array.isArray(astroData[key]) ? astroData[key].length > 0 : true))) {
              try {
                const response = await ProfileService.updateAstroInfo(astroData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Astrological information saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, astro: astroData }))
                  markSectionComplete(currentSection)
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save astrological information",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving astro info:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save astrological information",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            }
          }
        }
      }

      if (currentSection === "family") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const familyData = getData()
            if (Object.keys(familyData).some(key => familyData[key] !== "" && familyData[key] !== 0 && (Array.isArray(familyData[key]) ? familyData[key].length > 0 : true))) {
              try {
                const response = await ProfileService.updateFamilyInfo(familyData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Family information saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, family: familyData }))
                  markSectionComplete(currentSection)
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save family information",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving family info:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save family information",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            }
          }
        }
      }

      if (currentSection === "career") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const careerData = getData()
            if (Object.keys(careerData).some(key => careerData[key] !== "" && careerData[key] !== 0 && (Array.isArray(careerData[key]) ? careerData[key].length > 0 : true))) {
              try {
                const response = await ProfileService.updateCareerInfo(careerData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Career information saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, career: careerData }))
                  markSectionComplete(currentSection)
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save career information",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving career info:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save career information",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            }
          }
        }
      }

      if (currentSection === "spiritual") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const spiritualData = getData()
            if (Object.keys(spiritualData).some(key => spiritualData[key] !== "" && spiritualData[key] !== 0 && (Array.isArray(spiritualData[key]) ? spiritualData[key].length > 0 : true))) {
              try {
                const response = await ProfileService.updateSpiritualInfo(spiritualData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Spiritual information saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, spiritual: spiritualData }))
                  markSectionComplete(currentSection)
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save spiritual information",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving spiritual info:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save spiritual information",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            }
          }
        }
      }

      if (currentSection === "preference") {
        const currentValidation = sectionValidation[currentSection]
        if (currentValidation.isValid) {
          const getData = dataGetters[currentSection]
          if (getData) {
            const preferenceData = getData()
            // For preferences, we save if there's any data (all fields are optional)
            if (Object.keys(preferenceData).some(key => {
              const value = preferenceData[key]
              if (Array.isArray(value)) {
                return value.length > 0
              }
              if (typeof value === 'string') {
                return value !== ""
              }
              if (typeof value === 'number') {
                return value !== 0 && value !== undefined
              }
              return value !== null && value !== undefined
            })) {
              try {
                const response = await ProfileService.updatePreferences(preferenceData)
                if (response.status === 'success') {
                  showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Preferences saved successfully!',
                    duration: 4000
                  })
                  setFormData(prev => ({ ...prev, preference: preferenceData }))
                  markSectionComplete(currentSection)
                  navigate("/personality")
                } else {
                  showToast({
                    type: 'error',
                    title: 'Save Failed',
                    message: response.error || "Failed to save preferences",
                    duration: 5000
                  })
                  setIsLoading(false)
                  return
                }
              } catch (error: any) {
                console.error("Error saving preferences:", error)
                showToast({
                  type: 'error',
                  title: 'Save Failed',
                  message: error.message || "Failed to save preferences",
                  duration: 5000
                })
                setIsLoading(false)
                return
              }
            } else {
              // Even if no data, mark as complete since preferences are optional
              markSectionComplete(currentSection)
              showToast({
                type: 'info',
                title: 'Section Completed',
                message: 'Preferences section completed (all fields are optional)',
                duration: 3000
              })
            }
          }
        }
      }
      
      const currentIndex = sections.indexOf(currentSection)
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1])
    }
  }

  const handleSkip = async () => {
    setIsLoading(true)
    
    try {
      // Skip validation and proceed to next section
      showToast({
        type: 'warning',
        title: 'Section Skipped',
        message: 'You can fill this information later.',
        duration: 3000
      })
      
      const currentIndex = sections.indexOf(currentSection)
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      [currentSection]: data,
    }))
    markSectionComplete(currentSection)
    handleNext()
  }

  const handleValidation = (isValid: boolean, errors: string[]) => {
    setSectionValidation((prev) => ({
      ...prev,
      [currentSection]: { isValid, errors },
    }))
  }

  const handleValidationTrigger = (triggerValidation: () => void) => {
    setValidationTriggers((prev) => ({
      ...prev,
      [currentSection]: triggerValidation,
    }))
  }

  const handleDataGetter = (getData: () => any) => {
    setDataGetters((prev) => ({
      ...prev,
      [currentSection]: getData,
    }))
  }

  const renderStep = () => {
    switch (currentSection) {
      case "basic":
        return <BasicInfoSection 
          initialData={formData.basic}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      case "astro":
        return <AstroSection 
          initialData={formData.astro}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      case "family":
        return <FamilyBackgroundSection 
          initialData={formData.family}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      case "career":
        return <CareerSection 
          initialData={formData.career}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      case "spiritual":
        return <SpiritualSection 
          initialData={formData.spiritual}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      case "preference":
        return <PreferenceSection 
          initialData={formData.preference}
          onSubmit={handleSubmit} 
          onValidate={handleValidation} 
          onValidationTrigger={handleValidationTrigger} 
          onDataGetter={handleDataGetter} 
        />
      default:
        return null
    }
  }

  const getSectionTitle = () => {
    const titles: Record<Section, string> = {
      basic: "Basic Information",
      astro: "Astrological Information",
      family: "Family Information",
      career: "Career Information",
      spiritual: "Spiritual Information",
      preference: "Partner Preferences",
    }
    return titles[currentSection]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        {/* Horizontal Tab Navigation */}
        <div className="max-w-[390px] mx-auto">
          <div className="w-full bg-white px-4 pt-2 border-b border-gray-200">
            <Tabs
              value={currentSection}
              onValueChange={(value) => setCurrentSection(value as Section)}
              className="w-full"
            >
              <TabsList 
                ref={tabsListRef}
                className="items-center rounded-lg text-muted-foreground flex w-full h-12 justify-start gap-2 p-0 bg-transparent overflow-x-auto scrollbar-hide"
              >
                <TabsTrigger
                  value="basic"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">🧑</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-orange">Basics</div>
                </TabsTrigger>
                <TabsTrigger
                  value="astro"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">🌕</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-variable-collection-1light-grey">Astro</div>
                </TabsTrigger>
                <TabsTrigger
                  value="family"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">👪</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-variable-collection-1light-grey">Family</div>
                </TabsTrigger>
                <TabsTrigger
                  value="career"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">💼</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-variable-collection-1light-grey">Career</div>
                </TabsTrigger>
                <TabsTrigger
                  value="spiritual"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">🪷</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-variable-collection-1light-grey">Spiritual</div>
                </TabsTrigger>
                <TabsTrigger
                  value="preference"
                  className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange"
                >
                  <div className="text-base leading-4 text-center">💟</div>
                  <div className="text-xs font-bold leading-4 text-center truncate text-variable-collection-1light-grey">Preferences</div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="max-w-[390px] mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{getSectionTitle()}</h2>
          </div>

          {renderStep()}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
              disabled={currentSection === "basic"}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              {currentSection !== "preference" && (
                <Button 
                  variant="ghost" 
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  Skip
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Validating...</span>
                  </div>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 