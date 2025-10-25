"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Menu,
  SlidersHorizontal,
  MapPin,
  Users,
  Languages,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"

const Matches = () => {
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  // Sample profile data with multiple images
  const profiles = [
    {
      id: 1,
      name: "Riddhi Sharma",
      profession: "Psychologist",
      matchScore: 80,
      managedBy: "Managed by Self",
      languages: "Hindi • UP / UK",
      location: "Kolkata, India",
      status: "Unmarried • 24 Yrs",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.48.17%E2%80%AFPM-2DJQU2QIJyN6e1CyrJzvYwgLaeYcre.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.33%E2%80%AFPM-ohsyqSn3mndgh6eXyXdZ5QsdVYPQU1.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.42%E2%80%AFPM-LMeUG2WweKdEJODMtHdrvCVgRz2ENQ.png",
      ],
    },
    {
      id: 2,
      name: "Arjun Verma",
      profession: "Software Engineer",
      matchScore: 85,
      managedBy: "Managed by Self",
      languages: "Hindi • MP",
      location: "Bhopal, India",
      status: "Unmarried • 27 Yrs",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.48.17%E2%80%AFPM-2DJQU2QIJyN6e1CyrJzvYwgLaeYcre.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.33%E2%80%AFPM-ohsyqSn3mndgh6eXyXdZ5QsdVYPQU1.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.42%E2%80%AFPM-LMeUG2WweKdEJODMtHdrvCVgRz2ENQ.png",
      ],
    },
    {
      id: 3,
      name: "Meera Desai",
      profession: "Graphic Designer",
      matchScore: 75,
      managedBy: "Managed by Friends",
      languages: "Gujarati • Gujarat",
      location: "Ahmedabad, India",
      status: "Unmarried • 26 Yrs",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.48.17%E2%80%AFPM-2DJQU2QIJyN6e1CyrJzvYwgLaeYcre.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.33%E2%80%AFPM-ohsyqSn3mndgh6eXyXdZ5QsdVYPQU1.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-27%20at%2012.47.42%E2%80%AFPM-LMeUG2WweKdEJODMtHdrvCVgRz2ENQ.png",
      ],
    },
  ]

  const tabs = [
    { name: "All", count: 32 },
    { name: "Near Me", count: 3 },
    { name: "New", count: 4 },
    { name: "Recently Viewed", count: 0 },
  ]

  const ProfileCard = ({ profile }: { profile: (typeof profiles)[0] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % profile.images.length)
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + profile.images.length) % profile.images.length)
    }

    const getMatchScoreColor = (score: number) => {
      if (score >= 80) return "text-green-600"
      if (score >= 70) return "text-orange-500"
      return "text-red-500"
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex gap-4">
          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{profile.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{profile.profession}</p>

            <div className="mb-3">
              <span className="text-sm text-gray-500">Match Score </span>
              <span className={`font-semibold ${getMatchScoreColor(profile.matchScore)}`}>{profile.matchScore}%</span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{profile.managedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <span>{profile.languages}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{profile.status}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/profile/${profile.id}`)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                View Profile
              </button>
              <button className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                Send Interest
              </button>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative w-32 h-40 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={profile.images[currentImageIndex] || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {profile.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>

                {/* Image Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {profile.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {/* Header */}
     
     
      <ProfileHeader 
      menuenable={true}
    searchicon={true}
    HeaderHeading="Welcome, Raghav!"
    searchHandler={() => setShowSearch(!showSearch)}

      />
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-700" />
            <h1 className="text-lg font-semibold text-gray-900">Welcome, Raghav!</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div> */}
{showSearch && (
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}
        {/* Search Input */}
        
     
      
      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab.name ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.name} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Cards */}
      <div className="p-4">
        {profiles
          .filter(
            (profile) =>
              searchQuery === "" ||
              profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              profile.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
              profile.location.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
      </div>

      <ProfileFooter />
    </div>
  )
}

export default Matches
