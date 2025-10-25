import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ResourcesSection = styled.section`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, 
    ${theme.colors.background.paper} 0%, 
    rgba(255, 249, 240, 0.8) 50%, 
    rgba(255, 245, 230, 0.9) 100%
  );
  padding: clamp(2rem, 5vw, 3rem) 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 184, 0, 0.03) 0%, transparent 50%),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23FF6B35" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    pointer-events: none;
    animation: floatingBackground 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg at 50% 50%, 
      transparent 0deg,
      rgba(255, 107, 53, 0.01) 60deg,
      transparent 120deg,
      rgba(255, 184, 0, 0.01) 180deg,
      transparent 240deg,
      rgba(114, 47, 55, 0.01) 300deg,
      transparent 360deg
    );
    animation: rotateGradient 60s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
  
  @keyframes floatingBackground {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.02); }
  }
  
  @keyframes rotateGradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Reduced height - Mobile First Responsive Design */
  @media (max-width: 280px) {
    padding: 1.5rem 0;
  }
  
  @media (min-width: 281px) and (max-width: 320px) {
    padding: 1.75rem 0;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    padding: 2rem 0;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 2.25rem 0;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 2.5rem 0;
  }
  
  @media (min-width: 1025px) and (max-width: 1440px) {
    padding: 2.75rem 0;
  }
  
  @media (min-width: 1441px) and (max-width: 1920px) {
    padding: 3rem 0;
  }
  
  @media (min-width: 1921px) {
    padding: 3.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  /* Dynamic padding for all screen sizes */
  padding: 0 clamp(0.75rem, 4vw, 2rem);
  
  @media (max-width: 320px) {
    padding: 0 0.75rem;
    max-width: 100%;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    padding: 0 1rem;
    max-width: 100%;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0 1.25rem;
    max-width: 100%;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 1.5rem;
    max-width: 1000px;
  }
  
  @media (min-width: 1025px) and (max-width: 1440px) {
    padding: 0 1.75rem;
    max-width: 1200px;
  }
  
  @media (min-width: 1441px) and (max-width: 1920px) {
    padding: 0 2rem;
    max-width: 1400px;
  }
  
  @media (min-width: 1921px) {
    padding: 0 2.5rem;
    max-width: 1600px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  
  @media (max-width: 320px) {
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    margin-bottom: 1.75rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 2.25rem;
  }
  
  @media (min-width: 1025px) {
    margin-bottom: 2.5rem;
  }
`;

export const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: ${theme.typography.h2.fontWeight};
  background: linear-gradient(135deg, 
    ${theme.colors.text.primary} 0%, 
    ${theme.colors.primary.main} 50%, 
    ${theme.colors.secondary.main} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  position: relative;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.02em;
  animation: shimmerText 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: radial-gradient(circle, ${theme.colors.primary.main}20 0%, transparent 70%);
    border-radius: 50%;
    animation: floatingGlow 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: clamp(-0.5rem, -2vw, -0.75rem);
    left: 50%;
    transform: translateX(-50%);
    width: clamp(3.125rem, 10vw, 5rem);
    height: clamp(0.125rem, 0.5vw, 0.1875rem);
    background: linear-gradient(90deg, 
      transparent 0%,
      ${theme.colors.primary.main} 20%, 
      ${theme.colors.secondary.main} 50%,
      ${theme.colors.wine.main} 80%,
      transparent 100%
    );
    border-radius: 2px;
    animation: expandLine 2s ease-in-out infinite;
  }
  
  @keyframes shimmerText {
    0%, 100% { filter: brightness(1) saturate(1); }
    50% { filter: brightness(1.1) saturate(1.2); }
  }
  
  @keyframes floatingGlow {
    0%, 100% { 
      transform: translateX(-50%) translateY(0px); 
      opacity: 0.3;
    }
    50% { 
      transform: translateX(-50%) translateY(-5px); 
      opacity: 0.6;
    }
  }
  
  @keyframes expandLine {
    0%, 100% { transform: translateX(-50%) scaleX(1); }
    50% { transform: translateX(-50%) scaleX(1.2); }
  }
  
  @media (max-width: 320px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    
    &::after {
      width: 50px;
      height: 2px;
      bottom: -8px;
    }
  }
  
  @media (min-width: 1025px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    
    &::after {
      width: 80px;
      height: 3px;
      bottom: -12px;
    }
  }
