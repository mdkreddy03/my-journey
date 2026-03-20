/**
 * GLOBAL ANALYTICS TRACKER
 * Tracks entire webpage - page views, section visits, clicks, time spent
 */

export interface AnalyticsEvent {
  type: "pageview" | "section_view" | "click" | "time_spent";
  label: string;
  timestamp: number;
  duration?: number;
}

const STORAGE_KEY = "portfolio_analytics";

export const trackEvent = (type: AnalyticsEvent["type"], label: string, duration?: number) => {
  const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  events.push({ type, label, timestamp: Date.now(), duration });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const getFullAnalytics = () => {
  const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const pageViews = events.filter(e => e.type === "pageview");
  const sectionViews = events.filter(e => e.type === "section_view");
  const clicks = events.filter(e => e.type === "click");

  const uniqueDays = new Set(events.map(e => new Date(e.timestamp).toDateString()));

  // Section view counts
  const sectionCounts: Record<string, number> = {};
  sectionViews.forEach(e => { sectionCounts[e.label] = (sectionCounts[e.label] || 0) + 1; });
  const topSections = Object.entries(sectionCounts).sort((a, b) => b[1] - a[1]);

  // Click counts
  const clickCounts: Record<string, number> = {};
  clicks.forEach(e => { clickCounts[e.label] = (clickCounts[e.label] || 0) + 1; });
  const topClicks = Object.entries(clickCounts).sort((a, b) => b[1] - a[1]);

  // Views by day for chart
  const viewsByDay: Record<string, number> = {};
  pageViews.forEach(e => {
    const day = new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    viewsByDay[day] = (viewsByDay[day] || 0) + 1;
  });

  // Average session duration
  const avgActions = uniqueDays.size > 0 ? Math.round(events.length / uniqueDays.size) : 0;

  // Device/time breakdown
  const hourCounts: Record<number, number> = {};
  events.forEach(e => {
    const hour = new Date(e.timestamp).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    totalPageViews: pageViews.length,
    totalSectionViews: sectionViews.length,
    totalClicks: clicks.length,
    totalEvents: events.length,
    uniqueSessions: uniqueDays.size,
    avgActionsPerSession: avgActions,
    topSections: topSections.slice(0, 8),
    topClicks: topClicks.slice(0, 8),
    viewsByDay: Object.entries(viewsByDay).slice(-14),
    peakHour: peakHour ? `${parseInt(peakHour[0]) % 12 || 12}${parseInt(peakHour[0]) >= 12 ? "PM" : "AM"}` : "N/A",
    firstVisit: events.length > 0 ? new Date(events[0].timestamp).toLocaleDateString() : "N/A",
    lastVisit: events.length > 0 ? new Date(events[events.length - 1].timestamp).toLocaleDateString() : "N/A",
  };
};
