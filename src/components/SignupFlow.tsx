"use client"

import React, { useState } from "react"
import { PhoneNumber } from "@/screens/Signup/PhoneNumber"
import { VerificationCode } from "@/screens/Signup/VerificationCode"
import { VerificationSuccess } from "@/screens/Signup/VerificationSuccess"
import { RegistrationForm } from "@/screens/Signup/RegistrationForm"

type SignupStep = "phone" | "verify" | "verified" | "questions" | "success"

interface SignupData {
  phone: string
  verificationCode: string
  registrationData: {
    profileType: string
    fullName: string
    location: string
  }
}

export function SignupFlow() {
  const [step, setStep] = useState<SignupStep>("phone")
  const [data, setData] = useState<SignupData>({
    phone: "",
    verificationCode: "",
    registrationData: {
      profileType: "",
      fullName: "",
      location: "",
    },
  })

  const handlePhoneSubmit = (phone: string) => {
    setData((prev) => ({ ...prev, phone }))
    setStep("verify")
  }

  const handleVerificationSubmit = (code: string) => {
    setData((prev) => ({ ...prev, verificationCode: code }))
    setStep("verified")
  }

  const handleVerifiedContinue = () => {
    setStep("questions")
  }

  const handleQuestionsSubmit = (registrationData: SignupData["registrationData"]) => {
    setData((prev) => ({ ...prev, registrationData }))
    setStep("success")
  }

  const handleSuccessContinue = () => {
    // Navigate to profile completion page
    window.location.href = "/profile-completion"
  }

  const renderPhoneStep = () => (
    <PhoneNumber onSubmit={handlePhoneSubmit} />
  )

  const renderVerifyStep = () => (
    <VerificationCode
      phone={data.phone}
      onSubmit={handleVerificationSubmit}
    />
  )

  const renderVerifiedStep = () => (
    <VerificationSuccess onContinue={handleVerifiedContinue} />
  )

  const renderQuestionsStep = () => (
    <RegistrationForm onSubmit={handleQuestionsSubmit} />
  )

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Vedic Marriage!</h1>
          <p className="text-gray-600">
            Your account has been created successfully. Let&apos;s complete your profile to find your perfect match.
          </p>
        </div>
        <button
          onClick={handleSuccessContinue}
          className="w-full py-3 px-4 bg-orange text-white rounded-lg font-medium hover:bg-orange/90 transition-colors"
        >
          Continue to Profile
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {step === "phone" && renderPhoneStep()}
      {step === "verify" && renderVerifyStep()}
      {step === "verified" && renderVerifiedStep()}
      {step === "questions" && renderQuestionsStep()}
      {step === "success" && renderSuccessStep()}
    </div>
  )
} 