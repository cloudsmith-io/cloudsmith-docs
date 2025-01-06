import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { ChevronDownIcon } from './svgs/ChevronDown';
import { ChevronIcon } from './svgs/Chevron';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  chevronDown: ChevronDownIcon,
  chevron: ChevronIcon,
});
