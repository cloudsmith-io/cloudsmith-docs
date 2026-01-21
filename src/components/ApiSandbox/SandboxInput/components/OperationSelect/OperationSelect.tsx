import { startTransition, useMemo, useState } from 'react';

import { Combobox, ComboboxItem, ComboboxList, ComboboxProvider } from '@ariakit/react';
import * as RadixSelect from '@radix-ui/react-select';

import { Flex } from '@/components/Flex';
import { Heading } from '@/components/Heading';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import { operationKey } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './OperationSelect.module.css';

type OperationSelectProps = {
  value: ApiOperation;
  options: ApiOperation[];
  onValueChange: (o: ApiOperation) => void;
};

export default function OperationSelect({ value, options, onValueChange }: OperationSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const matches = useMemo(() => {
    if (!searchValue) return options;
    const search = searchValue.toLowerCase();
    const matches = options.filter(
      (o) =>
        o.method.toLowerCase().includes(search) ||
        o.title.toLowerCase().includes(search) ||
        o.description?.toLowerCase().includes(search),
    );
    // Radix Select does not work if we don't render the selected item, so we
    // make sure to include it in the list of matches.
    const selectedLanguage = options.find((op) => operationKey(op) === operationKey(value));
    if (selectedLanguage && !matches.includes(selectedLanguage)) {
      matches.push(selectedLanguage);
    }
    return matches;
  }, [searchValue, value]);

  return (
    <RadixSelect.Root
      value={operationKey(value)}
      onValueChange={(v) => {
        const operation = options.find((o) => v === operationKey(o));
        if (operation) onValueChange(operation);
      }}
      open={open}
      onOpenChange={setOpen}>
      <ComboboxProvider
        open={open}
        setOpen={setOpen}
        resetValueOnHide
        includesBaseElement={false}
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
          });
        }}>
        <RadixSelect.Trigger aria-label="Operation" asChild>
          <Flex gap="xs" className={styles.trigger}>
            <Icon name="chevronDown" title="select" />
            <RadixSelect.Value aria-label={value.title}>
              <header>
                <Heading size="h2">{value.title}</Heading>
              </header>
            </RadixSelect.Value>
          </Flex>
        </RadixSelect.Trigger>

        <RadixSelect.Content
          role="dialog"
          aria-label="Operations"
          position="popper"
          className={styles.content}
          sideOffset={4}>
          <div className={styles.comboboxWrapper}>
            <div className={styles.comboboxIcon}>
              <Icon name="search" title="Search" />
            </div>
            <Combobox
              autoSelect
              placeholder="Search API operations"
              className={styles.combobox}
              // Ariakit's Combobox manually triggers a blur event on virtually
              // blurred items, making them work as if they had actual DOM
              // focus. These blur events might happen after the corresponding
              // focus events in the capture phase, leading Radix Select to
              // close the popover. This happens because Radix Select relies on
              // the order of these captured events to discern if the focus was
              // outside the element. Since we don't have access to the
              // onInteractOutside prop in the Radix SelectContent component to
              // stop this behavior, we can turn off Ariakit's behavior here.
              onBlurCapture={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            />
          </div>
          <ComboboxList className={styles.listbox}>
            {matches.map((o) => (
              <RadixSelect.Item key={operationKey(o)} value={operationKey(o)} asChild className={styles.item}>
                <ComboboxItem>
                  <RadixSelect.ItemText asChild>
                    <div className={styles.radixItem}>
                      <div className={styles.itemMethod}>
                        <Tag method={o.method} />
                      </div>

                      <span className={styles.itemTitle}>{o.title}</span>
                    </div>
                  </RadixSelect.ItemText>

                  <RadixSelect.ItemIndicator className={styles.itemIndicator}>
                    <Icon name="action/check" title="selected" />
                  </RadixSelect.ItemIndicator>
                </ComboboxItem>
              </RadixSelect.Item>
            ))}
          </ComboboxList>
        </RadixSelect.Content>
      </ComboboxProvider>
    </RadixSelect.Root>
  );
}
