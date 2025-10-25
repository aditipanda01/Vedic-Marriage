import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
  ResourcesSection,
  Container,
  SectionHeader,
  Title,
  Subtitle,
  SwiperContainer,
  ResourceCard,
  ImageContainer,
  ResourceImage,
  CategoryBadge,
  PDFIcon,
  CardContent,
  ResourceTitle,
  ResourceDescription,
  ReadMoreButton,
  NavigationButton,
  ViewAllLink,
} from './Resources.styles';

export interface ResourceData {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl?: string;
  category: string;
}

interface ResourcesProps {
  title?: string;
  subtitle?: string;
  resources: ResourceData[];
  viewAllLink?: string;
}

const Resources: React.FC<ResourcesProps> = ({ 
  title = 'Sacred Marriage Resources',
  subtitle = 'Discover authentic ISKCON and Krishna-conscious marriage guidance, Vedic ceremonies, spiritual practices, and traditional wisdom for devotee couples',
  resources,
  viewAllLink = '/resources'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleReadMore = (resource: ResourceData) => {
    if (resource.downloadUrl) {
      // In a real app, this would trigger a download
      console.log(`Downloading: ${resource.title}`);
      // window.open(resource.downloadUrl, '_blank');
    }
  };

  return (
    <ResourcesSection>
      <Container>
        <SectionHeader>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </SectionHeader>

        <SwiperContainer>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={'auto'}
            centeredSlides={false}
            loop
            loopAdditionalSlides={2}
            autoplay={{
              delay: 2500,
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
              nextEl: '.resource-button-next',
              prevEl: '.resource-button-prev',
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              // Ultra small devices
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
            {resources.map((resource, index) => (
              <SwiperSlide key={resource.id}>
                <ResourceCard $isActive={activeIndex === index}>
                  <ImageContainer>
                    <ResourceImage src={resource.image} alt={resource.title} />
                    <CategoryBadge>{resource.category}</CategoryBadge>
                    <PDFIcon>
                      <FileText />
                    </PDFIcon>
                  </ImageContainer>
                  
                  <CardContent>
                    <ResourceTitle>{resource.title}</ResourceTitle>
                    <ResourceDescription>{resource.description}</ResourceDescription>
                    <ReadMoreButton onClick={() => handleReadMore(resource)}>
                      Read More
                      <ArrowRight />
                    </ReadMoreButton>
                  </CardContent>
                </ResourceCard>
              </SwiperSlide>
            ))}
          </Swiper>

          <NavigationButton $direction="prev" className="resource-button-prev">
            <ChevronLeft />
          </NavigationButton>
          <NavigationButton $direction="next" className="resource-button-next">
            <ChevronRight />
          </NavigationButton>
        </SwiperContainer>

        <ViewAllLink href={viewAllLink}>
          View All Sacred Resources
          <ArrowRight />
        </ViewAllLink>
      </Container>
    </ResourcesSection>
  );
};

export default Resources;
export { Resources };
