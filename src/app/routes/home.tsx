import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
// import SwiperCardTest from '@/common/components/animations/SwiperCard/SwiperCard';
const SwiperCard = lazy(() => import('@/common/components/animations/SwiperCard/SwiperCard'));
const Home = lazy(() => import('@/features/home'));

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test/swiper-card',
    element: <SwiperCard />,
  },
]; 