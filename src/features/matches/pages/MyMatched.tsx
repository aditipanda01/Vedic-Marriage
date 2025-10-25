"use client"

import { MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import {ProfileFooter} from "@/common/components/ui/ProfileFooter"

export default function Matches() {
  const navigate = useNavigate()

  const matches = [
    {
      id: "riddhi-sharma",
      name: "Riddhi Sharma",
      age: 28,
      location: "Mumbai, Maharashtra",
      image: "/woman-profile.png",
      verified: true,
      lastActive: "2 hours ago",
    },
    {
      id: "priya-patel",
      name: "Priya Patel",
      age: 26,
      location: "Pune, Maharashtra",
      image: "/woman-profile-2.png",
      verified: true,
      lastActive: "1 day ago",
    },
    {
      id: "anita-singh",
      name: "Anita Singh",
      age: 29,
      location: "Delhi, India",
      image: "/woman-profile.png",
      verified: false,
      lastActive: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 z-10">
        <MoreHorizontal className="w-6 h-6 text-gray-800" />
        <h1 className="text-lg font-semibold text-gray-900">My Matches</h1>
        <div></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {matches.length > 0 ? (
          <div className="p-4 space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                onClick={() => navigate(`/profile/${match.id}`)}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <img
                    src={match.image || "/placeholder.svg"}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {match.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{match.name}</h3>
                  <p className="text-sm text-gray-600">
                    {match.age} years • {match.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Active {match.lastActive}</p>
                </div>
                <div className="text-orange-500">
                  <span className="text-xl">→</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">💕</span>
            </div>
            <h3 className="text-gray-900 font-medium mb-2">No Matches Yet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Keep swiping! Your perfect match is just around the corner.
            </p>
          </div>
        )}
      </div>

      <ProfileFooter />
    </div>
  )
}
