"use client"

import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { useNavigate } from "react-router-dom"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"
import { useEffect, useState } from "react"
import { supportService } from "./services/supportService"

const SupportTicketsList = () => {
  const navigate = useNavigate()

  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await supportService.listTickets({ limit: 20 })
        const items = data.data?.tickets || data.tickets || data.items || []
        if (mounted) setTickets(items)
      } catch (e: any) {
        if (mounted) setError("Failed to load tickets")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const categories = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Account & Profile Management",
      description: "Help with passwords, login issues, profile updates, and verification.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "Matches & Communication",
      description: "Support for match preferences, messaging issues, and blocking/reporting users.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "Subscription & Billing",
      description: "Assistance with subscription plans, payment processing, and billing issues.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z"
          />
        </svg>
      ),
      title: "Technical & General Support",
      description:
        "Troubleshooting technical problems, security and privacy concerns, feedback, events, and other general inquiries.",
    },
  ]

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
      <main className="flex-1 pt-20 pb-32 px-4">
        {/* Support Tickets Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Your support tickets</h2>
          <div className="space-y-3">
            {loading && <div className="text-sm text-gray-500">Loading...</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {!loading && !error && tickets.map((ticket, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/ticket/${ticket.id || ticket._id}`)}
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">Support ID: {ticket.id || ticket._id}</div>
                  <div className="font-medium text-gray-900 mb-1">{ticket.category}</div>
                  <div className={`text-sm ${ticket.status === 'Resolved' ? 'text-green-600' : ticket.status === 'In progress' ? 'text-blue-600' : 'text-gray-600'}`}>Status: {ticket.status}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Categories */}
        <div className="mb-8">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Quick Action Categories</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 flex items-start space-x-4 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate("/create-ticket")}
              >
                <div className="text-gray-600 mt-1">{category.icon}</div>
                <div className="flex-1">
                  <h4 className="text-orange-600 font-medium mb-2">{category.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Ticket Button */}
        <button
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          onClick={() => navigate("/create-ticket")}
        >
          Create new Support ticket
        </button>
      </main>

      <ProfileFooter />
    </div>
  )
}

export default SupportTicketsList
