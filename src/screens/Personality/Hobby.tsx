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
import { toast } from "sonner"

// Data for hobby options
const hobbyOptions = [
  { emoji: "🎨", label: "Creative Arts" },
  { emoji: "🏃", label: "Physical Activities" },
  { emoji: "📖", label: "Reading & Writing" },
  { emoji: "🎶", label: "Music & Performing Arts" },
  { emoji: "🍳", label: "Cooking & Baking" },
  { emoji: "🌿", label: "Gardening & Nature" },
  { emoji: "🏆", label: "Collecting" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🔨", label: "DIY & Home Projects" },
  { emoji: "✈", label: "Travel & Exploration" },
  { emoji: "🤲", label: "Volunteering" },
  { emoji: "💻", label: "Tech & Gadgets" },
  { emoji: "📚", label: "Learning" },
  { emoji: "🧩", label: "Puzzles & Brain Teasers" },
  { emoji: "🧘", label: "Spirituality & Mindfulness" },
  { emoji: "❓", label: "Other" },
]

export function Hobby() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedHobbies, setSelectedHobbies] = useState<Record<string, boolean>>({})

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.free_time_activities) {
      const existingActivities = user.lifestyle_personality.free_time_activities
      const prePopulatedHobbies: Record<string, boolean> = {}
      
      // Map the existing data to the frontend format
      existingActivities.forEach((activity: string) => {
        // Map backend values to frontend labels
        let frontendLabel = activity
        switch (activity) {
          case 'Creative Arts':
            frontendLabel = 'Creative Arts'
            break
          case 'Physical Activities':
            frontendLabel = 'Physical Activities'
            break
          case 'Reading and Writing':
            frontendLabel = 'Reading & Writing'
            break
          case 'Music and Performing Arts':
            frontendLabel = 'Music & Performing Arts'
            break
          case 'Cooking and Baking':
            frontendLabel = 'Cooking & Baking'
            break
          case 'Gardening and Nature':
            frontendLabel = 'Gardening & Nature'
            break
          case 'Collecting':
            frontendLabel = 'Collecting'
            break
          case 'Gaming and Video Games':
            frontendLabel = 'Gaming'
            break
          case 'DIY and Home Improvement':
            frontendLabel = 'DIY & Home Projects'
            break
          case 'Travel and Exploration':
            frontendLabel = 'Travel & Exploration'
            break
          case 'Volunteering and Community Service':
            frontendLabel = 'Volunteering'
            break
          case 'Technology and Gadgets':
            frontendLabel = 'Tech & Gadgets'
            break
          case 'Learning and Education':
            frontendLabel = 'Learning'
            break
          case 'Puzzles and Brain Teasers':
            frontendLabel = 'Puzzles & Brain Teasers'
            break
          case 'Spirituality and Mindfulness':
            frontendLabel = 'Spirituality & Mindfulness'
            break
          case 'Other':
            frontendLabel = 'Other'
            break
          default:
            frontendLabel = activity
        }
        
        prePopulatedHobbies[frontendLabel] = true
      })
      
      setSelectedHobbies(prePopulatedHobbies)
      console.log('Hobby - Pre-populating with existing data:', existingActivities)
      console.log('Hobby - Pre-populated hobbies:', prePopulatedHobbies)
    }
  }, [user])

  const handleHobbyToggle = (label: string) => {
    setSelectedHobbies(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleContinue = async () => {
    // Get selected hobbies as an array
    const selectedHobbiesArray = Object.keys(selectedHobbies).filter(key => selectedHobbies[key])
    
    if (selectedHobbiesArray.length > 0) {
      // Save hobbies to localStorage for the HobbyGonra component
      localStorage.setItem('selectedHobbies', JSON.stringify(selectedHobbiesArray))
      // Navigate to the next screen
      navigate("/personality/hobby-gonra")
    } else {
      toast.error("Please select at least one hobby.")
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
                How do you enjoy your free time?
              </div>
            </div>
          </div>

          {/* Hobby options */}
          <div className="flex flex-col w-full items-start gap-4">
            {hobbyOptions.map((option, index) => (
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
                      checked={selectedHobbies[option.label] || false}
                      onCheckedChange={() => handleHobbyToggle(option.label)}
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
          disabled: Object.keys(selectedHobbies).filter(key => selectedHobbies[key]).length === 0,
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 