`;

export const Subtitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: ${theme.colors.text.secondary};
  max-width: clamp(300px, 80vw, 700px);
  margin: 0 auto;
  line-height: clamp(1.4, 2vw, 1.6);
  padding: 0 clamp(0.5rem, 2vw, 1rem);
  
  @media (max-width: 320px) {
    font-size: 0.9rem;
    line-height: 1.4;
    max-width: 300px;
    padding: 0 0.5rem;
  }
  
  @media (min-width: 1025px) {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 700px;
    padding: 0;
  }
`;

export const SwiperContainer = styled.div`
  position: relative;
  padding: clamp(0.75rem, 3vw, 1.5rem) 0 clamp(1.5rem, 4vw, 2rem) 0;
  margin: 0 clamp(-1rem, -4vw, -2rem);
  width: calc(100% + clamp(2rem, 8vw, 4rem));
  
  .swiper {
    padding: clamp(0.4rem, 2vw, 0.75rem) 0 clamp(1.5rem, 5vw, 2.5rem) 0;
    overflow: visible;
    width: 100%;
  }
  
  .swiper-slide {
    height: auto;
    transition: transform 0.3s ease;
    width: clamp(280px, 85vw, 320px) !important;
    
    @media (min-width: 569px) {
      width: clamp(300px, 45vw, 350px) !important;
    }
    
    @media (min-width: 1025px) {
      width: clamp(280px, 30vw, 320px) !important;
    }
    
    @media (min-width: 1441px) {
      width: clamp(260px, 22vw, 300px) !important;
    }
  }
  
  .swiper-pagination {
    bottom: 0 !important;
    
    .swiper-pagination-bullet {
      background: ${theme.colors.primary.main};
      opacity: 0.3;
      width: clamp(8px, 2vw, 12px);
      height: clamp(8px, 2vw, 12px);
      margin: 0 clamp(3px, 1vw, 6px);
      transition: all 0.3s ease;
      
      &.swiper-pagination-bullet-active {
        opacity: 1;
        transform: scale(clamp(1.1, 1.5vw, 1.3));
      }
    }
  }
`;

export const ResourceCard = styled.div<{ $isActive: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: clamp(1rem, 3vw, 1.5rem);
  padding: 0;
  margin: 0;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: clamp(18.75rem, 35vw, 22.5rem);
  transform-style: preserve-3d;
  perspective: 1000px;
  
  transform: ${({ $isActive }) => $isActive 
    ? 'scale(1.02) rotateY(2deg) rotateX(2deg)' 
    : 'scale(0.98) rotateY(0deg) rotateX(0deg)'
  };
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 107, 53, 0.03) 0%, 
      rgba(255, 184, 0, 0.02) 50%, 
      rgba(114, 47, 55, 0.03) 100%
    );
    opacity: 0;
    transition: opacity 0.6s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(255, 107, 53, 0.1) 90deg,
      transparent 180deg,
      rgba(255, 184, 0, 0.1) 270deg,
      transparent 360deg
    );
    opacity: 0;
    animation: rotateCardGradient 8s linear infinite;
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover {
    transform: scale(1.05) rotateY(-5deg) rotateX(5deg) translateZ(20px);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.15),
      0 12px 35px rgba(0, 0, 0, 0.1),
      0 4px 15px rgba(0, 0, 0, 0.08),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 107, 53, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 0.5;
    }
  }
  
  &:active {
    transform: scale(1.02) rotateY(-2deg) rotateX(2deg) translateZ(10px);
    transition: all 0.2s ease;
  }
  
  @keyframes rotateCardGradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 320px) {
    border-radius: 16px;
    margin: 0;
    min-height: 300px;
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.01)' : 'scale(0.99)'};
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  @media (min-width: 1025px) {
    border-radius: 24px;
    margin: 0;
    min-height: 360px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: clamp(8.75rem, 18vw, 10.625rem);
  overflow: hidden;
  border-radius: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) 0 0;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg, 
      rgba(255, 107, 53, 0.1) 0%, 
      transparent 30%,
      transparent 70%,
      rgba(255, 184, 0, 0.1) 100%
    );
    opacity: 0;
    transition: all 0.6s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
      linear-gradient(45deg, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 3;
    opacity: 0;
    transition: all 0.6s ease;
  }
  
  ${ResourceCard}:hover & {
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

export const ResourceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  filter: brightness(1) contrast(1) saturate(1);
  transform-origin: center;
  z-index: 0;
  
  ${ResourceCard}:hover & {
    transform: scale(1.1) rotate(1deg);
    filter: brightness(1.1) contrast(1.05) saturate(1.1);
  }
  
  ${ResourceCard}:active & {
    transform: scale(1.05) rotate(0deg);
    transition: all 0.2s ease;
  }
`;

export const CategoryBadge = styled.span`
  position: absolute;
  top: clamp(0.75rem, 2vw, 1rem);
  left: clamp(0.75rem, 2vw, 1rem);
  background: linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%);
  color: ${theme.colors.background.default};
  padding: clamp(0.25rem, 1vw, 0.4rem) clamp(0.5rem, 2vw, 0.8rem);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  font-weight: 600;
  z-index: 4;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
  transition: all 0.4s ease;
  transform: translateY(0);
  
  ${ResourceCard}:hover & {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 24px rgba(255, 107, 53, 0.4);
  }
