import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useSearchParams, useNavigate } from "react-router-dom"


export function KYCUploadSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)

  // Data for tabs
  const tabsData = [
    { id: "selfie", label: "Selfie Verification", completed: true },
    { id: "govt", label: "Govt ID Verification", active: true },
    { id: "privacy", label: "Privacy", disabled: true },
  ]

  useEffect(() => {
    // Get images from URL parameters
    const front = searchParams.get('front')
    const back = searchParams.get('back')
    
    if (front) setFrontImage(front)
    if (back) setBackImage(back)
  }, [searchParams])

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />
      
      {/* Verification tabs */}
      <Tabs
        defaultValue="govt"
        className="w-full bg-white"
      >
        <TabsList className="flex w-full h-12 bg-transparent p-0 space-x-0">
          {tabsData.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              disabled={tab.disabled}
              className={`relative w-${tab.id === "privacy" ? "[104px]" : "36"} h-12 rounded-none ${
                tab.completed
                  ? "font-bold text-xs"
                  : tab.active
                    ? "font-bold !text-[#2bcc8d] text-xs border-b-2 border-orange"
                    : "font-semibold text-black text-xs opacity-40"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto pb-20">
        <div className="px-4 py-6 flex flex-col gap-4">
        {/* Verification section with icon */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center">
            <img
              src="/assets/images/img/secrity.png"
              alt="Security"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-xs font-bold text-gray-600">
              Verification
            </div>
            <div className="text-base font-bold text-orange">
              Govt. ID Verification
            </div>
          </div>
        </div>

        {/* Preview section */}
        <Card className="w-full border-none shadow-none">
          <CardContent className="flex flex-col items-start gap-3 p-4">
            <div className="font-bold text-black text-sm">
              Preview
            </div>
          </CardContent>
        </Card>

        {/* ID Card Images */}
        <div className="flex flex-col gap-6">
          {/* Front Image */}
          <div className="w-full h-40 relative bg-[#f3f6fd] rounded-lg overflow-hidden">
            {frontImage ? (
              <img
                src={frontImage}
                alt="Government ID Card Front"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Front ID preview not available
              </div>
            )}
          </div>

          {/* Back Image */}
          <div className="w-full h-40 relative bg-[#f3f6fd] rounded-lg overflow-hidden">
            {backImage ? (
              <img
                src={backImage}
                alt="Government ID Card Back"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Back ID preview not available
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

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
          onClick: () => navigate("/settings/privacy"),
          color: "green",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 