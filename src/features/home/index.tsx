import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { HomeContainer } from './Home.styles';
import { useHomeAnimations } from './hooks/useHomeAnimations';
import { LoadingSpinner } from '@/common/components/ui/loading-spinner/index';
import Features from './components/Features';
import HowWeMatch from './components/HowWeMatch';
const Hero = lazy(() => import('./components/Hero'));
const Resources = lazy(() => import('./components/Resources'));
const Testimonials = lazy(() => import('./components/Testimonials'));

const Home = () => {
  
  const { containerVariants, controls, ref } = useHomeAnimations();

  return (
    <HomeContainer
      ref={ref}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <Features />  
        <HowWeMatch /> 
        <Resources />
        <Testimonials />
      </Suspense>
    </HomeContainer>
  );
};

export default Home; 