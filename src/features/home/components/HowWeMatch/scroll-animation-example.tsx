"use client"

import ScrollAnimation from "@/common/components/animations/ArchSlider/scroll-animation"
import type { AnimationSection } from "@/common/components/animations/ArchSlider/scroll-animation-types"


import icon_astro from '@/assets/images/animation/HowWeMatch/icon_astro.png';
import icon_economic from '@/assets/images/animation/HowWeMatch/icon_economic.png';
import icon_cultural from '@/assets/images/animation/HowWeMatch/icon_cultural.png';
import icon_spiritual from '@/assets/images/animation/HowWeMatch/icon_spiritual.png';
import icon_post from '@/assets/images/animation/HowWeMatch/icon_post.png';
import icon_welcome from '@/assets/images/animation/HowWeMatch/icon_welcome.png';


const Archslider: AnimationSection[] = [
  {
    id: "welcome",
    title: "Welcome to Vedic Marriage",
    description: "Let's understand how Vedic Marriage finds perfect match for you",
    buttonText: "Start Journey",
    buttonHref: "#welcome",
    mainImage: "/images/pre_2_card.jpg",
    overlayImage: "/images/welcome_pic1.png",
    icon: icon_welcome,
    gradientColor: "#3b82f6",
    cardColor: "#f8f4e6",
  },
  {
    id: "horoscope",
    title: "Horoscope Matching",
    description: "Traditional Vedic astrology compatibility analysis for deeper spiritual connection.",
    buttonText: "Learn more",
    buttonHref: "#horoscope",
    mainImage: "/images/1_horroscope_card.jpg",
    overlayImage: "/images/astro.png",
    icon: icon_astro,
    gradientColor: "#10b981",
    cardColor: "#faf7f0",
  },
  {
    id: "economic",
    title: "Economic Compatibility",
    description: "Financial stability and lifestyle compatibility assessment for long-term harmony.",
    buttonText: "Learn more",
    buttonHref: "#economic",
    mainImage: "/images/3_economical_card.jpg",
    overlayImage: "/images/economical.png",
    icon: icon_economic,
    gradientColor: "#a855f7",
    cardColor: "#fdf6e3",
  },
  {
    id: "social-culture",
    title: "Social & Cultural Match",
    description: "Family values, traditions, and cultural background alignment for perfect harmony.",
    buttonText: "Learn more",
    buttonHref: "#social",
    mainImage: "/images/2_social_cultural_card.jpg",
    overlayImage: "/images/cultural.png",
    icon: icon_cultural,
    gradientColor: "#ec4899",
    cardColor: "#fef7f0",
  },
  {
    id: "spiritual",
    title: "Spiritual Connection",
    description: "Shared beliefs, values, and spiritual practices for deeper soul connection.",
    buttonText: "Learn more",
    buttonHref: "#spiritual",
    mainImage: "/images/4_spiritual_card.jpg",
    overlayImage: "/images/spiritual.png",
    icon: icon_spiritual,
    gradientColor: "#f87171",
    cardColor: "#faf8f3",
  },
  {
    id: "home",
    title: "Complete Profile",
    description: "Comprehensive matching combining all aspects for your perfect life partner.",
    buttonText: "Get Started",
    buttonHref: "#home",
    mainImage: "/images/post_prefinal_card.jpg",
    overlayImage: "/images/post.png",
    icon: icon_post,
    gradientColor: "#84cc16",
    cardColor: "#f9f6f1",
  },
]

export default function ScrollAnimationExample() {
  return (
    <div className="w-full">
      <ScrollAnimation title="How We Match" sections={Archslider} radius={350} className="my-8" />
    </div>
  )
}
