/**
 * @fileOverview Type definitions for platform-wide analytics and monitoring.
 */

export interface TrafficAnalytics {
  activeUsers: number;
  pageViews: number;
  sessionDuration: number; // in seconds
  bounceRate: number; // percentage
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geoBreakdown: {
    country: string;
    users: number;
    percentage: number;
  }[];
  hourlyTraffic: {
    hour: string;
    sessions: number;
    views: number;
  }[];
}

export interface SeoAnalytics {
  indexedPages: number;
  clickThroughRate: number;
  avgPosition: number;
  backlinks: number;
  topKeywords: { 
    keyword: string; 
    position: number; 
    clicks: number; 
    impressions: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  trends: { 
    date: string; 
    clicks: number; 
    impressions: number;
  }[];
}
