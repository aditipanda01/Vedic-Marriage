import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ProfileService } from "@/services/profileService"

export function KYCPreview() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Data for tabs
  const tabsData = [
    { id: "selfie", label: "Selfie Verification", completed: true },
    { id: "govt", label: "Govt ID Verification", active: true },
    { id: "privacy", label: "Privacy", disabled: true },
  ]

  useEffect(() => {
    // Get images from URL parameters
    const front = searchParams.get('front')
    const back = searchParams.get('back')
    
    if (front) setFrontImage(front)
    if (back) setBackImage(back)
  }, [searchParams])

  // Convert base64 to File object
  const base64ToFile = (base64String: string, filename: string): File => {
    try {
      console.log('Processing base64 string:', base64String.substring(0, 100))
      
      // First, decode the URL-encoded string
      const decodedString = decodeURIComponent(base64String)
      console.log('Decoded string starts with:', decodedString.substring(0, 100))
      
      let dataUrl = decodedString
      let mimeType = 'image/jpeg'
      
      // Check if it's already a data URL
      if (decodedString.startsWith('data:')) {
        // Extract mime type from data URL
        const mimeMatch = decodedString.match(/data:(.*?);/)
        if (mimeMatch) {
          mimeType = mimeMatch[1]
        }
      } else {
        // If it's not a data URL, assume it's a base64 string and add the data URL prefix
        // Try to detect the image type from the base64 content
        if (decodedString.startsWith('/9j/') || decodedString.startsWith('iVBORw0KGgo')) {
          mimeType = 'image/jpeg'
        } else if (decodedString.startsWith('iVBORw0KGgo')) {
          mimeType = 'image/png'
        } else if (decodedString.startsWith('R0lGODlh')) {
          mimeType = 'image/gif'
        } else {
          mimeType = 'image/jpeg' // default
        }
        
        dataUrl = `data:${mimeType};base64,${decodedString}`
      }
      
      console.log('Final data URL starts with:', dataUrl.substring(0, 100))
      
      const arr = dataUrl.split(',')
      if (arr.length < 2) {
        throw new Error('Invalid base64 format')
      }
      
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      
      const file = new File([u8arr], filename, { type: mimeType })
      console.log('Created file:', file.name, file.size, file.type)
      
      return file
    } catch (error) {
      console.error('Error converting base64 to file:', error)
      console.error('Original base64 string:', base64String.substring(0, 200))
      throw new Error('Invalid image format. Please try uploading the images again.')
    }
  }

  // Fallback method using canvas
  const imageToFile = (imageSrc: string, filename: string): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
          }
          
          ctx.drawImage(img, 0, 0)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], filename, { type: 'image/jpeg' })
              resolve(file)
            } else {
              reject(new Error('Could not create blob from canvas'))
            }
          }, 'image/jpeg', 0.8)
        } catch (error) {
          reject(error)
        }
      }
      
      img.onerror = () => {
        reject(new Error('Could not load image'))
      }
      
      img.src = imageSrc
    })
  }

  const handleUpload = async () => {
    if (!frontImage || !backImage) {
      alert('Both front and back images are required')
      return
    }

    setIsUploading(true)

    try {
      console.log('Front image length:', frontImage.length)
      console.log('Back image length:', backImage.length)
      console.log('Front image starts with:', frontImage.substring(0, 50))
      console.log('Back image starts with:', backImage.substring(0, 50))

      // Try to convert base64 images to File objects
      let frontFile: File
      let backFile: File

      try {
        frontFile = base64ToFile(frontImage, 'front_id.jpg')
        backFile = base64ToFile(backImage, 'back_id.jpg')
      } catch (base64Error) {
        console.log('Base64 conversion failed, trying canvas method...')
        // Fallback to canvas method
        frontFile = await imageToFile(frontImage, 'front_id.jpg')
        backFile = await imageToFile(backImage, 'back_id.jpg')
      }

      console.log('Front file created:', frontFile.name, frontFile.size, frontFile.type)
      console.log('Back file created:', backFile.name, backFile.size, backFile.type)

      // Upload both KYC documents in a single request
      const result = await ProfileService.uploadKYCDocuments(frontFile, backFile)
      if (result.status === 'error') {
        throw new Error(result.error || 'Upload failed')
      }

      // Upload successful, navigate to success page
      navigate(`/verification/kyc/success?front=${encodeURIComponent(frontImage)}&back=${encodeURIComponent(backImage)}`)
      
    } catch (error: any) {
      console.error('KYC upload error:', error)
      alert(`Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
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

          {/* Preview section */}
          <Card className="w-full border-none shadow-none">
            <CardContent className="flex flex-col items-start gap-3 p-4">
              <div className="font-bold text-black text-sm">
                Preview
              </div>
            </CardContent>
          </Card>

          {/* ID Card Images */}
          <div className="flex flex-col gap-6">
            {/* Front Image */}
            <div className="w-full h-40 relative bg-[#f3f6fd] rounded-lg overflow-hidden">
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="Government ID Card Front"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Front ID preview not available
                </div>
              )}
            </div>

            {/* Back Image */}
            <div className="w-full h-40 relative bg-[#f3f6fd] rounded-lg overflow-hidden">
              {backImage ? (
                <img
                  src={backImage}
                  alt="Government ID Card Back"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Back ID preview not available
                </div>
              )}
            </div>
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
          text: isUploading ? 'Uploading...' : 'Next',
          onClick: handleUpload,
          disabled: !frontImage || !backImage || isUploading,
          loading: isUploading,
          loadingText: 'Uploading...',
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 