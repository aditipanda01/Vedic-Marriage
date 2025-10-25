"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { useNavigate } from "react-router-dom"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import ProfileProgressBar from "@/common/components/ui/ProfileProgressBar"
// import personalityintro from "@/assets/images/img/personality-intro.png"
export function PersonalityIntro() {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate("/personality/about-me")
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-background-color mx-auto overflow-hidden">
      <Header />
      <ProfileProgressBar variant="card" />
      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6">
         
          <Card className="p-6 rounded-2xl bg-white">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold text-black mb-4">
                Personality & Lifestyle
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Help us understand your personality better by answering a few questions about yourself.
                This will help us find your perfect match.
              </p>
              {/* <div className="w-full max-w-[280px] h-[200px] relative mb-6">
                <img
                  src={personalityintro}
                  alt="Personality & Lifestyle"
                  className="w-full h-full object-contain"
                />
              </div> */}
              <p className="text-sm text-gray-600">
                Your answers will be used to match you with compatible partners who share similar values and lifestyle preferences.
              </p>
            </div>
          </Card>
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
          text: "Continue",
          onClick: handleContinue,
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}

      />
    </div>
  )
} 