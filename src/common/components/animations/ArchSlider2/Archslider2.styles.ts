import styled from 'styled-components';

export const Section = styled.section`
  min-height: 300vh;
  width: 100%;
`;

export const StickyViewport = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Title = styled.h1`
  position: relative;
  bottom: 3rem;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(249,115,22);
  text-align: center;
`;

export const ImageContainer = styled.div`
  position: relative;
  bottom: 1.5rem;
  z-index: 0;
  display: flex;
  height: 400px;
  width: 400px;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const RevealSection = styled.section`
  position: absolute;
  top: 0.5rem;
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.75rem;
`;

export const GradientGlow = styled.div`
  position: absolute;
  top: -2rem;
  height: 24rem;
  width: 9rem;
  opacity: 0.5;
  filter: blur(6rem);
  z-index: -10;
`;

export const CardShell = styled.div`
  position: relative;
  width: 300px;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const CardMedia = styled.div`
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem 1rem 0.75rem;
`;

export const IconContainer = styled.div`
  position: relative;
  top: 350px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

export const ArcIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;


