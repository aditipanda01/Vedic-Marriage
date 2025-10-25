import type React from "react"

export interface AnimationSection {
  id: string
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  mainImage: string
  overlayImage: string
  icon: string | React.ReactNode
  gradientColor: string
  cardColor?: string
}

export interface ScrollAnimationProps {
  title?: string
  sections: AnimationSection[]
  backgroundImage?: string
  radius?: number
  className?: string
  startOffsetPx?: number
  distancePx?: number
}