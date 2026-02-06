import { CodeBlock } from '@/components/CodeBlock';
import { Note } from '@/components/Note';

interface Props {
  rego?: string;
}

export async function RegoRecipeCodeBlock({ rego }: Props) {
  if (!rego) {
    return (
      <Note variant="caution" noHeadline>
        Policy code not available
      </Note>
    );
  }

  return <CodeBlock lang="rego">{rego}</CodeBlock>;
}
