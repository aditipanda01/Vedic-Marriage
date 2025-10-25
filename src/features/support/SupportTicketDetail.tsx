"use client"

import { ProfileFooter } from "@/common/components/ui/ProfileFooter"
import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supportService } from "./services/supportService"

const SupportTicketDetail = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [status, setStatus] = useState<string>("Ticket Created")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!id) return
      try {
        setLoading(true)
        const [ticketRes, msgsRes] = await Promise.all([
          supportService.getTicket(id),
          supportService.listMessages(id, { limit: 50 }),
        ])
        const tData = ticketRes.data || ticketRes
        const mData = msgsRes.data || msgsRes
        if (mounted) {
          setStatus(tData?.ticket?.status || tData?.status || "")
          setMessages(mData?.messages || mData?.items || [])
        }
      } catch (e) {
        if (mounted) setError("Failed to load ticket")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  const handleSendMessage = async () => {
    if (!message.trim() || !id) return
    try {
      const res = await supportService.addMessage(id, message)
      const newMsg = res.data?.message || res.message || res
      setMessages(prev => [...prev, newMsg])
      setMessage("")
    } catch (e) {
      setError("Failed to send message")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProfileHeader
        arrowenable={true}
        plusenable={true}
        plusHandler={() => navigate("/tickets")}
        arrowHandler={() => navigate(-1)}
      />

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-32 px-4">
        {/* Status */}
        <div className="mb-6">
          <div className="text-gray-500 text-sm mb-1">Status</div>
          <div className="text-lg font-semibold">{status}</div>
          {loading && <div className="text-sm text-gray-500 mt-1">Loading...</div>}
          {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
        </div>

        {/* Conversation Thread */}
        <div className="space-y-6">
          {messages.map((m, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className={m.author === 'support' ? "w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center" : "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"}>
                {m.author === 'support' ? <div className="text-orange-600 text-sm font-bold">V</div> : <div className="w-6 h-6 bg-gray-500 rounded-full"></div>}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">{new Date(m.createdAt).toLocaleString()}</div>
                <div className="text-gray-900">{m.text}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Message Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here to ask anything"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <ProfileFooter />
    </div>
  )
}

export default SupportTicketDetail
