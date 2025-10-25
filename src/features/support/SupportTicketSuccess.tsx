import { ProfileHeader } from "@/common/components/ui/ProfileHeader"
import { useLocation, useNavigate } from "react-router-dom"
import { ProfileFooter } from "@/common/components/ui/ProfileFooter"
  const SupportTicketSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation() as { state?: { category?: string; subCategory?: string; issue?: string; ticketId?: string } }
  const ticketId = location.state?.ticketId || ""
  const category = location.state?.category || ""
  const subCategory = location.state?.subCategory || ""
  const issue = location.state?.issue || ""
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <ProfileHeader 
        arrowenable={true}
        plusenable={true}
        plusHandler={() => navigate("/tickets")}
        arrowHandler={() => navigate(-1)}
        HeaderHeading="Support"
      />

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-20 px-4 flex flex-col items-center justify-center text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Support ID */}
        <div className="text-gray-500 text-sm mb-4">Support ID: {ticketId || "—"}</div>

        {/* Success Message */}
        <h2 className="text-green-600 text-xl font-semibold mb-6">Support Ticket created successfully</h2>

        {/* Description */}
        <div className="max-w-sm space-y-4 text-gray-600 leading-relaxed">
          <p>Thank you for reaching out about {subCategory || category || "your issue"}. Your request has been received.</p>
          {issue && <p className="text-gray-500">Issue: {issue}</p>}
          <p>An agent will review your request and get back to you shortly.</p>
          <p>Thank you for your patience!</p>
        </div>
      </main>

     <ProfileFooter />
    </div>
  )
}

export default SupportTicketSuccess
