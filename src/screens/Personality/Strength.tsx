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

// Data for strength options
const strengthOptions = [
  { icon: "⭐", label: "Leadership" },
  { icon: "❤", label: "Empathy" },
  { icon: "🎨", label: "Creativity" },
  { icon: "🔍", label: "Attention to Detail" },
  { icon: "🌿", label: "Emotional Sensitivity" },
  { icon: "⚖", label: "Work-Life Balance" },
  { icon: "🗣", label: "Communication" },
]

export function Strength() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedStrengths, setSelectedStrengths] = useState<Record<string, boolean>>({})

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.strengths) {
      const existingStrengths = user.lifestyle_personality.strengths
      const prePopulatedStrengths: Record<string, boolean> = {}
      
      // Map the existing data to the frontend format
      existingStrengths.forEach((strength: string) => {
        // Map backend values to frontend labels
        let frontendLabel = strength
        switch (strength) {
          case 'Leadership':
            frontendLabel = 'Leadership'
            break
          case 'Empathy':
            frontendLabel = 'Empathy'
            break
          case 'Creativity':
            frontendLabel = 'Creativity'
            break
          case 'Attention to detail':
            frontendLabel = 'Attention to Detail'
            break
          case 'Emotional sensitivity':
            frontendLabel = 'Emotional Sensitivity'
            break
          case 'Work-life balance':
            frontendLabel = 'Work-Life Balance'
            break
          case 'Communication':
            frontendLabel = 'Communication'
            break
          default:
            frontendLabel = strength
        }
        
        prePopulatedStrengths[frontendLabel] = true
      })
      
      setSelectedStrengths(prePopulatedStrengths)
      console.log('Strength - Pre-populating with existing data:', existingStrengths)
      console.log('Strength - Pre-populated strengths:', prePopulatedStrengths)
    }
  }, [user])

  const handleStrengthToggle = (label: string) => {
    setSelectedStrengths(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleContinue = () => {
    // Get selected strengths as an array
    const selectedStrengthsArray = Object.keys(selectedStrengths).filter(key => selectedStrengths[key])
    
    if (selectedStrengthsArray.length > 0) {
      // Save strengths to localStorage for the Weakness component
      localStorage.setItem('selectedStrengths', JSON.stringify(selectedStrengthsArray))
      // Navigate to the weakness screen
      navigate("/personality/weakness")
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
                💪
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                What are your key strengths?
              </div>
            </div>
          </div>

          {/* Strength options */}
          <div className="flex flex-col w-full items-start gap-4">
            {strengthOptions.map((option, index) => (
              <Card
                key={index}
                className="flex h-12 items-center w-full bg-[#f3f6fd] rounded-lg border-none shadow-none"
              >
                <CardContent className="flex items-center justify-between p-0 w-full">
                  <div className="flex flex-col items-start gap-1 pl-4 py-2">
                    <span className="font-semibold text-black text-sm">
                      {option.icon} {option.label}
                    </span>
                  </div>
                  <div className="p-3">
                    <Checkbox
                      checked={selectedStrengths[option.label] || false}
                      onCheckedChange={() => handleStrengthToggle(option.label)}
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
          text: "Next",
          onClick: handleContinue,
          disabled: Object.keys(selectedStrengths).filter(key => selectedStrengths[key]).length === 0,
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 