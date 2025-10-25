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
import { Checkbox } from "@/components/ui/checkbox"
import { PersonalityService } from "@/services/personalityService"
import { toast } from "sonner"

// Define the values data for mapping
const valueOptions = [
  { emoji: "🌱", label: "Personal Growth" },
  { emoji: "👨", label: "Family & Relationships" },
  { emoji: "🚀", label: "Career & Ambition" },
  { emoji: "❤", label: "Helping Others" },
  { emoji: "🌍", label: "Adventure & Exploration" },
  { emoji: "🎨", label: "Creativity & Expression" },
  { emoji: "🧘", label: "Spirituality & Inner Peace" },
  { emoji: "🏋", label: "Health & Well-Being" },
]

export function PersonalValue() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.core_values_or_motivates_inspires) {
      const existingValues = user.lifestyle_personality.core_values_or_motivates_inspires
      const prePopulatedValues: Record<string, boolean> = {}
      
      // Map the existing data to the frontend format
      existingValues.forEach((value: string) => {
        // Map backend values to frontend labels
        let frontendLabel = value
        switch (value) {
          case 'Family and Relationships':
            frontendLabel = 'Family & Relationships'
            break
          case 'Career and Ambition':
            frontendLabel = 'Career & Ambition'
            break
          case 'Adventure and Exploration':
            frontendLabel = 'Adventure & Exploration'
            break
          case 'Creativity and Expression':
            frontendLabel = 'Creativity & Expression'
            break
          case 'Spirituality and Inner Peace':
            frontendLabel = 'Spirituality & Inner Peace'
            break
          case 'Health and Well-Being':
            frontendLabel = 'Health & Well-Being'
            break
          default:
            frontendLabel = value
        }
        
        prePopulatedValues[frontendLabel] = true
      })
      
      setSelectedValues(prePopulatedValues)
      console.log('PersonalValue - Pre-populating with existing data:', existingValues)
      console.log('PersonalValue - Pre-populated values:', prePopulatedValues)
    }
  }, [user])

  const handleValueToggle = (label: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleContinue = async () => {
    // Get selected values as an array
    const selectedValuesArray = Object.keys(selectedValues).filter(key => selectedValues[key])
    
    if (selectedValuesArray.length > 0) {
      setIsLoading(true)
      try {
        // Prepare core values data
        const coreValuesData = {
          core_values: selectedValuesArray,
          motivations: selectedValuesArray, // Using same values as motivations for now
          principles: selectedValuesArray // Using same values as principles for now
        }
        
        const result = await PersonalityService.saveCoreValues(coreValuesData)
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/personality/strength")
        } else {
          toast.error(result.error || result.message)
        }
      } catch (error) {
        toast.error("Failed to save data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error("Please select at least one personal value.")
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
                💫
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                What are your personal values?
              </div>
            </div>
          </div>

          {/* Value options */}
          {valueOptions.map((option, index) => (
            <Card
              key={index}
              className="w-full bg-[#f3f6fd] rounded-lg border-0 shadow-none"
            >
              <CardContent className="flex items-center justify-between p-0">
                <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-2 w-full">
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <div className="font-semibold text-black text-sm">
                      {option.emoji} {option.label}
                    </div>
                  </div>
                  <div className="p-3">
                    <Checkbox
                      checked={selectedValues[option.label] || false}
                      onCheckedChange={() => handleValueToggle(option.label)}
                      className="h-3.5 w-3.5 rounded-[3px] border-2 border-solid border-neutral-light-n40 bg-neutral-light-n10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          disabled: Object.keys(selectedValues).filter(key => selectedValues[key]).length === 0 || isLoading,
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