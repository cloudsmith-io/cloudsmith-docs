import { useHotkeys } from 'react-hotkeys-hook';

import styles from './SearchForm.module.css';

export const SearchForm = ({ value, events }: SearchFormProps) => {
  const ref = useHotkeys<HTMLDivElement>(
    ['up', 'down', 'enter'],
    (_, handler) => {
      switch (handler.keys?.join('')) {
        case 'up':
          events.goUp();
          break;
        case 'down':
          events.goDown();
          break;
        case 'enter':
          events.goToResult();
          break;
      }
    },
    {
      enableOnFormTags: true,
    },
  );

  return (
    <input
      className={styles.root}
      name="search"
      type="text"
      autoFocus
      placeholder="Search"
      value={value}
      onChange={(event) => events.onChange(event.target.value)}
      required
      data-vertical-key="true"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      ref={ref}
    />
  );
};

type SearchFormProps = {
  value: string;
  events: {
    onChange: (value: string) => void;
    goUp: () => void;
    goDown: () => void;
    goToResult: () => void;
  };
};
