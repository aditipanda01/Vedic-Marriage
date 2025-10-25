"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, User, Languages, MapPin, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"

const BlockedUsersPage: React.FC = () => {
  const navigate = useNavigate()

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})

  const blockedUsers = [
    {
      id: 1,
      name: "Riddhi Sharma",
      profession: "Psychologist",
      matchScore: 80,
      managedBy: "Managed by Self",
      language: "Hindi - UP / UK",
      location: "Kolkata, India",
      status: "Unmarried • 24 Yrs",
      images: ["/woman-profile-photo.png", "/woman-profile-2.png", "/woman-profile.png"],
    },
    {
      id: 2,
      name: "Arjun Verma",
      profession: "Software Engineer",
      matchScore: 85,
      managedBy: "Managed by Self",
      language: "Hindi - MP",
      location: "Bhopal, India",
      status: "Unmarried • 27 Yrs",
      images: ["/man-profile-photo.png", "/happy-emoji.png", "/woman-profile.png"],
    },
    {
      id: 3,
      name: "Meera Desai",
      profession: "Graphic Designer",
      matchScore: 75,
      managedBy: "Managed by Friends",
      language: "Gujarati - Gujarat",
      location: "Ahmedabad, India",
      status: "Unmarried • 26 Yrs",
      images: ["/woman-profile-photo-2.png", "/woman-profile.png", "/woman-profile-2.png"],
    },
  ]

  const handleImageNavigation = (userId: number, direction: "prev" | "next", totalImages: number) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[userId] || 0
      let newIndex
      if (direction === "next") {
        newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1
      }
      return { ...prev, [userId]: newIndex }
    })
  }

  const handleUnblock = (userId: number, userName: string) => {
    // Handle unblock functionality
    console.log(`Unblocking user ${userId}: ${userName}`)
  }

  const handleViewProfile = (userId: number) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <ProfileHeader
      arrowenable={true}
      arrowHandler={() => navigate(-1)}
      HeaderHeading="Blocked Users"
      />
      

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="space-y-6">
          {blockedUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 max-w-full">
              <div className="flex gap-4">
                {/* Left side - User info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.profession}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gray-500 text-sm">Match Score</span>
                      <span className="text-lg font-bold text-green-600">{user.matchScore}%</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{user.managedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Languages className="w-4 h-4 text-gray-400" />
                      <span>{user.language}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>{user.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewProfile(user.id)}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors whitespace-nowrap text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleUnblock(user.id, user.name)}
                      className="px-6 py-2.5 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors whitespace-nowrap text-sm"
                    >
                      Unblock
                    </button>
                  </div>
                </div>

                {/* Right side - Profile image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-40 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={user.images[currentImageIndex[user.id] || 0] || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation arrows */}
                    {user.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handleImageNavigation(user.id, "prev", user.images.length)}
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-70"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleImageNavigation(user.id, "next", user.images.length)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-70"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </>
                    )}

                    {/* Image indicators */}
                    {user.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {user.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full ${
                              index === (currentImageIndex[user.id] || 0) ? "bg-white" : "bg-white bg-opacity-50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProfileFooter />
    </div>
  )
}

export default BlockedUsersPage
