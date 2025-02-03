import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { MenuIcon } from './svgs/Menu';
import { ChevronIcon } from './svgs/Chevron';
import { ArrowIcon } from './svgs/Arrow';
import { SearchIcon } from './svgs/Search';
import { UtilityDocumentationIcon } from './svgs/utility/Documentation';
import { UtilityGuideIcon } from './svgs/utility/Guide';
import { UtilityApiIcon } from './svgs/utility/Api';
import { ActionDocumentationIcon } from './svgs/action/Documentation';
import { ActionGuideIcon } from './svgs/action/Guide';
import { ActionApiIcon } from './svgs/action/Api';
import { ActionLinkIcon } from './svgs/action/Link';
import { ActionPlayIcon } from './svgs/action/Play';
import { ActionCopyIcon } from './svgs/action/Copy';
import { ActionCheckIcon } from './svgs/action/Check';
import { ActionErrorIcon } from './svgs/action/Error';
export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  menu: MenuIcon,
  chevron: ChevronIcon,
  chevronUp: (props) => <ChevronIcon {...props} id="icon-chevron-up" chevronDirection="up" />,
  chevronRight: (props) => <ChevronIcon {...props} id="icon-chevron-right" chevronDirection="right" />,
  chevronDown: (props) => <ChevronIcon {...props} id="icon-chevron-down" chevronDirection="down" />,
  chevronLeft: (props) => <ChevronIcon {...props} id="icon-chevron-left" chevronDirection="left" />,
  arrow: ArrowIcon,
  arrowRight: (props) => <ArrowIcon {...props} id="icon-arrow-right" arrowDirection="right" />,
  arrowLeft: (props) => <ArrowIcon {...props} id="icon-arrow-left" arrowDirection="left" />,
  search: SearchIcon,
  'utility/documentation': UtilityDocumentationIcon,
  'utility/guide': UtilityGuideIcon,
  'utility/api': UtilityApiIcon,
  'action/documentation': ActionDocumentationIcon,
  'action/guide': ActionGuideIcon,
  'action/api': ActionApiIcon,
  'action/link': ActionLinkIcon,
  'action/play': ActionPlayIcon,
  'action/copy': ActionCopyIcon,
  'action/check': ActionCheckIcon,
  'action/error': ActionErrorIcon,
});