`;

export const PDFIcon = styled.div`
  position: absolute;
  top: clamp(0.75rem, 2vw, 1rem);
  right: clamp(0.75rem, 2vw, 1rem);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  color: ${theme.colors.primary.main};
  padding: clamp(0.4rem, 1.5vw, 0.6rem);
  border-radius: 50%;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 4;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform: rotate(0deg) scale(1);
  
  svg {
    width: clamp(1rem, 3vw, 1.25rem);
    height: clamp(1rem, 3vw, 1.25rem);
    transition: all 0.4s ease;
  }
  
  ${ResourceCard}:hover & {
    transform: rotate(10deg) scale(1.1) translateY(-2px);
    box-shadow: 
      0 12px 35px rgba(0, 0, 0, 0.15),
      0 6px 18px rgba(0, 0, 0, 0.08),
      inset 0 2px 0 rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.95);
    
    svg {
      transform: scale(1.1);
      filter: drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3));
    }
  }
`;

export const CardContent = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 1.5vw, 0.8rem);
`;

export const ResourceTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 320px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 1025px) {
    font-size: 1.4rem;
  }
`;

export const ResourceDescription = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(0.85rem, 2.8vw, 1rem);
  line-height: clamp(1.4, 2vw, 1.6);
  color: ${theme.colors.text.secondary};
  margin: 0;
  flex: 1;
  overflow-wrap: break-word;
  
  @media (max-width: 320px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
  
  @media (min-width: 1025px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

export const ReadMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  background: linear-gradient(135deg, transparent 0%, rgba(255, 107, 53, 0.05) 100%);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: clamp(0.5rem, 1.5vw, 0.75rem);
  color: ${theme.colors.primary.main};
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  margin-top: auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 107, 53, 0.1) 50%, 
      transparent 100%
    );
    transition: left 0.6s ease;
  }
  
  svg {
    width: clamp(1rem, 3vw, 1.125rem);
    height: clamp(1rem, 3vw, 1.125rem);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }
  
  &:hover {
    color: ${theme.colors.primary.dark};
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.15) 100%);
    border-color: rgba(255, 107, 53, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.2);
    
    &::before {
      left: 100%;
    }
    
    svg {
      transform: translateX(4px) scale(1.1);
      filter: drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3));
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: all 0.1s ease;
  }
  
  @media (max-width: 320px) {
    font-size: 0.9rem;
    gap: 0.5rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (min-width: 1025px) {
    font-size: 1rem;
    gap: 0.75rem;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => $direction === 'prev' 
    ? `left: clamp(-60px, -8vw, -20px);` 
    : `right: clamp(-60px, -8vw, -20px);`}
  transform: translateY(-50%);
  width: clamp(40px, 6vw, 50px);
  height: clamp(40px, 6vw, 50px);
  border-radius: 50%;
  background: ${theme.colors.background.default};
  border: clamp(1.5px, 0.3vw, 2px) solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: ${theme.shadows.md};
  
  svg {
    width: clamp(16px, 3vw, 20px);
    height: clamp(16px, 3vw, 20px);
  }
  
  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.background.default};
    transform: translateY(-50%) scale(clamp(1.05, 1.5vw, 1.1));
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 568px) {
    display: none;
  }
`;

export const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 0.75rem);
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  color: ${theme.colors.primary.main};
  text-decoration: none;
  margin: clamp(1rem, 3vw, 1.5rem) auto 0;
  padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 3vw, 1.5rem);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: clamp(8px, 2vw, 12px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${theme.colors.primary.main};
    transition: left 0.3s ease;
    z-index: -1;
  }
  
  svg {
    width: clamp(18px, 3vw, 20px);
    height: clamp(18px, 3vw, 20px);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${theme.colors.background.default};
    transform: translateY(-2px);
    
    &::before {
      left: 0;
    }
    
    svg {
      transform: translateX(4px);
    }
  }
`;
