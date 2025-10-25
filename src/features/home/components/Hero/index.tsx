import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthContext';

const HeroContainer = styled(motion.div)`
  text-align: center;
  position: relative;
  padding: 2rem 2rem 4rem 2rem;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  margin-left: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, 
    rgba(249, 115, 22, 0.05) 0%, 
    rgba(251, 146, 60, 0.08) 25%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(251, 146, 60, 0.08) 75%,
    rgba(249, 115, 22, 0.05) 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 3rem 1rem;
    min-height: 90vh;
  }
`;

const Title = styled(motion.h1)`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #f97316, #fb923c);
    border-radius: 2px;
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.7; transform: translateX(-50%) scaleX(1); }
    50% { opacity: 1; transform: translateX(-50%) scaleX(1.2); }
  }
`;

const Description = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.body};
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  line-height: 1.6;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const PrimaryButton = styled(motion(Link))`
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.3);
  border: none;
  cursor: pointer;
  min-width: 200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(249, 115, 22, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const SecondaryButton = styled(motion(Link))`
  color: ${theme.colors.text.primary};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 1rem 2.5rem;
  border: 2px solid rgba(249, 115, 22, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: #f97316;
    border-color: rgba(249, 115, 22, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(249, 115, 22, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    span {
      transform: translateX(5px);
    }
  }

  span {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

// Floating elements component
const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)<{ delay: number; size: number; left: number; top: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.2));
  border-radius: 50%;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: float ${props => 10 + props.delay}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 120px;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #f97316;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 0.9rem;
    color: ${theme.colors.text.secondary};
    margin: 0;
    opacity: 0.8;
  }
`;

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 2,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100
  }));

  return (
    <div style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
      <HeroContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <FloatingElements>
          {floatingElements.map((element) => (
            <FloatingElement
              key={element.id}
              delay={element.delay}
              size={element.size}
              left={element.left}
              top={element.top}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </FloatingElements>

        <motion.div variants={itemVariants} style={{ zIndex: 1, position: 'relative' }}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Perfect Vedic Match
          </Title>
        </motion.div>

        <Description
          variants={itemVariants}
          style={{ zIndex: 1, position: 'relative' }}
        >
          Discover meaningful connections based on ancient Vedic wisdom and modern compatibility. 
          Join thousands of souls finding their perfect life partners through our sacred journey.
        </Description>

        <ButtonGroup
          variants={itemVariants}
          style={{ zIndex: 1, position: 'relative' }}
        >
          <PrimaryButton 
            to="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Start Your Journey
          </PrimaryButton>
          <SecondaryButton 
            to={isAuthenticated ? "/dashboard" : "/login"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isAuthenticated ? "Go to Dashboard" : "Sign in"} <span aria-hidden="true">→</span>
          </SecondaryButton>
        </ButtonGroup>

        <StatsContainer
          variants={itemVariants}
          style={{ zIndex: 1, position: 'relative' }}
        >
          <StatItem
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>10K+</h3>
            <p>Happy Couples</p>
          </StatItem>
          <StatItem
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>95%</h3>
            <p>Success Rate</p>
          </StatItem>
          <StatItem
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>24/7</h3>
            <p>Support</p>
          </StatItem>
        </StatsContainer>
      </HeroContainer>
    </div>
  );
};

export default Hero; 