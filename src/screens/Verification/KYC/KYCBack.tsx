import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useSearchParams, useNavigate } from "react-router-dom"


export function KYCBack() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [hasImage, setHasImage] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null)

  // Data for tabs
  const tabsData = [
    { id: "selfie", label: "Selfie Verification", completed: true },
    { id: "govt", label: "Govt ID Verification", active: true },
    { id: "privacy", label: "Privacy", disabled: true },
  ]

  useEffect(() => {
    // Get front image from URL parameters
    const front = searchParams.get('front')
    if (front) {
      setFrontImageUrl(front)
    }
  }, [searchParams])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create a URL for the uploaded file
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setHasImage(true)
    }
  }

  const handleNext = () => {
    if (imageUrl && frontImageUrl) {
      navigate(`/verification/kyc/preview?front=${encodeURIComponent(frontImageUrl)}&back=${encodeURIComponent(imageUrl)}`)
    }
  }

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

          {/* Capture ID section */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-black text-sm">
              📸 Capture the Back of Your ID
            </div>
            <div className="font-medium text-black text-xs">
              Please take a clear photo of the back of your ID to proceed
            </div>
          </div>

          {/* ID capture area */}
          <Card className="w-full h-40 bg-[#f3f6fd] rounded-[14px] border-none">
            <CardContent className="p-0 h-full flex items-center justify-center">
              {!hasImage ? (
                <div className="text-gray-400 text-sm">
                  ID preview will appear here
                </div>
              ) : imageUrl && (
                <div className="w-full h-full relative">
                  <img
                    src={imageUrl}
                    alt="ID Preview"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* OR divider */}
          <div className="text-center text-gray-400 font-bold text-sm">
            OR
          </div>

          {/* Upload existing image section */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-black text-sm">
              Upload an Existing Image
            </div>
          </div>

          {/* Browse button */}
          <Button
            variant="outline"
            className="w-full h-10 bg-white rounded-[40px] border-none"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <span className="font-bold text-orange text-sm">
              Browse
            </span>
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
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
          onClick: handleNext,
          disabled: !hasImage,
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 