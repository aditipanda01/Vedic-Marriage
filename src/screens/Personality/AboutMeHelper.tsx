import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function AboutMeHelper() {
  const navigate = useNavigate()
  
  // Data for writing suggestions
  const writingSuggestions = [
    {
      title: "Be Authentic",
      description: "Be yourself, and speak from the heart.",
    },
    {
      title: "Highlight Values",
      description:
        "Mention your important values, like spirituality or family.",
    },
    {
      title: "Interests and Hobbies",
      description: "Share your passions and hobbies.",
    },
    {
      title: "Lifestyle",
      description: "Capture a solo moment to keep the focus on you.",
    },
    {
      title: "Career and Goals",
      description: "Mention your profession and aspirations.",
    },
    {
      title: "Family and Relationship",
      description: "Share what you seek in a relationship.",
    },
  ]

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="w-full max-w-[390px] bg-white rounded-[24px_24px_0px_0px] overflow-hidden">
        <header className="px-4 pt-6 pb-4">
          <h2 className="font-bold text-sm text-[#b8b4c4]">
            What you can write
          </h2>
        </header>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {writingSuggestions.map((suggestion, index) => (
            <Card key={index} className="mx-[15px] border-none shadow-none">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm text-black mb-1">
                  {suggestion.title}
                </h3>
                <p className="font-normal text-xs text-black leading-5">
                  {suggestion.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 w-12 h-12 rounded-none"
          aria-label="Close"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 