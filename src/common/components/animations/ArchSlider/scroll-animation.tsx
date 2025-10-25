"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Section, Viewport, Title, ImageContainer, IconContainer } from './scroll-animation.styles'
import type { ScrollAnimationProps } from "./scroll-animation-types"

// Add GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function ScrollAnimation({
  title = "How We Match",
  sections,
  backgroundImage,
  radius = 350,
  className = "",
  startOffsetPx,
  distancePx,
}: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationSectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || sections.length === 0 || !isMounted) return

    const iconWrappers = containerRef.current.querySelectorAll(".s2-icon-wrapper")
    const iconsSelector = containerRef.current.querySelectorAll(".s2-arc-icon")
    const imagesSelector = containerRef.current.querySelectorAll(".s2-section-reveal-anm")
    const totalIcons = iconsSelector.length

    // Responsive values
    const getResponsiveRadius = () => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      return isMobile ? radius * 0.6 : isTablet ? radius * 0.8 : radius
    }

    const getCardOffset = () => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      return isMobile ? 80 : isTablet ? 100 : 120
    }

    const getCardArcHeight = () => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      return isMobile ? 15 : isTablet ? 18 : 20
    }

    // Set initial states - make sure cards are visible
    gsap.set(imagesSelector, { opacity: 0, display: 'flex' })
    if (imagesSelector[0]) gsap.set(imagesSelector[0], { opacity: 1, display: 'flex' })
    gsap.set(iconsSelector, { opacity: 0, scale: 0.5 })
    if (iconsSelector[0]) gsap.set(iconsSelector[0], { opacity: 1, scale: 1.25 })
    if (iconsSelector[1]) gsap.set(iconsSelector[1], { opacity: 0.35, scale: 0.9 })
    if (iconsSelector[2]) gsap.set(iconsSelector[2], { opacity: 0.35, scale: 0.9 })

    let currentCenterIndex = 0

    function setCardPositions(centerIndex: number) {
      const cardOffset = getCardOffset()
      const cardArcHeight = getCardArcHeight()

      imagesSelector.forEach((card, index) => {
        const distance = Math.abs(index - centerIndex)
        const maxVisible = 2

        if (distance <= maxVisible) {
          const offset = (index - centerIndex) * cardOffset
          const arcHeight = distance * distance * cardArcHeight
          const scale = index === centerIndex ? 1 : 0.7 - distance * 0.1
          const opacity = index === centerIndex ? 1 : 0.6 - distance * 0.15
          const zIndex = maxVisible - distance

          gsap.set(card, {
            x: offset,
            y: arcHeight,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex,
            rotationY: (index - centerIndex) * 15,
            display: 'flex'
          })

          const gradientDiv = card.querySelector(".s2-changeBlockGradient")
          if (gradientDiv) {
            gsap.set(gradientDiv, {
              backgroundColor:
                index === centerIndex ? sections[centerIndex]?.gradientColor || "#3b82f6" : "transparent",
            })
          }
        } else {
          gsap.set(card, { opacity: 0, scale: 0.5, display: 'none' })
        }
      })
    }

    function setIconPositions(progress: number) {
      const responsiveRadius = getResponsiveRadius()
      
      // Set icon container height and position
      if (iconContainerRef.current) {
        const imageH = imageContainerRef.current?.clientHeight ?? 400
        const arcCenterOffset = imageH / 2 + 16
        gsap.set(iconContainerRef.current, { 
          height: responsiveRadius * 2, 
          marginTop: arcCenterOffset 
        })
      }

      iconWrappers.forEach((wrapper, index) => {
        const startAngle = -90 * (Math.PI / 180)
        const arcLength = 1.2
        const angle = startAngle + (index / (totalIcons - 1)) * arcLength - progress * arcLength
        const x = Math.cos(angle) * responsiveRadius
        const y = Math.sin(angle) * responsiveRadius
        gsap.set(wrapper, { 
          x: x + responsiveRadius, 
          y: y + responsiveRadius, 
          xPercent: -50, 
          yPercent: -50, 
          rotation: 0 
        })
      })
    }

    function updateVisibleImage(closestIndex: number) {
      if (closestIndex !== currentCenterIndex) {
        currentCenterIndex = closestIndex
        const cardOffset = getCardOffset()
        const cardArcHeight = getCardArcHeight()

        // Animate cards to new positions
        imagesSelector.forEach((card, index) => {
          const distance = Math.abs(index - closestIndex)
          const maxVisible = 2

          if (distance <= maxVisible) {
            const offset = (index - closestIndex) * cardOffset
            const arcHeight = distance * distance * cardArcHeight
            const scale = index === closestIndex ? 1 : 0.7 - distance * 0.1
            const opacity = index === closestIndex ? 1 : 0.6 - distance * 0.15
            const zIndex = maxVisible - distance

            gsap.to(card, {
              x: offset,
              y: arcHeight,
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
              rotationY: (index - closestIndex) * 15,
              duration: 0.8,
              ease: "back.out(1.2)",
              display: 'flex'
            })

            const gradientDiv = card.querySelector(".s2-changeBlockGradient")
            if (gradientDiv) {
              gsap.to(gradientDiv, {
                backgroundColor:
                  index === closestIndex ? sections[closestIndex]?.gradientColor || "#3b82f6" : "transparent",
                duration: 0.6,
              })
            }

            if (index === closestIndex) {
              const springGrowElements = card.querySelectorAll(".s2-spring-grow")
              const fadeElements = card.querySelectorAll(".s2-fade-in")

              if (springGrowElements.length > 0) {
                gsap.fromTo(
                  springGrowElements,
                  { scaleY: 0, transformOrigin: "bottom" },
                  {
                    scaleY: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.3)",
                    delay: 0.2,
                  },
                )
              }

              if (fadeElements.length > 0) {
                gsap.fromTo(
                  fadeElements,
                  { opacity: 0, y: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.3,
                  },
                )
              }
            }
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.5,
              duration: 0.4,
              ease: "power2.out",
              display: 'none'
            })
          }
        })

        // Update icons
        iconsSelector.forEach((icon, idx) => {
          const distance = Math.abs(idx - closestIndex)
          const isInVisibilityWindow = distance <= 2

          gsap.to(icon, {
            opacity: isInVisibilityWindow ? (idx === closestIndex ? 1 : 0.35) : 0,
            scale: idx === closestIndex ? 1.25 : isInVisibilityWindow ? 0.9 : 0.5,
            duration: 0.4,
            ease: "back.out(1.2)",
            onStart: () => {
              ;(icon as HTMLElement).style.pointerEvents = isInVisibilityWindow ? "auto" : "none"
            },
          })
        })
      }
    }

    setCardPositions(0)
    setIconPositions(0)
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 50)

    const scrollTrigger = gsap.to({}, {
      scrollTrigger: {
        trigger: animationSectionRef.current,
        start: () => (typeof startOffsetPx === 'number' ? `top+=${startOffsetPx} top` : 'top top'),
        end: () => (typeof distancePx === 'number' ? `+=${distancePx}` : 'bottom bottom'),
        pin: pinContainerRef.current || true,
        pinSpacing: true,
        pinType: 'transform',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        id: 'HowWeMatchPin',
        scrub: 50,
        snap: {
          snapTo: (progress: number) => {
            const snapPoints = Array.from({ length: totalIcons }, (_, i) => i / (totalIcons - 1))
            return gsap.utils.snap(snapPoints, progress)
          },
          duration: 0.3,
          directional: true,
        },
        onEnter: () => {
          setIconPositions(0)
          setCardPositions(0)
          updateVisibleImage(0)
        },
        onEnterBack: () => {
          setIconPositions(0)
          setCardPositions(0)
          updateVisibleImage(0)
        },
        onUpdate: (self) => {
          const p = Math.min(1, Math.max(0, self.progress))
          setIconPositions(p)

          let closestIndex = -1
          let minDistance = Number.POSITIVE_INFINITY
          const screenCenterX = window.innerWidth / 2
          const screenCenterY = window.innerHeight / 2

          iconsSelector.forEach((icon, index) => {
            const rect = icon.getBoundingClientRect()
            const iconCenterX = rect.left + rect.width / 2
            const iconCenterY = rect.top + rect.height / 2
            const distanceToCenter = Math.sqrt(
              (screenCenterX - iconCenterX) ** 2 + (screenCenterY - iconCenterY) ** 2,
            )
            if (distanceToCenter < minDistance) {
              minDistance = distanceToCenter
              closestIndex = index
            }
          })

          if (closestIndex < 0 || !Number.isFinite(closestIndex)) {
            closestIndex = Math.round(p * Math.max(0, totalIcons - 1))
          }
          if (closestIndex < 0) closestIndex = 0
          if (closestIndex > totalIcons - 1) closestIndex = totalIcons - 1
          updateVisibleImage(closestIndex)
        },
      },
    })

    // Add event listeners to icons
    const iconEventListeners: Array<{element: HTMLElement, type: string, handler: any}> = []
    
    iconsSelector.forEach((icon, index) => {
      const iconElement = icon as HTMLElement

      const handleInteractionStart = () => {
        gsap.to(icon, {
          scale: 1.15,
          rotation: 5,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
      }

      const handleInteractionEnd = () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
      }

      const handleClick = () => {
        const targetProgress = totalIcons === 1 ? 0.5 : (index + 0.5) / totalIcons
        const section = animationSectionRef.current
        if (section) {
          const scrollAmount = targetProgress * (section.offsetHeight - window.innerHeight)
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: scrollAmount, autoKill: false },
            ease: "power2.inOut",
          })
        }
      }

      iconElement.addEventListener("mouseenter", handleInteractionStart)
      iconElement.addEventListener("mouseleave", handleInteractionEnd)
      iconElement.addEventListener("touchstart", handleInteractionStart, { passive: true })
      iconElement.addEventListener("touchend", handleInteractionEnd, { passive: true })
      iconElement.addEventListener("click", handleClick)

      // Store for cleanup
      iconEventListeners.push(
        { element: iconElement, type: "mouseenter", handler: handleInteractionStart },
        { element: iconElement, type: "mouseleave", handler: handleInteractionEnd },
        { element: iconElement, type: "touchstart", handler: handleInteractionStart },
        { element: iconElement, type: "touchend", handler: handleInteractionEnd },
        { element: iconElement, type: "click", handler: handleClick }
      )
    })

    // Handle window resize
    const handleResize = () => {
      // Update positions on resize
      setCardPositions(currentCenterIndex)
      setIconPositions(ScrollTrigger.getById('HowWeMatchPin')?.progress || 0)
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      // Kill the scroll trigger
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill()
      }
      
      // Remove all event listeners
      iconEventListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
      })
      
      // Remove resize listener
      window.removeEventListener('resize', handleResize)
      
      // Refresh ScrollTrigger
      ScrollTrigger.refresh()
    }
  }, [sections, radius, startOffsetPx, distancePx, isMounted])

  return (
    <div ref={containerRef} className={`s2-div ${className}`}>
      <Section ref={animationSectionRef} id="s2-animation-section">
        <Viewport ref={pinContainerRef}>
          <Title className="s2-fade-in">{title}</Title>
          <div className="flex flex-col items-center w-full">
            <ImageContainer
              ref={imageContainerRef}
              className="s2-image-container"
              $backgroundImage={backgroundImage}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="s2-section-reveal-anm absolute top-0 left-0 flex w-full h-full justify-center items-center rounded-xl px-2"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="s2-changeBlockGradient absolute w-full h-full rounded-xl"></div>
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="card-inner relative w-full max-w-sm rounded-2xl md:rounded-3xl shadow-lg overflow-hidden z-10 bg-white">
                      {/* Top part - Image section */}
                      <div
                        className="relative overflow-hidden"
                        style={{ backgroundColor: section.cardColor || "#f8f4e6" }}
                      >
                        <img
                          className="w-full h-40 sm:h-48 md:h-52 object-contain s2-fade-in"
                          src={section.mainImage || "/placeholder.svg"}
                          alt={section.title}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </div>

                      {/* Gap between sections - shows card background */}
                      <div className="h-3 sm:h-4" style={{ backgroundColor: section.cardColor || "#f8f4e6" }}></div>

                      {/* Bottom part - Text section */}
                      <div
                        className="px-3 sm:px-4 py-2 sm:py-3"
                        style={{ backgroundColor: section.cardColor || "#f8f4e6" }}
                      >
                        <div className="flex justify-between gap-2 sm:gap-3 items-center">
                          <div className="flex flex-col w-2/3">
                            <h2 className="text-gray-900 text-sm sm:text-base md:text-lg title-font font-semibold leading-tight s2-fade-in">
                              {section.title}
                            </h2>
                            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 mt-1 s2-fade-in">
                              {section.description}
                            </p>
                            <a href={section.buttonHref || "#"}>
                              <button className="mt-2 sm:mt-3 mb-1 text-amber-600 inline-flex items-center rounded text-xs sm:text-sm s2-fade-in font-medium">
                                {section.buttonText}
                                <svg
                                  className="w-3 h-3 sm:w-3 sm:h-3 ml-1 mt-0.5"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </button>
                            </a>
                          </div>
                          <div className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 bg-amber-400/20 p-1.5 md:p-2 rounded-full items-center justify-center s2-spring-grow">
                            <img
                              src={section.overlayImage || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Overlay icon positioned absolutely */}
                      <div className="absolute -right-2 sm:-right-3 top-2 sm:top-3 w-16 sm:w-20 md:w-24 s2-spring-grow">
                        <div className="bg-white rounded-lg shadow-lg p-1">
                          <img
                            src={section.overlayImage || "/placeholder.svg"}
                            alt="Logo"
                            className="w-full h-auto object-center object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ImageContainer>

            <IconContainer ref={iconContainerRef} className="s2-iconContainer">
              {sections.map((section, index) => (
                <div
                  key={`icon-${section.id}`}
                  className="s2-icon-wrapper cursor-pointer absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                >
                  <div
                    className="s2-arc-icon p-2 sm:p-3 md:p-4 absolute w-full h-full flex items-center justify-center shadow-md border-orange-600/30 shadow-rose-600/10 rounded-xl md:rounded-2xl bg-white touch-manipulation transition-all duration-300"
                    data-index={index + 1}
                  >
                    {typeof section.icon === "string" ? (
                      section.icon.startsWith("http") || section.icon.startsWith("/") ? (
                        <img
                          src={section.icon || "/placeholder.svg"}
                          alt={section.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-lg sm:text-xl md:text-2xl">{section.icon}</span>
                      )
                    ) : (
                      section.icon
                    )}
                  </div>
                </div>
              ))}
            </IconContainer>
          </div>
        </Viewport>
      </Section>
    </div>
  )
}