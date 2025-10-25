import React from "react"
import { PricingHeaderSection } from "./PricingHeaderSection"
import { FeaturesListSection } from "./FeaturesListSection"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"

export function PaymentScreen() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />
      
      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto pb-20">
        <FeaturesListSection />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: () => navigate(-1),
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: "Next",
          onClick: () => navigate("/settings"),
          color: "green",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 