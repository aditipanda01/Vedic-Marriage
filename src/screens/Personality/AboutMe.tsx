import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { PersonalityService } from "@/services/personalityService"
import { toast } from "sonner"

export function AboutMe() {
  const navigate = useNavigate()
  
  // Redux integration - get user data from store
  const { user } = useSelector((state: RootState) => state.auth)
  
  const [aboutMe, setAboutMe] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Pre-populate form data from Redux store
  useEffect(() => {
    if (user?.lifestyle_personality?.about_me) {
      setAboutMe(user.lifestyle_personality.about_me)
      console.log('AboutMe - Pre-populating with existing data:', user.lifestyle_personality.about_me)
    }
  }, [user])

  const handleContinue = async () => {
    if (aboutMe.trim().length > 0) {
      setIsLoading(true)
      try {
        const result = await PersonalityService.saveAboutMe({ about_me: aboutMe.trim() })
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/personality/diet")
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

  const handleHelpClick = () => {
    navigate("/personality/about-me/helper")
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-6">
          {/* Question header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">
                😎
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Personality Questions
              </div>
              <div className="font-medium text-black text-sm">
                Write About Yourself
              </div>
            </div>
          </div>

          {/* Textarea for answer */}
          <Card className="flex-1 bg-[#f3f6fd] border-grey-shadesmedium-grey">
            <CardContent className="h-full p-0">
              <Textarea
                className="w-full h-full min-h-[280px] border-none bg-transparent resize-none p-4 font-medium text-[#b8b4c4] text-sm text-justify"
                placeholder="Write your answer here"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Help section */}
          <div 
            className="flex items-center justify-between px-2 py-2 cursor-pointer"
            onClick={handleHelpClick}
          >
            <div className="flex flex-col gap-1">
              <div className="font-bold text-gray-500 text-xs">
                Not sure what to write?
              </div>
              <div className="opacity-70 font-medium text-[#ed6129] text-sm">
                Tap here to know more.
              </div>
            </div>
            <div className="p-2">
              <ChevronRightIcon className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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
          disabled: aboutMe.trim().length === 0 || isLoading,
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