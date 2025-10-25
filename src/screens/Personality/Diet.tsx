"use client"

import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { PersonalityService } from "@/services/personalityService"
import { toast } from "sonner"

// Diet options data for mapping
const dietOptions = [
  {
    emoji: "🍛",
    label: "Strictly Krishna Prasadam",
    value: "krishna-prasadam",
  },
  {
    emoji: "🌿",
    label: "Veg & Krsna Prasadam",
    subLabel: "(Occasional)",
    value: "veg-krishna-occasional",
  },
  { emoji: "🥦", label: "Jain", value: "jain" },
  { emoji: "🥗", label: "Strictly Vegetarian", value: "strictly-vegetarian" },
  {
    emoji: "🧄",
    label: "Veg with Onion & Garlic",
    value: "veg-with-onion-garlic",
  },
  { emoji: "🍳", label: "Eggetarian", value: "eggetarian" },
  { emoji: "🍗", label: "Non-Veg", value: "non-veg" },
]

export function Diet() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.diet) {
      setSelectedOption(user.lifestyle_personality.diet)
      console.log('Diet - Pre-populating with existing data:', user.lifestyle_personality.diet)
    }
  }, [user])

  const handleContinue = async () => {
    if (selectedOption) {
      setIsLoading(true)
      try {
        const result = await PersonalityService.saveDiet({ diet: selectedOption })
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/personality/mbti")
        } else {
          toast.error(result.error || result.message)
        }
      } catch (error) {
        toast.error("Failed to save data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleCardClick = (value: string) => {
    setSelectedOption(value)
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
                🍽
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                Diet
              </div>
            </div>
          </div>

          {/* Diet options */}
          <RadioGroup 
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="w-full space-y-4"
          >
            {dietOptions.map((option, index) => (
              <Card
                key={index}
                className={`rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedOption === option.value
                    ? "bg-[#ed6129]/10 border-[#ed6129]"
                    : "bg-[#f3f6fd] border-transparent hover:bg-[#f3f6fd]/80"
                }`}
                onClick={() => handleCardClick(option.value)}
              >
                <CardContent className="flex items-center justify-between p-0">
                  <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-2 w-full">
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className={`font-semibold text-sm leading-4 ${
                        selectedOption === option.value ? "text-[#ed6129]" : "text-black"
                      }`}>
                        {option.emoji} {option.label}
                        {option.subLabel && (
                          <span className={`text-xs leading-[13px] ${
                            selectedOption === option.value ? "text-[#ed6129]/70" : "text-gray-600"
                          }`}>
                            {option.subLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="inline-flex items-center justify-center p-3">
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className={`w-4 h-4 border-2 rounded-lg transition-all duration-200 ${
                          selectedOption === option.value
                            ? "border-[#ed6129] bg-[#ed6129]"
                            : "border-[#b1b1b1] hover:border-[#ed6129]/50"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
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