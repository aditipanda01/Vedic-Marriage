

import React from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Plus,
  Home,
  MessageCircle,
  Heart,
  Bell,
  User,
  Target,
  MessageSquare,
  CreditCard,
  Headphones,
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface SupportCategory {
  icon: LucideIcon
  title: string
  description: string
}

interface NavigationItem {
  icon: LucideIcon
  label: string
  active: boolean
}

export default function SupportPage() {
  const navigate = useNavigate()

  const supportCategories: SupportCategory[] = [
    {
      icon: Target,
      title: "Account & Profile Management",
      description: "Help with passwords, login issues, profile updates, and verification.",
    },
    {
      icon: MessageSquare,
      title: "Matches & Communication",
      description: "Support for match preferences, messaging issues, and blocking/reporting users.",
    },
    {
      icon: CreditCard,
      title: "Subscription & Billing",
      description: "Assistance with subscription plans, payment processing, and billing issues.",
    },
    {
      icon: Headphones,
      title: "Technical & General Support",
      description:
        "Troubleshooting technical problems, security and privacy concerns, feedback, events, and other general inquiries.",
    },
  ]

  const navigationItems: NavigationItem[] = [
    { icon: Home, label: "Home", active: false },
    { icon: MessageCircle, label: "Messages", active: false },
    { icon: Heart, label: "My Matches", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: User, label: "Profile", active: true },
  ]

  const handleCategoryClick = (category: SupportCategory) => {
    navigate("/create-ticket", { state: { category: category.title } })
  }

  const handleCreateTicket = () => {
    navigate("/create-ticket")
  }

  const handleTicketsList = () => {
    navigate("/tickets")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProfileHeader 
        arrowenable={true}
        plusenable={true}
        plusHandler={handleTicketsList}
        arrowHandler={() => navigate(-1)}
        HeaderHeading="Support"
      />
      

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 px-4">
        <div className="py-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">Welcome to our support page</h2>
          <p className="text-gray-900 font-medium mb-8">We're here to help</p>

          <div className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Quick Action Categories</h3>

            <div className="space-y-4">
              {supportCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-orange-600 font-medium mb-1">{category.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full font-medium"
            onClick={handleCreateTicket}
          >
            Create new Support ticket
          </Button>
        </div>
      </main>

      <ProfileFooter />
    </div>
  )
}
