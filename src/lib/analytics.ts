declare global {
  interface Window {
    sa_event?: (name: string, payload?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export const trackAnalyticsEvent = (name: string, metadata?: Record<string, unknown>) => {
  const payload = {
    ...metadata,
    path: window.location.pathname,
  };

  if (window.sa_event) {
    window.sa_event(name, payload);
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: name,
      ...payload,
    });
  }
};
