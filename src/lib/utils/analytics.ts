/**
 * @fileOverview Global Analytics & Event Tracking Utility.
 * Integrated with GA4 and GTM logic for high-fidelity behavior monitoring.
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
}

/**
 * Checks for user privacy consent node.
 * Ensures compliance with GDPR/CCPA protocols before broadcasting telemetry.
 */
export const hasConsent = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('imperialpedia_cookie_consent') === 'accepted';
};

/**
 * Simple event logger for GA4 native integration.
 * Utilized for quick event broadcasts.
 */
export const logEvent = (name: string, params?: object) => {
  // TODO: AI-driven analytics to detect high-value users and interactions
  // TODO: Predictive conversion event recommendations 
  // TODO: Dynamic dashboard for admin insights tracking real-time telemetry
  
  if (hasConsent() && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
};

/**
 * Tracks a specific user interaction or system event.
 * Respects the Privacy Handshake before broadcasting to the cluster.
 */
export const trackEvent = ({ category, action, label, value, non_interaction = false }: AnalyticsEvent) => {
  // Development Logging for debugging discovery nodes
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ANALYTICS] Event: ${category} | ${action} | ${label || ''}`, value !== undefined ? `| Value: ${value}` : '');
  }
  
  // Production Handshake (GA4)
  if (hasConsent() && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: non_interaction,
      // Analytics for page load velocity, LCP, FCP, and CLS can be added here
    });
  }
};

/**
 * Tracks a page view event.
 * Synchronized with the Next.js router cycle.
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
