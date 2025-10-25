"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface RegistrationData {
  profileType: string
  fullName: string
  location: string
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    profileType: "",
    fullName: "",
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Registration</h1>
            <p className="text-gray-600">
              Please provide the following information to complete your registration.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Profile For</label>
              <Select
                value={formData.profileType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, profileType: value }))}
              >
                <option value="">Select profile type</option>
                <option value="self">Self</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input
                type="text"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
            >
              Finish Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 