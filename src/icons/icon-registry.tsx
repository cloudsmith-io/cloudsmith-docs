import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { ChevronDownIcon } from './svgs/ChevronDown';
import { ArrowIcon } from './svgs/Arrow';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  chevronDown: ChevronDownIcon,
  arrow: ArrowIcon,
});
