import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { ChevronDownIcon } from './svgs/ChevronDown';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  chevronDown: ChevronDownIcon,
});
