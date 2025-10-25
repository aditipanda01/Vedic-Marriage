"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PhoneNumberProps {
  onSubmit: (phone: string) => void
}

export function PhoneNumber({ onSubmit }: PhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")

  const handleSubmit = () => {
    onSubmit(phoneNumber)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Enter Your Mobile Number</h1>
          <p className="text-gray-600">
            We&apos;ll send you a verification code to verify your number.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              className="w-20 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-2 font-medium text-gray-600 text-sm focus:outline-none"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            <Input
              className="flex-1 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm"
              placeholder="Enter mobile number here"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              inputMode="tel"
              maxLength={15}
            />
          </div>

          <Button
            className="w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
            onClick={handleSubmit}
          >
            Continue
          </Button>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 bg-white rounded-[48px] border-none"
          >
            <img className="w-6 h-6" alt="Google" src="/assets/images/img/googl.png" />
            <span className="font-semibold text-black text-sm">Sign up with Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 