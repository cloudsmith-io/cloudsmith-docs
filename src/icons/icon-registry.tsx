import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { MenuIcon } from './svgs/Menu';
import { ChevronIcon } from './svgs/Chevron';
import { ArrowIcon } from './svgs/Arrow';
import { SearchIcon } from './svgs/Search';
import { UtilityDocumentationIcon } from './svgs/utility/Documentation';
import { UtilityGuideIcon } from './svgs/utility/Guide';
import { UtilityApiIcon } from './svgs/utility/Api';
import { DocsDocumentationIcon } from './svgs/docs/Documentation';
import { DocsGuideIcon } from './svgs/docs/Guide';
import { DocsApiIcon } from './svgs/docs/Api';
import { DocsLinkIcon } from './svgs/docs/Link';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  menu: MenuIcon,
  chevron: ChevronIcon,
  chevronUp: (props) => <ChevronIcon {...props} id="icon-chevron-up" chevronDirection="up" />,
  chevronRight: (props) => <ChevronIcon {...props} id="icon-chevron-right" chevronDirection="right" />,
  chevronDown: (props) => <ChevronIcon {...props} id="icon-chevron-down" chevronDirection="down" />,
  chevronLeft: (props) => <ChevronIcon {...props} id="icon-chevron-left" chevronDirection="left" />,
  arrow: ArrowIcon,
  search: SearchIcon,
  'utility/documentation': UtilityDocumentationIcon,
  'utility/guide': UtilityGuideIcon,
  'utility/api': UtilityApiIcon,
  'docs/documentation': DocsDocumentationIcon,
  'docs/guide': DocsGuideIcon,
  'docs/api': DocsApiIcon,
  'docs/link': DocsLinkIcon,
});
