"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { useNavigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"

export function SelfieSuccess() {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate("/verification/kyc")
  }

  return (
    <div className="min-h-screen w-full max-w-[390px] mx-auto bg-white flex flex-col">
      {/* Header section */}
      <Header />

      {/* Main content area */}
      <div className="flex-1 w-full px-4 py-6 flex flex-col gap-4">
        {/* Success message */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#ed6129]/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#ed6129]" />
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Selfie Uploaded Successfully!
                </h2>
                <p className="text-sm text-gray-600">
                  Your selfie has been uploaded and will be verified by our team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next steps */}
        <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-2">Next Steps:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Upload your identity documents</li>
                <li>Complete your profile</li>
                <li>Start matching with others</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer navigation */}
      <div className="w-full px-6 py-4 bg-white border-t border-gray-100 shadow-[0px_-4px_10px_rgba(0,0,0,0.05)]">
        <Button 
          className="w-full h-10 bg-[#ed6129] rounded-full flex items-center justify-center"
          onClick={handleContinue}
        >
          <span className="font-bold text-white text-sm">
            Continue to KYC
          </span>
        </Button>
      </div>
    </div>
  )
} 