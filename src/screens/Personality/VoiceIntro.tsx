"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, Mic, MicOff } from "lucide-react"
import { PersonalityService } from "@/services/personalityService"
import { toast } from "sonner"

export function VoiceIntro() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | NodeJS.Timeout | null>(null)

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      // Cleanup media recorder
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast.error("Failed to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleContinue = async () => {
    if (audioBlob) {
      setIsLoading(true)
      try {
        // Check audio blob size (limit to 10MB to prevent issues)
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (audioBlob.size > maxSize) {
          toast.error("Audio file is too large. Please record a shorter introduction (under 60 seconds).")
          setIsLoading(false)
          return
        }

        // Convert audio blob to base64 for upload using a more efficient method
        const reader = new FileReader()
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              // Remove the data URL prefix to get just the base64 string
              const base64 = reader.result.split(',')[1]
              resolve(base64)
            } else {
              reject(new Error('Failed to convert audio to base64'))
            }
          }
          reader.onerror = () => reject(new Error('Failed to read audio file'))
        })
        
        reader.readAsDataURL(audioBlob)
        const base64Audio = await base64Promise
        
        // Prepare voice intro data with safe text
        const recordingDuration = formatTime(recordingTime)
        const voiceIntroData = {
          voice_intro: `Voice introduction recorded for ${recordingDuration}. User has provided an audio introduction about themselves.`,
          audio_url: `data:audio/wav;base64,${base64Audio}` // Base64 encoded audio
        }
        
        const result = await PersonalityService.saveVoiceIntro(voiceIntroData)
        console.log('Voice intro save result:', result)
        if (result.status === 'success') {
          toast.success(result.message)
          navigate("/verification/selfie")
        } else {
          console.error('Voice intro save error:', result.error)
          toast.error(result.error || result.message)
        }
      } catch (error) {
        console.error('Error saving voice intro:', error)
        toast.error("Failed to save voice introduction. Please try again.")
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.error("Please record a voice introduction first.")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        <div className="px-4 py-6 flex flex-col gap-4">
          {/* Question header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-12">
              <div className="text-2xl">
                🎤
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-[#b8b4c4] text-xs">
                Voice Introduction
              </div>
              <div className="font-medium text-black text-sm">
                Record a brief introduction about yourself
              </div>
            </div>
          </div>

          {/* Recording section */}
          <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                {/* Recording status */}
                <div className="text-center">
                  <div className="text-2xl font-semibold text-[#ed6129]">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {isRecording ? "Recording..." : audioBlob ? "Recording saved" : "Ready to record"}
                  </div>
                </div>

                {/* Recording button */}
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#ed6129] hover:bg-[#d55624]"
                  }`}
                  disabled={isLoading}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </Button>

                {/* Recording instructions */}
                <div className="text-sm text-gray-500 text-center">
                  {isRecording ? (
                    "Click to stop recording"
                  ) : audioBlob ? (
                    "Click to record again"
                  ) : (
                    "Click the microphone to start recording"
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips section */}
          <Card className="w-full border-none shadow-none bg-[#f3f6fd]">
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Tips for a great recording:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Find a quiet place</li>
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Keep it brief (30-60 seconds)</li>
                  <li>Share what makes you unique</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: handleBack,
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: isLoading ? "Saving..." : "Next",
          onClick: handleContinue,
          disabled: !audioBlob || isLoading,
          loading: isLoading,
          loadingText: "Saving...",
          color: "orange-alt",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  )
} 