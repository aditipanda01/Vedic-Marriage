// import React from 'react';
// import Archslider from './scroll-animation-example';
// import EmbeddedArchSliderExample from './embedded-archslider-example';
// const HowWeMatch: React.FC = () => {
//   return (
//     <section id="how-we-match">
//       <EmbeddedArchSliderExample />
//     </section>
//   );
// };

// export default HowWeMatch; 



import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Import images
import welcomeCard from '@/assets/Pre_2.gif';
import horoscopeCard from '@/assets/1_horroscope.gif';
import economicCard from '@/assets/3_economical.gif';
import socialCard from '@/assets/2_social_cultural.gif';
import spiritualCard from '@/assets/4_spiritual.gif';
import homeCard from '@/assets/1711639448108-Post_final (4).gif';
import hourglassBg from '@/assets/1711639448108-Post_final (4).gif';
import vedicLogo from '@/assets/loginnew.png';
import vedicLogo2 from '@/assets/favicon.png';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface MatchCard {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  icon: string;
  gradient: string;
}

const matchCards: MatchCard[] = [
  {
    id: 1,
    title: "Welcome to Vedic Marriage",
    description: "Begin your sacred journey to find your perfect life partner through ancient Vedic wisdom.",
    image: welcomeCard,
    buttonText: "Register now",
    icon: "🤝",
    gradient: "bg-gradient-welcome"
  },
  {
    id: 2,
    title: "Horoscope Matching",
    description: "Discover compatibility through detailed astrological analysis and Kundali matching.",
    image: horoscopeCard,
    buttonText: "Learn more",
    icon: "⭐",
    gradient: "bg-gradient-horoscope"
  },
  {
    id: 3,
    title: "Economic Compatibility",
    description: "Ensure financial harmony and prosperity through economic background analysis.",
    image: economicCard,
    buttonText: "Learn more",
    icon: "💰",
    gradient: "bg-gradient-economic"
  },
  {
    id: 4,
    title: "Social Culture",
    description: "Match cultural values, traditions, and social backgrounds for perfect harmony.",
    image: socialCard,
    buttonText: "Learn more",
    icon: "🏛️",
    gradient: "bg-gradient-social"
  },
  {
    id: 5,
    title: "Spiritual Connection",
    description: "Find your spiritual soulmate through shared beliefs and sacred practices.",
    image: spiritualCard,
    buttonText: "Learn more",
    icon: "🕉️",
    gradient: "bg-gradient-spiritual"
  },
  {
    id: 6,
    title: "Perfect Match Found",
    description: "Celebrate the union of two souls destined to be together in sacred matrimony.",
    image: homeCard,
    buttonText: "Get Started",
    icon: "🏠",
    gradient: "bg-gradient-home"
  }
];

