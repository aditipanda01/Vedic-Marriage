import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {
  Section,
  StickyViewport,
  Title,
  ImageContainer,
  RevealSection,
  GradientGlow,
  CardShell,
  CardMedia,
  MainImage,
  CardFooter,
  IconContainer,
  IconWrapper,
  ArcIcon,
} from './Archslider2.styles';

type ArchCard = {
  mainImage: string;
  overlayImage?: string;
  title?: string;
  description?: string;
  gradientColor?: string;
};

type ArchIconItem = {
  type: 'image' | 'emoji';
  srcOrEmoji: string;
  alt?: string;
};

type Archslider2Props = {
  title?: string;
  backgroundImage?: string;
  cards: ArchCard[];
  icons: ArchIconItem[];
  radius?: number;
  startOffsetPx?: number; // optional dynamic start offset relative to trigger
  distancePx?: number; // optional dynamic distance to control end window
};

const Archslider2: React.FC<Archslider2Props> = ({
  title: headerTitle = 'How we Match?',
  backgroundImage,
  cards,
  icons,
  radius = 350,
  startOffsetPx,
  distancePx,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const iconWrappers = containerRef.current.querySelectorAll('.s2-icon-wrapper');
    const iconsSelector = containerRef.current.querySelectorAll('.s2-arc-icon');
    const imagesSelector = containerRef.current.querySelectorAll('.s2-section-reveal-anm');
    const totalIcons = iconsSelector.length;
    if (totalIcons === 0 || imagesSelector.length === 0) {
      return () => {};
    }

    // reference-like init
    gsap.set(imagesSelector, { opacity: 0 });
    if (imagesSelector[0]) gsap.set(imagesSelector[0], { opacity: 1 });
    gsap.set(iconsSelector, { opacity: 0 });
    if (iconsSelector[0]) gsap.set(iconsSelector[0], { opacity: 1, scale: 1.25 });
    if (iconsSelector[1]) gsap.set(iconsSelector[1], { opacity: 0.35, scale: 0.9 });
    if (iconsSelector[2]) gsap.set(iconsSelector[2], { opacity: 0.35, scale: 0.9 });

    const setIconPositions = (progress: number) => {
      iconWrappers.forEach((wrapper, index) => {
        const startAngle = -90 * (Math.PI / 180);
        const arcLength = 1.2;
        const angle = startAngle + (index / (totalIcons - 1)) * arcLength - progress * arcLength;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(wrapper, { x, y, rotation: 0 });
      });
    };

    let currentVisibleIndex = -1;
    const updateVisibleImage = (closestIndex: number) => {
      if (closestIndex === currentVisibleIndex) return;
      currentVisibleIndex = closestIndex;

      imagesSelector.forEach((section, idx) => {
        const gradientDiv = (section as HTMLElement).querySelector('.s2-changeBlockGradient') as HTMLElement | null;
        if (idx !== closestIndex) {
          gsap.to(section, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.out' });
          if (gradientDiv) gsap.to(gradientDiv, { backgroundColor: 'transparent', duration: 0.3 });
        } else {
          gsap.to(section, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          const cardGradient = cards[idx]?.gradientColor;
          if (gradientDiv && cardGradient) gsap.to(gradientDiv, { backgroundColor: cardGradient, duration: 0.5 });
        }
      });

      iconsSelector.forEach((icon, idx) => {
        const distance = Math.abs(idx - closestIndex);
        const isInWindow = distance <= 2;
        gsap.to(icon, {
          opacity: isInWindow ? (idx === closestIndex ? 1 : 0.35) : 0,
          scale: idx === closestIndex ? 1.25 : isInWindow ? 0.9 : 0.7,
          duration: 0.4,
          ease: 'power2.out',
          onStart: function onStart() {
            (icon as HTMLElement).style.pointerEvents = isInWindow ? 'auto' : 'none';
          },
        });
      });
    };

    setIconPositions(0);

    const tween = gsap.to({}, {
      scrollTrigger: {
        id: 'ArchSlider2',
        trigger: sectionRef.current,
        start: () => (typeof startOffsetPx === 'number' ? `top+=${startOffsetPx} top` : 'top top'),
        end: () => (typeof distancePx === 'number' ? `+=${distancePx}` : 'bottom bottom'),
        scrub: 50,
        snap: {
          snapTo: (progress: number) => {
            const snapPoints = Array.from({ length: totalIcons }, (_, i) => i / (totalIcons - 1));
            return gsap.utils.snap(snapPoints, progress);
          },
          duration: 0.3,
          directional: true,
        },
        onUpdate: (self) => {
          setIconPositions(self.progress);
          // choose closest icon to viewport center
          let closestIndex = -1;
          let minDistance = Infinity;
          iconsSelector.forEach((icon, index) => {
            const rect = (icon as HTMLElement).getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(window.innerWidth / 2 - centerX, window.innerHeight / 2 - centerY);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });
          updateVisibleImage(closestIndex);
        },
      },
    });

    // interactions
    // event handlers with proper cleanup
    const onEnters: Array<(e: Event) => void> = [];
    const onLeaves: Array<(e: Event) => void> = [];
    const onClicks: Array<(e: Event) => void> = [];

    iconsSelector.forEach((icon, index) => {
      const el = icon as HTMLElement;
      const handleEnter = () => gsap.to(el, { scale: 1.1, duration: 0.3, ease: 'back.out' });
      const handleLeave = () => gsap.to(el, { scale: 1.0, duration: 0.3, ease: 'back.out' });
      const handleClick = () => {
        const targetProgress = index / Math.max(1, totalIcons - 1);
        const st = ScrollTrigger.getById('ArchSlider2') as ScrollTrigger | null;
        if (st) {
          const targetScroll = st.start + targetProgress * (st.end - st.start);
          const scroller = (st.scroller as Element) || window;
          gsap.to(scroller, {
            duration: 1,
            scrollTo: { y: targetScroll, autoKill: false },
            ease: 'power2.inOut',
          });
        }
      };
      onEnters.push(handleEnter);
      onLeaves.push(handleLeave);
      onClicks.push(handleClick);
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
      el.addEventListener('click', handleClick);
    });

    return () => {
      // remove event listeners
      iconsSelector.forEach((icon, i) => {
        const el = icon as HTMLElement;
        el.removeEventListener('mouseenter', onEnters[i]);
        el.removeEventListener('mouseleave', onLeaves[i]);
        el.removeEventListener('click', onClicks[i]);
      });
      // kill only our trigger
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [cards, icons, radius]);

  return (
    <Section ref={sectionRef} id="s2-animation-section">
      <StickyViewport>
        <Title>{headerTitle}</Title>
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageContainer style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}>
            {cards.map((card, i) => (
              <RevealSection key={i} className="s2-section-reveal-anm">
                <GradientGlow className="s2-changeBlockGradient" />
                <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CardShell>
                    <CardMedia>
                      <MainImage src={card.mainImage} alt={card.title || ''} />
                    </CardMedia>
                    <CardFooter>
                      {card.title && <div style={{ fontWeight: 700 }}>{card.title}</div>}
                      {card.description && <div style={{ color: '#4b5563' }}>{card.description}</div>}
                    </CardFooter>
                  </CardShell>
                </section>
              </RevealSection>
            ))}
          </ImageContainer>

          <IconContainer className="s2-iconContainer">
            {icons.map((item, i) => (
              <IconWrapper key={i} className="s2-icon-wrapper">
                <ArcIcon className="s2-arc-icon">
                  {item.type === 'emoji' ? (
                    <span style={{ fontSize: '1.5rem' }}>{item.srcOrEmoji}</span>
                  ) : (
                    <img src={item.srcOrEmoji} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                </ArcIcon>
              </IconWrapper>
            ))}
          </IconContainer>
        </div>
      </StickyViewport>
    </Section>
  );
};

export default Archslider2;


