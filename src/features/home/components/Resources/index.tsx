import React from 'react';
import Resources, { ResourceData } from '@/common/components/animations/Resources/Resources';

// Import images
import resource1 from '@/assets/images/animation/5.jpg';
import resource2 from '@/assets/images/animation/horoscope_1.jpg';
import resource3 from '@/assets/images/animation/6-01.jpg';
import resource4 from '@/assets/images/animation/economy_2.jpg';
import resource5 from '@/assets/images/animation/usp_vedic.png';
import resource6 from '@/assets/images/animation/thankful.png';
import resource7 from '@/assets/images/animation/indian.png';
import resource8 from '@/assets/images/animation/namaste_.png';

const defaultResources: ResourceData[] = [
  {
    id: '1',
    title: 'Sacred Fire Ceremonies in ISKCON Weddings',
    description: 'Discover the spiritual significance of Agni Hotra and sacred fire rituals in Krishna-conscious marriages according to ISKCON traditions.',
    image: resource1,
    downloadUrl: '/resources/iskcon-fire-ceremonies.pdf',
    category: 'ISKCON Rituals'
  },
  {
    id: '2',
    title: 'Vedic Astrology & Krishna Consciousness',
    description: 'Understanding how Vedic astrology aligns with Krishna consciousness principles for finding your spiritual life partner.',
    image: resource2,
    downloadUrl: '/resources/vedic-astrology-krishna.pdf',
    category: 'Spiritual Astrology'
  },
  {
    id: '3',
    title: 'Sacred Mandap & Wedding Arrangements',
    description: 'Complete guide to setting up a Krishna-conscious wedding mandap with proper Vedic arrangements and decorations.',
    image: resource3,
    downloadUrl: '/resources/mandap-arrangements.pdf',
    category: 'Wedding Setup'
  },
  {
    id: '4',
    title: 'ISKCON Marriage Guidelines',
    description: 'Official ISKCON guidelines for devotee marriages, including spiritual preparation and ceremonial procedures.',
    image: resource4,
    downloadUrl: '/resources/iskcon-marriage-guidelines.pdf',
    category: 'ISKCON Guidelines'
  },
  {
    id: '5',
    title: 'Chakra Balancing for Couples',
    description: 'Learn how to balance your spiritual energies as a couple through Vedic chakra practices and Krishna meditation.',
    image: resource5,
    downloadUrl: '/resources/chakra-balancing-couples.pdf',
    category: 'Spiritual Practice'
  },
  {
    id: '6',
    title: 'Devotional Etiquette for Couples',
    description: 'Traditional Vedic etiquette and spiritual practices for Krishna-conscious couples in their daily devotional life.',
    image: resource6,
    downloadUrl: '/resources/devotional-etiquette.pdf',
    category: 'Daily Practice'
  },
  {
    id: '7',
    title: 'Vedic Marriage Sutras & Mantras',
    description: 'Sacred Sanskrit verses, mantras, and sutras essential for authentic Vedic marriage ceremonies in ISKCON tradition.',
    image: resource7,
    downloadUrl: '/resources/marriage-sutras-mantras.pdf',
    category: 'Sacred Texts'
  },
  {
    id: '8',
    title: 'Meditation Practices for Couples',
    description: 'Joint meditation techniques and spiritual practices for couples seeking deeper Krishna consciousness together.',
    image: resource8,
    downloadUrl: '/resources/couples-meditation-guide.pdf',
    category: 'Meditation Guide'
  }
];

const ResourcesWrapper: React.FC = () => {
  return (
    <Resources 
      title="Sacred Marriage Resources"
      subtitle="Discover authentic ISKCON and Krishna-conscious marriage guidance, Vedic ceremonies, spiritual practices, and traditional wisdom for devotee couples"
      resources={defaultResources}
      viewAllLink="/resources"
    />
  );
};

export default ResourcesWrapper;
