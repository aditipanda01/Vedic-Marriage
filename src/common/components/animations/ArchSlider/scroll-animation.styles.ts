import styled from 'styled-components';

export const Section = styled.section`
  min-height: 300vh;
  width: 100%;
  
  @media (max-width: 768px) {
    min-height: 250vh;
  }
  
  @media (max-width: 480px) {
    min-height: 200vh;
  }
`;

export const Viewport = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  position: relative;
  font-size: 1.75rem;
  font-weight: 600;
  color: rgb(249,115,22);
  text-align: center;
  margin-bottom: 1.5rem;
  z-index: 20;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const ImageContainer = styled.div<{ $backgroundImage?: string }>`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  height: 400px;
  perspective: 1000px;
  ${props => props.$backgroundImage ? `background-image: url(${props.$backgroundImage});` : ''}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  @media (max-width: 1024px) {
    height: 350px;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    max-width: 350px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
    max-width: 300px;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  z-index: 30;
  margin-top: 0;
  width: 100%;
  height: 0;
  
  @media (max-width: 1024px) {}
  
  @media (max-width: 768px) {}
  
  @media (max-width: 480px) {}
`;