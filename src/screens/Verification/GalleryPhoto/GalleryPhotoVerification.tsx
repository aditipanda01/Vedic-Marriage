"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, Upload } from "lucide-react"
import { PhotoPreview } from "./PhotoPreview"
import { PhotoSuccess } from "./PhotoSuccess"
import { ProfileService } from "@/services/profileService"
import { useToast } from "@/common/components/ui/toast/ToastContainer"

type Screen = "upload" | "preview" | "success"

export function GalleryPhotoVerification() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<Screen>("upload")
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { showToast } = useToast()

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedPhotos(Array.from(files))
      setCurrentScreen("preview")
    }
  }

  const handleAddMorePhotos = (newFiles: File[]) => {
    setSelectedPhotos(prev => [...prev, ...newFiles])
  }

  const handleDeletePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index))
    if (selectedPhotos.length === 1) {
      setCurrentScreen("upload")
    }
  }

  const handleContinue = async () => {
    if (selectedPhotos.length === 0) {
      showToast({
        type: 'error',
        title: 'No photos selected',
        message: 'Please select at least one photo to continue.',
      })
      return
    }

    setIsUploading(true)

    try {
      // Upload gallery photos
      const result = await ProfileService.uploadGalleryPhotos(selectedPhotos)
      if (result.status === 'error') {
        throw new Error(result.error || 'Upload failed')
      }

      // Upload successful, show success screen
      setCurrentScreen("success")
      
    } catch (error: any) {
      console.error('Gallery upload error:', error)
      showToast({
        type: 'error',
        title: 'Upload failed',
        message: error.message,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleBack = () => {
    if (currentScreen === "preview") {
      setCurrentScreen("upload")
    } else {
      navigate(-1)
    }
  }

  if (currentScreen === "success") {
    return <PhotoSuccess />
  }

  if (currentScreen === "preview") {
    return (
      <PhotoPreview
        photos={selectedPhotos}
        onDelete={handleDeletePhoto}
        onContinue={handleContinue}
        onAddMore={handleAddMorePhotos}
        isUploading={isUploading}
      />
    )
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      {/* Header section */}
      <Header />

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          {/* Question header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">
                📸
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Photo Verification
              </div>
              <div className="font-medium text-black text-sm">
                Upload your gallery photos
              </div>
            </div>
          </div>

          {/* Upload section */}
          <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">
                    Select 3-5 photos of yourself
                  </div>
                </div>

                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="w-32 h-32 border-2 border-dashed border-[#ed6129] rounded-lg flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#ed6129]" />
                    <span className="text-sm text-[#ed6129]">Upload Photos</span>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>

                <div className="text-sm text-gray-500 text-center">
                  You can select multiple photos at once
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines section */}
          <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Photo Guidelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Clear, well-lit photos</li>
                  <li>Recent photos (within last 6 months)</li>
                  <li>Show your face clearly</li>
                  <li>No group photos</li>
                  <li>No filters or heavy editing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
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
          text: isUploading ? 'Uploading...' : 'Next',
          onClick: handleContinue,
          disabled: selectedPhotos.length === 0 || isUploading,
          loading: isUploading,
          loadingText: 'Uploading...',
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 