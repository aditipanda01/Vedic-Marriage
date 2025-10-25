"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, X, Upload, AlertCircle } from "lucide-react"

interface Photo {
  id: string
  url: string
  status: "approved" | "rejected" | "pending"
  uploadedAt: string
}

export function GalleryPhotoList() {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<Photo[]>([
    // Mock data - replace with actual data from your backend
    {
      id: "1",
      url: "https://example.com/photo1.jpg",
      status: "approved",
      uploadedAt: "2024-03-20"
    },
    {
      id: "2",
      url: "https://example.com/photo2.jpg",
      status: "rejected",
      uploadedAt: "2024-03-20"
    },
    {
      id: "3",
      url: "https://example.com/photo3.jpg",
      status: "pending",
      uploadedAt: "2024-03-20"
    }
  ])

  const handleBack = () => {
    navigate(-1)
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId))
  }

  const handleAddMore = () => {
    navigate("/verification/gallery-photo")
  }

  const getStatusColor = (status: Photo["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = (status: Photo["status"]) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "pending":
        return "Under Review"
      default:
        return status
    }
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
              My Photos
            </div>
            <div className="font-medium text-black text-sm">
              Manage your gallery photos
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square">
                  <img
                    src={photo.url}
                    alt={`Gallery photo ${photo.id}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className={`text-xs font-medium ${getStatusColor(photo.status)} bg-white/90 px-2 py-1 rounded-full text-center`}>
                      {getStatusText(photo.status)}
                    </div>
                  </div>
                </div>
              ))}
              {/* Add More Photos Button */}
              <button
                onClick={handleAddMore}
                className="aspect-square border-2 border-dashed border-[#ed6129] rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-[#ed6129]/5 transition-colors"
              >
                <Upload className="w-8 h-8 text-[#ed6129]" />
                <span className="text-sm text-[#ed6129]">Add More</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Status Legend */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-2">Photo Status:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span>Approved - Photo meets guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span>Rejected - Please replace this photo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span>Under Review - Please wait</span>
                </div>
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
            onClick={() => navigate("/verification/selfie")}
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
  )
} 