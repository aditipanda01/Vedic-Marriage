import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { theme } from '@/styles/theme';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import {
  TestimonialsSection,
  Container,
  SectionHeader,
  Title,
  Subtitle,
  SwiperContainer,
  TestimonialCard,
  QuoteIcon,
  UserInfo,
  Avatar,
  UserDetails,
  UserName,
  UserRole,
  UserLocation,
  Rating,
  TestimonialContent,
  NavigationButton,
} from './Testimonials.styles';

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
  location: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialData[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  title = 'What Our Happy Couples Say',
  subtitle = 'Discover the love stories and success journeys of couples who found their perfect match through VedicMarriage',
  testimonials
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TestimonialsSection>
      <Container>
        <SectionHeader>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </SectionHeader>

        <SwiperContainer>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={16}
            slidesPerView={'auto'}
            centeredSlides={false}
            loop
            loopAdditionalSlides={2}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            touchRatio={1.5}
            touchAngle={45}
            grabCursor={true}
            allowTouchMove={true}
            watchOverflow={false}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: true,
              momentumRatio: 0.8,
              momentumVelocityRatio: 0.8,
            }}
            navigation={{
              nextEl: '.testimonial-button-next',
              prevEl: '.testimonial-button-prev',
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              // Ultra small devices (smartwatches, mini phones)
              0: {
                slidesPerView: 'auto',
                spaceBetween: 8,
                centeredSlides: false,
              },
              // Extra small phones (281px to 320px)
              281: {
                slidesPerView: 'auto',
                spaceBetween: 10,
                centeredSlides: false,
              },
              // Small phones (321px to 480px)
              321: {
                slidesPerView: 'auto',
                spaceBetween: 12,
                centeredSlides: false,
              },
              // Large phones (481px to 568px)
              481: {
                slidesPerView: 'auto',
                spaceBetween: 14,
                centeredSlides: false,
              },
              // Small tablets / Large phones landscape (569px to 768px)
              569: {
                slidesPerView: 'auto',
                spaceBetween: 16,
                centeredSlides: false,
              },
              // Tablets portrait (769px to 1024px)
              769: {
                slidesPerView: 'auto',
                spaceBetween: 18,
                centeredSlides: false,
              },
              // Tablets landscape / Small laptops (1025px to 1280px)
              1025: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
              },
              // Large laptops (1281px to 1440px)
              1281: {
                slidesPerView: 'auto',
                spaceBetween: 22,
                centeredSlides: false,
              },
              // Extra large screens (1441px to 1920px)
              1441: {
                slidesPerView: 'auto',
                spaceBetween: 24,
                centeredSlides: false,
              },
              // 4K screens (1921px to 2560px)
              1921: {
                slidesPerView: 'auto',
                spaceBetween: 26,
                centeredSlides: false,
              },
              // Ultra-wide 4K+ screens (2561px and up)
              2561: {
                slidesPerView: 'auto',
                spaceBetween: 28,
                centeredSlides: false,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard $isActive={activeIndex === index}>
                  <QuoteIcon>
                    <Quote size={32} />
                  </QuoteIcon>
                  
                  <UserInfo>
                    <Avatar src={testimonial.image} alt={testimonial.name} />
                    <UserDetails>
                      <UserName>{testimonial.name}</UserName>
                      <UserRole>{testimonial.role}</UserRole>
                      <UserLocation>{testimonial.location}</UserLocation>
                    </UserDetails>
                  </UserInfo>

                  <Rating>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill={theme.colors.secondary.main} color={theme.colors.secondary.main} />
                    ))}
                  </Rating>

                  <TestimonialContent>
                    "{testimonial.content}"
                  </TestimonialContent>
                </TestimonialCard>
              </SwiperSlide>
            ))}
          </Swiper>

          <NavigationButton $direction="prev" className="testimonial-button-prev">
            <ChevronLeft size={20} />
          </NavigationButton>
          <NavigationButton $direction="next" className="testimonial-button-next">
            <ChevronRight size={20} />
          </NavigationButton>
        </SwiperContainer>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
export { Testimonials };
