"use client"

import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, X, Upload } from "lucide-react"

interface PhotoPreviewProps {
  photos: File[]
  onDelete: (index: number) => void
  onContinue: () => void
  onAddMore: (files: File[]) => void
  isUploading?: boolean
}

export function PhotoPreview({ photos, onDelete, onContinue, onAddMore, isUploading = false }: PhotoPreviewProps) {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const handleAddMore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      onAddMore(Array.from(files))
    }
  }

  const handleAddMoreClick = () => {
    fileInputRef.current?.click()
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
              Photo Preview
            </div>
            <div className="font-medium text-black text-sm">
              Review your uploaded photos
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => onDelete(index)}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {/* Add More Photos Button */}
              <button
                onClick={handleAddMoreClick}
                className="aspect-square border-2 border-dashed border-[#ed6129] rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-[#ed6129]/5 transition-colors"
              >
                <Upload className="w-8 h-8 text-[#ed6129]" />
                <span className="text-sm text-[#ed6129]">Add More</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleAddMore}
              />
            </div>
          </CardContent>
        </Card>

        {/* Photo count and guidelines */}
        <div className="text-sm text-gray-500 text-center">
          {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
        </div>

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

          <Button 
            className="flex-1 h-10 bg-[#ed6129] rounded-full flex items-center justify-center"
            onClick={onContinue}
            disabled={photos.length === 0 || isUploading}
          >
            <span className="font-bold text-white text-sm">
              {isUploading ? 'Uploading...' : 'Continue'}
            </span>
            <div className="ml-2 p-1.5 rounded-full bg-[#ed6129]">
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
} 