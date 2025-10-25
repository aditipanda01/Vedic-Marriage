import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const TestimonialsSection = styled.section`
  position: relative;
  width: 100%;
  // background: ${theme.colors.background.gradient.primary};
  padding: 4rem 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23FF6B35" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }

  /* Mobile First Responsive Design */
  @media (max-width: 280px) {
    padding: 1rem 0;
  }
  
  @media (min-width: 281px) and (max-width: 320px) {
    padding: 1.5rem 0;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    padding: 2rem 0;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 2.5rem 0;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 3rem 0;
  }
  
  @media (min-width: 1025px) and (max-width: 1440px) {
    padding: 3.5rem 0;
  }
  
  @media (min-width: 1441px) and (max-width: 1920px) {
    padding: 4rem 0;
  }
  
  @media (min-width: 1921px) and (max-width: 2560px) {
    padding: 5rem 0;
  }
  
  @media (min-width: 2561px) {
    padding: 6rem 0;
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
  
  @media (min-width: 1921px) and (max-width: 2560px) {
    padding: 0 2.5rem;
    max-width: 1600px;
  }
  
  @media (min-width: 2561px) {
    padding: 0 3rem;
    max-width: 1800px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(1.5rem, 6vw, 3rem);
  
  @media (max-width: 320px) {
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    margin-bottom: 2rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin-bottom: 2.25rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 1025px) {
    margin-bottom: 3rem;
  }
`;

