import { createIconRegistry } from './util/create-icon-registry';

import { CloseIcon } from './svgs/Close';
import { ChevronIcon } from './svgs/Chevron';

export const iconRegistry = createIconRegistry({
  close: CloseIcon,
  chevron: ChevronIcon,
  chevronUp: (props) => <ChevronIcon {...props} id="icon-chevron-up" chevronDirection="up" />,
  chevronRight: (props) => <ChevronIcon {...props} id="icon-chevron-right" chevronDirection="right" />,
  chevronDown: (props) => <ChevronIcon {...props} id="icon-chevron-down" chevronDirection="down" />,
  chevronLeft: (props) => <ChevronIcon {...props} id="icon-chevron-left" chevronDirection="left" />,
});
