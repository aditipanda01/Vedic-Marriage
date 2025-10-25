"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface VerificationSuccessProps {
  onContinue: () => void
}

export function VerificationSuccess({ onContinue }: VerificationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[390px] mx-auto min-h-screen bg-white">
      {/* Success Message Card */}
      <Card className="flex flex-col w-[360px] items-center gap-6 p-8 rounded-2xl border-none shadow-lg">
        <CardContent className="p-0 w-full flex flex-col items-center gap-6">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">Verification Successful!</h2>
            <p className="text-gray-600 text-center">
              Your phone number has been verified successfully. You can now proceed with the registration.
            </p>
          </div>

          {/* Continue Button */}
          <Button
            className="w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
            onClick={onContinue}
          >
            Continue to Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 