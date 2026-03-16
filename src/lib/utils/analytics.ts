/**
 * @fileOverview Global Analytics & Event Tracking Utility.
 * Integrated with GA4 and GTM logic.
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Checks for user privacy consent node.
 */
export const hasConsent = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('imperialpedia_cookie_consent') === 'accepted';
};

/**
 * Simple event logger for GA4.
 */
export const logEvent = (name: string, params?: object) => {
  // TODO: AI-powered analytics insights and predictive behavior analysis
  // TODO: Personalized CTA recommendations based on user interaction
  // TODO: Dynamic dashboard for admin to monitor events
  // TODO: Analytics for page load velocity, LCP, FCP, and CLS
  
  if (hasConsent() && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
};

/**
 * Tracks a specific user interaction or system event.
 * Respects GDPR/Privacy handshake before broadcasting to the cluster.
 */
export const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
  // Development Logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ANALYTICS] Event: ${category} | ${action} | ${label || ''}`, value !== undefined ? `| Value: ${value}` : '');
  }
  
  // Production Handshake (GA4)
  if (hasConsent() && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Tracks a page view event.
 */
export const trackPageView = (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ANALYTICS] Page View: ${path}`);
  }
  
  if (hasConsent() && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-IMP-INDEX-42', {
      page_path: path,
    });
  }
};
