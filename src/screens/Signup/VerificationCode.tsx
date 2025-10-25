"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VerificationCodeProps {
  phone: string
  onSubmit: (code: string) => void
}

export function VerificationCode({ phone, onSubmit }: VerificationCodeProps) {
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(60)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [resendTimer])

  const handleSubmit = () => {
    onSubmit(otp)
  }

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      // TODO: Implement actual resend logic
      setResendTimer(60)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Enter OTP</h1>
          <p className="text-gray-600">
            OTP sent to {phone}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                className="w-12 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] text-center font-medium text-gray-600 text-lg"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => {
                  const newOtp = otp.split("")
                  newOtp[index] = e.target.value
                  setOtp(newOtp.join(""))
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <Button
            className="w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
            onClick={handleSubmit}
          >
            Verify
          </Button>

          <div className="text-center">
            <button
              className="text-orange text-sm font-medium disabled:text-gray-400"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
            >
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 