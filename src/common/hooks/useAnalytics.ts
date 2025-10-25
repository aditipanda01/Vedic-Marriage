import { useCallback } from 'react';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Implement your analytics tracking logic here
    // Example: Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', event);
  }, []);

  const trackPageView = useCallback((path: string) => {
    // Implement page view tracking logic here
    console.log('Page View:', path);
  }, []);

  return {
    trackEvent,
    trackPageView,
  };
} 