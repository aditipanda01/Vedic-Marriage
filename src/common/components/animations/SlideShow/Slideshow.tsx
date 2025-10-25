import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Slideshow.css';
import {
  Container,
  Title,
  CardList,
  Card,
  CardBody,
  CardContainer,
  CardInner,
  CardContent,
  ContentSection,
  TopIcon,
  ContentTitle,
  ContentText,
  ImageSection,
  CardImage,
} from './Slideshow.styles';

import aiIcon from '@/assets/images/animation/ai.png';
import uspAi from '@/assets/images/animation/usp_ai.png';
import yagyaIcon from '@/assets/images/animation/yagya.png';
import uspVedic from '@/assets/images/animation/usp_vedic.png';
import counselIcon from '@/assets/images/animation/counsel_2.png';
import uspCounsel from '@/assets/images/animation/usp_counsel.png';
import privacyIcon from '@/assets/images/animation/privacy.png';
import uspPrivacy from '@/assets/images/animation/usp_privacy.png';

const features = [
  {
    icon: aiIcon,
    title: 'Advanced AI-Powered Matchmaking',
    text: 'Find your perfect match effortlessly with our AI-powered search—tailored to your preferences and just a click away!.',
    image: uspAi,
  },
  {
    icon: yagyaIcon,
    title: 'Rooted in Vedic Values',
    text: 'Guided by Vedic values, our expert matchmakers ensure a meaningful, tradition-aligned match.',
    image: uspVedic,
  },
  {
    icon: counselIcon,
    title: 'Comprehensive Education and Counselling',
    text: 'Vedic Marriage focuses on nurturing lasting relationships through expert pre-marital and marital education and counseling.',
    image: uspCounsel,
  },
  {
    icon: privacyIcon,
    title: 'Privacy and Trust',
    text: 'Your privacy is our priority — control your visibility, block members, and report misuse for a secure and personalized journey to your Vedic soulmate.',
    image: uspPrivacy,
  },
];

const Slideshow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   if (!containerRef.current) return;

  //   const cards = gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll('[data-gsap-card]'));
  //   const section = containerRef.current;
  //   const stackGap = 75; // px between stacked cards
  //   const cardHeight = cards[0]?.offsetHeight || 0;
  //   const total = cards.length;

  //   // Set initial state for all cards: start below the stack
  //   cards.forEach((card, idx) => {
  //     gsap.set(card, {
  //       y: cardHeight * (total - idx),
  //       opacity: 1,
  //       zIndex: 10 + idx,
  //     });
  //   });

  //   // Create a single timeline for stacking/unstacking
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       id: 'FeaturesSlideshow',
  //       trigger: section,
  //       start: 'top top',
  //       end: `+=${cardHeight * total}`,
  //       scrub: true,
  //       pin: true,
  //       anticipatePin: 1,
  //       invalidateOnRefresh: true,
  //       pinType: 'transform',
  //       scroller: window,
  //       markers: false,
  //       fastScrollEnd: true,
  //     },
  //   });

  //   cards.forEach((card, idx) => {
  //     tl.to(card, {
  //       y: stackGap * idx,
  //       duration: 1,
  //       ease: 'power1.inOut',
  //     }, idx);
  //   });

  //   return () => {
  //     // Only clean up this component's trigger/timeline
  //     tl.scrollTrigger && tl.scrollTrigger.kill();
  //     tl.kill();
  //     ScrollTrigger.refresh();
  //   };
  // }, []);

  return (
    <div className="slideshow-container" ref={containerRef}>
      <div className="slideshow-card-list">
      <div className="slideshow-title">Features that transcend</div>
      <div className='slideshow-main'>
        {features.map((feature, idx) => (
          <div key={idx} className="slideshow-card" data-index={idx} data-gsap-card>
            <div className="slideshow-card-body">
              <div className="slideshow-card-container">
                <div className="slideshow-card-inner">
                  <div className="slideshow-card-content">
                    <div className="slideshow-content-section">
                      <img src={feature.icon} alt="" className="slideshow-top-icon" />
                      <h2 className="slideshow-content-title">{feature.title}</h2>
                      <p className="slideshow-content-text">{feature.text}</p>
                    </div>
                    <div className="slideshow-image-section">
                      <img src={feature.image} alt={feature.title} className="slideshow-card-image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>

      </div>
     </div>


  );
};

export default Slideshow; 