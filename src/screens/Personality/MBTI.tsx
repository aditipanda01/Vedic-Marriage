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

// Define data structure for personality traits
const personalityCategories = [
  {
    title: "Focus of Attention",
    options: [
      {
        emoji: "😄",
        title: "Extraversion",
        description: "Energized by social interactions.",
      },
      {
        emoji: "🤔",
        title: "Introversion",
        description: "Recharges in quiet settings.",
      },
    ],
  },
  {
    title: "Information Processing",
    options: [
      {
        emoji: "🌟",
        title: "Intuition",
        description: "Prefers patterns, possibilities, and big-picture thinking.",
      },
      {
        emoji: "🌿",
        title: "Sensing",
        description: "Focuses on facts, details, and tangible experiences.",
      },
    ],
  },
  {
    title: "Decision-Making",
    options: [
      {
        emoji: "🤔",
        title: "Thinking",
        description: "Values logic, objectivity, and structured reasoning.",
      },
      {
        emoji: "❤",
        title: "Feeling",
        description: "Prioritizes emotions, empathy, and personal impact.",
      },
    ],
  },
  {
    title: "Approach to the World",
    options: [
      {
        emoji: "⚖",
        title: "Judging",
        description: "Prefers structure, organization, and clear plans.",
      },
      {
        emoji: "🔍",
        title: "Perceiving",
        description: "Adaptable, spontaneous, and open to change.",
      },
    ],
  },
]

export function MBTI() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.characterize_your_personality) {
      const existingData = user.lifestyle_personality.characterize_your_personality
      const prePopulatedOptions: Record<string, string> = {}
      
      // Map the existing data to the correct format
      if (existingData.attention_focus) {
        // Map backend values to frontend values
        const frontendValue = existingData.attention_focus === 'Extravert' ? 'Extraversion' : 'Introversion'
        prePopulatedOptions["Focus of Attention"] = `Focus of Attention-${frontendValue}`
      }
      if (existingData.information_processing) {
        // Map backend values to frontend values (they're the same for this one)
        prePopulatedOptions["Information Processing"] = `Information Processing-${existingData.information_processing}`
      }
      if (existingData.decision_making) {
        // Map backend values to frontend values (they're the same for this one)
        prePopulatedOptions["Decision-Making"] = `Decision-Making-${existingData.decision_making}`
      }
      if (existingData.situation_approach) {
        // Map backend values to frontend values (they're the same for this one)
        prePopulatedOptions["Approach to the World"] = `Approach to the World-${existingData.situation_approach}`
      }
      
      setSelectedOptions(prePopulatedOptions)
      console.log('MBTI - Pre-populating with existing data:', existingData)
      console.log('MBTI - Pre-populated options:', prePopulatedOptions)
    }
  }, [user])

  const handleOptionSelect = (category: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleContinue = async () => {
    // Check if all categories have been selected
    const allCategoriesSelected = personalityCategories.every(
      category => selectedOptions[category.title]
    )
    
    if (allCategoriesSelected) {
      setIsLoading(true)
      try {
        // Prepare MBTI data
        const mbtiData = {
          mbti_type: Object.values(selectedOptions).join(''),
          traits: Object.values(selectedOptions),
          description: `MBTI Type: ${Object.values(selectedOptions).join('')}`
        }
        
        const result = await PersonalityService.saveMBTITraits(mbtiData)
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/personality/personal-value")
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

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-8">
          {/* Question header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">
                🧗
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                Define Your Personality
              </div>
            </div>
          </div>

          {/* Personality Categories */}
          <div className="flex flex-col w-full gap-6">
            {personalityCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="flex flex-col w-full gap-4">
                <div className="flex items-center gap-2 py-4 w-full rounded-lg">
                  <h2 className="font-bold text-[#b8b4c4] text-xl">
                    {category.title}
                  </h2>
                </div>

                <RadioGroup 
                  className="flex flex-col gap-4 w-full"
                  value={selectedOptions[category.title]}
                  onValueChange={(value) => handleOptionSelect(category.title, value)}
                >
                  {category.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="pl-4 pr-0 py-2 w-full bg-[#f3f6fd] rounded-lg flex h-14 items-center gap-2"
                    >
                      <div className="flex flex-col items-start gap-1 flex-1">
                        <Label className="font-bold text-black text-sm">
                          {option.emoji} {option.title}
                        </Label>
                        <p className="font-medium text-[#b8b4c4] text-[10px]">
                          {option.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center justify-center p-3">
                        <RadioGroupItem
                          value={`${category.title}-${option.title}`}
                          id={`${category.title}-${option.title}`}
                          className="h-4 w-4 rounded-lg border-2 border-solid border-[#b1b1b1]"
                        />
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
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
          disabled: !personalityCategories.every(category => selectedOptions[category.title]) || isLoading,
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