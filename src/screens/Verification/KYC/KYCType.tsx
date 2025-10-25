import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"

import { ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type KYCOption = {
  value: string
  label: string
}

type KYCOptions = {
  [key: string]: KYCOption[]
}

export function KYCType() {
  const navigate = useNavigate()
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedDocType, setSelectedDocType] = useState("")

  const kycOptions: KYCOptions = {
    India: [
      { value: "pan", label: "PAN Card" },
      { value: "aadhar", label: "Aadhar Card" },
      { value: "driving_license", label: "Driving License" },
      { value: "passport", label: "Passport" },
      { value: "voter_id", label: "Voter ID" },
    ],
  }

  const handleContinue = () => {
    if (selectedDocType) {
      navigate(`/verification/kyc/front?type=${selectedDocType}`)
    }
  }

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
                Select ID Type
              </div>
            </div>
          </div>

          {/* Main content with selection options */}
          <div className="flex flex-col gap-4">
            {/* Country Selection */}
            <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
              <CardHeader className="px-4 py-2">
                <CardTitle className="font-bold text-gray-600 text-sm">
                  Select Country
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className="w-full h-10 bg-white border border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Document Type Selection */}
            <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
              <CardHeader className="px-4 py-2">
                <CardTitle className="font-bold text-gray-600 text-sm">
                  Select ID Type
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Select
                  value={selectedDocType}
                  onValueChange={setSelectedDocType}
                >
                  <SelectTrigger className="w-full h-10 bg-white border border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {kycOptions[selectedCountry]?.map((option: KYCOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Guidelines section */}
            <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
              <CardHeader className="px-4 py-2">
                <CardTitle className="font-bold text-gray-600 text-sm">
                  ID Verification Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="list-disc list-inside space-y-2 text-xs text-gray-800">
                  <li>Ensure your ID is valid and not expired</li>
                  <li>All text should be clearly visible</li>
                  <li>Take photos in a well-lit area</li>
                  <li>No glare or shadows on the document</li>
                  <li>Upload both sides if applicable</li>
                </ul>
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
          onClick: handleContinue,
          disabled: !selectedDocType,
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 