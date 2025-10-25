"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, MoreVertical, Smile, Paperclip, Send, User, Ban, X } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import  Button  from "@/common/components/atoms/Button/Button"
import {ProfileHeader} from "@/common/components/ui/ProfileHeader"
import {ProfileFooter} from "@/common/components/ui/ProfileFooter"
export default function MsgById() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [blockModalState, setBlockModalState] = useState<"confirm" | "blocked">("confirm")
  const [selectedReason, setSelectedReason] = useState("")
  const [reportToSite, setReportToSite] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleBlock = () => {
    setShowDropdown(false)
    setShowBlockModal(true)
    setBlockModalState("confirm")
  }

  const handleConfirmBlock = () => {
    setBlockModalState("blocked")
    setTimeout(() => {
      setShowBlockModal(false)
      setIsBlocked(true)
    }, 2000)
  }

  const handleUnblock = () => {
    setIsBlocked(false)
  }

  const blockingReasons = [
    "Nudity or Sexual Activity",
    "Pretending to be someone else",
    "Scam or Fraud",
    "Suicide or Self Injury",
    "Sale of illegal or regulated goods",
    "Hate Speech or Symbols",
    "Intellectual Property violation",
    "Violence or dangerous organisations",
    "Bullying or Harassment",
    "Spam",
    "The problem isn't listed here",
  ]

  const messages = [
    {
      id: 1,
      text: "Hey Jamie! What's up? How can I lend a hand today?",
      sender: "other",
      avatar: "/woman-profile.png",
      time: "",
    },
    {
      id: 2,
      text: "Hey, I'm kinda lost on how to chat better in our relationship. Can you help me figure out how to say what I need and when's a good time to bring it up?",
      sender: "me",
      avatar: "/woman-profile-2.png",
      time: "03:23 PM",
    },
    {
      id: 3,
      text: "Totally! When you're in a relationship, just being real with each other is key. Let's spill the beans and sort out any worries you've got.",
      sender: "other",
      avatar: "/woman-profile.png",
      time: "",
    },
    {
      id: 4,
      text: "Hey, I'm kinda lost on how to chat better in our relationship. Can you help me figure out how to say what I need and when's a good time to bring it up?",
      sender: "me",
      avatar: "/woman-profile-2.png",
      time: "03:23 PM",
    },
    {
      id: 5,
      text: "For sure! Let's dive into a scenario together to make it all click.",
      sender: "other",
      avatar: "/woman-profile.png",
      time: "",
    },
  ]

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col relative pb-20">
      {/* Header */}
      <ProfileHeader
      arrowenable={true}
      arrowHandler={() => navigate(-1)}
      HeaderHeading=""
      profileimage={true}
      moreverticalenable={true}
      
      />
      {/* <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate("/messages")}>
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex items-center gap-3">
          <img src="/woman-profile.png" alt="Riddhi Sharma" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-medium text-gray-900 text-lg">Riddhi Sharma</span>
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <MoreVertical className="w-6 h-6 text-gray-800" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-20">
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-left">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">View Profile</span>
              </button>
              <button
                onClick={handleBlock}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-left"
              >
                <Ban className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Block</span>
              </button>
            </div>
          )}
        </div>
      </div> */}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.sender === "other" ? (
              // Left side messages (from Riddhi)
              <div className="flex gap-3 items-start">
                <img
                  src={msg.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="bg-white rounded-2xl px-4 py-3 max-w-xs lg:max-w-md border border-gray-100">
                  <p className="text-gray-900 text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ) : (
              // Right side messages (from user)
              <div className="flex flex-col items-end">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs lg:max-w-md mb-2">
                  <p className="text-gray-900 text-sm leading-relaxed">{msg.text}</p>
                </div>
                {msg.time && (
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-xs">✓</span>
                    <span className="text-gray-500 text-xs">{msg.time}</span>
                    <img
                      src={msg.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      {isBlocked ? (
        <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between">
          <span className="text-gray-500">You Blocked this contact</span>
          <Button
            onClick={handleUnblock}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
          >
            Unblock
          </Button>
        </div>
      ) : (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <button>
              <Smile className="w-6 h-6 text-gray-400" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
                className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
            <button>
              <Paperclip className="w-6 h-6 text-gray-400" />
            </button>
            <button onClick={handleSendMessage}>
              <Send className="w-6 h-6 text-orange-500" />
            </button>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Ban className="w-6 h-6 text-red-500" />
                <h2 className="text-lg font-semibold text-red-500">Block Riddhi Sharma</h2>
              </div>
              <button onClick={() => setShowBlockModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {blockModalState === "confirm" ? (
              <>
                <p className="text-gray-900 mb-2">Are you sure you want to block Riddhi Sharma?</p>
                <p className="text-gray-600 text-sm mb-6">
                  Blocking prevents further communication and interaction with this user.
                </p>

                <div className="space-y-3 mb-6">
                  {blockingReasons.map((reason) => (
                    <label key={reason} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="blockReason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-gray-700 text-sm">{reason}</span>
                    </label>
                  ))}
                </div>

                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportToSite}
                    onChange={(e) => setReportToSite(e.target.checked)}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="text-gray-700 text-sm">Report to VedicMarriage.ai</span>
                </label>

                <div className="flex gap-3">
                  <Button onClick={() => setShowBlockModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmBlock} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                    <Ban className="w-4 h-4 mr-2" />
                    Confirm Block
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Ban className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-500 mb-2">User Blocked</h3>
                <p className="text-gray-600">Riddhi Sharma has been blocked successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}
      <ProfileFooter />
    </div>
    
    </>
  )
}
