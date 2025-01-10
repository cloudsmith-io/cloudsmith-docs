import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { ChevronDownIcon } from './svgs/ChevronDown';
import { ArrowIcon } from './svgs/Arrow';
import { DocumentationIcon } from './svgs/utility/Documentation';
import { GuideIcon } from './svgs/utility/Guide';
import { ApiReferenceIcon } from './svgs/utility/ApiReference';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  chevronDown: ChevronDownIcon,
  arrow: ArrowIcon,
  documentation: DocumentationIcon,
  guide: GuideIcon,
  apiReference: ApiReferenceIcon,
});
