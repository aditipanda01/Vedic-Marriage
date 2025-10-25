import React from 'react';
import Testimonials, { TestimonialData } from '@/common/components/animations/Testimonials/Testimonials';

// Import testimonial images
import testimonial1 from '@/assets/images/testimonials/1.jfif';
import testimonial2 from '@/assets/images/testimonials/2.jfif';
import testimonial3 from '@/assets/images/testimonials/3.jfif';
import testimonial4 from '@/assets/images/testimonials/4.jfif';

const testimonialsData: TestimonialData[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer',
    content: 'VedicMarriage helped me find my perfect match through authentic horoscope compatibility. The traditional approach with modern convenience is exactly what I was looking for.',
    image: testimonial1,
    rating: 5,
    location: 'Mumbai, India'
  },
  {
    id: '2',
    name: 'Rahul Patel',
    role: 'Business Analyst',
    content: 'The detailed matching based on family values and cultural compatibility made all the difference. Found my soulmate within 3 months!',
    image: testimonial2,
    rating: 5,
    location: 'Delhi, India'
  },
  {
    id: '3',
    name: 'Anitha Reddy',
    role: 'Doctor',
    content: 'I appreciate how VedicMarriage respects our traditions while providing a modern platform. The horoscope matching accuracy is remarkable.',
    image: testimonial3,
    rating: 5,
    location: 'Bangalore, India'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    role: 'Marketing Manager',
    content: 'The personalized approach and genuine profiles make VedicMarriage stand out. Grateful for finding my life partner through this platform.',
    image: testimonial4,
    rating: 5,
    location: 'Pune, India'
  },
  {
    id: '5',
    name: 'Kavitha Nair',
    role: 'Teacher',
    content: 'The spiritual guidance and astrological compatibility features are exceptional. VedicMarriage truly understands the essence of sacred Indian marriages.',
    image: testimonial1,
    rating: 5,
    location: 'Chennai, India'
  },
  {
    id: '6',
    name: 'Arjun Mehta',
    role: 'Finance Manager',
    content: 'Outstanding service with genuine profiles and detailed background verification. The traditional values combined with modern technology is perfect.',
    image: testimonial2,
    rating: 5,
    location: 'Ahmedabad, India'
  },
  {
    id: '7',
    name: 'Deepika Gupta',
    role: 'Chartered Accountant',
    content: 'Found my ideal partner who shares my spiritual beliefs and family values. The horoscope matching was incredibly accurate and helpful.',
    image: testimonial3,
    rating: 5,
    location: 'Kolkata, India'
  },
  {
    id: '8',
    name: 'Rohit Joshi',
    role: 'Civil Engineer',
    content: 'The platform\'s emphasis on cultural compatibility and traditional rituals made finding my life partner a blessed journey. Highly recommended!',
    image: testimonial4,
    rating: 5,
    location: 'Jaipur, India'
  },
  {
    id: '9',
    name: 'Meera Krishnan',
    role: 'Research Scientist',
    content: 'VedicMarriage\'s approach to sacred matrimony with proper Vedic principles helped me find someone who truly complements my spiritual journey.',
    image: testimonial1,
    rating: 5,
    location: 'Hyderabad, India'
  }
];

const TestimonialsWrapper: React.FC = () => {
  return (
    <Testimonials 
      title="What Our Happy Couples Say"
      subtitle="Discover the love stories and success journeys of couples who found their perfect match through VedicMarriage"
      testimonials={testimonialsData}
    />
  );
};

export default TestimonialsWrapper;