const HowWeMatch: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentVisibleIndexRef = useRef(-1);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTime = useRef(0);

  // Responsive radius calculation
  const getResponsiveRadius = () => {
    const width = window.innerWidth;
    if (width < 480) return 220;      // Mobile - increased for better spacing
    if (width < 768) return 260;      // Large Mobile - increased for better spacing
    if (width < 1024) return 280;     // Tablet
    if (width < 1280) return 320;     // Small Desktop
    return 350;                       // Large Desktop
  };

  useEffect(() => {
    if (!sectionRef.current || !iconContainerRef.current) return;

    const totalIcons = matchCards.length;
    const iconWrappers = iconsRef.current;
    const cardSections = cardsRef.current;

    // Define background gradient colors
    const bgGrads = [
      '#f97316', // orange for welcome
      '#10b981', // green for horoscope  
      '#a855f7', // purple for economic
      '#059669', // emerald for social
      '#f59e0b', // amber for spiritual
      '#8b5cf6', // violet for home
    ];

    // Initialize cards and icons with responsive scaling
    const isMobile = window.innerWidth < 768;
    const activeScale = isMobile ? 1.15 : 1.25;
    const visibleScale = isMobile ? 0.85 : 0.9;
    
    // Set initial states using CSS with ultra-smooth hardware acceleration
    cardSections.forEach((section, index) => {
      if (section) {
        section.style.opacity = index === 0 ? '1' : '0';
        section.style.transform = index === 0 ? 'translate3d(0, 0px, 0) scale3d(1, 1, 1)' : 'translate3d(0, 15px, 0) scale3d(0.98, 0.98, 1)';
        section.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        section.style.zIndex = index === 0 ? '10' : '1';
        section.style.willChange = 'transform, opacity';
        section.style.backfaceVisibility = 'hidden';
        (section.style as any).WebkitBackfaceVisibility = 'hidden';
        (section.style as any).webkitFontSmoothing = 'antialiased';
        (section.style as any).WebkitTransformStyle = 'preserve-3d';
        section.style.transformStyle = 'preserve-3d';
      }
    });
    
    gsap.set(iconWrappers, { opacity: 0 });
    gsap.set(iconWrappers[0], { opacity: 1, scale: activeScale });
    gsap.set(iconWrappers[1], { opacity: 0.35, scale: visibleScale });
    gsap.set(iconWrappers[2], { opacity: 0.35, scale: visibleScale });

    // Initialize first card gradient and text colors with CSS
    if (cardSections[0]) {
      const firstGradientDiv = cardSections[0].querySelector('.gradient-bg') as HTMLElement;
      const firstTitleElement = cardSections[0].querySelector('.card-title') as HTMLElement;
      const firstButtonElement = cardSections[0].querySelector('.card-button') as HTMLElement;
      
      if (firstGradientDiv) {
        firstGradientDiv.style.backgroundColor = bgGrads[0];
        firstGradientDiv.style.opacity = '0.5';
        firstGradientDiv.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        firstGradientDiv.style.willChange = 'opacity, background-color';
        firstGradientDiv.style.backfaceVisibility = 'hidden';
      }
      
      // Set initial text colors with ultra-smooth transitions
      if (firstTitleElement) {
        firstTitleElement.style.color = bgGrads[0];
        firstTitleElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        firstTitleElement.style.willChange = 'color';
        (firstTitleElement.style as any).webkitFontSmoothing = 'antialiased';
      }
      if (firstButtonElement) {
        firstButtonElement.style.color = bgGrads[0];
        firstButtonElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        firstButtonElement.style.willChange = 'color';
        (firstButtonElement.style as any).webkitFontSmoothing = 'antialiased';
      }
    }

    // Function to calculate icon positions based on progress with responsive radius
    const setIconPositions = (progress: number) => {
      const currentRadius = getResponsiveRadius();
      iconWrappers.forEach((wrapper, index) => {
        if (wrapper) {
          const startAngle = -90 * (Math.PI / 180);
          // Optimized arc length - larger gap for mobile, smaller gap for desktop
          const arcLength = window.innerWidth < 768 ? 2.5 : 1.4;
          const angle = startAngle + (index / (totalIcons - 1)) * arcLength - progress * arcLength;
          const x = Math.cos(angle) * currentRadius;
          const y = Math.sin(angle) * currentRadius;
          gsap.set(wrapper.parentElement, {
            x: x,
            y: y,
            rotation: 0,
          });
        }
      });
    };

    // Ultra-smooth function to update visible card and icon opacities
    const updateVisibleCard = (closestIndex: number) => {
      if (closestIndex !== currentVisibleIndexRef.current) {
        const now = performance.now();
        
        // More restrictive throttle for ultra-smooth performance
        if (now - lastUpdateTime.current < 33) { // ~30fps for stability
          return;
        }
        lastUpdateTime.current = now;
        
        currentVisibleIndexRef.current = closestIndex;

        // Use double-buffered requestAnimationFrame for maximum smoothness
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            cardSections.forEach((section, idx) => {
              if (section) {
                const gradientDiv = section.querySelector('.gradient-bg') as HTMLElement;
                const titleElement = section.querySelector('.card-title') as HTMLElement;
                const buttonElement = section.querySelector('.card-button') as HTMLElement;
                
                // Use ultra-smooth hardware-accelerated transforms
                if (idx !== closestIndex) {
                  // Hide inactive cards with buttery-smooth transitions
                  section.style.opacity = '0';
                  section.style.transform = 'translate3d(0, 12px, 0) scale3d(0.98, 0.98, 1)';
                  section.style.zIndex = '1';
                  
                  if (gradientDiv) {
                    gradientDiv.style.opacity = '0';
                    gradientDiv.style.backgroundColor = 'transparent';
                    gradientDiv.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                  
                  // Ultra-smooth text color transitions
                  if (titleElement) {
                    titleElement.style.color = '#111827'; // text-gray-900
                    titleElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                  if (buttonElement) {
                    buttonElement.style.color = '#f97316'; // text-vedic-orange default
                    buttonElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                } else {
                  // Show active card with ultra-smooth transitions
                  section.style.opacity = '1';
                  section.style.transform = 'translate3d(0, 0px, 0) scale3d(1, 1, 1)';
                  section.style.zIndex = '10';
                  
                  if (gradientDiv) {
                    gradientDiv.style.opacity = '0.5';
                    gradientDiv.style.backgroundColor = bgGrads[closestIndex];
                    gradientDiv.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                  
                  // Ultra-smooth text color transitions
                  if (titleElement) {
                    titleElement.style.color = bgGrads[closestIndex];
                    titleElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                  if (buttonElement) {
                    buttonElement.style.color = bgGrads[closestIndex];
                    buttonElement.style.transition = 'color 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                  }
                }
              }
            });
          });
        });

        // Update icon opacities with responsive scaling
        iconWrappers.forEach((icon, idx) => {
          if (icon) {
            const distance = Math.abs(idx - closestIndex);
            const isInVisibilityWindow = distance <= 2;
            const isMobile = window.innerWidth < 768;
            
            // Responsive scale values
            const activeScale = isMobile ? 1.15 : 1.25;
            const visibleScale = isMobile ? 0.85 : 0.9;
            const hiddenScale = isMobile ? 0.65 : 0.7;

            gsap.to(icon, {
              opacity: isInVisibilityWindow ? (idx === closestIndex ? 1 : 0.35) : 0,
              scale: idx === closestIndex ? activeScale : isInVisibilityWindow ? visibleScale : hiddenScale,
              duration: isMobile ? 0.3 : 0.4, // Faster on mobile for better responsiveness
              ease: "power2.out",
              onStart: () => {
                if (icon.parentElement) {
                  (icon.parentElement as any).style.pointerEvents = isInVisibilityWindow ? 'auto' : 'none';
                }
              }
            });
          }
        });
      }
    };

    // Set initial positions
    setIconPositions(0);

        // Create ultra-smooth scroll trigger animation
        gsap.to({}, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: isMobile ? 1.5 : 1.8, // Slower, smoother response to eliminate jerky movements
            snap: {
              snapTo: (progress: number) => {
                const snapPoints = Array.from({ length: totalIcons }, (_, i) => i / (totalIcons - 1));
                return gsap.utils.snap(snapPoints, progress);
              },
              duration: isMobile ? 1.0 : 0.6, // Longer, smoother snapping
              directional: true,
              ease: "power2.inOut", // Smoother easing for snapping
            },
            onUpdate: (self) => {
              // Double-buffered icon position updates for ultra-smooth motion
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setIconPositions(self.progress);
                });
              });
              
              // Calculate closest index with smoother interpolation
              let closestIndex = Math.round(self.progress * (totalIcons - 1));
              closestIndex = Math.max(0, Math.min(totalIcons - 1, closestIndex));
              
              updateVisibleCard(closestIndex);
            },
            refreshPriority: -1, // Lower priority for better performance
            fastScrollEnd: true, // Prevent scroll jank
          },
        });

    // Initial animation for icons appearing
    gsap.from(iconWrappers, {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'back.out',
    });

    // Add click handlers to icons
    iconWrappers.forEach((icon, index) => {
      if (icon) {
        // Responsive hover animations
        const handleMouseEnter = () => {
          const isMobile = window.innerWidth < 768;
          gsap.to(icon, { 
            scale: isMobile ? 1.05 : 1.1, 
            duration: 0.3, 
            ease: 'back.out' 
          });
        };
        
        const handleMouseLeave = () => {
          const currentIndex = currentVisibleIndexRef.current;
          const isMobile = window.innerWidth < 768;
          const activeScale = isMobile ? 1.15 : 1.25;
          const visibleScale = isMobile ? 0.85 : 0.9;
          const hiddenScale = isMobile ? 0.65 : 0.7;
          
          const targetScale = index === currentIndex ? activeScale : (Math.abs(index - currentIndex) <= 2 ? visibleScale : hiddenScale);
          gsap.to(icon, { 
            scale: targetScale, 
            duration: 0.3, 
            ease: 'back.out' 
          });
        };
        
        const handleClick = () => {
          const targetProgress = index / (totalIcons - 1);
          const section = sectionRef.current;
          if (section) {
            // Get section's position relative to document
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top + window.pageYOffset;
            
            // Calculate the scroll distance within the section
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollableDistance = sectionHeight - viewportHeight;
            
            // Calculate target scroll position
            const targetScrollPosition = sectionTop + (targetProgress * scrollableDistance);
            
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: targetScrollPosition,
                autoKill: false,
              },
              ease: 'power2.inOut',
              onUpdate: () => {
                // Force ScrollTrigger to update during animation
                ScrollTrigger.refresh();
              }
            });
          }
        };

        icon.addEventListener('mouseenter', handleMouseEnter);
        icon.addEventListener('mouseleave', handleMouseLeave);
        icon.addEventListener('click', handleClick);

        // Cleanup
        return () => {
          icon.removeEventListener('mouseenter', handleMouseEnter);
          icon.removeEventListener('mouseleave', handleMouseLeave);
          icon.removeEventListener('click', handleClick);
        };
      }
    });

    // Handle window resize
    const handleResize = () => {
      // Debounce resize events
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        // Refresh scroll trigger to recalculate positions
        ScrollTrigger.refresh();
        
        // Reset icon positions with new responsive values
        setIconPositions(0);
        
        // Update icon scales for new screen size
        const newIsMobile = window.innerWidth < 768;
        const newActiveScale = newIsMobile ? 1.15 : 1.25;
        const newVisibleScale = newIsMobile ? 0.85 : 0.9;
        
        iconWrappers.forEach((icon, idx) => {
          if (icon && idx <= 2) {
            gsap.set(icon, {
              scale: idx === 0 ? newActiveScale : newVisibleScale
            });
          }
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resize listener
    const cleanupResize = () => {
      clearTimeout((window as any).resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };

    // Cleanup ScrollTrigger on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cleanupResize();
    };
  }, []);

  return (
    <div className="relative mt-20 sm:mt-32 md:mt-40">
      <section 
        ref={sectionRef}
        className="min-h-[200vh] sm:min-h-[250vh] md:min-h-[300vh] w-full"
      >
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <h1 
            className="relative text-center font-semibold mb-4 sm:mb-6 md:mb-8"
            style={{
              color: 'rgb(249, 115, 22)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              position: 'relative',
              bottom: 'clamp(1rem, 3vw, 3rem)',
              fontWeight: '600',
            }}
          >
            How we Match?
          </h1>
          
          <div className="flex flex-col items-center w-full max-w-7xl">
            {/* Background hourglass image - Responsive */}
            <div 
              className="relative -bottom-2 sm:-bottom-4 md:-bottom-6 -z-20 flex items-center justify-center bg-contain bg-center bg-no-repeat w-full"
              style={{ 
                backgroundImage: `url(${hourglassBg})`,
                height: 'clamp(250px, 50vw, 400px)',
                maxWidth: 'clamp(300px, 90vw, 1000px)'
              }}
            >
              {/* Cards */}
              {matchCards.map((card, index) => (
                <section
                  key={card.id}
                  ref={el => { if (el) cardsRef.current[index] = el; }}
                  className="absolute flex w-full justify-center rounded-xl"
                  style={{
                    top: 'clamp(0.5rem, 2vw, 0.5rem)'
                  }}
                >
                  <div 
                    className="gradient-bg absolute opacity-0 blur-3xl -z-10" 
                    style={{
                      top: 'clamp(-1rem, -2vw, -2rem)',
                      height: 'clamp(200px, 40vw, 320px)',
                      width: 'clamp(120px, 25vw, 192px)'
                    }}
                  />
                  
                  <div 
                    className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg mx-2 sm:mx-4"
                    style={{
                      width: 'clamp(280px, 85vw, 400px)',
                      maxWidth: '90vw'
                    }}
                  >
                    <div className="relative overflow-hidden bg-slate-100">
                      <img 
                        className="w-full object-cover rounded-t-2xl sm:rounded-t-3xl" 
                        style={{
                          height: 'clamp(140px, 30vw, 224px)'
                        }}
                        src={card.image} 
                        alt={card.title}
                      />
                    </div>
                    
                    <div 
                      className="absolute top-2 sm:top-4 bg-white rounded-lg shadow-lg p-1"
                      style={{
                        right: 'clamp(0.5rem, 2vw, 1rem)',
                        width: 'clamp(4rem, 12vw, 7rem)'
                      }}
                    >
                      <img 
                        src={vedicLogo} 
                        alt="Vedic Marriage Logo" 
                        className="w-full h-auto object-center object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex justify-between gap-2 sm:gap-4 items-center px-3 sm:px-6 pt-2 pb-3 sm:pb-4 mt-2 sm:mt-4">
                      <div className="flex flex-col flex-1">
                        <h2 
                          className="card-title text-gray-900 font-semibold mb-1 sm:mb-2 transition-colors duration-150"
                          style={{
                            fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                            lineHeight: '1.3'
                          }}
                        >
                          {card.title}
                        </h2>
                        <p 
                          className="text-gray-600 mb-2 sm:mb-4"
                          style={{
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            lineHeight: '1.4'
                          }}
                        >
                          {card.description}
                        </p>
                        <Button 
                          variant="ghost" 
                          className="card-button text-vedic-orange hover:text-vedic-orange/80 p-0 h-auto justify-start transition-colors duration-150"
                          style={{
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                          }}
                        >
                          {card.buttonText}
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>
                      </div>
                      
                      <div 
                        className="hidden sm:flex bg-vedic-orange/20 p-2 sm:p-3 rounded-full items-center justify-center"
                        style={{
                          width: 'clamp(2rem, 6vw, 3rem)',
                          height: 'clamp(2rem, 6vw, 3rem)'
                        }}
                      >
                        <img src={vedicLogo2} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Icons arranged in arc - Responsive */}
            <div 
              ref={iconContainerRef} 
              className="relative"
              style={{
                top: 'clamp(16rem, 40vw, 25rem)'
              }}
            >
              {matchCards.map((card, index) => (
                <div 
                  key={card.id} 
                  className="cursor-pointer absolute"
                  style={{
                    width: 'clamp(3rem, 8vw, 4rem)',
                    height: 'clamp(3rem, 8vw, 4rem)'
                  }}
                >
                  <div
                    ref={el => { if (el) iconsRef.current[index] = el; }}
                    className="absolute w-full h-full flex items-center justify-center shadow-md rounded-xl sm:rounded-2xl bg-white border border-vedic-orange/20 hover:border-vedic-orange/40 transition-colors"
                    style={{
                      padding: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                  >
                    <span 
                      style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                      }}
                    >
                      {card.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeMatch;
