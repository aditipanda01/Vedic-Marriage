import styled, { keyframes } from 'styled-components';

const borderGlowingEffect = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  opacity: 1;
  visibility: visible;
  z-index: 10;
`;

export const Title = styled.h1`
  position: sticky;
  top: 6vh;
  font-size: 2rem;
  font-weight: 600;
  color: hsl(39, 100%, 38%);
  text-align: center;
  width: 100%;
  z-index: 11;
`;

export const CardList = styled.ul`
  list-style: none;
  padding-left: 0;
  position: relative;
  width: 100%;
  height: 87vh;
  margin: 0;
  opacity: 1;
  visibility: visible;
  z-index: 12;
`;

export const Card = styled.li<{ index: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ index }) => 13 + index};
  opacity: 1;
  visibility: visible;
`;

export const CardBody = styled.div`
  height: 87vh;
  opacity: 1;
  visibility: visible;
  z-index: 17;
`;

export const CardContainer = styled.div`
  display: flex;
  height: 45vh;
  position: sticky;
  top: 12rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
  opacity: 1;
  visibility: visible;
  z-index: 18;
`;

export const CardInner = styled.div`
  position: relative;
  width: 50%;
  background: white;
  border-radius: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;
  z-index: 19;
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 36px;
    background: linear-gradient(45deg, #ff000020, #ffd70020, #ffffff, #ffd70020, #ff000020);
    background-size: 400% 400%;
    z-index: -1;
    animation: ${borderGlowingEffect} 8s linear infinite;
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 1;
  visibility: visible;
  z-index: 20;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 2rem;
  opacity: 1;
  visibility: visible;
  z-index: 21;
`;

export const TopIcon = styled.img`
  width: 3rem;
  height: 3rem;
  z-index: 22;
`;

export const ContentTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  z-index: 23;
`;

export const ContentText = styled.p`
  color: #666;
  line-height: 1.6;
  z-index: 24;
`;

export const ImageSection = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 0 36px 36px 0;
  opacity: 1;
  visibility: visible;
  z-index: 25;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  visibility: visible;
  z-index: 26;
`; 