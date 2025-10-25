import { CheckIcon, XIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "react-router-dom"
import { SubscriptionPlanService, PricingPlan } from "@/services/subscriptionPlanService"

export function FeaturesListSection() {
  const navigate = useNavigate()
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch subscription plans from API
  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Use the service to fetch active subscription plans
        const result = await SubscriptionPlanService.getActiveSubscriptionPlans()
        
        if (result.status === 'success' && result.data) {
          setPricingPlans(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch subscription plans')
        }
      } catch (err) {
        console.error('Error fetching subscription plans:', err)
        setError(err instanceof Error ? err.message : 'Failed to load plans')
        
        // Fallback to default plans if API fails
        setPricingPlans(SubscriptionPlanService.getFallbackPlans())
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionPlans()
  }, [])

  const handlePlanSelect = (plan: PricingPlan) => {
    if (plan.id === "free" || plan.price === "0") {
      // Handle free plan selection
      return
    }
    
    // Store the selected plan data in localStorage
    localStorage.setItem("selectedPlan", JSON.stringify({
      id: plan.id, // Store the actual subscription plan ID
      name: plan.name,
      price: `Rs. ${plan.price}/-`,
      period: "Per Month",
      breakdown: {
        price: `Rs. ${plan.price}`,
        gst: `Rs. ${Math.round(parseInt(plan.price) * 0.18)}`,
      },
      subtotal: `Rs. ${Math.round(parseInt(plan.price) * 1.18)}`,
      total: `Rs. ${Math.round(parseInt(plan.price) * 1.18)}`,
    }))
    
    // Navigate to make payment screen
    navigate("/payment/make-payment")
  }

  if (isLoading) {
    return (
      <section className="w-full px-4 py-6">
        <div className="flex flex-col gap-1 mb-6">
          <h3 className="font-['Raleway',Helvetica] font-bold text-grey text-xs leading-4">
            Pricing
          </h3>
          <h2 className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-e-84420 text-base leading-5">
            Select a Pricing Plan
          </h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e84420] mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">Loading pricing plans...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full px-4 py-6">
        <div className="flex flex-col gap-1 mb-6">
          <h3 className="font-['Raleway',Helvetica] font-bold text-grey text-xs leading-4">
            Pricing
          </h3>
          <h2 className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-e-84420 text-base leading-5">
            Select a Pricing Plan
          </h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-600 text-sm mb-2">Failed to load pricing plans</p>
            <p className="text-gray-500 text-xs">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-4 py-6">
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="font-['Raleway',Helvetica] font-bold text-grey text-xs leading-4">
          Pricing
        </h3>
        <h2 className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-e-84420 text-base leading-5">
          Select a Pricing Plan
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {pricingPlans.map((plan) => (
          <Accordion
            key={plan.id}
            type="single"
            collapsible
            defaultValue={plan.defaultOpen ? plan.id : undefined}
            className="w-full"
          >
            <AccordionItem value={plan.id} className="border-0">
              <Card
                className={`${plan.bgColor} border ${plan.borderColor} rounded-lg overflow-hidden`}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start gap-1">
                      <h3 className={`${plan.color} font-['Montserrat',Helvetica] font-bold text-base leading-4`}>
                        {plan.name}
                      </h3>
                      <p className="font-['Montserrat',Helvetica] text-sm leading-4">
                        <span className="text-black font-body-14pt">
                          ₹{plan.price}/-{" "}
                        </span>
                        <span className="font-bold text-[#959595] text-[11px]">
                          Per Month
                        </span>
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  {plan.id !== "free" && plan.price !== "0" && (
                    <div className="mb-2">
                      <p className="font-['Montserrat',Helvetica] font-bold text-variable-collection-light-grey text-xs leading-4">
                        Key Features
                      </p>
                    </div>
                  )}
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        <CheckIcon className="w-4 h-4 text-black" />
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        {plan.connectionsPerMonth} No. of Connections per month
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        <CheckIcon className="w-4 h-4 text-black" />
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        {plan.personalMessages} Personal Messages
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        <CheckIcon className="w-4 h-4 text-black" />
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        {plan.contactDetails} Contact Details
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        {plan.matchmakerRecommendations ? (
                          <CheckIcon className="w-4 h-4 text-black" />
                        ) : (
                          <XIcon className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        Matchmaker's Recommendations
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        {plan.advancedAnalytics ? (
                          <CheckIcon className="w-4 h-4 text-black" />
                        ) : (
                          <XIcon className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        Advanced Analytics
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        {plan.customMatching ? (
                          <CheckIcon className="w-4 h-4 text-black" />
                        ) : (
                          <XIcon className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        Custom Matching
                      </span>
                    </li>
                    <li className="flex items-center gap-2 h-8">
                      <div className="p-1">
                        <CheckIcon className="w-4 h-4 text-black" />
                      </div>
                      <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
                        {plan.validityMonths} Months Validity
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className={`w-full h-10 bg-white rounded-lg font-['Montserrat',Helvetica] font-bold text-orange text-xs border ${plan.borderColor}`}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {plan.id === "free" || plan.price === "0" ? "Get Started" : "Make Payment"}
                    </Button>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  )
} 