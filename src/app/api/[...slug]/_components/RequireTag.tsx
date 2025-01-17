import { Tag } from '@/components';

export const RequiredTag = ({ isRequired }: { isRequired: boolean | undefined }) => (
  <Tag variant={isRequired ? 'red' : 'grey'}>{isRequired ? 'required' : 'optional'}</Tag>
);
