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

// Data for genre options
const genreOptions = [
  { emoji: "🎬", label: "Action" },
  { emoji: "😂", label: "Comedy" },
  { emoji: "🪷", label: "Spiritual & Philosophical" },
  { emoji: "🌟", label: "Inspirational" },
  { emoji: "🎭", label: "Drama" },
  { emoji: "🔥", label: "Thriller/Suspense" },
  { emoji: "👻", label: "Horror" },
  { emoji: "🚀", label: "Sci-Fi" },
  { emoji: "🏰", label: "Fantasy" },
  { emoji: "❤", label: "Romance" },
  { emoji: "🐭", label: "Animation" },
  { emoji: "🎥", label: "Documentary" },
]

export function HobbyGonra() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>({})
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store and localStorage
  useEffect(() => {
    // Load hobbies from localStorage first
    const savedHobbies = localStorage.getItem('selectedHobbies')
    console.log('Saved hobbies from localStorage:', savedHobbies)
    if (savedHobbies) {
      const parsedHobbies = JSON.parse(savedHobbies)
      console.log('Parsed hobbies:', parsedHobbies)
      setSelectedHobbies(parsedHobbies)
    }

    // Pre-populate genres from Redux store
    if (user?.lifestyle_personality?.preferred_genres) {
      const existingGenres = user.lifestyle_personality.preferred_genres
      const prePopulatedGenres: Record<string, boolean> = {}
      
      // Map the existing data to the frontend format
      existingGenres.forEach((genre: string) => {
        // Map backend values to frontend labels
        let frontendLabel = genre
        switch (genre) {
          case 'Action':
            frontendLabel = 'Action'
            break
          case 'Comedy':
            frontendLabel = 'Comedy'
            break
          case 'Spiritual and Philosophical':
            frontendLabel = 'Spiritual & Philosophical'
            break
          case 'Inspirational':
            frontendLabel = 'Inspirational'
            break
          case 'Drama':
            frontendLabel = 'Drama'
            break
          case 'Thriller/Suspense':
            frontendLabel = 'Thriller/Suspense'
            break
          case 'Horror':
            frontendLabel = 'Horror'
            break
          case 'Science Fiction':
            frontendLabel = 'Sci-Fi'
            break
          case 'Fantasy':
            frontendLabel = 'Fantasy'
            break
          case 'Romance':
            frontendLabel = 'Romance'
            break
          case 'Animation':
            frontendLabel = 'Animation'
            break
          case 'Documentary':
            frontendLabel = 'Documentary'
            break
          case 'Others':
            frontendLabel = 'Other'
            break
          default:
            frontendLabel = genre
        }
        
        prePopulatedGenres[frontendLabel] = true
      })
      
      setSelectedGenres(prePopulatedGenres)
      console.log('HobbyGonra - Pre-populating with existing data:', existingGenres)
      console.log('HobbyGonra - Pre-populated genres:', prePopulatedGenres)
    }
  }, [user])

  const handleGenreToggle = (label: string) => {
    setSelectedGenres(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const handleContinue = async () => {
    // Get selected genres as an array
    const selectedGenresArray = Object.keys(selectedGenres).filter(key => selectedGenres[key])
    
    console.log('Selected hobbies state:', selectedHobbies)
    console.log('Selected genres array:', selectedGenresArray)
    
    if (selectedGenresArray.length > 0) {
      setIsLoading(true)
      try {
        // Prepare activities and genres data with both hobbies and genres
        const activitiesGenresData = {
          free_time_activities: selectedHobbies,
          preferred_genres: selectedGenresArray,
          interests: selectedGenresArray // Using genres as interests for now
        }
        
        console.log('Sending data to API:', activitiesGenresData)
        
        const result = await PersonalityService.saveActivitiesGenres(activitiesGenresData)
        if (result.status === 'success') {
          toast.success(result.message)
          // Clear localStorage after successful save
          localStorage.removeItem('selectedHobbies')
          navigate("/personality/social-comfort")
        } else {
          toast.error(result.error || result.message)
        }
      } catch (error) {
        toast.error("Failed to save data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error("Please select at least one genre.")
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
                For the hobbies you have selected, what genres do you prefer?
              </div>
            </div>
          </div>

          {/* Genre options */}
          <div className="flex flex-col w-full items-start gap-4">
            {genreOptions.map((option, index) => (
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
                      checked={selectedGenres[option.label] || false}
                      onCheckedChange={() => handleGenreToggle(option.label)}
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
          disabled: Object.keys(selectedGenres).filter(key => selectedGenres[key]).length === 0 || isLoading,
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