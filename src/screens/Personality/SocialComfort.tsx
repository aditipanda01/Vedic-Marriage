"use client"

import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PersonalityService } from "@/services/personalityService"
import { toast } from "sonner"

// Data for social comfort options
const socialComfortOptions = [
  { value: "very_comfortable", label: "Very Comfortable", description: "I enjoy being the center of attention" },
  { value: "comfortable", label: "Comfortable", description: "I'm at ease in social situations" },
  { value: "neutral", label: "Neutral", description: "I'm okay with social gatherings" },
  { value: "uncomfortable", label: "Uncomfortable", description: "I prefer smaller groups" },
  { value: "very_uncomfortable", label: "Very Uncomfortable", description: "I prefer to avoid social gatherings" },
]

export function SocialComfort() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.social_gathering_comfort) {
      const existingComfort = user.lifestyle_personality.social_gathering_comfort
      let frontendValue = ""
      
      // Map backend values to frontend values
      switch (existingComfort) {
        case 'Extremely Comfortable: Life of the party':
          frontendValue = 'very_comfortable'
          break
        case 'Very Comfortable: Enjoys socializing':
          frontendValue = 'very_comfortable'
          break
        case 'Comfortable: Likes social events':
          frontendValue = 'comfortable'
          break
        case 'Neutral: Flexible, depends on the situation':
          frontendValue = 'neutral'
          break
        case 'Slightly Uncomfortable: Prefers smaller gatherings':
          frontendValue = 'uncomfortable'
          break
        case 'Uncomfortable: Introverted but open to socializing':
          frontendValue = 'uncomfortable'
          break
        case 'Very Uncomfortable: Prefers one-on-one interactions':
          frontendValue = 'very_uncomfortable'
          break
        case 'Extremely Uncomfortable: Very reserved, avoids large social gatherings whenever possible':
          frontendValue = 'very_uncomfortable'
          break
        default:
          frontendValue = existingComfort
      }
      
      setSelectedOption(frontendValue)
      console.log('SocialComfort - Pre-populating with existing data:', existingComfort)
      console.log('SocialComfort - Mapped to frontend value:', frontendValue)
    }
  }, [user])

  const handleCardClick = (value: string) => {
    setSelectedOption(value)
  }

  const handleContinue = async () => {
    if (selectedOption) {
      setIsLoading(true)
      try {
        // Prepare social comfort data
        const socialComfortData = {
          social_gathering_comfort: selectedOption,
          social_preferences: [selectedOption], // Using the selected option as a preference
          comfort_level: selectedOption // Using the selected option as comfort level
        }
        
        const result = await PersonalityService.saveSocialComfort(socialComfortData)
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/personality/voice-intro")
        } else {
          toast.error(result.error || result.message)
        }
      } catch (error) {
        toast.error("Failed to save data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error("Please select a social comfort level.")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          {/* Question header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">
                🎯
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                Are you more comfortable in social gatherings?
              </div>
            </div>
          </div>

          {/* Social comfort options */}
          <div className="flex flex-col w-full items-start gap-4">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="w-full space-y-4"
            >
              {socialComfortOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`flex items-center w-full bg-[#f3f6fd] rounded-lg border-none shadow-none cursor-pointer transition-all duration-200 hover:bg-[#e8eef7] ${
                    selectedOption === option.value ? 'ring-2 ring-[#ed6129] bg-[#e8eef7]' : ''
                  }`}
                  onClick={() => handleCardClick(option.value)}
                >
                  <CardContent className="flex items-center justify-between p-4 w-full">
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <Label
                        htmlFor={option.value}
                        className="font-semibold text-black text-sm cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <span className="text-gray-500 text-xs">
                        {option.description}
                      </span>
                    </div>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="h-4 w-4 border-2 border-[#ed6129]"
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: handleBack,
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: isLoading ? "Saving..." : "Next",
          onClick: handleContinue,
          disabled: !selectedOption || isLoading,
          loading: isLoading,
          loadingText: "Saving...",
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 