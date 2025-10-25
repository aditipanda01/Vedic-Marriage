"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"


export function KYCVerification() {
  const navigate = useNavigate()

  // Guidelines data for mapping
  const guidelines = [
    {
      title: "Capture Clearly",
      description:
        "Ensure a clear, unobstructed image of your entire, valid government-issued ID.",
    },
    {
      title: "Accepted Govt IDs",
      description: "Aadhar Card • PAN Card • Voter ID • Driving License",
    },
    {
      title: "Well-Lit Environment",
      description:
        "Take photos in a well-lit area, minimizing shadows and reflections on the ID surface.",
    },
    {
      title: "Privacy and Security",
      description:
        "Submit the original, unaltered ID image, knowing it is handled securely for verification purposes.",
    },
  ]

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />
      
      {/* Verification tabs */}
      <Tabs
        defaultValue="govt-id"
        className="w-full bg-white"
      >
        <TabsList className="flex w-full h-12 bg-transparent p-0 space-x-0">
          <TabsTrigger
            value="selfie"
            className="relative w-36 h-12 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#2bcc8d] data-[state=active]:shadow-none"
          >
            <span className="font-bold  text-xs text-center">
              Selfie Verification
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="govt-id"
            className="relative w-36 h-12 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange data-[state=active]:shadow-none"
          >
            <span className="font-bold text-[#2bcc8d] text-xs text-center">
              Govt ID Verification
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="relative w-[104px] h-12 opacity-40 rounded-none data-[state=active]:shadow-none"
            disabled
          >
            <span className="font-semibold text-black text-xs text-center">
              Privacy
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          {/* Verification section with icon */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                src="/assets/images/img/security.png"
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

          {/* Main content with illustration and guidelines */}
          <div className="flex flex-col items-center gap-4">
            {/* Illustration */}
            <div className="relative w-full h-[241px]">
              <img
                src="/assets/images/img/kyc-illustration.png"
                alt="KYC Illustration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Guidelines section */}
            <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
              <CardHeader className="px-4 py-2">
                <CardTitle className="font-bold text-gray-600 text-sm">
                  ID Verification Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Map through guidelines */}
                {guidelines.map((guideline, index) => (
                  <div key={index} className="px-4 py-2">
                    <div className="font-bold text-gray-600 text-sm mb-1">
                      {guideline.title}
                    </div>
                    <div className="text-xs text-gray-800">
                      {guideline.description}
                    </div>
                  </div>
                ))}

                {/* Thank you message */}
                <div className="px-4 py-3 text-center">
                  <div className="text-xs text-gray-600">
                    Your thoughtful cooperation is truly appreciated! 📸🔒
                  </div>
                </div>
              </CardContent>
            </Card>
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
          onClick: () => navigate("/verification/kyc/type"),
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 