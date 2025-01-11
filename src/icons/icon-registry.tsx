import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { MenuIcon } from './svgs/Menu';
import { ChevronDownIcon } from './svgs/ChevronDown';
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
  chevronDown: ChevronDownIcon,
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