export const Title = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.primary};
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  position: relative;
  line-height: 1.2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: clamp(-8px, -2vw, -10px);
    left: 50%;
    transform: translateX(-50%);
    width: clamp(40px, 8vw, 60px);
    height: clamp(2px, 0.5vw, 3px);
    background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    border-radius: 2px;
  }
  
  /* Fine-tuned responsive breakpoints */
  @media (max-width: 320px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    
    &::after {
      width: 40px;
      height: 2px;
      bottom: -8px;
    }
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
    
    &::after {
      width: 45px;
      height: 2px;
      bottom: -8px;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.9rem;
    
    &::after {
      width: 50px;
      height: 2.5px;
      bottom: -9px;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.85rem;
    margin-bottom: 0.95rem;
    
    &::after {
      width: 55px;
      height: 2.5px;
      bottom: -9px;
    }
  }
  
  @media (min-width: 1025px) {
    font-size: 2rem;
    margin-bottom: 1rem;
    
    &::after {
      width: 60px;
      height: 3px;
      bottom: -10px;
    }
  }
`;

export const Subtitle = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: ${theme.colors.text.secondary};
  max-width: clamp(280px, 80vw, 600px);
  margin: 0 auto;
  line-height: clamp(1.4, 2vw, 1.6);
  padding: 0 clamp(0.5rem, 2vw, 1rem);
  
  @media (max-width: 320px) {
    font-size: 0.875rem;
    line-height: 1.4;
    max-width: 280px;
    padding: 0 0.5rem;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.45;
    max-width: 320px;
    padding: 0 0.75rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 450px;
    padding: 0 1rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.975rem;
    line-height: 1.55;
    max-width: 550px;
    padding: 0 1rem;
  }
  
  @media (min-width: 1025px) {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 600px;
    padding: 0;
  }
`;

export const SwiperContainer = styled.div`
  position: relative;
  padding: clamp(1rem, 4vw, 2rem) 0;
  margin: 0 clamp(-1rem, -4vw, -2rem);
  width: calc(100% + clamp(2rem, 8vw, 4rem));
  
  .swiper {
    padding: clamp(0.5rem, 3vw, 1rem) 0 clamp(2rem, 6vw, 3rem) 0;
    overflow: visible;
    width: 100%;
  }
  
  .swiper-slide {
    height: auto;
    transition: transform 0.3s ease;
    width: clamp(300px, 85vw, 380px) !important;
    
    @media (min-width: 569px) {
      width: clamp(320px, 45vw, 400px) !important;
    }
    
    @media (min-width: 1025px) {
      width: clamp(300px, 30vw, 360px) !important;
    }
    
    @media (min-width: 1441px) {
      width: clamp(280px, 22vw, 340px) !important;
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
        transform: scale(clamp(1.1, 1.5vw, 1.2));
      }
    }
  }
  
  /* Responsive breakpoints for swiper container */
  @media (max-width: 320px) {
    padding: 1rem 0;
    
    .swiper {
      padding: 0.5rem 0 2rem 0;
    }
    
    .swiper-pagination .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      margin: 0 3px;
    }
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    padding: 1.2rem 0;
    
    .swiper {
      padding: 0.6rem 0 2.2rem 0;
    }
    
    .swiper-pagination .swiper-pagination-bullet {
      width: 9px;
      height: 9px;
      margin: 0 4px;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 1.4rem 0;
    
    .swiper {
      padding: 0.7rem 0 2.5rem 0;
    }
    
    .swiper-pagination .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      margin: 0 5px;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1.7rem 0;
    
    .swiper {
      padding: 0.8rem 0 2.7rem 0;
    }
    
    .swiper-pagination .swiper-pagination-bullet {
      width: 11px;
      height: 11px;
      margin: 0 5px;
    }
  }
  
  @media (min-width: 1025px) {
    padding: 2rem 0;
    
    .swiper {
      padding: 1rem 0 3rem 0;
    }
    
    .swiper-pagination .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      margin: 0 6px;
    }
  }
`;

export const TestimonialCard = styled.div<{ $isActive: boolean }>`
  background: ${theme.colors.background.default};
  border-radius: clamp(12px, 3vw, 20px);
  padding: clamp(1rem, 4vw, 2rem);
  margin: 0;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.primary.main}20;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: clamp(280px, 40vw, 320px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: clamp(2px, 0.8vw, 4px);
    background: linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  }
  
  transform: ${({ $isActive }) => $isActive ? 'scale(1.02)' : 'scale(0.98)'};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  /* Comprehensive responsive breakpoints */
  @media (max-width: 320px) {
    border-radius: 12px;
    padding: 1rem;
    margin: 0;
    min-height: 280px;
    
    &::before {
      height: 2px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.01)' : 'scale(0.99)'};
    
    &:hover {
      transform: scale(1.01);
    }
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    border-radius: 14px;
    padding: 1.2rem;
    margin: 0;
    min-height: 290px;
    
    &::before {
      height: 2.5px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.015)' : 'scale(0.985)'};
    
    &:hover {
      transform: scale(1.015);
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    border-radius: 16px;
    padding: 1.5rem;
    margin: 0;
    min-height: 300px;
    
    &::before {
      height: 3px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.018)' : 'scale(0.982)'};
    
    &:hover {
      transform: scale(1.018);
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    border-radius: 18px;
    padding: 1.7rem;
    margin: 0;
    min-height: 310px;
    
    &::before {
      height: 3.5px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.019)' : 'scale(0.981)'};
    
    &:hover {
      transform: scale(1.019);
    }
  }
  
  @media (min-width: 1025px) and (max-width: 1440px) {
    border-radius: 19px;
    padding: 1.85rem;
    margin: 0;
    min-height: 315px;
    
    &::before {
      height: 3.8px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.02)' : 'scale(0.98)'};
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  @media (min-width: 1441px) {
    border-radius: 20px;
    padding: 2rem;
    margin: 0;
    min-height: 320px;
    
    &::before {
      height: 4px;
    }
    
    transform: ${({ $isActive }) => $isActive ? 'scale(1.02)' : 'scale(0.98)'};
    
    &:hover {
      transform: scale(1.02);
    }
  }
`;

export const QuoteIcon = styled.div`
  position: absolute;
  top: clamp(0.75rem, 2vw, 1rem);
  right: clamp(0.75rem, 2vw, 1rem);
  color: ${theme.colors.primary.main};
  opacity: 0.2;
  
  svg {
    width: clamp(20px, 5vw, 32px);
    height: clamp(20px, 5vw, 32px);
  }
  
  @media (max-width: 320px) {
    top: 0.75rem;
    right: 0.75rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    top: 0.8rem;
    right: 0.8rem;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    top: 0.9rem;
    right: 0.9rem;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
  
  @media (min-width: 769px) {
    top: 1rem;
    right: 1rem;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  
  @media (max-width: 320px) {
    margin-bottom: 1rem;
    align-items: flex-start;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    margin-bottom: 1.1rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
  
  @media (min-width: 769px) {
    margin-bottom: 1.5rem;
  }
`;

export const Avatar = styled.img`
  width: clamp(45px, 8vw, 60px);
  height: clamp(45px, 8vw, 60px);
  border-radius: 50%;
  object-fit: cover;
  border: clamp(2px, 0.5vw, 3px) solid ${theme.colors.primary.main}20;
  margin-right: clamp(0.75rem, 2vw, 1rem);
  flex-shrink: 0;
  
  @media (max-width: 320px) {
    width: 45px;
    height: 45px;
    border: 2px solid ${theme.colors.primary.main}20;
    margin-right: 0.75rem;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    width: 50px;
    height: 50px;
    border: 2.5px solid ${theme.colors.primary.main}20;
    margin-right: 0.8rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    width: 55px;
    height: 55px;
    border: 2.5px solid ${theme.colors.primary.main}20;
    margin-right: 0.9rem;
  }
  
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
    border: 3px solid ${theme.colors.primary.main}20;
    margin-right: 1rem;
  }
`;

export const UserDetails = styled.div`
  flex: 1;
  min-width: 0; /* Prevents flex child from overflowing */
`;

export const UserName = styled.h4`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(1rem, 3.5vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 clamp(0.15rem, 1vw, 0.25rem) 0;
  line-height: 1.2;
  
  @media (max-width: 320px) {
    font-size: 1rem;
    margin: 0 0 0.15rem 0;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 1.1rem;
    margin: 0 0 0.18rem 0;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 0.2rem 0;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.35rem;
    margin: 0 0 0.22rem 0;
  }
  
  @media (min-width: 1025px) {
    font-size: 1.5rem;
    margin: 0 0 0.25rem 0;
  }
`;

export const UserRole = styled.p`
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  color: ${theme.colors.text.secondary};
  margin: 0 0 clamp(0.1rem, 0.5vw, 0.15rem) 0;
  line-height: 1.3;
  
  @media (max-width: 320px) {
    font-size: 0.75rem;
    margin: 0 0 0.1rem 0;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0 0 0.12rem 0;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0 0 0.13rem 0;
  }
  
  @media (min-width: 769px) {
    font-size: 0.875rem;
    margin: 0 0 0.15rem 0;
  }
`;

export const UserLocation = styled.p`
  font-size: clamp(0.7rem, 2vw, 0.75rem);
  color: ${theme.colors.primary.main};
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
  
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.72rem;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.74rem;
  }
  
  @media (min-width: 769px) {
    font-size: 0.75rem;
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.15rem, 0.5vw, 0.25rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  
  svg {
    width: clamp(12px, 3vw, 16px);
    height: clamp(12px, 3vw, 16px);
  }
  
  @media (max-width: 320px) {
    gap: 0.15rem;
    margin-bottom: 0.75rem;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    gap: 0.18rem;
    margin-bottom: 0.8rem;
    
    svg {
      width: 13px;
      height: 13px;
    }
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    gap: 0.2rem;
    margin-bottom: 0.9rem;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 0.22rem;
    margin-bottom: 0.95rem;
    
    svg {
      width: 15px;
      height: 15px;
    }
  }
  
  @media (min-width: 1025px) {
    gap: 0.25rem;
    margin-bottom: 1rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const TestimonialContent = styled.p`
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(0.85rem, 2.8vw, 1rem);
  line-height: clamp(1.4, 2vw, 1.6);
  color: ${theme.colors.text.primary};
  font-style: italic;
  margin: 0;
  flex: 1;
  overflow-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: 320px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
  
  @media (min-width: 321px) and (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.45;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.95rem;
    line-height: 1.55;
  }
  
  @media (min-width: 1025px) {
    font-size: 1rem;
    line-height: 1.6;
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

  /* Hide on smaller screens, show only on larger devices */
  @media (max-width: 568px) {
    display: none;
  }
  
  @media (min-width: 569px) and (max-width: 768px) {
    ${({ $direction }) => $direction === 'prev' ? 'left: -50px;' : 'right: -50px;'}
    width: 40px;
    height: 40px;
    border: 1.5px solid ${theme.colors.primary.main};
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    &:hover {
      transform: translateY(-50%) scale(1.05);
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    ${({ $direction }) => $direction === 'prev' ? 'left: -40px;' : 'right: -40px;'}
    width: 45px;
    height: 45px;
    border: 1.8px solid ${theme.colors.primary.main};
    
    svg {
      width: 18px;
      height: 18px;
    }
    
    &:hover {
      transform: translateY(-50%) scale(1.08);
    }
  }
  
  @media (min-width: 1025px) and (max-width: 1440px) {
    ${({ $direction }) => $direction === 'prev' ? 'left: -30px;' : 'right: -30px;'}
    width: 48px;
    height: 48px;
    border: 1.9px solid ${theme.colors.primary.main};
    
    svg {
      width: 19px;
      height: 19px;
    }
    
    &:hover {
      transform: translateY(-50%) scale(1.09);
    }
  }
  
  @media (min-width: 1441px) {
    ${({ $direction }) => $direction === 'prev' ? 'left: -20px;' : 'right: -20px;'}
    width: 50px;
    height: 50px;
    border: 2px solid ${theme.colors.primary.main};
    
    svg {
      width: 20px;
      height: 20px;
    }
    
    &:hover {
      transform: translateY(-50%) scale(1.1);
    }
  }
`;
