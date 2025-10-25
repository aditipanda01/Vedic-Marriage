"use client"

import React, { useRef, useImperativeHandle, forwardRef } from "react"
// @ts-ignore
import Webcam from "react-webcam"

interface WebcamComponentProps {
  onCapture: (imageSrc: string) => void
}

export interface WebcamComponentRef {
  capture: () => void
}

export const WebcamComponent = forwardRef<WebcamComponentRef, WebcamComponentProps>(
  ({ onCapture }, ref) => {
    const webcamRef = useRef<any>(null)

    const videoConstraints = {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "user"
    }

    const capture = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot()
        if (imageSrc) {
          onCapture(imageSrc)
        }
      }
    }

    useImperativeHandle(ref, () => ({
      capture
    }))

    return (
      <div className="w-full h-full">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
          mirrored={true}
          disablePictureInPicture={true}
          forceScreenshotSourceSize={false}
          imageSmoothing={true}
          onUserMedia={() => {}}
          onUserMediaError={() => {}}
          screenshotQuality={1}
        />
      </div>
    )
  }
) 