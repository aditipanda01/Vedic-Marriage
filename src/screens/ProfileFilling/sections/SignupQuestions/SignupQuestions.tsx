"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignupQuestionsData {
  profileFor: string
  fullName: string
  location: string
}

interface SignupQuestionsProps {
  onSubmit: (data: SignupQuestionsData) => void
}

export function SignupQuestions({ onSubmit }: SignupQuestionsProps) {
  const [formData, setFormData] = useState<SignupQuestionsData>({
    profileFor: "",
    fullName: "",
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof SignupQuestionsData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-center">Registration</h2>
        <p className="text-center text-muted-foreground">
          Tell us a bit about yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profileFor">Profile For</Label>
            <Select
              value={formData.profileFor}
              onValueChange={(value) => handleChange("profileFor", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select who you're creating profile for" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                <SelectItem value="son">Son</SelectItem>
                <SelectItem value="daughter">Daughter</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleChange("location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="kolkata">Kolkata</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Finish Sign Up
        </Button>
      </form>
    </div>
  )
} 