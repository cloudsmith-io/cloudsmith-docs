// import { Suspense } from 'react';

import { Button } from '../Button';
// import { CodeBlock } from '../CodeBlock';
import { Paragraph } from '../Paragraph';
import styles from './SandboxOutput.module.css';

export const SandboxOutput = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Paragraph>cURL Request</Paragraph>

        <Button icon="arrowRight">Try it</Button>
      </div>

      {/* <CodeBlock lang="bash" className={styles.request}>
        curl --request GET
      </CodeBlock> */}

      {/* <div className={styles.response}>hola</div> */}
    </div>
  );
};
