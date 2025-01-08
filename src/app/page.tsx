import Link from 'next/link';
import { Card, Container, Flex } from '@/components';
export default function Page() {
  return (
    <>
      <h1>Frontpage</h1>
      <ul>
        <li>
          <Link href="/api">API</Link>
        </li>
        <li>
          <Link href="/getting-started">Getting Started Test</Link>
        </li>
      </ul>
      <Container>
        <h2>Card & Flex Components Test</h2>

        <Flex gap="l" align="stretch" className="pL">
          <Card
            title="Getting Started Guide"
            description="This is a Card with a description and default size (m)"
            href="/"
            linkText="Go to guide"
            icon="documentation"
          />

          <Card
            title="Setting Your Security Policies Guide"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to guide"
            icon="guide"
          />

          <Card
            title="Integrating your preferred package format with Cloudsmith"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to documentation"
            icon="guide"
          />

          <Card
            title="Integrating your preferred package format with Cloudsmith"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to documentation"
            icon="guide"
          />
        </Flex>

        <h2>Cards: Size variant (large)</h2>

        <Flex gap="l" align="stretch" className="pL">
          <Card
            title="Dependencies"
            href="/"
            linkText="For Developers"
            icon="documentation"
            size="l"
          />

          <Card
            title="Deployment"
            href="/"
            linkText="For Operations"
            icon="guide"
            size="l"
          />

          <Card
            title="Distribution"
            href="/"
            linkText="For Vendors"
            icon="apiReference"
            size="l"
          />
        </Flex>
      </Container>
    </>
  );
}
