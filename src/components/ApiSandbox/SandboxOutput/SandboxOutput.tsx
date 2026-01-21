import { Button } from '@/components/Button';
import { CodeBlockSync } from '@/components/CodeBlock/CodeBlockSync';
import { Flex } from '@/components/Flex';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { curlCommand } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './SandboxOutput.module.css';

const response = [
  {
    access_private_broadcasts: true,
    clients: 0,
    created_at: '2026-01-12T20:18:38.445Z',
    created_by: 'string',
    created_by_url: 'string',
    default: true,
    disable_url: 'string',
    downloads: 0,
    enable_url: 'string',
    eula_accepted: {
      identifier: 'string',
      number: 0,
    },
    eula_accepted_at: '2026-01-12T20:18:38.445Z',
    eula_accepted_from: 'string',
    eula_required: true,
    has_limits: true,
    identifier: 0,
    is_active: true,
    is_limited: true,
    limit_bandwidth: 0,
    limit_bandwidth_unit: 'Byte',
    limit_date_range_from: '2026-01-12T20:18:38.445Z',
    limit_date_range_to: '2026-01-12T20:18:38.445Z',
    limit_num_clients: 0,
    limit_num_downloads: 0,
    limit_package_query: 'string',
    limit_path_query: 'string',
    metadata: {},
    name: 'string',
    refresh_url: 'string',
    reset_url: 'string',
    scheduled_reset_at: '2026-01-12T20:18:38.445Z',
    scheduled_reset_period: 'Never Reset',
    self_url: 'string',
    slug_perm: 'string',
    token: 'string',
    updated_at: '2026-01-12T20:18:38.445Z',
    updated_by: 'string',
    updated_by_url: 'string',
    usage: 'string',
    user: 'string',
    user_url: 'string',
  },
];

type SandboxOutputProps = {
  operation: ApiOperation;
  paramState: {
    path: Record<string, string>;
  };
};

export const SandboxOutput = ({ operation, paramState }: SandboxOutputProps) => {
  const command = curlCommand(operation, paramState);

  const stringResponse = JSON.stringify(response, null, 4);

  return (
    <Flex className={styles.root} gap="xs" justify="start" direction="column">
      <Flex className={styles.header} justify="between">
        <Paragraph>cURL Request</Paragraph>

        <Button withArrow className={styles.headerButton}>
          Try it
        </Button>
      </Flex>

      <CodeBlockSync lang="shell" variant="darker" header="Request" className={styles.request}>
        {command}
      </CodeBlockSync>

      <CodeBlockSync
        lang="json"
        variant="darker"
        header={<Tag variant="green">200</Tag>}
        className={styles.response}>
        {stringResponse}
      </CodeBlockSync>
    </Flex>
  );
};
