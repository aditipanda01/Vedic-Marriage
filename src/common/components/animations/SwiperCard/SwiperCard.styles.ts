import styled from 'styled-components';

export const SwiperContainer = styled.div`
  width: 100%;
  height: 38vh;
  min-height: 33vh;
  max-height: 60vh;
  margin: 2vh 0;
  padding-top: 1vh;
  padding-bottom: 1vh;
  position: relative;
  overflow: visible;
  touch-action: pan-y;
  z-index: 10;
  opacity: 1;
  visibility: visible;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: 45vh;
    min-height: 200px;
    max-height: 350px;
    margin: 1vh 0;
    padding-top: 1.5vh;
    padding-bottom: 1.5vh;
  }
`;

export const SwiperWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  transition-property: transform;
  touch-action: pan-y;
  z-index: 11;
  opacity: 1;
  visibility: visible;
`;

export const SwiperSlide = styled.div`
  text-align: center;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 100%;
  position: relative;
  transition: transform 0.3s ease-in-out;
  z-index: 12;
  opacity: 1;
  visibility: visible;

  &.swiper-slide-active {
    transform: scale(1.2);
    z-index: 13;
  }
`;

export const SlideCard = styled.div<{ $active?: boolean }>`
  background: linear-gradient(90deg, rgba(157, 168, 238, 1) 0%, rgba(205, 227, 241, 1) 39%, rgba(255, 255, 255, 1) 99%);
  box-shadow: 6px 7px 8px -7px #8a93fb;
  margin: 0 20px;
  padding: 45px 63px;
  border-radius: 20px;
  border: 0;
  cursor: grab;
  width: 80%;
  max-width: 400px;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;
  z-index: 14;
  opacity: 1;
  visibility: visible;
  transform: scale(${({ $active }) => ($active ? 1.2 : 1)});
  transform-origin: center center;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 8px 32px rgba(52, 69, 198, 0.18), 0 1.5px 8px #8a93fb'
      : '6px 7px 8px -7px #8a93fb'};
  filter: ${({ $active }) => ($active ? 'none' : 'brightness(0.92) grayscale(0.08)')};
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    width: 90%;
    padding: 32px 16px;
  }
  @media (max-width: 600px) {
    width: 95%;
    margin: 0 5px;
    padding: 20px 4px;
  }
`;

export const SlideCardImgTop = styled.img`
  max-width: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px auto 0;
  box-shadow: 0 8px 20px -4px #8a86e8;
  object-fit: cover;
  z-index: 15;
  opacity: 1;
  visibility: visible;
`;

export const SlideCardBody = styled.div`
  z-index: 16;
  opacity: 1;
  visibility: visible;
`;

export const SlideCardTitle = styled.h5`
  color: #3345c6;
  font-size: 21px;
  margin: 15px 0;
  z-index: 17;
  opacity: 1;
  visibility: visible;

  span {
    font-size: 18px;
    color: #111;
  }
`;

export const SlideCardText = styled.p`
  font-size: 18px;
  color: #000;
  padding-bottom: 15px;
  z-index: 18;
  opacity: 1;
  visibility: visible;
`;

export const SwiperButton = styled.button<{ direction: 'prev' | 'next' }>`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 50%;
  z-index: 20;
  left: ${({ direction }) => (direction === 'prev' ? '10px' : 'auto')};
  right: ${({ direction }) => (direction === 'next' ? '10px' : 'auto')};
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
  cursor: pointer;
  opacity: 1;
  visibility: visible;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export const SwiperPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
  z-index: 19;
  opacity: 1;
  visibility: visible;
`;

export const SwiperPaginationBullet = styled.span<{ $active?: boolean }>`
  background: #fff;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  transition: opacity 0.2s;
  background: ${({ $active }) => ($active ? '#007aff' : '#fff')};
  z-index: 20;
  visibility: visible;
`;

export const Card = styled.li<{ $index: number }>`
  z-index: 21;
  opacity: 1;
  visibility: visible;
`;

export const StyledSwiperNavButton = styled.button`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 50%;
  z-index: 20;
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.swiper-button-prev {
    left: 10px;
  }
  &.swiper-button-next {
    right: 10px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  &::after {
    font-family: 'swiper-icons' !important;
    font-size: 20px;
    color: white;
  }
`;

export const StyledSwiperSlide = undefined; 