import { cx } from 'class-variance-authority';

import styles from './List.module.css';

export function List(props: ListProps) {
  if (isOrderedList(props)) {
    const { ordered, ...rest } = props;
    return <ol className={cx(styles.root, styles.ordered)} {...rest} />;
  }

  return <ul className={cx(styles.root, styles.unOrdered)} {...props} />;
}

function isOrderedList(list: ListProps): list is OrderedLists {
  return (list as OrderedLists).ordered;
}

type ListProps = UnorderedLists | OrderedLists;
type UnorderedLists = React.ComponentPropsWithoutRef<'ul'>;
type OrderedLists = React.ComponentPropsWithoutRef<'ol'> & {
  ordered: true;
};
