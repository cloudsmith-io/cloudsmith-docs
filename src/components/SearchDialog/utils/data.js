const SEARCH_FILTER_ICONS = {
  api: 'action/api',
  check: 'action/check',
  documentation: 'action/documentation',
  format: 'format/generic',
  globe: 'globe',
  guide: 'utility/guide',
  heart: 'heart',
  info: 'info',
  integration: 'integration/githubactions',
  monitor: 'monitor',
  play: 'action/play',
  question: 'question',
  star: 'star',
  switch: 'arrowRight',
  solution: 'building',
};

export const filtersData = [
  {
    label: 'API Reference',
    icon: SEARCH_FILTER_ICONS.api,
    documentType: 'apiReference',
  },
  {
    label: 'Documentation',
    icon: SEARCH_FILTER_ICONS.documentation,
    documentType: 'documentation',
  },
  { label: 'Blog', icon: SEARCH_FILTER_ICONS.documentation, documentType: 'blog' },
  {
    label: 'Customer stories',
    icon: SEARCH_FILTER_ICONS.heart,
    documentType: 'customerStory',
  },
  { label: 'Changelog', icon: SEARCH_FILTER_ICONS.check, documentType: 'changelog' },
  { label: 'Conference', icon: SEARCH_FILTER_ICONS.question, documentType: 'conference' }, // in-person event
  { label: 'Formats', icon: SEARCH_FILTER_ICONS.format, documentType: 'format' },
  {
    label: 'Guides',
    icon: SEARCH_FILTER_ICONS.guide,
    documentType: 'reportsAndGuidesPage',
  },
  {
    label: 'Integrations',
    icon: SEARCH_FILTER_ICONS.integration,
    documentType: 'integration',
  },
  { label: 'Pricing', icon: SEARCH_FILTER_ICONS.info, documentType: 'pricingPage' },
  { label: 'Press', icon: SEARCH_FILTER_ICONS.info, documentType: 'pressRelease' },
  { label: 'Product', icon: SEARCH_FILTER_ICONS.monitor, documentType: 'productPage' },
  { label: 'Recommended', icon: SEARCH_FILTER_ICONS.star, documentType: '' },
  {
    label: 'Resources',
    icon: SEARCH_FILTER_ICONS.documentation,
    documentType: 'campaignPage',
  },
  { label: 'Solutions', icon: SEARCH_FILTER_ICONS.solution, documentType: 'solution' },
  { label: 'Switch', icon: SEARCH_FILTER_ICONS.switch, documentType: 'switchPage' },
  { label: 'Webinars', icon: SEARCH_FILTER_ICONS.play, documentType: 'webinar' },
  { label: 'Workshops', icon: SEARCH_FILTER_ICONS.question, documentType: 'workshop' },
  {
    label: 'Cloudsmith website',
    icon: SEARCH_FILTER_ICONS.globe,
    documentType: 'cloudsmithWebsite',
  },
];
