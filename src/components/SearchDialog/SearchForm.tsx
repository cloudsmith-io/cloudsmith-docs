import styles from './SearchForm.module.css';

export const SearchForm = ({ value, onChange }: SearchFormProps) => {
  return (
    <input
      className={styles.root}
      type="text"
      autoFocus
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      data-vertical-key="true"
    />
  );
};

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
};
