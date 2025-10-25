"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, Camera } from "lucide-react"

interface SelfiePreviewProps {
  imageUrl: string
  onRetake: () => void
  onContinue: () => void
}

export function SelfiePreview({ imageUrl, onRetake, onContinue }: SelfiePreviewProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen w-full max-w-[390px] mx-auto bg-white flex flex-col">
      {/* Header section */}
      <Header />

      {/* Main content area */}
      <div className="flex-1 w-full px-4 py-6 flex flex-col gap-4">
        {/* Question header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-12">
            <div className="text-2xl">
              📸
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-bold text-[#b8b4c4] text-xs">
              Review Selfie
            </div>
            <div className="font-medium text-black text-sm">
              Check your photo before continuing
            </div>
          </div>
        </div>

        {/* Preview section */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-black">
              <img
                src={imageUrl}
                alt="Captured selfie"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Guidelines section */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-2">Make sure your selfie:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Shows your face clearly</li>
                <li>Has good lighting</li>
                <li>Has no filters or effects</li>
                <li>Matches your profile photos</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer navigation */}
      <div className="w-full px-6 py-4 bg-white border-t border-gray-100 shadow-[0px_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1 h-10 bg-background-color rounded-full flex items-center justify-center gap-2"
            onClick={handleBack}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-bold text-gray-500 text-sm">
              Back
            </span>
          </Button>

          <div className="flex gap-2">
            <Button 
              className="h-10 bg-gray-200 rounded-full flex items-center justify-center px-4 hover:bg-gray-300"
              onClick={onRetake}
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </Button>

            <Button 
              className="flex-1 h-10 bg-[#ed6129] rounded-full flex items-center justify-center"
              onClick={onContinue}
            >
              <span className="font-bold text-white text-sm">
                Continue
              </span>
              <div className="ml-2 p-1.5 rounded-full bg-[#ed6129]">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 