import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './QueryParams.module.css';

const QueryParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={cx(styles.heading, 'monoXSUppercase')}>Query params</div>
    </div>

    {parameters.map((param) => (
      <Flex key={param.name} className={styles.param} justify="between" align="center" wrap={false}>
        <Flex className={styles.name} gap="2xs" wrap align="center">
          <div className={styles.nameName}>{param.name}</div>
          <div className={styles.paramType}>{param.schema?.type}</div>
          <div>
            <Tag variant={param.required ? 'tomato' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
          </div>
        </Flex>
      </Flex>
    ))}
  </div>
);

export default QueryParams;
