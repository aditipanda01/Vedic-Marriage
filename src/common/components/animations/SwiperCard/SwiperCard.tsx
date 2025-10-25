import React from 'react';
import { Swiper, SwiperSlide as SwiperSlideBase } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  SwiperContainer,
  SlideCard,
  SlideCardImgTop,
  SlideCardBody,
  SlideCardTitle,
  SlideCardText,
  StyledSwiperNavButton,
} from './SwiperCard.styles';

import img1 from './original/1.jfif';
import img2 from './original/2.jfif';
import img3 from './original/3.jfif';
import img4 from './original/4.jfif';

interface Testimonial {
  image: string;
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    image: img1,
    name: 'Ronne Galle',
    role: 'Project Manager',
    text: '“Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.”',
  },
  {
    image: img2,
    name: 'Ronne Galle',
    role: 'Project Manager',
    text: '“Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.”',
  },
  {
    image: img3,
    name: 'Ronne Galle',
    role: 'Project Manager',
    text: '“Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.”',
  },
  {
    image: img4,
    name: 'Ronne Galle',
    role: 'Project Manager',
    text: '“Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.”',
  },
];

const SwiperCard: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <SwiperContainer>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        loop
        centeredSlides
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        style={{ width: '100%', height: '100%' }}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        onSwiper={swiper => setActiveIndex(swiper.realIndex)}
      >
        {testimonials.map((testimonial, idx) => (
          <SwiperSlideBase key={idx}>
            <SlideCard $active={activeIndex === idx}>
              <SlideCardImgTop src={testimonial.image} alt={testimonial.name} />
              <SlideCardBody>
                <SlideCardTitle>
                  {testimonial.name}
                  <span> {testimonial.role}</span>
                </SlideCardTitle>
                <SlideCardText>{testimonial.text}</SlideCardText>
              </SlideCardBody>
            </SlideCard>
          </SwiperSlideBase>
        ))}
        <StyledSwiperNavButton className="swiper-button-prev" />
        <StyledSwiperNavButton className="swiper-button-next" />
      </Swiper>
    </SwiperContainer>
  );
};

export default SwiperCard;
