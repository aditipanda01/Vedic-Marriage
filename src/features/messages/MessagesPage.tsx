"use client"


import { useNavigate } from "react-router-dom"
  import { ProfileHeader } from '@/common/components/ui/ProfileHeader';
  import { ProfileFooter } from '@/common/components/ui/ProfileFooter';

export default function MessagesPage() {
  const navigate = useNavigate()

  const conversations = [
    {
      id: 1,
      name: "Riddhi Sharma",
      message: "Hey! How are you?",
      avatar: "/woman-profile.png",
      unread: 0,
      isOnline: true,
    },
    {
      id: 2,
      name: "Riddhi Sharma",
      message: "Hey! How are you?",
      avatar: "/woman-profile.png",
      unread: 2,
      isOnline: false,
    },
    {
      id: 3,
      name: "John Doe",
      message: "I'm doing great, thanks for asking!",
      avatar: "/woman-profile-2.png",
      unread: 3,
      isOnline: false,
    },
    {
      id: 4,
      name: "Alice Johnson",
      message: "Just finished a project, feeling accomplished!",
      avatar: "/woman-profile.png",
      unread: 4,
      isOnline: false,
    },
    {
      id: 5,
      name: "Riddhi Sharma",
      message: "Hey! How are you?",
      avatar: "/woman-profile.png",
      unread: 0,
      isOnline: true,
    },
    {
      id: 6,
      name: "Michael Smith",
      message: "Looking forward to the weekend!",
      avatar: "/woman-profile-2.png",
      unread: 0,
      isOnline: false,
    },
    {
      id: 7,
      name: "Emily Davis",
      message: "Excited about the new book release!",
      avatar: "/woman-profile.png",
      unread: 6,
      isOnline: false,
    },
    {
      id: 8,
      name: "Chris Lee",
      message: "Trying out a new recipe, wish me luck!",
      avatar: "/woman-profile-2.png",
      unread: 7,
      isOnline: false,
    },
    {
      id: 9,
      name: "Sofia Ramirez",
      message: "Just got back from a trip, it was amazing!",
      avatar: "/woman-profile.png",
      unread: 8,
      isOnline: false,
    },
    {
      id: 10,
      name: "David Brown",
      message: "Working on some personal projects, feeling...",
      avatar: "/woman-profile-2.png",
      unread: 9,
      isOnline: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <ProfileHeader
        arrowenable={true}
        arrowHandler={() => navigate(-1)}
        HeaderHeading="Messages"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="divide-y divide-gray-100">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => navigate(`/messages/${conversation.id}`)}
              className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            >
              <div className="relative">
                <img
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                <p className="text-gray-600 text-sm truncate">{conversation.message}</p>
              </div>
              {conversation.unread > 0 && (
                <div className="bg-orange-500 text-white text-xs font-medium rounded-full min-w-[24px] h-6 flex items-center justify-center px-2">
                  {conversation.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ProfileFooter />
    </div>
  )
}
