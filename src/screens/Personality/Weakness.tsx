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

// Data for weakness options
const weaknessOptions = [
  { emoji: "⏳", label: "Impatience" },
  { emoji: "💤", label: "Procrastination" },
  { emoji: "⏰", label: "Punctuality" },
  { emoji: "🤐", label: "Shyness" },
  { emoji: "🔄", label: "Inflexibility" },
  { emoji: "📂", label: "Disorganized" },
  { emoji: "🤯", label: "Forgetful" },
]

export function Weakness() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedWeaknesses, setSelectedWeaknesses] = useState<Record<string, boolean>>({})
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store and localStorage
  useEffect(() => {
    // Load strengths from localStorage first
    const savedStrengths = localStorage.getItem('selectedStrengths')
    if (savedStrengths) {
      setSelectedStrengths(JSON.parse(savedStrengths))
    }

    // Pre-populate weaknesses from Redux store
    if (user?.lifestyle_personality?.weaknesses) {
      const existingWeaknesses = user.lifestyle_personality.weaknesses
      const prePopulatedWeaknesses: Record<string, boolean> = {}
      
      // Map the existing data to the frontend format
      existingWeaknesses.forEach((weakness: string) => {
        // Map backend values to frontend labels
        let frontendLabel = weakness
        switch (weakness) {
          case 'Impatience':
            frontendLabel = 'Impatience'
            break
          case 'Procrastination':
            frontendLabel = 'Procrastination'
            break
          case 'Punctuality':
            frontendLabel = 'Punctuality'
            break
          case 'Shy':
            frontendLabel = 'Shyness'
            break
          case 'Inflexible':
            frontendLabel = 'Inflexibility'
            break
          case 'Disorganized':
            frontendLabel = 'Disorganized'
            break
          case 'Forgetful':
            frontendLabel = 'Forgetful'
            break
          default:
            frontendLabel = weakness
        }
        
        prePopulatedWeaknesses[frontendLabel] = true
      })
      
      setSelectedWeaknesses(prePopulatedWeaknesses)
      console.log('Weakness - Pre-populating with existing data:', existingWeaknesses)
      console.log('Weakness - Pre-populated weaknesses:', prePopulatedWeaknesses)
    }
  }, [user])

  const handleWeaknessToggle = (label: string) => {
    setSelectedWeaknesses(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleContinue = async () => {
    // Get selected weaknesses as an array
    const selectedWeaknessesArray = Object.keys(selectedWeaknesses).filter(key => selectedWeaknesses[key])
    
    if (selectedWeaknessesArray.length > 0) {
      setIsLoading(true)
      try {
        // Prepare strengths and weaknesses data
        const strengthsWeaknessesData = {
          strengths: selectedStrengths,
          weaknesses: selectedWeaknessesArray,
          areas_of_improvement: selectedWeaknessesArray // Using weaknesses as areas of improvement
        }
        
        const result = await PersonalityService.saveStrengthsWeaknesses(strengthsWeaknessesData)
        if (result.status === 'success') {
          toast.success(result.message)
          // Clear localStorage after successful save
          localStorage.removeItem('selectedStrengths')
          navigate("/personality/hobby")
        } else {
          toast.error(result.error || result.message)
        }
      } catch (error) {
        toast.error("Failed to save data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error("Please select at least one weakness.")
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
                What challenges do you face?(weakness)
              </div>
            </div>
          </div>

          {/* Weakness options */}
          <div className="flex flex-col w-full items-start gap-4">
            {weaknessOptions.map((option, index) => (
              <Card
                key={index}
                className="flex h-12 items-center w-full bg-[#f3f6fd] rounded-lg border-none shadow-none"
              >
                <CardContent className="flex items-center justify-between p-0 w-full">
                  <div className="flex flex-col items-start gap-1 pl-4 py-2">
                    <span className="font-semibold text-black text-sm">
                      {option.emoji} {option.label}
                    </span>
                  </div>
                  <div className="p-3">
                    <Checkbox
                      checked={selectedWeaknesses[option.label] || false}
                      onCheckedChange={() => handleWeaknessToggle(option.label)}
                      className="h-3.5 w-3.5 rounded-[3px] border-2 border-solid border-neutral-light-n40 bg-neutral-light-n10"
                    />
                  </div>
                </CardContent>
              </Card>
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
          disabled: Object.keys(selectedWeaknesses).filter(key => selectedWeaknesses[key]).length === 0 || isLoading,
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