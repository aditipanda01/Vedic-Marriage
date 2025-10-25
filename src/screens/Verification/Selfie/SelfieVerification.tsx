"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, Camera, Upload, CheckCircle2 } from "lucide-react"
import { WebcamComponent, WebcamComponentRef } from "./WebcamComponent"
import { ProfileService } from "@/services/profileService"
import { useToast } from "@/common/components/ui/toast/ToastContainer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
type Screen = "initial" | "camera" | "preview" | "success"

export function SelfieVerification() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<Screen>("initial")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const webcamRef = useRef<WebcamComponentRef>(null)
  const { showToast } = useToast()
  const tabsData = [
    { id: "selfie", label: "Selfie Verification", completed: true },
    { id: "govt", label: "Govt ID Verification", active: true },
    { id: "privacy", label: "Privacy", disabled: true },
  ]
  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc)
    setCurrentScreen("preview")
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        setCurrentScreen("preview")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setCurrentScreen("initial")
  }

  // Convert base64 to File object
  const base64ToFile = (base64String: string, filename: string): File => {
    try {
      // First, decode the URL-encoded string if needed
      const decodedString = decodeURIComponent(base64String)
      
      // Check if it's already a data URL
      let dataUrl = decodedString
      if (!decodedString.startsWith('data:')) {
        // If it's not a data URL, assume it's a base64 string and add the data URL prefix
        dataUrl = `data:image/jpeg;base64,${decodedString}`
      }
      
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      
      return new File([u8arr], filename, { type: mime })
    } catch (error) {
      console.error('Error converting base64 to file:', error)
      throw new Error('Invalid image format. Please try again.')
    }
  }

  const handleContinue = async () => {
    if (!capturedImage) {
      showToast({
        type: 'error',
        title: 'No selfie captured',
        message: 'Please take a selfie to continue.',
      })
      return
    }

    setIsUploading(true)

    try {
      // Convert base64 image to File object
      const selfieFile = base64ToFile(capturedImage, 'selfie.jpg')

      // Upload selfie
      const result = await ProfileService.uploadSelfie(selfieFile)
      if (result.status === 'error') {
        throw new Error(result.error || 'Upload failed')
      }

      // Upload successful, show success screen
      setCurrentScreen("success")
      
    } catch (error: any) {
      console.error('Selfie upload error:', error)
      showToast({
        type: 'error',
        title: 'Upload failed',
        message: error.message,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleBack = () => {
    if (currentScreen === "camera") {
      setCurrentScreen("initial")
    } else if (currentScreen === "preview") {
      setCurrentScreen("initial")
    } else {
      navigate(-1)
    }
  }

  const renderFooter = () => {
    switch (currentScreen) {
      case "camera":
        return (
          <div className="w-full px-6 py-4 bg-white border-t border-gray-100">
            <Button 
              className="w-full h-10 bg-orange text-white hover:bg-orange/90 rounded-full"
              onClick={() => webcamRef.current?.capture()}
            >
              <Camera className="w-5 h-5 mr-2" />
              <span className="font-bold text-white">
                Capture Selfie
              </span>
            </Button>
          </div>
        )
      case "preview":
        return (
          <div className="w-full px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1 h-10 rounded-full"
                onClick={handleRetake}
              >
                <Camera className="w-5 h-5 mr-2" />
                <span>Retake</span>
              </Button>
              <Button 
                className="flex-1 h-10 bg-orange text-white hover:bg-orange/90 rounded-full"
                onClick={handleContinue}
                disabled={isUploading}
              >
                <span className="font-bold text-white">
                  {isUploading ? 'Uploading...' : 'Upload Selfie'}
                </span>
              </Button>
            </div>
          </div>
        )
      case "success":
        return (
          <div className="w-full px-6 py-4 bg-white border-t border-gray-100">
            <Button 
              className="w-full h-10 bg-orange text-white hover:bg-orange/90 rounded-full flex items-center justify-center"
              onClick={() => navigate("/verification/kyc")}
            >
              <span className="font-bold text-white text-sm">
                Continue to KYC
              </span>
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )
      default:
        return (
          <div className="w-full px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full h-10 bg-orange text-white hover:bg-orange/90 rounded-full"
                onClick={() => setCurrentScreen("camera")}
              >
                <Camera className="w-5 h-5 mr-2" />
                <span className="font-bold text-white">
                  Take Selfie
                </span>
              </Button>
              <Button 
                className="w-full h-10 bg-orange text-white hover:bg-orange/90 rounded-full"
                onClick={handleUpload}
              >
                <Upload className="w-5 h-5 mr-2" />
                <span className="font-bold text-white">
                  Upload Selfie
                </span>
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />
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
                  ? "font-bold text-[#2bcc8d] text-xs"
                  : tab.active
                    ? "font-bold text-orange text-xs border-b-2 border-orange"
                    : "font-semibold text-black text-xs opacity-40"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">📸</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Selfie Verification
              </div>
              <div className="font-medium text-black text-sm">
                Take a clear selfie for verification
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Camera/Preview/Success content */}
            {currentScreen === "camera" ? (
              <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-black">
                    <WebcamComponent ref={webcamRef} onCapture={handleCapture} />
                  </div>
                </CardContent>
              </Card>
            ) : currentScreen === "preview" && capturedImage ? (
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-black">
                <img
                  src={capturedImage}
                  alt="Captured selfie"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : currentScreen === "success" && capturedImage ? (
              <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Selfie Uploaded Successfully!
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">
                        Your selfie has been uploaded and will be verified by our team.
                      </p>
                    </div>
                    <div className="w-full aspect-[3/4] relative rounded-lg overflow-hidden bg-black">
                      <img
                        src={capturedImage}
                        alt="Uploaded selfie"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
              <CardContent className="p-4">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">Selfie Guidelines:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure good lighting</li>
                    <li>Look directly at the camera</li>
                    <li>Keep a neutral expression</li>
                    <li>Remove glasses if possible</li>
                    <li>No filters or effects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden file input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Footer */}
      {renderFooter()}
      
      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: handleBack,
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: "Next",
          onClick: () => {
            if (currentScreen === "success") {
              navigate("/verification/kyc")
            }
          },
          disabled: currentScreen !== "success",
          color: currentScreen === "success" ? "orange-alt" : "default",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 