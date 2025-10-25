// Global GSAP typings for window access in embedded contexts

declare global {
  interface Window {
    gsap: typeof import('gsap').gsap;
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    ScrollToPlugin: typeof import('gsap/ScrollToPlugin').ScrollToPlugin;
  }
}

export {}


