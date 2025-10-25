"use client"

import { ArrowLeft, Plus, RotateCcw, Home, MessageCircle, Heart, Bell, User, ChevronDown } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"
import { supportService } from "./services/supportService"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function SupportTicketPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [category, setCategory] = useState(location.state?.category || "Account & Profile Management")
  const [subCategory, setSubCategory] = useState("")
  const [issue, setIssue] = useState("")

  const navigationItems = [
    { icon: Home, label: "Home", active: false },
    { icon: MessageCircle, label: "Messages", active: false },
    { icon: Heart, label: "My Matches", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: User, label: "Profile", active: true },
  ]



  const handleSubmit = async () => {
    if (!category || !subCategory || !issue.trim()) return
    const res = await supportService.createTicket({ category, subCategory, issue })
    const payload = res.data || res
    navigate("/ticket-success", {
      state: {
        category,
        subCategory,
        issue,
        ticketId: payload?.ticket?.id || payload?.ticket?._id || payload?.id || payload?._id || "",
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
     <ProfileHeader
     arrowenable={true}
     plusenable={true}
     plusHandler={() => navigate("/support")}
     arrowHandler={() => navigate(-1)}
     HeaderHeading="Support"
     />
      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 px-4">
        <div className="py-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">Need Help with {category}?</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We're here to assist you! Select an option below to get started, and one of our support agents will get back
            to you shortly.
          </p>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2">Select a category</label>
              <div className="relative">
                <select
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Account & Profile Management</option>
                  <option>Matches & Communication</option>
                  <option>Subscription & Billing</option>
                  <option>Technical & General Support</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sub-category Selection */}
            <div>
              <label className="block text-gray-500 text-sm font-medium mb-2">Select sub-category</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select a sub-category
                  </option>
                  <option className="text-gray-900" value="Password Reset">
                    Password Reset
                  </option>
                  <option className="text-gray-900" value="Login Issues">
                    Login Issues
                  </option>
                  <option className="text-gray-900" value="Profile Updates">
                    Profile Updates
                  </option>
                  <option className="text-gray-900" value="Account Verification">
                    Account Verification
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <textarea
                placeholder="Type your issue here"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-4 text-gray-700 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[140px]"
                rows={6}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-semibold text-lg mt-8 shadow-sm"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </main>

      <ProfileFooter />
    </div>
  )
}
