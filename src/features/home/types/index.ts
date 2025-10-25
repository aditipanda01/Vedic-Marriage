export interface Section {
  id: string;
  title: string;
  subtitle?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
} 