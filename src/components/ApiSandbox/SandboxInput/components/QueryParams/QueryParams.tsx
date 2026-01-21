import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './QueryParams.module.css';

const QueryParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
  <div className={styles.grid}>
    <div className={cx(styles.item, styles.header)}>
      <div className={cx(styles.subItem, 'monoXSUppercase')}>Query params</div>
    </div>
    {parameters.map((param) => (
      <div key={param.name} className={styles.item}>
        <Flex className={styles.param}>
          <div>{param.name}</div>
          <div className={styles.subItemType}>{param.schema?.type}</div>
          <div>
            <Tag variant={param.required ? 'red' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
          </div>
        </Flex>
      </div>
    ))}
  </div>
);

export default QueryParams;
