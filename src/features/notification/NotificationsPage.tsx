import { MoreHorizontal, MessageCircle, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProfileHeader } from '@/common/components/ui/ProfileHeader';
import { ProfileFooter } from '@/common/components/ui/ProfileFooter';

export default function NotificationsPage() {
  const navigate = useNavigate()

  const todayNotifications = [
    {
      id: 1,
      type: "Connection Request Accepted",
      user: "Nidhi",
      message: "Nidhi has accepted your connection request.",
      avatar: "/woman-profile.png",
      icon: MessageCircle,
      hasAction: true,
    },
    {
      id: 2,
      type: "New Invitation",
      user: "Riddhi",
      message: "Riddhi has sent you a connection request",
      avatar: "/woman-profile-2.png",
      icon: Eye,
      hasAction: true,
    },
  ]

  const thisWeekNotifications = [
    {
      id: 3,
      type: "Connection Request Accepted",
      user: "Nidhi",
      message: "Nidhi has accepted your connection request.",
      avatar: "/woman-profile.png",
      icon: MessageCircle,
      hasAction: true,
    },
    {
      id: 4,
      type: "Connection Request Accepted",
      user: "Nidhi",
      message: "Nidhi has accepted your connection request.",
      avatar: "/woman-profile.png",
      icon: MessageCircle,
      hasAction: true,
    },
    {
      id: 5,
      type: "Shortlisted Notification",
      user: "Someone",
      message: "Someone has shortlisted your profile",
      avatar: null,
      icon: null,
      hasAction: false,
      isGeneric: true,
    },
    {
      id: 6,
      type: "Shortlisted Notification",
      user: "Someone",
      message: "Someone has shortlisted your profile",
      avatar: null,
      icon: null,
      hasAction: false,
      isGeneric: true,
    },
    {
      id: 7,
      type: "Profile Visit Notification",
      user: "Someone",
      message: "Someone visited your profile",
      avatar: null,
      icon: null,
      hasAction: false,
      isGeneric: true,
    },
    {
      id: 8,
      type: "Profile Visit Notification",
      user: "Someone",
      message: "Someone visited your profile",
      avatar: null,
      icon: null,
      hasAction: false,
      isGeneric: true,
    },
    {
      id: 9,
      type: "New Invitation",
      user: "Riddhi",
      message: "Riddhi has sent you a connection request",
      avatar: "/woman-profile.png",
      icon: Eye,
      hasAction: true,
    },
    {
      id: 10,
      type: "New Invitation",
      user: "Riddhi",
      message: "Riddhi has sent you a connection request",
      avatar: "/woman-profile.png",
      icon: Eye,
      hasAction: true,
    },
  ]

  const renderAvatar = (notification: any) => {
    if (notification.isGeneric) {
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-400 flex items-center justify-center">
          <div className="text-white text-lg">😊</div>
        </div>
      )
    }
    return (
      <img
        src={notification.avatar || "/placeholder.svg"}
        alt={notification.user}
        className="w-12 h-12 rounded-full object-cover"
      />
    )
  }
  const markallread = () => {

  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
        <ProfileHeader 

        arrowenable={true}
        arrowHandler={() => navigate(-1)}
        HeaderHeading="Notifications"
        buttonenable={true}
        buttonHandler={markallread}
        buttonText="Mark all as Read"
        />
      {/* Header */}
      {/* <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 z-10">
        <MoreHorizontal className="w-6 h-6 text-gray-800" />
        <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
        <button className="text-orange-500 font-medium text-sm">Mark all as Read</button>
      </div> */}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Today Section */}
        <div className="px-4 py-4">
          <h2 className="text-gray-500 font-medium mb-4">Today</h2>
          <div className="space-y-4">
            {todayNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 py-2">
                {renderAvatar(notification)}
                <div className="flex-1">
                  <p className="text-orange-500 font-medium text-sm mb-1">{notification.type}</p>
                  <p className="text-gray-900 text-sm">{notification.message}</p>
                </div>
                {notification.hasAction && notification.icon && (
                  <button className="p-2">
                    <notification.icon className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-4">
          <h2 className="text-gray-500 font-medium mb-4">This Week</h2>
          <div className="space-y-4">
            {thisWeekNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 py-2">
                {renderAvatar(notification)}
                <div className="flex-1">
                  <p className="text-gray-500 font-medium text-sm mb-1">{notification.type}</p>
                  <p className="text-gray-900 text-sm">{notification.message}</p>
                </div>
                {notification.hasAction && notification.icon && (
                  <button className="p-2">
                    <notification.icon className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProfileFooter />
    </div>
  )
}
